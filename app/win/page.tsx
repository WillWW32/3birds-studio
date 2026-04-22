import type { Metadata } from "next";
import Image from "next/image";
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

      <div className="max-w-xl mx-auto px-6">
        {/* Decorative border divider */}
        <div className="mb-8">
          <div className="relative w-full h-8">
            <Image
              src="/images/win-border.jpg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold font-semibold mt-4">
            Mother&apos;s Day Contest
          </p>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight mb-5">
            Enter to Win a{" "}
            <span className="text-gold">$3,000</span> Portrait Session with
            Artwork for Your Home
          </h1>
          <p className="text-gray-600 leading-relaxed">
            To celebrate Mother&apos;s Day, one family will be selected to
            receive a{" "}
            <strong className="text-navy">
              FREE portrait session and a Signature Wall Portrait
            </strong>{" "}
            (a $3,000 value). We will also be giving away{" "}
            <strong className="text-navy">
              ten runner-up prizes at $1,500 each
            </strong>
            .
          </p>
        </div>

        {/* Sample portrait */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/win-sample-portrait.jpg"
            alt="Legacy Fine Portraits sample session"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>

        {/* Entry form */}
        <div id="enter" className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-navy mb-2">
              Entry Form
            </h2>
            <p className="text-sm text-gray-500">
              Entries close at noon on{" "}
              <strong className="text-navy">May 10, 2026</strong>.
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-2">
              No Purchase Required
            </p>
          </div>

          <LeadForm
            campaign="giveaway-entry"
            source="3birds-giveaway-landing"
            buttonText="Enter to Win!"
            successRedirect="/entered"
            includeAddress
            consentLabel={
              <>
                By checking this box, I agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  className="underline text-teal"
                >
                  contest terms and conditions
                </a>{" "}
                and consent to 3 Birds Studio contacting me about my entry and
                related promotions by email, phone, or text. Msg &amp; data
                rates may apply. Reply STOP to opt out. View our{" "}
                <a href="/privacy" className="underline text-teal">
                  Privacy Policy
                </a>
                .
              </>
            }
          />
        </div>

        <p className="text-center text-xs text-gray-400 leading-relaxed mb-12">
          Winners will be notified by FedEx or certified mail (no P.O. Boxes).
          Only major prize winners and runners-up will be notified. Winners
          can schedule their session for any open date in the next 12 months.
          Late entries will not be accepted.
        </p>

        {/* Testimonial quote imagery (from ClickFunnels) */}
        <div className="mb-12">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-8">
            From Recent Clients
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/win-quote1.jpg"
                alt="Client testimonial - 3 Birds Studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/win-quote2.jpg"
                alt="Client testimonial - 3 Birds Studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/win-quote3.jpg"
                alt="Client testimonial - 3 Birds Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
