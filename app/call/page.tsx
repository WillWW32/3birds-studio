import type { Metadata } from "next";
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
      <section className="relative min-h-[80vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-teal/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center pt-24">
          {/* Denise avatar */}
          <div className="w-28 h-28 bg-gradient-to-br from-teal to-teal-dark rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-teal/30">
            <svg
              className="w-14 h-14 text-white"
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

          <p className="text-teal-light/70 text-sm uppercase tracking-[0.2em] mb-3">
            Studio Assistant
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Talk to Denise
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Denise is our studio assistant. She can help you choose the right
            session, answer questions about gift certificates, or get you booked
            right now.
          </p>

          {/* CTA Phone Button */}
          <a
            href={DENISE_PHONE_TEL}
            className="inline-flex items-center gap-3 px-10 py-5 bg-teal text-white rounded-full text-xl font-bold hover:bg-teal-dark transition-all shadow-2xl shadow-teal/40 hover:-translate-y-1"
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-12">
            How Denise Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📅",
                title: "Book Sessions",
                desc: "Find the perfect date and time for your portrait session. Outdoor or studio.",
              },
              {
                icon: "🎁",
                title: "Gift Certificates",
                desc: "Questions about your gift certificate? Denise can walk you through everything.",
              },
              {
                icon: "👗",
                title: "Session Prep",
                desc: "Wardrobe advice, location details, what to expect, and how to prepare.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 bg-cream rounded-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alt Contact */}
      <section className="py-16 bg-cream">
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
