import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative text-white pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/hero-portrait.jpg"
          alt="Professional portrait photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
            3 Birds Studio | Missoula, Montana
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Professional Portraits
            <br />
            <span className="text-gold">That Last Generations</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            From natural outdoor sessions along the river to timeless Legacy
            fine art in our studio. 13+ years capturing Missoula families.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              className="px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-all shadow-xl"
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

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-display text-base font-bold text-black mb-1">Professional Session</h3>
              <p className="text-sm text-gray-400">Guided by Jesse & Nelli</p>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-black mb-1">Expert Editing</h3>
              <p className="text-sm text-gray-400">Every image retouched</p>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-black mb-1">Fine Art Prints</h3>
              <p className="text-sm text-gray-400">Museum-grade quality</p>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-black mb-1">Pets Welcome</h3>
              <p className="text-sm text-gray-400">Bring the whole family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="book" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-black mb-16">
            Choose Your Session
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <a
              href={CALENDLY_OUTDOOR}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/family-portraits.jpg"
                  alt="Outdoor portraits at Council Grove"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-black mb-2">
                  Outdoor Portraits
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  30 min | Tuesdays & Saturdays | Natural light, river, pines
                </p>
                <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm">
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>

            <a
              href={CALENDLY_LEGACY}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/ad-portrait.jpg"
                  alt="Legacy studio portrait"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-black mb-2">
                  Legacy Fine Portraits
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  2 hours | Tuesdays & Wednesdays | Hand-painted backdrops
                </p>
                <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm">
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          </div>

          <div className="text-center mt-14">
            <p className="text-gray-500 mb-4">
              Have questions? Talk to our studio assistant Denise.
            </p>
            <Link
              href="/call"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal-dark transition-colors"
            >
              Talk to Denise
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-12 flex-wrap text-sm text-center">
            <div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-400 ml-1">Google</span>
            </div>
            <div>
              <span className="font-bold text-black">15K+</span>
              <span className="text-gray-400 ml-1">Facebook</span>
            </div>
            <div>
              <span className="font-bold text-black">13+</span>
              <span className="text-gray-400 ml-1">Years</span>
            </div>
            <div>
              <span className="font-bold text-black">1000+</span>
              <span className="text-gray-400 ml-1">Sessions</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
