"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

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

  const embedUrl = useMemo(() => {
    const u = new URL(url);
    u.searchParams.set("hide_gdpr_banner", "1");
    // 3 Birds teal for the widget accent
    u.searchParams.set("primary_color", "0d9488");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    if (name) u.searchParams.set("name", name);
    if (email) u.searchParams.set("email", email);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = searchParams.get(key);
      if (v) u.searchParams.set(key, v);
    }
    return u.toString();
  }, [url, searchParams]);

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
