"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  STARBOOK_API_BASE,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/constants";
import {
  STARBOOK_DEFAULT_TZ,
  STARBOOK_PENDING_KEY,
  fmtDateLong,
  fmtTimeOfDay,
  type StarBookPending,
} from "@/lib/starbook";

// Stripe success_url lands here as /book/confirmed?bid=<bookingId>&cs=<code>.
// We verify with the backend confirm endpoint. If the payment webhook beat us
// the answer is instantly ok; if not we retry a couple of times, then settle
// into a soft "still processing" state (the backend reconcile sweep catches
// stragglers, nobody is left hanging).

type Status = "verifying" | "booked" | "processing";

export default function StarBookConfirmed() {
  const searchParams = useSearchParams();
  const bid = searchParams.get("bid") || "";
  const cs = searchParams.get("cs") || "";

  const [status, setStatus] = useState<Status>("verifying");
  // Self-serve manage link, handed back by the confirm endpoint once the
  // bid+cs pairing is proven. Null keeps the line off the page.
  const [manageUrl, setManageUrl] = useState<string | null>(null);
  // The widget stashes the booking details right before the Stripe redirect,
  // because the confirm endpoint only guarantees an ok flag. No stash (new
  // device, privacy mode) just means generic copy. Details are only rendered
  // after verification resolves, so the SSR/client markup stays in sync.
  const [details, setDetails] = useState<StarBookPending>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = sessionStorage.getItem(STARBOOK_PENDING_KEY);
      return raw ? (JSON.parse(raw) as StarBookPending) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!bid || !cs) {
        setStatus("processing");
        return;
      }
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt > 0) {
          await new Promise((r) => setTimeout(r, 2500));
          if (cancelled) return;
        }
        try {
          const res = await fetch(
            `${STARBOOK_API_BASE}/api/public/starbook/confirm?bid=${encodeURIComponent(
              bid
            )}&cs=${encodeURIComponent(cs)}`
          );
          const data = await res.json().catch(() => null);
          if (cancelled) return;
          if (res.ok && data?.ok) {
            // Prefer server-side details if the backend chooses to send them.
            setDetails((d) => ({
              ...d,
              sessionLabel: data.sessionLabel || d.sessionLabel,
              start: data.start || d.start,
              timezone: data.timezone || d.timezone,
            }));
            if (typeof data.manageUrl === "string" && data.manageUrl) {
              setManageUrl(data.manageUrl);
            }
            setStatus("booked");
            return;
          }
        } catch {
          // network hiccup, retry
        }
      }
      if (!cancelled) setStatus("processing");
    })();

    return () => {
      cancelled = true;
    };
  }, [bid, cs]);

  const tz = details.timezone || STARBOOK_DEFAULT_TZ;

  if (status === "verifying") {
    return (
      <section className="bg-white pt-40 pb-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <svg
            className="animate-spin h-10 w-10 text-teal mx-auto mb-6"
            viewBox="0 0 24 24"
          >
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
          <h1 className="font-display text-2xl font-bold text-black mb-2">
            Confirming your reservation...
          </h1>
          <p className="text-gray-500">
            Just a moment while we check with our payment partner.
          </p>
        </div>
      </section>
    );
  }

  if (status === "booked") {
    return (
      <section className="bg-white pt-36 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="check-anim w-24 h-24 bg-teal rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-white"
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
          <h1 className="font-display text-4xl md:text-5xl font-bold text-black mb-4">
            You are booked!
          </h1>
          {details.sessionLabel && (
            <p className="text-xl text-gray-800 font-medium mb-1">
              {details.sessionLabel}
            </p>
          )}
          {details.start && (
            <p className="text-gray-600">
              {fmtDateLong(details.start, tz)} at{" "}
              {fmtTimeOfDay(details.start, tz)}{" "}
              <span className="text-gray-400">Mountain Time</span>
            </p>
          )}
          <p className="text-gray-500 mt-8 max-w-md mx-auto leading-relaxed">
            Watch your phone and inbox for everything you need to know. See you
            soon! Nelli
          </p>
          {manageUrl && (
            <p className="text-sm text-gray-400 mt-4">
              Need a different time?{" "}
              <a href={manageUrl} className="text-teal font-semibold hover:underline">
                Reschedule or cancel
              </a>
            </p>
          )}
          <div className="mt-10">
            <Link href="/" className="text-teal font-semibold hover:underline">
              Back to 3birdsstudio.com
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-36 pb-24">
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="w-24 h-24 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-amber-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-black mb-5">
          Almost there
        </h1>
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4">
          Payment is still processing, we will text you as soon as it confirms.
        </div>
        <p className="text-gray-500 mt-6">
          No need to do anything else. Your time is held.
        </p>
        <p className="text-gray-500 mt-6 text-sm">
          Questions? Call us at{" "}
          <a href={STUDIO_PHONE_TEL} className="text-teal font-semibold">
            {STUDIO_PHONE}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
