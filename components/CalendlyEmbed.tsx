"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { STARBOOK_REGISTRANT_KEY } from "@/lib/starbook";

// Branded inline Calendly embed. The visitor books without ever leaving
// 3birdsstudio.com: today the engine underneath is Calendly (scheduling +
// the reservation fee), and when the internal StarBook booking page ships
// we swap what THIS component renders, so every link that points at
// /book/* cuts over at once with no downstream changes.
//
// Prefill + attribution: name/email query params prefill the Calendly form
// (so leads arriving from our own thank-you flows type less), and utm_*
// params pass through so the booking webhook keeps its attribution.
export default function CalendlyEmbed({ url }: { url: string }) {
  const searchParams = useSearchParams();
  // Someone who just registered on the landing page already told us their
  // name and email; LeadForm leaves them in sessionStorage (same tab, never
  // in the URL). Prefilling saves retyping AND keeps the booking email the
  // same as the registration email, so the booking matches the right lead.
  const [registrant, setRegistrant] = useState<{ name?: string; email?: string }>({});
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STARBOOK_REGISTRANT_KEY);
      if (raw) {
        const r = JSON.parse(raw) as { name?: string; email?: string };
        setRegistrant({ name: r.name || undefined, email: r.email || undefined });
      }
    } catch {
      // privacy mode or bad JSON: the form just starts empty
    }
  }, []);

  const embedUrl = useMemo(() => {
    const u = new URL(url);
    u.searchParams.set("hide_gdpr_banner", "1");
    // 3 Birds teal for the widget accent
    u.searchParams.set("primary_color", "0d9488");
    const name = searchParams.get("name") || registrant.name;
    const email = searchParams.get("email") || registrant.email;
    if (name) u.searchParams.set("name", name);
    if (email) u.searchParams.set("email", email);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = searchParams.get(key);
      if (v) u.searchParams.set(key, v);
    }
    // URLSearchParams writes spaces as "+", and Calendly's widget re-encodes
    // that to %2B, so "Jane Doe" arrived as "Jane+Doe". Any literal "+" in a
    // value is already %2B here, so every remaining "+" is a space.
    return u.toString().replace(/\+/g, "%20");
  }, [url, searchParams, registrant]);

  return (
    <>
      <div
        className="calendly-inline-widget w-full"
        data-url={embedUrl}
        style={{ minWidth: "320px", height: "760px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
