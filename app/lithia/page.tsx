import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { DEALERSHIPS } from "@/lib/constants";
import { getSwappableImage } from "@/lib/voucher-image";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Lithia Toyota",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
  alternates: { canonical: "/lithia" },
  openGraph: {
    url: "/lithia",
    images: [
      {
        url: "/images/voucher-lithia.jpg",
        width: 1200,
        height: 900,
        alt: "Lithia Toyota gift certificate portrait session - 3 Birds Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/voucher-lithia.jpg"],
  },
};

// Re-check Vercel Blob every 60s so admin uploads propagate quickly.
export const revalidate = 60;

const dealer = DEALERSHIPS.lithia;

export default async function LithiaPage() {
  const voucher = await getSwappableImage("voucher-lithia");

  return (
    <div className="min-h-screen bg-white serif-page">
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
          <h1 className="font-display text-3xl md:text-4xl font-bold text-black mb-3 leading-tight">
            Congrats on Your New Vehicle!
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {dealer.name} has gifted their best clients a beautiful thank you
            gift.
          </p>
        </div>

        {/* Gift Certificate hero (from ClickFunnels, swappable via /admin/images) */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={voucher.src}
            alt="$1,500 gift certificate for a portrait session at 3 Birds Studio"
            width={1200}
            height={900}
            className="w-full h-auto"
            priority
            unoptimized={voucher.fromBlob}
          />
        </div>

        {/* Urgency copy */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-800 italic font-semibold leading-snug mb-2">
            Your $1,500 gift certificate must be validated within 7 days of
            receipt.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Once registered, you can then schedule the session within 6 months.
          </p>
        </div>

        {/* Form header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-black italic">
            Register Your Gift Certificate Below
          </h2>
        </div>

        <LeadForm
          campaign={dealer.campaign}
          source={dealer.source}
          buttonText="Register Certificate"
          certificate
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
