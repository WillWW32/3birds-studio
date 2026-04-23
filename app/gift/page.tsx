import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claim Your Portrait Gift Certificate in Missoula",
  description:
    "Register your $1,500 3 Birds Studio portrait gift certificate from Denny Menholt University Honda or Lithia Toyota of Missoula. Validate within 7 days.",
  alternates: { canonical: "/gift" },
  robots: { index: true, follow: true },
};

// Both gift-cert paths redeem for a Legacy Fine Portraits indoor studio
// session, so both cards use framed-indoor-portrait imagery (the actual
// deliverable) rather than outdoor shots.
const CARDS = [
  {
    dealership: DEALERSHIPS.honda,
    href: "/honda",
    image: "/images/sample-boys-frame.jpg",
  },
  {
    dealership: DEALERSHIPS.lithia,
    href: "/lithia",
    image: "/images/sample-girls-frame.jpg",
  },
];

export default function GiftHubPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative text-white pt-28 pb-16 overflow-hidden">
        <Image
          src="/images/summer-banner.jpg"
          alt="3 Birds Studio portrait photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Dealership Gift Certificate
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Claim Your{" "}
            <span className="text-gold">$1,500 Portrait Session</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Pick your dealership below to register your gift certificate.
            Your session is fully covered. You only need to validate within
            7 days.
          </p>
        </div>
      </section>

      {/* Dealership picker */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-10">
            Which dealership did you receive your gift certificate from?
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {CARDS.map((card) => (
              <Link
                key={card.dealership.campaign}
                href={card.href}
                className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-teal transition-all"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.dealership.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">
                    Gift Certificate
                  </p>
                  <h2 className="font-display text-xl font-bold text-navy mb-2">
                    {card.dealership.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    Register your ${card.dealership.shortName} gift
                    certificate and book your session.
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-teal font-semibold">
                    Register now
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-10">
            Didn&apos;t get your certificate from Honda or Lithia? Call us at{" "}
            <a href="tel:+14062393442" className="text-teal underline">
              406-239-3442
            </a>{" "}
            and we&apos;ll point you to the right page.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-navy mb-12">
            What your gift certificate covers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-gold mb-2">
                $1,500
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Value of your portrait collection, fully covered by your
                dealership.
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-gold mb-2">
                2 hrs
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Legacy studio session at our Mullan Way studio. Guided,
                directed, and retouched.
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-gold mb-2">
                100%
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional editing and a 14-inch museum-grade fine art
                print included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
