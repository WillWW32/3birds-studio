import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarBookConfirmed from "@/components/StarBookConfirmed";

// Stripe checkout success_url target for the native StarBook flow:
//   /book/confirmed?bid=<bookingId>&cs=<code>
// Client-side it verifies with the backend confirm endpoint and shows
// booked / still-processing states. Never indexed: it only makes sense
// arriving from checkout.

export const metadata: Metadata = {
  title: "You're Booked | 3 Birds Studio",
  description: "Your session with 3 Birds Studio is confirmed.",
  robots: { index: false, follow: false },
};

export default function BookingConfirmedPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <section className="bg-white pt-40 pb-32 text-center text-gray-400">
            Checking your reservation...
          </section>
        }
      >
        <StarBookConfirmed />
      </Suspense>
      <Footer />
    </>
  );
}
