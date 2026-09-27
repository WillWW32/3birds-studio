// Shared bits for the native StarBook booking flow. Used by
// components/StarBookWidget.tsx (the booking widget on /book/[session])
// and components/StarBookConfirmed.tsx (the Stripe success page).
//
// The widget ships DARK behind a flag: see app/book/[session]/page.tsx.

export const STARBOOK_DEFAULT_TZ = "America/Denver";

// sessionStorage key. The widget stashes the pending booking details here
// right before redirecting to Stripe checkout, so /book/confirmed can show
// the session label + date/time even though the confirm endpoint only
// returns an ok flag.
export const STARBOOK_PENDING_KEY = "3birds_starbook_pending";

export interface StarBookPending {
  bookingId?: string;
  sessionLabel?: string;
  start?: string; // ISO datetime of the held slot
  timezone?: string;
  feeCents?: number;
}

/** "$100" for whole dollars, "$99.50" otherwise. Never hardcode the fee. */
export function fmtFee(feeCents: number): string {
  const dollars = feeCents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

/** "Tuesday, July 21" in the studio timezone. */
export function fmtDateLong(iso: string, tz: string = STARBOOK_DEFAULT_TZ): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** "2:30 PM" in the studio timezone. */
export function fmtTimeOfDay(iso: string, tz: string = STARBOOK_DEFAULT_TZ): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
  });
}

// sessionStorage key. A gift certificate registration (LeadForm) stashes
// what the family already told us, so the booking form on /thankyou can
// fill it in instead of asking twice (William 9/27): name, email, phone,
// party size, and the certificate code. Same tab, same origin only.
export const STARBOOK_REGISTRANT_KEY = "3birds_registrant";

export interface StarBookRegistrant {
  name?: string;
  email?: string;
  phone?: string;
  /** The registration's people_count value: "1" (Just me) through "5" (5+). */
  people?: string;
  /** The gift certificate code. */
  code?: string;
}

/** One of the studio's booking questions, as the slots endpoint sends it. */
export interface StarBookQuestion {
  name: string;
  type: "string" | "text" | "single_select" | "multi_select";
  required: boolean;
  options: string[];
}
