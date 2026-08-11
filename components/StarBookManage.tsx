"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  STARBOOK_API_BASE,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/constants";
import {
  STARBOOK_DEFAULT_TZ,
  fmtDateLong,
  fmtFee,
  fmtTimeOfDay,
} from "@/lib/starbook";

// The customer self-serve manage page: /book/manage?bid=<id>&token=<tok>.
// The link arrives only inside the StarBook confirmation messages (which are
// gated server-side), so everyone landing here holds a capability token for
// exactly one booking. Everything renders client-side off three public
// endpoints: GET booking, POST reschedule, POST cancel.
//
// Deposit policy shown here mirrors the studio's published copy and the
// server's enforcement: fully refundable unless the cancellation is day-of;
// a reschedule keeps the deposit attached to the new time.

interface ManageBooking {
  bookingId: string;
  sessionLabel: string;
  sessionSlug: string | null;
  start: string;
  durationMinutes: number;
  timezone: string;
  status: string;
  feeCents: number;
  feePaid: boolean;
  brandDisplay: string;
  canCancel: boolean;
  canReschedule: boolean;
  refundIfCanceledNow: boolean;
  cancelOutcome: string | null;
}

interface Slot {
  start: string;
  end: string;
}

type Mode = "view" | "reschedule" | "cancelConfirm";
type PageState =
  | { kind: "loading" }
  | { kind: "notfound" }
  | { kind: "ready"; booking: ManageBooking }
  | { kind: "canceled"; booking: ManageBooking; refund: string }
  | { kind: "moved"; booking: ManageBooking; newStart: string };

function Spinner() {
  return (
    <svg className="animate-spin h-10 w-10 text-teal mx-auto mb-6" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function PhoneLine() {
  return (
    <p className="text-gray-500 mt-8 text-sm">
      Questions? Call us at{" "}
      <a href={STUDIO_PHONE_TEL} className="text-teal font-semibold">
        {STUDIO_PHONE}
      </a>
      .
    </p>
  );
}

export default function StarBookManage() {
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid") || "";
  const token = searchParams.get("token") || "";

  const [page, setPage] = useState<PageState>({ kind: "loading" });
  const [mode, setMode] = useState<Mode>("view");
  const [acting, setActing] = useState(false);
  const [actionError, setActionError] = useState("");

  // Reschedule picker state
  const [slotsByDay, setSlotsByDay] = useState<Record<string, Slot[]> | null>(null);
  const [slotsError, setSlotsError] = useState(false);
  const [visibleDays, setVisibleDays] = useState(8);
  const [picked, setPicked] = useState<Slot | null>(null);

  const loadBooking = useCallback(async () => {
    if (!bid || !token) {
      setPage({ kind: "notfound" });
      return;
    }
    try {
      const res = await fetch(
        `${STARBOOK_API_BASE}/api/public/starbook/booking?bid=${encodeURIComponent(bid)}&token=${encodeURIComponent(token)}`
      );
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setPage({ kind: "notfound" });
        return;
      }
      const booking = data.booking as ManageBooking;
      if (booking.status === "canceled") {
        setPage({ kind: "canceled", booking, refund: booking.cancelOutcome || "" });
      } else {
        setPage({ kind: "ready", booking });
      }
    } catch {
      // Network hiccup gets the not-found treatment with the phone escape
      // hatch; a reload retries.
      setPage({ kind: "notfound" });
    }
  }, [bid, token]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  const tz = page.kind === "ready" || page.kind === "canceled" || page.kind === "moved"
    ? page.booking.timezone || STARBOOK_DEFAULT_TZ
    : STARBOOK_DEFAULT_TZ;

  const dayKeyFmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    [tz]
  );

  const openReschedule = useCallback(async () => {
    if (page.kind !== "ready") return;
    setMode("reschedule");
    setPicked(null);
    setSlotsError(false);
    setSlotsByDay(null);
    try {
      const from = new Date();
      const to = new Date(from.getTime() + 62 * 24 * 60 * 60 * 1000);
      const qs = new URLSearchParams({
        brand: "3birds",
        session: page.booking.sessionSlug || "",
        from: from.toISOString(),
        to: to.toISOString(),
        // The server frees this booking's own window from the conflict scan
        // only when the token verifies, so moving 30 minutes works.
        excludeBooking: page.booking.bookingId,
        token,
      });
      const res = await fetch(`${STARBOOK_API_BASE}/api/public/starbook/slots?${qs.toString()}`);
      if (!res.ok) throw new Error(`slots ${res.status}`);
      const data = await res.json();
      const grouped: Record<string, Slot[]> = {};
      for (const slot of (data.slots || []) as Slot[]) {
        const k = dayKeyFmt.format(new Date(slot.start));
        (grouped[k] ||= []).push(slot);
      }
      setSlotsByDay(grouped);
    } catch {
      setSlotsError(true);
    }
  }, [page, token, dayKeyFmt]);

  const submitReschedule = useCallback(async () => {
    if (page.kind !== "ready" || !picked || acting) return;
    setActing(true);
    setActionError("");
    try {
      const res = await fetch(`${STARBOOK_API_BASE}/api/public/starbook/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bid, token, start: picked.start }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setActionError(
          data?.error || "That time may have just been taken. Pick another slot."
        );
        setPicked(null);
        // Refresh availability so the taken slot disappears.
        openReschedule();
        return;
      }
      setPage({ kind: "moved", booking: page.booking, newStart: data.start });
      setMode("view");
    } catch {
      setActionError("Network error. Please check your connection and try again.");
    } finally {
      setActing(false);
    }
  }, [page, picked, acting, bid, token, openReschedule]);

  const submitCancel = useCallback(async () => {
    if (page.kind !== "ready" || acting) return;
    setActing(true);
    setActionError("");
    try {
      const res = await fetch(`${STARBOOK_API_BASE}/api/public/starbook/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bid, token }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setActionError(data?.error || "We could not cancel this booking online. Please call the studio.");
        return;
      }
      setPage({ kind: "canceled", booking: page.booking, refund: String(data.refund || "") });
      setMode("view");
    } catch {
      setActionError("Network error. Please check your connection and try again.");
    } finally {
      setActing(false);
    }
  }, [page, acting, bid, token]);

  // ---------- render ----------

  if (page.kind === "loading") {
    return (
      <section className="bg-white pt-40 pb-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Spinner />
          <h1 className="font-display text-2xl font-bold text-black mb-2">
            Finding your booking...
          </h1>
        </div>
      </section>
    );
  }

  if (page.kind === "notfound") {
    return (
      <section className="bg-white pt-36 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
            We could not find that booking
          </h1>
          <p className="text-gray-600">
            The link may be incomplete. Open the manage link from your
            confirmation text or email, or call the studio and we will take
            care of it.
          </p>
          <PhoneLine />
        </div>
      </section>
    );
  }

  if (page.kind === "canceled") {
    const { booking, refund } = page;
    return (
      <section className="bg-white pt-36 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
            Your session is canceled
          </h1>
          <p className="text-gray-700 mb-2">
            {booking.sessionLabel} on {fmtDateLong(booking.start, tz)} at{" "}
            {fmtTimeOfDay(booking.start, tz)}
          </p>
          {(refund === "manual_refund_due" || refund === "refunded") && (
            <p className="text-gray-600 max-w-md mx-auto">
              Your {fmtFee(booking.feeCents)} reservation fee is refundable.
              The studio handles refunds personally and will process yours
              back to your original payment method.
            </p>
          )}
          {refund === "kept_day_of" && (
            <p className="text-gray-600 max-w-md mx-auto">
              Day-of cancellations keep the reservation fee, per our
              reservation policy.
            </p>
          )}
          {refund === "refund_failed" && (
            <p className="text-gray-600 max-w-md mx-auto">
              Your refund needs a manual finish on our side and the studio has
              been notified. If it has not appeared within a few days, call us.
            </p>
          )}
          <p className="text-gray-500 mt-8 max-w-md mx-auto">
            Changed your mind? We would love to see you. Book a new time
            whenever you are ready.
          </p>
          <div className="mt-6">
            <Link href="/book/outdoor" className="text-teal font-semibold hover:underline">
              Book a new session
            </Link>
          </div>
          <PhoneLine />
        </div>
      </section>
    );
  }

  if (page.kind === "moved") {
    const { booking, newStart } = page;
    return (
      <section className="bg-white pt-36 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="check-anim w-24 h-24 bg-teal rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-4xl font-bold text-black mb-4">
            You are rescheduled!
          </h1>
          <p className="text-xl text-gray-800 font-medium mb-1">{booking.sessionLabel}</p>
          <p className="text-gray-600">
            {fmtDateLong(newStart, tz)} at {fmtTimeOfDay(newStart, tz)}{" "}
            <span className="text-gray-400">Mountain Time</span>
          </p>
          {booking.feePaid && (
            <p className="text-gray-500 mt-4">
              Your {fmtFee(booking.feeCents)} reservation fee moved with you.
            </p>
          )}
          <p className="text-gray-500 mt-6 max-w-md mx-auto">
            An updated confirmation is headed to your phone and inbox. See you
            soon! Nelli
          </p>
          <PhoneLine />
        </div>
      </section>
    );
  }

  // page.kind === "ready"
  const { booking } = page;
  const dayKeys = slotsByDay
    ? Object.keys(slotsByDay).filter((k) => slotsByDay[k].length > 0).sort()
    : [];

  return (
    <section className="bg-white pt-32 pb-24">
      <div className="max-w-xl mx-auto px-6">
        <p className="text-center text-sm uppercase tracking-widest text-gray-400 mb-3">
          Your booking with {booking.brandDisplay}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-black text-center mb-2">
          {booking.sessionLabel}
        </h1>
        <p className="text-center text-lg text-gray-700">
          {fmtDateLong(booking.start, tz)} at {fmtTimeOfDay(booking.start, tz)}{" "}
          <span className="text-gray-400">Mountain Time</span>
        </p>
        {booking.feePaid && (
          <p className="text-center text-gray-500 mt-2">
            {fmtFee(booking.feeCents)} reservation fee on file. Fully refundable
            unless you cancel day-of, and it rides along when you reschedule.
          </p>
        )}
        {booking.status === "completed" && (
          <p className="text-center text-gray-600 mt-6">
            This session is complete. We loved having you!
          </p>
        )}

        {actionError && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm text-center">
            {actionError}
          </div>
        )}

        {/* Primary actions */}
        {mode === "view" && (booking.canReschedule || booking.canCancel) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {booking.canReschedule && (
              <button
                onClick={openReschedule}
                className="px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Reschedule
              </button>
            )}
            {booking.canCancel && (
              <button
                onClick={() => {
                  setMode("cancelConfirm");
                  setActionError("");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel session
              </button>
            )}
          </div>
        )}

        {/* Cancel confirmation */}
        {mode === "cancelConfirm" && (
          <div className="mt-8 border border-gray-200 rounded-2xl p-6 text-center">
            <h2 className="font-display text-xl font-bold text-black mb-3">
              Cancel this session?
            </h2>
            {booking.feePaid && booking.refundIfCanceledNow && (
              <p className="text-gray-600 text-sm mb-4">
                Your {fmtFee(booking.feeCents)} reservation fee is refundable.
                The studio handles refunds personally and will take care of
                yours after you cancel.
              </p>
            )}
            {booking.feePaid && !booking.refundIfCanceledNow && (
              <p className="text-gray-600 text-sm mb-4">
                Because your session is today, the reservation fee is not
                refundable. Rescheduling instead keeps it attached to your new
                time.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={submitCancel}
                disabled={acting}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {acting ? "Canceling..." : "Yes, cancel my session"}
              </button>
              <button
                onClick={() => setMode("view")}
                disabled={acting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Keep my session
              </button>
            </div>
          </div>
        )}

        {/* Reschedule picker */}
        {mode === "reschedule" && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-black">
                Pick a new time
              </h2>
              <button
                onClick={() => {
                  setMode("view");
                  setPicked(null);
                  setActionError("");
                }}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Never mind
              </button>
            </div>

            {slotsByDay === null && !slotsError && (
              <div className="py-10 text-center text-gray-400">Loading available times...</div>
            )}
            {slotsError && (
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-3">We could not load available times.</p>
                <button onClick={openReschedule} className="text-teal font-semibold hover:underline">
                  Try again
                </button>
              </div>
            )}
            {slotsByDay !== null && dayKeys.length === 0 && (
              <p className="py-8 text-center text-gray-500">
                No open times in the next two months. Call us at{" "}
                <a href={STUDIO_PHONE_TEL} className="text-teal font-semibold">
                  {STUDIO_PHONE}
                </a>{" "}
                and we will find one together.
              </p>
            )}

            {dayKeys.slice(0, visibleDays).map((k) => (
              <div key={k} className="mb-5">
                <p className="font-semibold text-black mb-2">
                  {fmtDateLong(slotsByDay![k][0].start, tz)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {slotsByDay![k].map((slot) => (
                    <button
                      key={slot.start}
                      onClick={() => setPicked(slot)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        picked?.start === slot.start
                          ? "bg-teal text-white border-teal"
                          : "border-gray-200 text-gray-700 hover:border-teal"
                      }`}
                    >
                      {fmtTimeOfDay(slot.start, tz)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {dayKeys.length > visibleDays && (
              <button
                onClick={() => setVisibleDays((n) => n + 8)}
                className="text-teal font-semibold hover:underline text-sm"
              >
                Show more days
              </button>
            )}

            {picked && (
              <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                <p className="text-gray-700 mb-3">
                  Move to <strong>{fmtDateLong(picked.start, tz)}</strong> at{" "}
                  <strong>{fmtTimeOfDay(picked.start, tz)}</strong>?
                </p>
                <button
                  onClick={submitReschedule}
                  disabled={acting}
                  className="px-8 py-3 bg-teal text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {acting ? "Moving..." : "Confirm new time"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <PhoneLine />
        </div>
      </div>
    </section>
  );
}
