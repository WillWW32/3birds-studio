import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelEvent from "@/components/PixelEvent";
import {
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  FACEBOOK_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "You're All Set!",
  description:
    "Your gift certificate has been validated. Book your portrait session with 3 Birds Studio.",
};

export default function ThankYouPage() {
  return (
    <>
      <PixelEvent event="CompleteRegistration" />
      <Header />

      {/* Success Hero */}
      <section className="relative text-white pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/summer-banner.jpg"
          alt="Beautiful portrait photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-teal-dark/80" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="check-anim w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
            You&apos;re All Set!
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto">
            Your gift certificate has been validated. We&apos;ll give you a call
            shortly to help you book the perfect session.
          </p>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-black mb-16">
            What Happens Next
          </h2>
          <div className="space-y-10">
            {[
              {
                num: "1",
                title: "We'll Call You",
                desc: "Expect a call from 3 Birds Studio within the hour (during business hours 9AM-8PM MT). We'll help you pick the perfect session type and date.",
              },
              {
                num: "2",
                title: "Book Your Session",
                desc: "Choose from outdoor portraits at Council Grove State Park (30 min, Tue/Sat) or an indoor Legacy session at our Missoula studio (2 hr, Tue/Wed).",
              },
              {
                num: "3",
                title: "Show Up & Smile",
                desc: "We'll send wardrobe suggestions before your session. Just bring yourself (and your family!) and we'll handle the rest.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-black mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-black mb-3">
            Can&apos;t Wait? Book Now
          </h2>
          <p className="text-gray-500 mb-12">
            Skip the call and book directly. Choose your session type below.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-lg mx-auto">
            <a
              href={CALENDLY_OUTDOOR}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/family-portraits.jpg"
                  alt="Outdoor session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="font-display text-lg font-bold text-black block">
                  Outdoor Session
                </span>
                <span className="text-sm text-gray-400 mt-1 block">
                  30 min | Tue & Sat
                </span>
              </div>
            </a>
            <a
              href={CALENDLY_LEGACY}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/ad-portrait.jpg"
                  alt="Legacy studio session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="font-display text-lg font-bold text-black block">
                  Legacy Studio
                </span>
                <span className="text-sm text-gray-400 mt-1 block">
                  2 hr | Tue & Wed
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-3">
            Questions? We&apos;re here to help.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href={STUDIO_PHONE_TEL}
              className="text-teal font-semibold hover:underline"
            >
              {STUDIO_PHONE}
            </a>
            <span className="text-gray-300">|</span>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal font-semibold hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
