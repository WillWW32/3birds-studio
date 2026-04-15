import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Honda",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
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

      {/* Hero Image */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-8">
          <Image
            src="/images/hero-portrait.jpg"
            alt="Professional portrait photography"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Congratulations + Form */}
      <div className="max-w-md mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
            {dealer.name}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2 leading-tight">
            Congratulations!
          </h1>
          <p className="font-display text-2xl md:text-3xl font-bold text-gold mb-4">
            You&apos;ve Earned a $1,500
            <br />
            Portrait Session
          </p>
          <p className="text-gray-500 text-sm">
            Register below to validate your gift certificate.
            <br />
            Certificates must be validated within 7 days.
          </p>
        </div>

        <LeadForm
          campaign={dealer.campaign}
          source={dealer.source}
          compact
        />
      </div>
    </div>
  );
}
