import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Enter to Win a $3,000 Portrait Session",
  description:
    "Enter to win a $3,000 Legacy portrait session with artwork for your home. Ten runner-up prizes ($1,500 each). Entries close May 10, 2026. No purchase required.",
  alternates: { canonical: "/win" },
  // og:image and twitter:image are auto-generated from
  // app/win/opengraph-image.tsx (1200x630 ImageResponse with the brand
  // hero design). Next.js inserts the meta tags automatically.
  openGraph: {
    url: "/win",
  },
};

export default function WinPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative text-white pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/summer-banner.jpg"
          alt="3 Birds Studio portrait photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Mother&apos;s Day Contest · Entries close May 10, 2026
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            Win a <span className="text-gold">$3,000</span>
            <br />
            Portrait Session
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            One family will be selected to receive a{" "}
            <strong className="text-white">
              FREE portrait session and a Signature Wall Portrait (a $3,000 value)
            </strong>
            . Ten runner-up prizes at $1,500 each.
          </p>
          <a
            href="#enter"
            className="inline-block px-8 py-4 bg-gold text-navy rounded-full text-lg font-bold hover:brightness-110 transition-all shadow-xl"
          >
            Enter to Win
          </a>
        </div>
      </section>

      {/* Prize Details */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-4">
            What You Could Win
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
            To celebrate Mother&apos;s Day, one family wins the grand prize plus
            ten runners-up each receive a $1,500 portrait collection.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="Legacy Fine Portraits session"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                Grand Prize · $3,000 Value
              </p>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Legacy Session + Signature Wall Portrait
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A full Legacy Fine Portraits session with Jesse &amp; Nelli,
                plus a signature wall portrait finished on French cotton with
                Italian gold-leafed framing.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/family-portraits.jpg"
                  alt="Runner-up portrait collection"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                10 Runner-Up Prizes · $1,500 Each
              </p>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Portrait Collection
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ten families will each receive a complimentary session,
                professional editing, and a 14&quot; fine art print.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/print-product.jpg"
                  alt="Museum-quality archival prints"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                Every Winner Receives
              </p>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Museum-Grade Art
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                All prints are museum-grade giclee on archival paper, guided
                direction from Jesse &amp; Nelli, and full retouching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section id="enter" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-3">
            Entry Form
          </h2>
          <p className="text-center text-gray-500 mb-3">
            Entries close at noon on <strong>May 10, 2026</strong>. Late entries
            will not be accepted.
          </p>
          <p className="text-center text-xs uppercase tracking-wider text-gray-400 mb-8">
            No Purchase Required
          </p>
          <div className="bg-gray-50 rounded-2xl p-8">
            <LeadForm
              campaign="giveaway-entry"
              source="3birds-giveaway-landing"
              buttonText="Enter to Win!"
              successRedirect="/entered"
              includeAddress
              consentLabel={
                <>
                  By checking this box, I agree to the{" "}
                  <a href="/terms-and-conditions" className="underline text-teal">
                    contest terms and conditions
                  </a>{" "}
                  and consent to 3 Birds Studio contacting me about my entry
                  and related promotions by email, phone, or text. Msg &amp;
                  data rates may apply. Reply STOP to opt out. View our{" "}
                  <a href="/privacy" className="underline text-teal">Privacy Policy</a>.
                </>
              }
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            Winners will be notified by FedEx or certified mail (no P.O. Boxes).
            Only major prize winners and runners-up will be notified. Winners
            can schedule their session for any open date in the next 12 months.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-navy mb-4">
            About 3 Birds Studio
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Jesse &amp; Nelli have been capturing family portraits in Missoula,
            Montana for over 13 years. From outdoor sessions at Council Grove
            State Park to timeless Legacy portraits in their studio, every
            session is a personal, guided experience.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <span>4.9 Google</span>
            <span>15K+ Facebook</span>
            <span>1000+ sessions</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
