import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  DENISE_PHONE,
  DENISE_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Your Portrait Session",
  description:
    "Professional portrait photography in Missoula, Montana. Outdoor sessions at Council Grove or Legacy studio sessions. Book today.",
};

export default function AdPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative gradient-hero text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-light/70 mb-4">
            3 Birds Studio | Missoula, Montana
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Professional Portraits
            <br />
            <span className="gold-shimmer">That Last Generations</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            From natural outdoor sessions along the river to timeless Legacy
            fine art in our studio. 13+ years capturing Missoula families.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              className="px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-all shadow-xl shadow-teal/30"
            >
              Book Your Session
            </a>
            <a
              href={DENISE_PHONE_TEL}
              className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Call {DENISE_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Quick Value Props */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "📸", text: "Professional Session" },
              { icon: "🎨", text: "Expert Editing" },
              { icon: "🖼", text: "Fine Art Prints" },
              { icon: "🐕", text: "Pets Welcome" },
            ].map((item) => (
              <div
                key={item.text}
                className="text-center p-4 rounded-2xl bg-cream"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <span className="text-sm font-semibold text-navy">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="book" className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            Choose Your Session
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <a
              href={CALENDLY_OUTDOOR}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-emerald-700 via-teal to-emerald-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-5xl mb-2">🌿</p>
                  <p className="text-xs uppercase tracking-widest opacity-70">
                    Council Grove State Park
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  Outdoor Portraits
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  30 min | Tuesdays & Saturdays | Natural light, river, pines
                </p>
                <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm">
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </a>

            <a
              href={CALENDLY_LEGACY}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-navy flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-5xl mb-2">🎨</p>
                  <p className="text-xs uppercase tracking-widest opacity-70">
                    Missoula Studio
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  Legacy Fine Portraits
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  2 hours | Tuesdays & Wednesdays | Hand-painted backdrops
                </p>
                <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm">
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </a>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">
              Have questions? Talk to our studio assistant Denise.
            </p>
            <Link
              href="/call"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal-dark transition-colors"
            >
              <svg
                className="w-5 h-5"
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
              Talk to Denise
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-10 flex-wrap text-sm">
            <span className="text-gray-500">
              <strong className="text-teal">4.9 ★</strong> Google
            </span>
            <span className="text-gray-500">
              <strong className="text-teal">15K+</strong> Facebook
            </span>
            <span className="text-gray-500">
              <strong className="text-teal">13+</strong> Years
            </span>
            <span className="text-gray-500">
              <strong className="text-teal">1000+</strong> Sessions
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
