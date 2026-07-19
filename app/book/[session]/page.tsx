import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import {
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  CALENDLY_VIEWING,
  CALENDLY_CONSULT,
  CALENDLY_WEDDING,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/constants";

// The branded booking pages. Every link we hand out (thank-you pages, texts,
// emails, agents) points HERE instead of calendly.com, so the visitor books
// on 3birdsstudio.com. Swapping the engine later (StarBook) changes only
// what these pages render, never the links in the wild.
const SESSIONS: Record<
  string,
  { title: string; blurb: string; calendly: string; details: string[] }
> = {
  outdoor: {
    title: "Outdoor Portrait Session",
    blurb:
      "30 minutes among the Ponderosa pines at Council Grove State Park. Relaxed, simple, and connection-focused. Pets welcome.",
    calendly: CALENDLY_OUTDOOR,
    details: ["Tuesdays & Saturdays", "Council Grove State Park", "Rain or shine, free weather reschedule"],
  },
  legacy: {
    title: "Legacy Portrait Studio Session",
    blurb:
      "Fine art portraits at our Mullan Way studio. About an hour start to finish, with your viewing and ordering right after the session.",
    calendly: CALENDLY_LEGACY,
    details: ["At the studio, 6850 Mullan Way", "Snacks while we edit", "Viewing & ordering same visit"],
  },
  viewing: {
    title: "Viewing & Ordering Session",
    blurb:
      "See your portraits presented full screen, pick your favorites, and design the artwork for your home. Bring everyone involved in the decision.",
    calendly: CALENDLY_VIEWING,
    details: ["One hour at the studio", "Cinematic full-screen reveal", "Gift certificates applied here"],
  },
  consult: {
    title: "Free 15 Minute Consultation",
    blurb:
      "A quick call to plan your session, answer questions, and find the right fit. No commitment.",
    calendly: CALENDLY_CONSULT,
    details: ["15 minutes by phone", "Zero pressure", "All your questions answered"],
  },
  wedding: {
    title: "Wedding Photography Consult",
    blurb:
      "Tell us about your day and see if we are the right fit to capture it.",
    calendly: CALENDLY_WEDDING,
    details: ["One hour", "Bring your vision", "Portfolio walkthrough included"],
  },
};

export async function generateStaticParams() {
  return Object.keys(SESSIONS).map((session) => ({ session }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ session: string }>;
}): Promise<Metadata> {
  const { session } = await params;
  const s = SESSIONS[session];
  if (!s) return {};
  return {
    title: `${s.title} | 3 Birds Studio`,
    description: s.blurb,
    alternates: { canonical: `/book/${session}` },
  };
}

export default async function BookSessionPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session } = await params;
  const s = SESSIONS[session];
  if (!s) notFound();

  return (
    <>
      <Header />

      {/* Compact hero */}
      <section className="bg-black text-white pt-28 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            {s.title}
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">{s.blurb}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {s.details.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking embed */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-2 md:px-6">
          <Suspense
            fallback={
              <div className="h-[760px] flex items-center justify-center text-gray-400">
                Loading available times...
              </div>
            }
          >
            <CalendlyEmbed url={s.calendly} />
          </Suspense>
          <p className="text-center text-sm text-gray-500 pb-8">
            Prefer to book by phone? Call us at{" "}
            <a href={STUDIO_PHONE_TEL} className="text-teal font-semibold">
              {STUDIO_PHONE}
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
