import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contest Terms and Conditions",
  description:
    "Official rules for the 3 Birds Studio Mother's Day Portrait Giveaway. No purchase necessary. Entries close May 10, 2026.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
          Contest Terms and Conditions
        </h1>
        <p className="text-xs text-gray-400 mb-10">
          Last updated: April 18, 2026
        </p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              No Purchase Necessary
            </h2>
            <p>
              NO PURCHASE IS NECESSARY TO ENTER OR WIN. A purchase will not
              increase your chances of winning. Void where prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">Sponsor</h2>
            <p>
              This contest is sponsored by 3 Birds Studio, 6850 Mullan Way,
              Missoula, MT 59808, operated by 3 Birds Studio, LLP.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">Eligibility</h2>
            <p>
              Open to legal residents of the United States who are 18 years of
              age or older at the time of entry. Employees of 3 Birds Studio,
              LLP and their immediate families are not eligible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              Entry Period
            </h2>
            <p>
              The contest begins on the public launch date and ends at 12:00 PM
              Mountain Time on <strong>May 10, 2026</strong> (&ldquo;Entry
              Deadline&rdquo;). Late entries will not be accepted. Entries
              submitted after the Entry Deadline are void.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              How to Enter
            </h2>
            <p>
              Complete the entry form at{" "}
              <a href="/enter-to-win" className="underline text-teal">
                3birdsstudio.com/enter-to-win
              </a>
              . Limit one entry per person. A valid street mailing address (no
              P.O. Boxes) is required to receive winner notification. Entries
              with incomplete or inaccurate information will be disqualified.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">Prizes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Grand Prize (1):</strong> A full Legacy Fine Portraits
                session with Jesse &amp; Nelli and a Signature Wall Portrait,
                approximate retail value <strong>$3,000</strong>.
              </li>
              <li>
                <strong>Runner-Up Prizes (10):</strong> A complimentary portrait
                session, full professional editing, and a 14-inch fine art
                print, approximate retail value <strong>$1,500 each</strong>.
              </li>
            </ul>
            <p className="mt-4">
              Prizes are non-transferable. No substitution of prize is permitted
              except at the sole discretion of the sponsor. Sessions must be
              scheduled on any open date within 12 months of winner notification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              Winner Selection &amp; Notification
            </h2>
            <p>
              Winners will be selected at random from all eligible entries on or
              about May 11, 2026. Winners will be notified by FedEx or certified
              mail at the mailing address provided on their entry. Only Grand
              Prize and Runner-Up winners will be contacted &mdash; non-winners
              will not receive notification.
            </p>
            <p className="mt-3">
              If a winner cannot be reached within 14 days of notification, or
              declines the prize, an alternate winner may be selected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              Privacy &amp; Communications
            </h2>
            <p>
              By entering, you consent to 3 Birds Studio contacting you by
              email, phone, or text regarding your entry and future promotions.
              You may opt out at any time. See our{" "}
              <a href="/privacy" className="underline text-teal">
                Privacy Policy
              </a>{" "}
              for full details. We will never sell or share your personal
              information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">
              General Conditions
            </h2>
            <p>
              The sponsor reserves the right to cancel, suspend, or modify the
              contest if fraud, technical failures, or any other factor beyond
              the sponsor&apos;s control impairs the integrity of the contest.
              Any attempt to deliberately damage the website or undermine the
              operation of the contest may violate criminal and civil laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-2 mb-3">Contact</h2>
            <p>
              Questions about the contest? Reach us at{" "}
              <a href="mailto:hello@3birdsstudio.com" className="underline text-teal">
                hello@3birdsstudio.com
              </a>{" "}
              or 406-239-3442.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
