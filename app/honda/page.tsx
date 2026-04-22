import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { DEALERSHIPS } from "@/lib/constants";
import { getSwappableImage } from "@/lib/voucher-image";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Honda",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
  alternates: { canonical: "/honda" },
  openGraph: {
    url: "/honda",
    images: [
      {
        url: "/images/voucher-honda.jpg",
        width: 1200,
        height: 900,
        alt: "Honda gift certificate portrait session - 3 Birds Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/voucher-honda.jpg"],
  },
};

// Re-check Vercel Blob every 60s so admin uploads propagate quickly.
export const revalidate = 60;

const dealer = DEALERSHIPS.honda;

export default async function HondaPage() {
  const voucher = await getSwappableImage("voucher-honda");

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

        {/* Sample portraits (the "here's what you get" frames from ClickFunnels) */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="/images/sample-boys-frame.jpg"
              alt="Framed Legacy portrait of two brothers"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src="/images/sample-girls-frame.jpg"
              alt="Framed Legacy portrait of two sisters"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pb-20" />
      <Footer />
    </div>
  );
}
