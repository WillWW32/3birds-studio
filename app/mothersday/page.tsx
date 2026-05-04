import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

/**
 * /mothersday — A/B variant of /win.
 *
 * Same lead capture + email/SMS follow-up as /win (campaign='giveaway-entry'
 * so server.ts hits the sweepstakes welcome SMS + email path and skips the
 * Denise speed-to-lead call + StarPath nurture). Only the source string
 * differs so we can compare conversion in the dashboard.
 *
 * Visual differences from /win:
 *   - gold-framed sample portrait removed; the form sits directly under
 *     the headline + subhead
 *   - "From Recent Clients" testimonial cards removed from the footer
 *
 * Marked noindex so Google doesn't treat this near-duplicate as
 * competition for the canonical /win page.
 */

export const metadata: Metadata = {
  title: "Enter to Win a $3,000 Portrait Collection",
  description:
    "Enter to win a $3,000 Legacy Portrait Collection (includes a session, full retouching, and a signature wall portrait). Ten runner-up Portrait Collections ($1,500 each, includes a session). Entries close May 10, 2026. Drawing held May 17, 2026 — winners announced that week. No purchase required.",
  alternates: { canonical: "/win" },
  robots: { index: false, follow: true },
  openGraph: {
    url: "/mothersday",
  },
};

export default function MothersDayPage() {
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
        {/* Eyebrow (no decorative gold border in this variant) */}
        <div className="mb-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            Mother&apos;s Day Contest
          </p>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-black leading-tight mb-5">
            Enter to Win a{" "}
            <span className="text-gold">$3,000</span> Portrait Collection
          </h1>
          <p className="text-gray-600 leading-relaxed">
            To celebrate Mother&apos;s Day, one family will be selected to
            receive our{" "}
            <strong className="text-black">
              $3,000 Legacy Portrait Collection
            </strong>{" "}
            (includes a session, full retouching, and a signature wall
            portrait). We will also be giving away{" "}
            <strong className="text-black">
              ten runner-up Portrait Collections at $1,500 each
            </strong>{" "}
            (each includes a session).
          </p>
        </div>

        {/* Entry form — sits directly below headline/subhead in this variant */}
        <div id="enter" className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-black mb-2">
              Entry Form
            </h2>
            <p className="text-sm text-gray-500">
              Entries close at noon{" "}
              <strong className="text-black">May 10, 2026</strong>. Drawing
              held <strong className="text-black">May 17</strong>. Winners
              announced that week.
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-2">
              No Purchase Required
            </p>
          </div>

          <LeadForm
            campaign="giveaway-entry"
            source="3birds-mothersday-landing"
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
      </div>

      <Footer />
    </div>
  );
}
