"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { STARBOOK_API_BASE } from "@/lib/constants";
import {
  STARBOOK_DEFAULT_TZ,
  STARBOOK_PENDING_KEY,
  fmtDateLong,
  fmtFee,
  fmtTimeOfDay,
  type StarBookPending,
} from "@/lib/starbook";

// The native StarBook booking widget: replaces the Calendly embed on the
// branded /book/[session] pages once the flag flips (see that page for the
// flag logic). Three steps, mobile-first: pick a day, pick a time, details.
//
// Backend contract (bigstarfish repo, built in parallel):
//   GET  /api/public/starbook/slots?brand=3birds&session=<slug>&from=<ISO>&to=<ISO>
//        -> { timezone, sessionLabel, durationMinutes, feeCents, slots: [{start, end}] }
//   POST /api/public/starbook/hold { brand, session, start, name, email, phone, notes?, website }
//        -> { ok, bookingId, checkoutUrl | null, feeCents }
// A non-null checkoutUrl means a paid reservation: we show a full-screen
// "hold placed" state and hand the visitor to Stripe. checkoutUrl null means
// the session is free (consults) and the booking is instantly confirmed.

interface Slot {
  start: string;
  end: string;
}

interface SlotsMeta {
  timezone: string;
  sessionLabel: string;
  durationMinutes: number;
  feeCents: number;
}

type SubmitState = "idle" | "submitting" | "redirecting" | "confirmed";

const STRIP_DAYS = 14;
const MAX_AHEAD_DAYS = 90; // how far forward the strip can page
const MAX_AHEAD_MONTHS = 3; // how far forward the month view can page

// ---------- calendar helpers (day keys are "YYYY-MM-DD" on the studio calendar) ----------

const denverDayKey = new Intl.DateTimeFormat("en-CA", {
  timeZone: STARBOOK_DEFAULT_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function todayKeyDenver(): string {
  return denverDayKey.format(new Date());
}

/** Pure calendar arithmetic on a day key. Date.UTC handles month rollover. */
function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

function diffDays(a: string, b: string): number {
  return Math.round(
    (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000
  );
}

function monthAdd(ym: string, n: number): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
}

/** Noon UTC of the key: safe for weekday/month labels regardless of DST. */
function keyLabelDate(key: string): Date {
  return new Date(`${key}T12:00:00Z`);
}

function weekdayShort(key: string): string {
  return keyLabelDate(key).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
  });
}

function dayNum(key: string): number {
  return keyLabelDate(key).getUTCDate();
}

function monthLabel(key: string): string {
  return keyLabelDate(key).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}

function keyDayLong(key: string): string {
  return keyLabelDate(key).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Denver midnight is 06:00Z (MDT) or 07:00Z (MST). These bounds over-cover a
// touch, which is harmless: results are regrouped per day after every fetch.
function rangeStartUtc(key: string, today: string): Date {
  return key <= today ? new Date() : new Date(`${key}T06:00:00Z`);
}

function rangeEndUtc(exclusiveKey: string): Date {
  return new Date(`${exclusiveKey}T07:00:00Z`);
}

/** Basic US phone formatting as they type: (406) 555-1234. */
function formatPhone(raw: string): string {
  const d = raw
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10})/, "")
    .slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const INPUT_CLS =
  "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all";

function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function StepHeading({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex-shrink-0 w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
        {n}
      </span>
      <h3 className="font-display text-xl font-bold text-black">{children}</h3>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export default function StarBookWidget({
  session,
  fallbackLabel,
}: {
  session: string;
  fallbackLabel?: string;
}) {
  const todayKey = useMemo(() => todayKeyDenver(), []);

  const [meta, setMeta] = useState<SlotsMeta | null>(null);
  const [slotsByDay, setSlotsByDay] = useState<Record<string, Slot[]>>({});
  const [loadedDays, setLoadedDays] = useState<Record<string, true>>({});
  const loadedRef = useRef<Record<string, true>>({});
  const pendingRef = useRef<Set<string>>(new Set());
  const [loadError, setLoadError] = useState(false);

  const [stripStart, setStripStart] = useState(todayKey);
  const [monthOpen, setMonthOpen] = useState(false);
  const [monthCursor, setMonthCursor] = useState(todayKey.slice(0, 7));

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  // Honeypot. Humans never see or fill this: bots that autofill every field do.
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [holdFeeCents, setHoldFeeCents] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const tz = meta?.timezone || STARBOOK_DEFAULT_TZ;

  // ---------- slot loading ----------

  const loadRange = useCallback(
    async (fromKey: string, count: number) => {
      const keys = Array.from({ length: count }, (_, i) => addDays(fromKey, i));
      const need = keys.filter(
        (k) => !loadedRef.current[k] && !pendingRef.current.has(k)
      );
      if (need.length === 0) return;
      need.forEach((k) => pendingRef.current.add(k));
      setLoadError(false);
      try {
        const qs = new URLSearchParams({
          brand: "3birds",
          session,
          from: rangeStartUtc(fromKey, todayKey).toISOString(),
          to: rangeEndUtc(addDays(fromKey, count)).toISOString(),
        });
        const res = await fetch(
          `${STARBOOK_API_BASE}/api/public/starbook/slots?${qs.toString()}`
        );
        if (!res.ok) throw new Error(`slots ${res.status}`);
        const data = await res.json();
        const zone =
          typeof data.timezone === "string" && data.timezone
            ? data.timezone
            : STARBOOK_DEFAULT_TZ;
        setMeta({
          timezone: zone,
          sessionLabel: data.sessionLabel || fallbackLabel || "",
          durationMinutes: data.durationMinutes || 0,
          feeCents: typeof data.feeCents === "number" ? data.feeCents : 0,
        });
        const keyFmt = new Intl.DateTimeFormat("en-CA", {
          timeZone: zone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const grouped: Record<string, Slot[]> = {};
        for (const slot of (data.slots || []) as Slot[]) {
          const k = keyFmt.format(new Date(slot.start));
          (grouped[k] ||= []).push(slot);
        }
        setSlotsByDay((prev) => {
          const next = { ...prev };
          for (const k of keys) next[k] = grouped[k] || [];
          return next;
        });
        for (const k of keys) loadedRef.current[k] = true;
        setLoadedDays({ ...loadedRef.current });
      } catch {
        setLoadError(true);
      } finally {
        need.forEach((k) => pendingRef.current.delete(k));
      }
    },
    [session, todayKey, fallbackLabel]
  );

  useEffect(() => {
    loadRange(stripStart, STRIP_DAYS);
  }, [stripStart, loadRange]);

  useEffect(() => {
    if (!monthOpen) return;
    const first = `${monthCursor}-01`;
    const start = first < todayKey ? todayKey : first;
    const nextFirst = `${monthAdd(monthCursor, 1)}-01`;
    const count = diffDays(start, nextFirst);
    if (count > 0) loadRange(start, count);
  }, [monthOpen, monthCursor, todayKey, loadRange]);

  // Re-check a single day (used when a hold fails: the slot may be gone).
  const refreshDay = useCallback(
    (key: string) => {
      delete loadedRef.current[key];
      setLoadedDays({ ...loadedRef.current });
      loadRange(key, 1);
    },
    [loadRange]
  );

  const retryLoad = useCallback(() => {
    if (monthOpen) {
      const first = `${monthCursor}-01`;
      const start = first < todayKey ? todayKey : first;
      const count = diffDays(start, `${monthAdd(monthCursor, 1)}-01`);
      if (count > 0) loadRange(start, count);
    } else {
      loadRange(stripStart, STRIP_DAYS);
    }
  }, [monthOpen, monthCursor, stripStart, todayKey, loadRange]);

  useEffect(() => {
    if (selectedSlot && submitState === "idle") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSlot, submitState]);

  // ---------- submit ----------

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot || !selectedDay) return;
    const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10})/, "");
    if (digits.length !== 10) {
      setFormError("Please enter a valid 10 digit phone number.");
      return;
    }
    setFormError("");
    setSubmitState("submitting");
    try {
      const res = await fetch(`${STARBOOK_API_BASE}/api/public/starbook/hold`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: "3birds",
          session,
          start: selectedSlot.start,
          name: name.trim(),
          email: email.trim(),
          phone,
          notes: notes.trim() || undefined,
          website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setSubmitState("idle");
        setSelectedSlot(null);
        setFormError(
          "That time may have just been taken. Please pick another time."
        );
        refreshDay(selectedDay);
        return;
      }
      const fee =
        typeof data.feeCents === "number" ? data.feeCents : meta?.feeCents ?? 0;
      setHoldFeeCents(fee);
      if (data.checkoutUrl) {
        // Stash the details so /book/confirmed can show session + date/time
        // after Stripe bounces the visitor back.
        try {
          const pending: StarBookPending = {
            bookingId: data.bookingId,
            sessionLabel: meta?.sessionLabel || fallbackLabel,
            start: selectedSlot.start,
            timezone: tz,
            feeCents: fee,
          };
          sessionStorage.setItem(STARBOOK_PENDING_KEY, JSON.stringify(pending));
        } catch {
          // privacy mode: the confirmed page falls back to generic copy
        }
        setSubmitState("redirecting");
        const url = data.checkoutUrl as string;
        window.setTimeout(() => {
          window.location.href = url;
        }, 1600);
      } else {
        setSubmitState("confirmed");
      }
    } catch {
      setSubmitState("idle");
      setFormError("Network error. Please check your connection and try again.");
    }
  }

  // ---------- derived ----------

  const stripDays = useMemo(
    () => Array.from({ length: STRIP_DAYS }, (_, i) => addDays(stripStart, i)),
    [stripStart]
  );
  const stripLoaded = stripDays.every((k) => loadedDays[k]);
  const stripEmpty =
    stripLoaded && stripDays.every((k) => (slotsByDay[k]?.length ?? 0) === 0);
  const stripEndKey = stripDays[stripDays.length - 1];
  const stripLabel =
    stripStart.slice(0, 7) === stripEndKey.slice(0, 7)
      ? monthLabel(stripStart)
      : `${keyLabelDate(stripStart).toLocaleDateString("en-US", {
          timeZone: "UTC",
          month: "long",
        })} / ${monthLabel(stripEndKey)}`;

  const daySlots = selectedDay ? slotsByDay[selectedDay] : undefined;
  const dayLoaded = selectedDay ? !!loadedDays[selectedDay] : false;

  function pickDay(k: string) {
    setSelectedDay(k);
    setSelectedSlot(null);
    setFormError("");
  }

  function dayCellState(k: string) {
    const has = (slotsByDay[k]?.length ?? 0) > 0;
    return { has, isLoaded: !!loadedDays[k], selected: selectedDay === k };
  }

  // ---------- confirmed (free sessions book instantly) ----------

  if (submitState === "confirmed" && selectedSlot) {
    return (
      <div
        data-engine="starbook"
        className="border border-gray-100 rounded-2xl bg-white shadow-sm p-8 md:p-12 mb-8 text-center"
      >
        <div className="check-anim w-20 h-20 bg-teal rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-3">
          You are booked!
        </h2>
        <p className="text-lg text-gray-800 font-medium">
          {meta?.sessionLabel || fallbackLabel}
        </p>
        <p className="text-gray-600 mt-1">
          {fmtDateLong(selectedSlot.start, tz)} at{" "}
          {fmtTimeOfDay(selectedSlot.start, tz)}{" "}
          <span className="text-gray-400">Mountain Time</span>
        </p>
        <p className="text-gray-500 mt-6 max-w-md mx-auto leading-relaxed">
          Watch your phone and inbox for everything you need to know. See you
          soon! Nelli
        </p>
      </div>
    );
  }

  // ---------- month grid values ----------

  const monthFirst = `${monthCursor}-01`;
  const [mYear, mMonth] = monthCursor.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(mYear, mMonth, 0)).getUTCDate();
  const leadBlanks = keyLabelDate(monthFirst).getUTCDay();

  return (
    <div
      data-engine="starbook"
      className="border border-gray-100 rounded-2xl bg-white shadow-sm p-4 md:p-8 mb-8"
    >
      {/* Fee, up front. Never hardcoded: comes from the slots response. */}
      {meta && meta.feeCents > 0 && (
        <div className="bg-teal-light rounded-xl px-4 py-3.5 mb-6 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-teal flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            A {fmtFee(meta.feeCents)} reservation fee locks in your session. It
            is refundable after your appointment or applies toward your artwork.
          </p>
        </div>
      )}

      {loadError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 mb-6 text-sm flex items-center justify-between gap-4">
          <span>We could not load available times. Please try again.</span>
          <button
            type="button"
            onClick={retryLoad}
            className="font-semibold underline flex-shrink-0"
          >
            Try again
          </button>
        </div>
      )}

      {/* Step 1: pick a day */}
      <StepHeading n={1}>Pick a day</StepHeading>
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-sm font-medium text-gray-600">
          {monthOpen ? monthLabel(monthFirst) : stripLabel}
        </p>
        <div className="flex items-center gap-1.5">
          {monthOpen ? (
            <>
              <button
                type="button"
                aria-label="Previous month"
                disabled={monthCursor <= todayKey.slice(0, 7)}
                onClick={() => setMonthCursor((c) => monthAdd(c, -1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={
                  monthCursor >= monthAdd(todayKey.slice(0, 7), MAX_AHEAD_MONTHS)
                }
                onClick={() => setMonthCursor((c) => monthAdd(c, 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <Chevron dir="right" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label="Earlier days"
                disabled={stripStart <= todayKey}
                onClick={() =>
                  setStripStart((s) => {
                    const back = addDays(s, -7);
                    return back < todayKey ? todayKey : back;
                  })
                }
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                aria-label="Later days"
                disabled={stripStart >= addDays(todayKey, MAX_AHEAD_DAYS)}
                onClick={() => setStripStart((s) => addDays(s, 7))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <Chevron dir="right" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              setMonthOpen((o) => !o);
              setMonthCursor(stripStart.slice(0, 7));
            }}
            className="ml-1 text-sm font-semibold text-teal hover:underline"
          >
            {monthOpen ? "Two week view" : "Full month"}
          </button>
        </div>
      </div>

      {monthOpen ? (
        <div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-gray-400 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: leadBlanks }).map((_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const k = addDays(monthFirst, i);
              const past = k < todayKey;
              const { has, isLoaded, selected } = dayCellState(k);
              const dead = past || (isLoaded && !has);
              return (
                <button
                  key={k}
                  type="button"
                  disabled={dead}
                  onClick={() => pickDay(k)}
                  className={`flex flex-col items-center rounded-lg border py-1.5 transition-colors ${
                    selected
                      ? "bg-teal border-teal text-white"
                      : dead
                        ? "border-transparent text-gray-300 cursor-default"
                        : "border-gray-200 text-black hover:border-teal"
                  }`}
                >
                  <span className="text-sm font-semibold leading-6">
                    {dayNum(k)}
                  </span>
                  {past ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  ) : isLoaded ? (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        has
                          ? selected
                            ? "bg-white"
                            : "bg-teal"
                          : "bg-transparent"
                      }`}
                    />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {stripDays.map((k) => {
              const { has, isLoaded, selected } = dayCellState(k);
              return (
                <button
                  key={k}
                  type="button"
                  disabled={isLoaded && !has}
                  onClick={() => pickDay(k)}
                  className={`flex flex-col items-center flex-shrink-0 w-[52px] rounded-xl border py-2 transition-colors ${
                    selected
                      ? "bg-teal border-teal text-white"
                      : isLoaded && !has
                        ? "border-gray-100 text-gray-300 cursor-default"
                        : "border-gray-200 text-black hover:border-teal"
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase tracking-wide ${
                      selected ? "text-white/80" : "text-gray-400"
                    }`}
                  >
                    {weekdayShort(k)}
                  </span>
                  <span className="text-base font-semibold leading-6">
                    {dayNum(k)}
                  </span>
                  {isLoaded ? (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        has
                          ? selected
                            ? "bg-white"
                            : "bg-teal"
                          : "bg-transparent"
                      }`}
                    />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
          {stripEmpty && !loadError && (
            <div className="mt-4 bg-gray-50 rounded-xl px-4 py-6 text-center">
              <p className="text-gray-600 text-sm mb-3">
                No times in this range, try the next week.
              </p>
              <button
                type="button"
                onClick={() => setStripStart((s) => addDays(s, 7))}
                className="px-5 py-2.5 bg-teal text-white rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Check next week
              </button>
            </div>
          )}
        </>
      )}

      {/* Step 2: pick a time */}
      {selectedDay && (
        <div className="mt-8">
          <StepHeading n={2}>Pick a time</StepHeading>
          <p className="text-sm text-gray-500 mb-4">
            {keyDayLong(selectedDay)}. All times are Mountain Time (Denver).
          </p>
          {!dayLoaded ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-11 rounded-full bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (daySlots?.length ?? 0) === 0 ? (
            <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
              No times left on this day. Please pick another day.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {daySlots?.map((slot) => {
                const sel = selectedSlot?.start === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setFormError("");
                    }}
                    className={`h-11 rounded-full border text-sm font-medium transition-colors ${
                      sel
                        ? "bg-teal border-teal text-white"
                        : "border-gray-200 text-black hover:border-teal hover:text-teal"
                    }`}
                  >
                    {fmtTimeOfDay(slot.start, tz)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {formError && !selectedSlot && (
        <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
          {formError}
        </div>
      )}

      {/* Step 3: details */}
      {selectedDay && selectedSlot && (
        <div ref={formRef} className="mt-8 scroll-mt-24">
          <StepHeading n={3}>Your details</StepHeading>
          <div className="bg-teal-light/60 rounded-xl px-4 py-3 mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">
                {meta?.sessionLabel || fallbackLabel}
              </span>
              <span className="block sm:inline sm:ml-2">
                {keyDayLong(selectedDay)} at{" "}
                {fmtTimeOfDay(selectedSlot.start, tz)}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="text-sm font-semibold text-teal underline flex-shrink-0"
            >
              Change
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(406) 555-1234"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know? (optional)"
                className={INPUT_CLS}
              />
            </div>

            {/* Honeypot: offscreen, never shown, never tabbed to. */}
            <div
              className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
              aria-hidden="true"
            >
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            {meta && meta.feeCents > 0 && (
              <p className="text-xs text-gray-500 leading-relaxed">
                Next step: a {fmtFee(meta.feeCents)} reservation locks in your
                time. It is refundable after your appointment or applies toward
                your artwork.
              </p>
            )}

            {formError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="w-full py-4 bg-teal text-white rounded-xl font-semibold text-lg hover:bg-teal-dark transition-colors disabled:opacity-60 shadow-lg shadow-teal/20"
            >
              {submitState === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Holding your time...
                </span>
              ) : meta && meta.feeCents > 0 ? (
                "Hold my session time"
              ) : (
                "Book my time"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Full-screen hold-placed state, then off to Stripe checkout. */}
      {submitState === "redirecting" && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 text-center">
          <div className="check-anim w-20 h-20 bg-teal rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-9 h-9 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-black mb-3">
            Hold placed.
          </h2>
          <p className="text-gray-600 max-w-sm leading-relaxed mb-8">
            Complete your {fmtFee(holdFeeCents ?? meta?.feeCents ?? 0)}{" "}
            reservation to lock it in.
          </p>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Spinner className="h-4 w-4" /> Taking you to secure checkout...
          </p>
        </div>
      )}
    </div>
  );
}
