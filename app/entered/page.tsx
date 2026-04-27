import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelEvent from "@/components/PixelEvent";
import { FACEBOOK_URL, STUDIO_PHONE, STUDIO_PHONE_TEL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "You're Entered!",
  description:
    "Your entry to the 3 Birds Studio $3,000 Portrait Collection giveaway has been received. Winners will be notified after the drawing on May 10, 2026.",
  alternates: { canonical: "/entered" },
  robots: { index: false, follow: true },
};

export default function EnteredPage() {
  return (
    <>
      <PixelEvent event="CompleteRegistration" />
      <Header />

      {/* Hero */}
      <section className="relative text-white pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/summer-banner.jpg"
          alt="3 Birds Studio portrait photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-teal-dark/85" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
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
            You&apos;re Entered!
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto">
            Your entry has been received. Good luck!
          </p>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-black mb-16">
            What Happens Next
          </h2>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-black mb-1">
                  Entries Close May 10
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Entries close at noon on Mother&apos;s Day 2026. One grand
                  prize winner and ten runners-up will be selected after the
                  contest closes.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-black mb-1">
                  Winners Get Notified
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Winners will be contacted by FedEx or certified mail at the
                  address you provided. Only major prize and runner-up winners
                  will be notified — please don&apos;t worry if you don&apos;t
                  hear from us.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-black mb-1">
                  Book Any Open Date
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Winners can schedule their session for any open date in the
                  next 12 months. Families, couples, seniors, kids, and pets
                  all welcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow / Contact */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-black mb-3">
            Stay in the loop
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Follow us on Facebook — we&apos;ll post the winner announcement and
            share behind-the-scenes content from every session.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal-dark transition-colors"
            >
              Follow on Facebook
            </a>
            <a
              href={STUDIO_PHONE_TEL}
              className="text-teal font-semibold hover:underline"
            >
              {STUDIO_PHONE}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
