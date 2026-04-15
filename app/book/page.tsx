import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book your portrait session at 3 Birds Studio. Outdoor at Council Grove State Park or Legacy studio in Missoula.",
};

export default function BookPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative gradient-teal text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Book Your Session
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Choose your experience below. We&apos;ll handle the rest.
          </p>
        </div>
      </section>

      {/* Session Options */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Outdoor */}
            <div className="bg-cream rounded-3xl p-8">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="font-display text-2xl font-bold text-navy mb-2">
                Outdoor Portraits
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                30 minutes at Council Grove State Park. Towering Ponderosa
                pines, the Clark Fork River, and gorgeous natural light. Rain or
                shine. Pets welcome.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Tuesdays & Saturdays
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Families of all sizes
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Free reschedule for weather
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Wardrobe guidance included
                </li>
              </ul>
              <a
                href={CALENDLY_OUTDOOR}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-4 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
              >
                Book Outdoor Session
              </a>
            </div>

            {/* Legacy */}
            <div className="bg-navy rounded-3xl p-8 text-white">
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Legacy Fine Portraits
              </h2>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                2 hours in our Missoula studio. Inspired by DaVinci and
                Rembrandt. Hand-painted backdrops, master lighting, finished on
                French cotton with Italian gold-leafed frames.
              </p>
              <ul className="text-sm text-gray-300 space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Tuesdays & Wednesdays
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  6850 Mullan Way, Missoula
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Wardrobe consultation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Heirloom-quality fine art
                </li>
              </ul>
              <a
                href={CALENDLY_LEGACY}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-4 bg-gold text-navy rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-gold/20"
              >
                Book Legacy Session
              </a>
            </div>
          </div>

          {/* Help */}
          <div className="text-center mt-16 p-8 bg-cream rounded-3xl">
            <h3 className="font-display text-xl font-bold text-navy mb-2">
              Not sure which session is right for you?
            </h3>
            <p className="text-gray-500 mb-6">
              Talk to Denise, our studio assistant. She can help you choose and
              answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/call"
                className="px-6 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal-dark transition-colors"
              >
                Talk to Denise
              </Link>
              <a
                href={STUDIO_PHONE_TEL}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-white transition-colors"
              >
                Call {STUDIO_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
