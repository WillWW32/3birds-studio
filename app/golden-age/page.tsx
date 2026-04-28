import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import FacebookEmbed from "@/components/FacebookEmbed";
import Footer from "@/components/Footer";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Golden Age Couples Portrait Collection",
  description:
    "Celebrate your love story with a professional couples portrait collection at 3 Birds Studio in Missoula, Montana. Limited complimentary sessions available.",
  alternates: { canonical: "/golden-age" },
  openGraph: {
    url: "/golden-age",
    images: [
      {
        url: "/images/new-golden-age/carmeljim001.jpg",
        width: 1200,
        height: 630,
        alt: "Golden Age Couples portrait collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/new-golden-age/carmeljim001.jpg"],
  },
};

const campaign = DEALERSHIPS.goldenAge;

// Responsive design notes:
// - Audience is 45+, so we bump base font sizes on md+ for readability.
// - Each section sets its own max-width wrapper instead of a single page-
//   level constraint, so text columns stay readable while image grids
//   spread to use the full laptop width.
// - On desktop, the hero text + form sit in a 2-column layout with the
//   main portrait on the right (single visual unit above the fold).

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
          className="h-20 md:h-24 w-auto"
          priority
        />
      </div>

      {/* Hero — text + form on left, portrait on right (desktop) */}
      <section className="max-w-md md:max-w-5xl mx-auto px-6">
        {/* Deadline ribbon spans the section on every breakpoint */}
        <div className="mb-6 md:mb-10 rounded-md bg-black text-white text-center px-4 py-3 md:py-4">
          <p className="font-semibold text-xs md:text-sm uppercase tracking-[0.15em]">
            Reservations close May 30
          </p>
          <p className="text-[11px] md:text-sm text-white/70 mt-1">
            Schedule your session any date in the next 6 months
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:items-center">
          {/* Left column: copy + form */}
          <div>
            <div className="text-center md:text-left mb-8">
              <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-400 mb-3">
                Golden Age Couples
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-black mb-2 leading-tight">
                Your Love Story
                <br />
                Deserves a Portrait
              </h1>
              <p className="font-display text-2xl md:text-3xl font-bold text-gold mb-4">
                Complimentary $1,500
                <br />
                Portrait Collection
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                You have spent a lifetime building something beautiful together.
                Let us capture it.{" "}
                <strong className="text-black">
                  Reserve your complimentary collection by May 30.
                </strong>{" "}
                Schedule your session any date that works in the next 6 months.
              </p>
            </div>

            <LeadForm
              campaign={campaign.campaign}
              source={campaign.source}
              buttonText="Claim Our Collection"
            />
          </div>

          {/* Right column on desktop, below form on mobile: hero portrait */}
          <div className="order-first md:order-last">
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/new-golden-age/carmeljim001.jpg"
                alt="Golden Age couples portrait by 3 Birds Studio"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Section — narrower for comfortable reading */}
      <section className="max-w-md md:max-w-2xl mx-auto px-6 mt-16 md:mt-24 text-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-black mb-6">
          Why Golden Age Portraits?
        </h2>
        <div className="space-y-4 md:space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
          <p>
            After decades together, you have stories written in every glance.
            A professional portrait collection captures the connection that
            only time can build.
          </p>
          <p>
            Your collection includes professional direction from Jesse &amp; Nelli,
            full retouching, and a 14&quot; fine art portrait.
          </p>
        </div>
      </section>

      {/* Choose Your Setting */}
      <section className="max-w-md md:max-w-3xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-black text-center mb-8">
          Choose Your Setting
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-8">
          <div>
            <div className="relative w-full aspect-[3/4] rounded-md md:rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/family-portraits.jpg"
                alt="Outdoor portrait session at Council Grove State Park"
                fill
                sizes="(max-width: 768px) 50vw, 360px"
                className="object-cover"
              />
            </div>
            <p className="text-xs md:text-base uppercase tracking-wider text-black font-semibold text-center">
              Outdoor
            </p>
            <p className="text-[11px] md:text-sm text-gray-500 text-center leading-snug mt-1">
              Council Grove State Park
              <br />
              30 minutes · Tue &amp; Sat
            </p>
          </div>
          <div>
            <div className="relative w-full aspect-[3/4] rounded-md md:rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Legacy studio portrait session in Missoula"
                fill
                sizes="(max-width: 768px) 50vw, 360px"
                className="object-cover"
              />
            </div>
            <p className="text-xs md:text-base uppercase tracking-wider text-black font-semibold text-center">
              Legacy Studio
            </p>
            <p className="text-[11px] md:text-sm text-gray-500 text-center leading-snug mt-1">
              Missoula · 6850 Mullan Way
              <br />2 hours · Tue &amp; Wed
            </p>
          </div>
        </div>
      </section>

      {/* Recent Sessions — wider grid, 3 cols on desktop */}
      <section className="max-w-md md:max-w-5xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-black text-center mb-8">
          Recent Sessions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {[
            "paoli001.jpg",
            "dewey035.jpg",
            "patch001.jpg",
            "selma+al016b.jpg",
            "level025.jpg",
            "trenary001.jpg",
          ].map((file, i) => (
            <div
              key={file}
              className="relative w-full aspect-square overflow-hidden rounded-md md:rounded-lg"
            >
              <Image
                src={`/images/new-golden-age/${file}`}
                alt={`Recent Golden Age couples portrait ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-md md:max-w-2xl mx-auto px-6 mt-16 md:mt-24">
        <div className="bg-gray-50 rounded-xl p-6 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo-black.png"
              alt="3 Birds Studio"
              width={48}
              height={56}
              className="h-12 md:h-14 w-auto"
            />
          </div>
          <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-3">
            Trusted by Missoula families for 13+ years
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10 text-sm md:text-lg font-medium text-black">
            <span>4.9 Google</span>
            <span>15K+ Facebook</span>
            <span>1000+ sessions</span>
          </div>
        </div>
      </section>

      {/* Facebook Embed */}
      <section className="max-w-md md:max-w-2xl mx-auto px-6 mt-16 md:mt-24 flex justify-center">
        <FacebookEmbed />
      </section>

      <div className="pb-16 md:pb-24" />
      <Footer />
    </div>
  );
}
