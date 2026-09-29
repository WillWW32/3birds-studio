"use client";

import { useSearchParams } from "next/navigation";

/**
 * Thank-you headline that tells the truth about the certificate (9/29):
 * a code or a lookup match reads "validated"; a no-code registrant we could
 * not find is told we will match it at the session. Either way the calendar
 * is right below.
 */
export default function CertificateHeadline() {
  const cert = useSearchParams().get("cert");
  const [title, sub] =
    cert === "found"
      ? ["We Found Your Gift Certificate!", "It is on file and ready to use."]
      : cert === "pending"
      ? ["You're Registered!", "We'll match your certificate when you arrive. Pick your date below."]
      : ["Thank You for Registering Your Gift Certificate!", "It is now validated and ready to use."];
  return <HeadlineText title={title} sub={sub} />;
}

export function HeadlineText({ title, sub }: { title: string; sub: string }) {
  return (
    <>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-black mb-4 leading-tight">{title}</h1>
      <p className="text-xl md:text-2xl text-gray-700 italic">{sub}</p>
    </>
  );
}
