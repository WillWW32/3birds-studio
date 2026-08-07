import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelEvent from "@/components/PixelEvent";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import IndoorModal from "@/components/IndoorModal";
import {
  CALENDLY_OUTDOOR,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  FACEBOOK_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "You're All Set!",
  description:
    "Your gift certificate has been validated. Book your portrait session with 3 Birds Studio.",
};

// Registration lands HERE, and the date gets picked HERE (William 8/6).
// No "we'll call you within the hour" promises: the outdoor calendar loads
// at the top, the indoor Legacy studio is one button below it, and the copy
// carries the original funnel's voice.
export default function ThankYouPage() {
  return (
    <div className="serif-page">
      <PixelEvent event="CompleteRegistration" />
      <Header />

      {/* Validated + straight into date selection */}
      <section className="bg-white pt-28 pb-4">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="check-anim w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="font-display text-3xl md:text-5xl font-bold text-black mb-4 leading-tight">
            Thank You for Registering Your Gift Certificate!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 italic">
            It is now validated and ready to use.
          </p>
        </div>
      </section>

      {/* Outdoor calendar, current month, front and center */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-2 md:px-6">
          <div className="text-center mb-2 px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
              Please take a moment to select your preferred appointment date:
            </h2>
            <p className="text-lg text-gray-600">
              Outdoor Portrait Session &middot; Council Grove State Park
              &middot; 30 minutes &middot; Tuesdays &amp; Saturdays
            </p>
          </div>

          <Suspense
            fallback={
              <div className="h-[760px] flex items-center justify-center text-gray-400">
                Loading available times...
              </div>
            }
          >
            <CalendlyEmbed url={CALENDLY_OUTDOOR} />
          </Suspense>

          <div className="text-center mt-2 mb-10">
            <IndoorModal />
          </div>

          <div className="max-w-2xl mx-auto px-4 space-y-6 text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              Our appointments fill up quickly, so we recommend booking as soon
              as possible to best accommodate your schedule.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Once confirmed, we will guide you through the preparation process
              and answer any additional questions you may have.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              We look forward to creating something beautiful for you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-700 mb-3">
            Feel free to call our studio at{" "}
            <a
              href={STUDIO_PHONE_TEL}
              className="text-teal font-semibold hover:underline"
            >
              {STUDIO_PHONE}
            </a>{" "}
            with any questions or to check for recent openings.
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal font-semibold hover:underline"
          >
            Facebook
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
