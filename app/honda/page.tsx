import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Honda",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
  alternates: { canonical: "/honda" },
  openGraph: {
    url: "/honda",
    images: [
      {
        url: "/images/hero-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Honda gift certificate portrait session - 3 Birds Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero-portrait.jpg"],
  },
};

const dealer = DEALERSHIPS.honda;

export default function HondaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="pt-8 pb-4 flex justify-center">
        <Image
          src="/images/logo-black.png"
          alt="3 Birds Studio"
          width={80}
          height={94}
          className="h-20 w-auto"
          priority
        />
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
            {dealer.name}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3 leading-tight">
            Congrats on Your New Vehicle
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {dealer.name} has gifted their best clients a beautiful thank you
            gift.
          </p>
        </div>

        {/* Gift Certificate voucher */}
        <div className="mb-8 mx-auto max-w-sm bg-gradient-to-br from-gold via-amber-500 to-amber-600 rounded-2xl p-8 shadow-2xl text-center ring-1 ring-amber-300/40">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80 mb-3">
            Gift Certificate
          </p>
          <p className="font-display text-6xl font-bold text-white mb-1 leading-none">
            $1,500
          </p>
          <p className="font-display text-lg text-white/95 mb-5">
            Portrait Session
          </p>
          <p className="text-[10px] uppercase tracking-wider text-white/70">
            Courtesy of {dealer.name}
          </p>
        </div>

        {/* Urgency copy */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm leading-relaxed">
            Your $1,500 gift certificate must be validated within 7 days of
            receipt. Once registered, you can schedule your session within 6
            months.
          </p>
        </div>

        {/* Form header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-bold text-navy">
            Register Your Gift Certificate
          </h2>
        </div>

        <LeadForm
          campaign={dealer.campaign}
          source={dealer.source}
          buttonText="Register Certificate"
        />

        {/* Trust line */}
        <p className="text-center text-xs text-gray-400 mt-6">
          We will not spam you or share your info.
        </p>
      </div>

      <div className="pb-20" />
      <Footer />
    </div>
  );
}
