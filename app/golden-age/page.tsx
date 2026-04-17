import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import FacebookEmbed from "@/components/FacebookEmbed";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Golden Age Couples Portrait Collection",
  description:
    "Celebrate your love story with a professional couples portrait collection at 3 Birds Studio in Missoula, Montana. Limited complimentary sessions available.",
};

const campaign = DEALERSHIPS.goldenAge;

export default function GoldenAgePage() {
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

      {/* Hero Message */}
      <div className="max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
            Golden Age Couples
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2 leading-tight">
            Your Love Story
            <br />
            Deserves a Portrait
          </h1>
          <p className="font-display text-2xl md:text-3xl font-bold text-gold mb-4">
            Complimentary $1,500
            <br />
            Portrait Collection
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            You have spent a lifetime building something beautiful together.
            Let us capture it. Register below to claim your complimentary
            portrait collection.
          </p>
        </div>

        <LeadForm
          campaign={campaign.campaign}
          source={campaign.source}
          buttonText="Claim Our Collection"
        />

        {/* Portrait Image */}
        <div className="mt-10">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/golden-age-hero.jpg"
              alt="Golden age couples portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Why Section */}
        <div className="mt-10 text-center">
          <h2 className="font-display text-xl font-bold text-navy mb-4">
            Why Golden Age Portraits?
          </h2>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>
              After decades together, you have stories written in every glance.
              A professional portrait collection captures the connection that
              only time can build.
            </p>
            <p>
              Your collection includes professional direction from Jesse & Nelli,
              full retouching, and a 14&quot; fine art print. Choose outdoor at
              Council Grove State Park or our Legacy studio.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-navy text-center mb-4">
            Recent Sessions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="relative w-full aspect-square overflow-hidden rounded-md"
              >
                <Image
                  src={`/images/golden-age-${n}.jpg`}
                  alt={`Golden age couples portrait ${n}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/logo-black.png"
              alt="3 Birds Studio"
              width={48}
              height={56}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
            Trusted by Missoula families for 13+ years
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-navy">
            <span>4.9 Google</span>
            <span>15K+ Facebook</span>
            <span>1000+ sessions</span>
          </div>
        </div>

        {/* Facebook Embed */}
        <div className="mt-10 flex justify-center">
          <FacebookEmbed />
        </div>
      </div>

      <div className="pb-16" />
    </div>
  );
}
