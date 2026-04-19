import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import FacebookEmbed from "@/components/FacebookEmbed";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Lithia Toyota",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
  alternates: { canonical: "/lithia" },
  openGraph: {
    url: "/lithia",
    images: [
      {
        url: "/images/hero-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Lithia Toyota gift certificate portrait session - 3 Birds Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero-portrait.jpg"],
  },
};

const dealer = DEALERSHIPS.lithia;

export default function LithiaPage() {
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

      {/* Congratulations + Form */}
      <div className="max-w-md mx-auto px-6">
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
        />

        {/* Gold Flier */}
        <div className="mt-10">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/hero-portrait.jpg"
              alt="Professional portrait photography"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Facebook Social Proof */}
        <div className="mt-10 flex justify-center">
          <FacebookEmbed />
        </div>
      </div>

      <div className="pb-16" />
    </div>
  );
}
