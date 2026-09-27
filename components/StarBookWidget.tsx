"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { STARBOOK_API_BASE } from "@/lib/constants";
import PixelEvent from "@/components/PixelEvent";
import {
  STARBOOK_DEFAULT_TZ,
  STARBOOK_PENDING_KEY,
  STARBOOK_REGISTRANT_KEY,
  fmtDateLong,
  fmtFee,
  fmtTimeOfDay,
  type StarBookPending,
  type StarBookQuestion,
  type StarBookRegistrant,
} from "@/lib/starbook";

// The native StarBook booking widget: replaces the Calendly embed on the
// branded /book/[session] pages and the registration /thankyou page once the
// flag flips (see those pages for the flag logic).
//
// The shape follows Calendly's, which families already know (William 9/27):
// the month on a grid with the open days tinted, landing on the next open
// day, that day's times beside it (below it on a phone); picking a time
// swaps in the details form with the studio's own booking questions. What a
// gift certificate registration already captured (name, email, phone, party
// size, certificate code) is filled in, so nobody answers twice.
//
// Backend contract (bigstarfish repo):
//   GET  /api/public/starbook/slots?brand=3birds&session=<slug>&from=<ISO>&to=<ISO>
//        -> { timezone, sessionLabel, durationMinutes, feeCents, slots: [{start, end}], questions }
//   POST /api/public/starbook/hold { brand, session, start, name, email, phone, notes?, answers?, website }
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
type MonthData = Record<string, Slot[]> | "loading" | "error";

const MAX_AHEAD_MONTHS = 3; // how far forward the month view can page
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// The registration form's party-size values, as a person would write them.
const PEOPLE_ANSWER: Record<string, string> = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5+" };

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

function monthAdd(ym: string, n: number): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
}

/** Noon UTC of the key: safe for weekday/month labels regardless of DST. */
function keyLabelDate(key: string): Date {
  return new Date(`${key}T12:00:00Z`);
}

function monthLabel(key: string): string {
  return keyLabelDate(key).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}

function monthName(ym: string): string {
  return keyLabelDate(`${ym}-01`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
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

function cleanQuestions(raw: unknown): StarBookQuestion[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((q) => q && typeof q.name === "string" && q.name.trim())
    .map((q) => ({
      name: String(q.name),
      type: ["string", "text", "single_select", "multi_select"].includes(q.type) ? q.type : "string",
      required: q.required === true,
      options: Array.isArray(q.options) ? q.options.map(String) : [],
    }));
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
  const firstYm = todayKey.slice(0, 7);
  const lastYm = monthAdd(firstYm, MAX_AHEAD_MONTHS);

  const [meta, setMeta] = useState<SlotsMeta | null>(null);
  const [questions, setQuestions] = useState<StarBookQuestion[]>([]);
  const [months, setMonths] = useState<Record<string, MonthData>>({});
  const [ym, setYm] = useState(firstYm);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  // Until the visitor moves between months themselves, an empty month
  // steps forward on its own, so the page opens on the next open day.
  const autoAdvance = useRef(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [prefill, setPrefill] = useState<{ people: string; code: string }>({ people: "", code: "" });

  // Prefill: ?name=&email=&phone=&people=&code= (campaign emails append
  // them) and, on /thankyou, what the gift certificate registration just
  // captured. Read in an effect rather than useSearchParams: this component
  // renders outside a Suspense boundary on a prerendered page.
  useEffect(() => {
    let reg: StarBookRegistrant = {};
    try {
      const raw = sessionStorage.getItem(STARBOOK_REGISTRANT_KEY);
      if (raw) reg = (JSON.parse(raw) as StarBookRegistrant) || {};
    } catch {
      // privacy mode: nothing to fill in
    }
    let params: URLSearchParams | null = null;
    try {
      params = new URLSearchParams(window.location.search);
    } catch {
      // Malformed query strings just skip the prefill.
    }
    const q = (k: string) => (params?.get(k) || "").trim();
    const n = q("name") || (reg.name || "").trim();
    const e = q("email") || (reg.email || "").trim();
    const p = q("phone") || (reg.phone || "").trim();
    if (n) setName((cur) => cur || n);
    if (e) setEmail((cur) => cur || e);
    if (p) setPhone((cur) => cur || formatPhone(p));
    setPrefill({ people: q("people") || reg.people || "", code: q("code") || reg.code || "" });
  }, []);

  // Fill the matching questions once they arrive (only ones still empty).
  useEffect(() => {
    if (!questions.length || (!prefill.people && !prefill.code)) return;
    setAnswers((cur) => {
      const next = { ...cur };
      for (const qn of questions) {
        if (next[qn.name]) continue;
        if (/how many people/i.test(qn.name) && prefill.people) {
          next[qn.name] = PEOPLE_ANSWER[prefill.people] || prefill.people;
        } else if (/\bcode\b/i.test(qn.name) && prefill.code) {
          next[qn.name] = prefill.code;
        }
      }
      return next;
    });
  }, [questions, prefill]);

  // Honeypot. Humans never see or fill this: bots that autofill every field do.
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [holdFeeCents, setHoldFeeCents] = useState<number | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const timesRef = useRef<HTMLDivElement>(null);

  const tz = meta?.timezone || STARBOOK_DEFAULT_TZ;

  // ---------- slot loading: one month per request ----------

  const loadMonth = useCallback(
    async (month: string) => {
      setMonths((m) => ({ ...m, [month]: "loading" }));
      const first = `${month}-01`;
      const nextFirst = `${monthAdd(month, 1)}-01`;
      try {
        const qs = new URLSearchParams({
          brand: "3birds",
          session,
          from: rangeStartUtc(first < todayKey ? todayKey : first, todayKey).toISOString(),
          to: rangeEndUtc(nextFirst).toISOString(),
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
        const qs2 = cleanQuestions(data.questions);
        if (qs2.length) setQuestions(qs2);
        const keyFmt = new Intl.DateTimeFormat("en-CA", {
          timeZone: zone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const byDay: Record<string, Slot[]> = {};
        for (const slot of (data.slots || []) as Slot[]) {
          const k = keyFmt.format(new Date(slot.start));
          if (k.slice(0, 7) !== month) continue;
          (byDay[k] ||= []).push(slot);
        }
        setMonths((m) => ({ ...m, [month]: byDay }));
      } catch {
        setMonths((m) => ({ ...m, [month]: "error" }));
      }
    },
    [session, todayKey, fallbackLabel]
  );

  useEffect(() => {
    if (months[ym] === undefined) void loadMonth(ym);
  }, [ym, months, loadMonth]);

  const current = months[ym];
  const byDay = current && typeof current === "object" ? current : null;
  const openDays = useMemo(
    () => (byDay ? Object.keys(byDay).filter((k) => byDay[k].length > 0).sort() : []),
    [byDay]
  );

  // Land on something useful: the first open day of the month, and while
  // the visitor has not paged themselves, the next month with openings.
  useEffect(() => {
    if (!byDay) return;
    if (openDays.length === 0 && autoAdvance.current && ym < lastYm) {
      setYm(monthAdd(ym, 1));
      return;
    }
    autoAdvance.current = false;
    if (!selectedDay || selectedDay.slice(0, 7) !== ym || !byDay[selectedDay]?.length) {
      setSelectedDay(openDays[0] || null);
    }
  }, [byDay, openDays, ym, lastYm, selectedDay]);

  const goMonth = (by: number) => {
    autoAdvance.current = false;
    setYm((cur) => monthAdd(cur, by));
  };

  function pickDay(k: string) {
    setSelectedDay(k);
    setFormError("");
    // On a phone the times sit under the calendar: bring them into view.
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.setTimeout(() => timesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }

  function pickSlot(slot: Slot) {
    setSelectedSlot(slot);
    setFormError("");
    window.setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function backToCalendar() {
    setSelectedSlot(null);
    setFormError("");
  }

  // ---------- submit ----------

  const answerText = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v.filter(Boolean).join(", ") : (v || "").trim();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot || !selectedDay) return;
    const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10})/, "");
    if (digits.length !== 10) {
      setFormError("Please enter a valid 10 digit phone number.");
      return;
    }
    const missing = questions.find((qn) => qn.required && !answerText(answers[qn.name]));
    if (missing) {
      setFormError(`Please answer: ${missing.name}`);
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
          answers: questions
            .map((qn) => ({ q: qn.name, a: answerText(answers[qn.name]) }))
            .filter((x) => x.a),
          website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setSubmitState("idle");
        setSelectedSlot(null);
        setFormError(
          res.status === 400 && typeof data?.error === "string"
            ? data.error
            : "That time may have just been taken. Please pick another time."
        );
        // Re-read the month: the time may be gone.
        setMonths((m) => {
          const next = { ...m };
          delete next[ym];
          return next;
        });
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

  // ---------- confirmed (free sessions book instantly) ----------

  if (submitState === "confirmed" && selectedSlot) {
    return (
      <div
        data-engine="starbook"
        className="border border-gray-100 rounded-2xl bg-white shadow-sm p-8 md:p-12 mb-8 text-center"
      >
        <PixelEvent event="Schedule" />
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

  const monthFirst = `${ym}-01`;
  const [mYear, mMonth] = ym.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(mYear, mMonth, 0)).getUTCDate();
  const leadBlanks = keyLabelDate(monthFirst).getUTCDay();
  const loading = current === undefined || current === "loading";
  const daySlots = selectedDay && byDay ? byDay[selectedDay] || [] : [];
  const label = meta?.sessionLabel || fallbackLabel || "";

  const feeNote = meta && meta.feeCents > 0 && (
    <div className="bg-teal-light rounded-xl px-4 py-3.5 flex items-start gap-3">
      <svg
        className="w-5 h-5 text-teal-dark flex-shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-sm text-gray-700 leading-relaxed">
        A {fmtFee(meta.feeCents)} reservation fee locks in your session. It is
        refundable after your appointment or applies toward your artwork.
      </p>
    </div>
  );

  return (
    <div
      ref={topRef}
      data-engine="starbook"
      className="border border-gray-100 rounded-2xl bg-white shadow-sm p-4 md:p-8 mb-8 scroll-mt-24"
    >
      {!selectedSlot ? (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-5">
            <h3 className="font-display text-xl md:text-2xl font-bold text-black">
              Select a date and time
            </h3>
            {meta && (
              <p className="text-sm text-gray-500">
                {meta.durationMinutes ? `${meta.durationMinutes} minutes` : ""}
                {meta.durationMinutes && meta.feeCents > 0 ? " · " : ""}
                {meta.feeCents > 0 ? `${fmtFee(meta.feeCents)} reservation` : ""}
              </p>
            )}
          </div>

          {formError && (
            <div role="alert" className="mb-5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
              {formError}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px]">
            {/* The month */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  aria-label="Previous month"
                  disabled={ym <= firstYm}
                  onClick={() => goMonth(-1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-teal-dark hover:bg-teal-light transition-colors disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <Chevron dir="left" />
                </button>
                <p className="font-semibold text-black" aria-live="polite">
                  {monthLabel(monthFirst)}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  disabled={ym >= lastYm}
                  onClick={() => goMonth(1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-teal-dark hover:bg-teal-light transition-colors disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <Chevron dir="right" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="py-1.5">{d}</span>
                ))}
              </div>
              <div className={`grid grid-cols-7 gap-y-1.5 ${loading ? "opacity-50" : ""}`}>
                {Array.from({ length: leadBlanks }).map((_, i) => (
                  <span key={`blank-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const k = addDays(monthFirst, i);
                  const count = byDay?.[k]?.length ?? 0;
                  const open = count > 0;
                  const selected = selectedDay === k;
                  const isToday = k === todayKey;
                  return (
                    <div key={k} className="flex justify-center">
                      <button
                        type="button"
                        disabled={!open}
                        onClick={() => pickDay(k)}
                        aria-pressed={selected}
                        aria-label={`${keyDayLong(k)}, ${open ? `${count} open ${count === 1 ? "time" : "times"}` : "no open times"}`}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-1 ${
                          selected
                            ? "bg-teal-dark text-white font-bold"
                            : open
                              ? "bg-teal-light text-black font-bold hover:bg-teal/25"
                              : "text-gray-300 cursor-default"
                        }`}
                      >
                        {i + 1}
                        {isToday && (
                          <span
                            aria-hidden="true"
                            className={`absolute left-1/2 -translate-x-1/2 bottom-1 w-1 h-1 rounded-full ${selected ? "bg-white" : "bg-teal-dark"}`}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-500">
                All times are Mountain Time (Denver).
              </p>
            </div>

            {/* The day's times */}
            <div ref={timesRef} className="scroll-mt-24">
              {current === "error" ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
                  We could not load available times.{" "}
                  <button type="button" onClick={() => void loadMonth(ym)} className="font-semibold underline">
                    Try again
                  </button>
                </div>
              ) : loading ? (
                <div className="space-y-2" aria-label="Loading open times">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : !selectedDay ? (
                <div className="bg-gray-50 rounded-xl px-4 py-5 text-sm text-gray-600">
                  No open times in {monthName(ym)}.
                  {ym < lastYm && (
                    <>
                      {" "}
                      <button type="button" onClick={() => goMonth(1)} className="font-semibold text-teal-dark underline">
                        See {monthName(monthAdd(ym, 1))}
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <p className="font-semibold text-black mb-3">{keyDayLong(selectedDay)}</p>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {daySlots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => pickSlot(slot)}
                        className="h-12 rounded-xl border-2 border-teal/60 text-black font-semibold tabular-nums hover:border-teal-dark hover:bg-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-1"
                      >
                        {fmtTimeOfDay(slot.start, tz)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {feeNote && <div className="mt-8">{feeNote}</div>}
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={backToCalendar}
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-dark hover:underline mb-4"
          >
            <Chevron dir="left" /> Back to the calendar
          </button>

          <div className="bg-teal-light rounded-xl px-4 py-4 mb-6">
            <p className="font-display text-lg font-bold text-black">{label}</p>
            <p className="text-gray-800 mt-0.5">
              {keyDayLong(selectedDay!)} at {fmtTimeOfDay(selectedSlot.start, tz)}
              <span className="text-gray-500"> Mountain Time</span>
            </p>
            {meta && (meta.durationMinutes > 0 || meta.feeCents > 0) && (
              <p className="text-sm text-gray-600 mt-1">
                {meta.durationMinutes ? `${meta.durationMinutes} minutes` : ""}
                {meta.durationMinutes && meta.feeCents > 0 ? " · " : ""}
                {meta.feeCents > 0 ? `${fmtFee(meta.feeCents)} reservation` : ""}
              </p>
            )}
          </div>

          <h3 className="font-display text-xl md:text-2xl font-bold text-black mb-4">
            Your details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="sb-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="sb-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor="sb-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                id="sb-phone"
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(406) 555-1234"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor="sb-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="sb-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={INPUT_CLS}
              />
            </div>

            {/* The studio's own booking questions (the ones its Calendly page asks). */}
            {questions.map((qn, qi) => {
              const id = `sb-q-${qi}`;
              const value = answers[qn.name];
              const set = (v: string | string[]) => setAnswers((cur) => ({ ...cur, [qn.name]: v }));
              const star = qn.required ? <span className="text-red-400"> *</span> : null;
              if ((qn.type === "single_select" || qn.type === "multi_select") && qn.options.length) {
                const multi = qn.type === "multi_select";
                const chosen = Array.isArray(value) ? value : value ? [value] : [];
                return (
                  <fieldset key={qn.name}>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      {qn.name}{star}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {qn.options.map((opt) => {
                        const on = chosen.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal ${
                              on ? "border-teal-dark bg-teal-light text-black font-semibold" : "border-gray-200 text-gray-700 hover:border-teal"
                            }`}
                          >
                            <input
                              type={multi ? "checkbox" : "radio"}
                              name={id}
                              value={opt}
                              checked={on}
                              onChange={() =>
                                set(multi ? (on ? chosen.filter((x) => x !== opt) : [...chosen, opt]) : opt)
                              }
                              className="sr-only"
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              }
              return (
                <div key={qn.name}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {qn.name}{star}
                  </label>
                  {qn.type === "text" ? (
                    <textarea
                      id={id}
                      rows={3}
                      required={qn.required}
                      value={typeof value === "string" ? value : ""}
                      onChange={(e) => set(e.target.value)}
                      className={INPUT_CLS}
                    />
                  ) : (
                    <input
                      id={id}
                      type="text"
                      required={qn.required}
                      value={typeof value === "string" ? value : ""}
                      onChange={(e) => set(e.target.value)}
                      className={INPUT_CLS}
                    />
                  )}
                </div>
              );
            })}

            {questions.length === 0 && (
              <div>
                <label htmlFor="sb-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes
                </label>
                <textarea
                  id="sb-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know? (optional)"
                  className={INPUT_CLS}
                />
              </div>
            )}

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

            {feeNote}

            {formError && (
              <div role="alert" className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
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
                `Continue to the ${fmtFee(meta.feeCents)} reservation`
              ) : (
                "Book my time"
              )}
            </button>
            {meta && meta.feeCents > 0 && (
              <p className="text-center text-xs text-gray-500">
                Your card is taken on Stripe&rsquo;s secure checkout. Apple Pay and Google Pay work there too.
              </p>
            )}
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
              aria-hidden="true"
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
