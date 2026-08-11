import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarBookManage from "@/components/StarBookManage";

// Customer self-serve manage page for native StarBook bookings:
//   /book/manage?bid=<bookingId>&token=<capability token>
// The link only ever arrives inside the (gated) confirmation messages, so
// this page is never linked from navigation and never indexed.

export const metadata: Metadata = {
  title: "Manage Your Booking | 3 Birds Studio",
  description: "Reschedule or cancel your session with 3 Birds Studio.",
  robots: { index: false, follow: false },
};

export default function ManageBookingPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <section className="bg-white pt-40 pb-32 text-center text-gray-400">
            Finding your booking...
          </section>
        }
      >
        <StarBookManage />
      </Suspense>
      <Footer />
    </>
  );
}
