"use client";

import { useSearchParams } from "next/navigation";

/**
 * Renders the booking summary Calendly appends to its confirmation redirect
 * ("Pass event details on redirect"): invitee_full_name, event_type_name,
 * event_start_time (ISO 8601 with the invitee's chosen offset). Renders
 * nothing when the params are absent so the page stands on its own.
 */
export default function BookingDetails() {
  const params = useSearchParams();
  const name = params.get("invitee_full_name") || "";
  const eventName = params.get("event_type_name") || "";
  const startRaw = params.get("event_start_time") || "";

  const firstName = name.trim().split(/\s+/)[0] || "";
  const start = startRaw ? new Date(startRaw) : null;
  const startValid = !!start && !Number.isNaN(start.getTime());

  if (!firstName && !eventName && !startValid) return null;

  return (
    <div className="border border-gray-200 rounded-xl bg-gray-50 px-6 py-8 text-center">
      {firstName && (
        <p className="text-xl text-gray-700 mb-2">
          {firstName}, we have you on the calendar.
        </p>
      )}
      {eventName && (
        <p className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
          {eventName}
        </p>
      )}
      {startValid && (
        <p className="text-lg text-gray-700">
          {start.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          at{" "}
          {start.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      )}
    </div>
  );
}
