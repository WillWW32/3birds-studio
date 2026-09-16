import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelEvent from "@/components/PixelEvent";
import BookingDetails from "@/components/BookingDetails";
import {
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  FACEBOOK_URL,
} from "@/lib/constants";

// Calendly's post-booking redirect for the Outdoor Portrait Event points at
// this exact path (set in the event type long before the Vercel move, so the
// URL is load-bearing: 404 here was every outdoor booker's confirmation).
// "Pass event details" is on, so Calendly appends invitee_full_name,
// event_type_name, event_start_time, etc. — BookingDetails renders them and
// the page still reads fine when someone arrives with no params at all.
export const metadata: Metadata = {
  title: "You're Booked! | 3 Birds Studio",
  description: "Your portrait session with 3 Birds Studio is confirmed.",
  robots: { index: false, follow: false },
};

export default function ThankYouFrom3BirdsPage() {
  return (
    <div className="serif-page">
      <PixelEvent event="Schedule" />
      <Header />

      {/* Confirmation headline */}
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
            Your Session Is Booked!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 italic">
            Thank you from all of us at 3 Birds Studio.
          </p>
        </div>
      </section>

      {/* Booking details from Calendly's redirect params */}
      <section className="bg-white py-8">
        <div className="max-w-2xl mx-auto px-6">
          <Suspense fallback={null}>
            <BookingDetails />
          </Suspense>

          <div className="space-y-6 text-center mt-10">
            <p className="text-xl text-gray-700 leading-relaxed">
              A confirmation email is on its way to you now with your session
              details and a link to reschedule if your plans change.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Before your session, we will guide you through the preparation
              process and answer any questions you may have.
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
            with any questions.
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
