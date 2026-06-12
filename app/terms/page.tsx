import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | 3 Birds Studio",
  description:
    "Terms of service for 3 Birds Studio, including booking terms, the reservation fee, and SMS messaging terms.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-neutral-500 mb-10">
          3 Birds Studio, LLP &bull; Missoula, Montana &bull; Last updated June 12, 2026
        </p>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-900">Bookings and reservation fee</h2>
            <p>
              Sessions are reserved with a $100 reservation fee that holds your date and time.
              The fee is fully refundable as long as you do not cancel the day of your session.
              Day-of cancellations forfeit the reservation fee. Gift certificates must be
              validated within 7 days of issue and sessions scheduled within 6 months.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-900">SMS messaging terms</h2>
            <p>
              By providing your phone number when booking a session, submitting a form on our
              website, or registering for a promotion, you consent to receive booking-related
              text messages from 3 Birds Studio: confirmations, appointment reminders, review
              requests, and occasional re-engagement messages. Consent is not a condition of
              purchase. Message frequency varies. Message and data rates may apply. Reply STOP
              to cancel at any time and HELP for help, or call 406-239-3442. Carriers are not
              liable for delayed or undelivered messages.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-900">Photography and image use</h2>
            <p>
              All photographs are the creative work of 3 Birds Studio. Personal-use rights for
              purchased images are included with your order. We only use client images in studio
              marketing with written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-900">Contact</h2>
            <p>
              Questions about these terms: 3 Birds Studio, LLP &bull; 6850 Mullan Way, Missoula,
              MT 59808 &bull; 406-239-3442 &bull; hello@3birdsstudio.com
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
