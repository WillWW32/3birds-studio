import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  DENISE_PHONE,
  DENISE_PHONE_TEL,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Talk to Denise",
  description:
    "Call Denise, our studio assistant at 3 Birds Studio. She can help you book sessions, answer questions, and get you set up.",
};

export default function CallPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/images/about-jesse-nelli.jpg"
          alt="3 Birds Studio team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/70" />

        <div className="relative max-w-3xl mx-auto px-6 text-center pt-24 text-white">
          {/* Phone icon */}
          <div className="w-24 h-24 bg-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>

          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-3">
            Studio Assistant
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Talk to Denise
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Denise is our studio assistant. She can help you choose the right
            session, answer questions about gift certificates, or get you booked
            right now.
          </p>

          <a
            href={DENISE_PHONE_TEL}
            className="inline-flex items-center gap-3 px-10 py-5 bg-teal text-white rounded-full text-xl font-bold hover:bg-teal-dark transition-all shadow-2xl hover:-translate-y-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call {DENISE_PHONE}
          </a>

          <p className="text-gray-400 text-sm mt-6">
            Available during business hours. After hours, leave a message and
            Denise will call you back.
          </p>
        </div>
      </section>

      {/* What Denise Helps With */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-16">
            How Denise Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Book Sessions
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Find the perfect date and time for your portrait session.
                Outdoor or studio.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Gift Certificates
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Questions about your gift certificate? Denise can walk you
                through everything.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Session Prep
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Wardrobe advice, location details, what to expect, and how to
                prepare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alt Contact */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-4">
            You can also reach the studio directly:
          </p>
          <a
            href={STUDIO_PHONE_TEL}
            className="text-teal font-semibold text-lg hover:underline"
          >
            {STUDIO_PHONE}
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
