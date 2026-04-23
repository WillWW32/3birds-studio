import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for 3 Birds Studio portrait sessions, gift certificates, and promotional contests.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-black mb-3">
          Terms and Conditions
        </h1>
        <p className="text-xs text-gray-400 mb-4">
          Last updated: April 21, 2026
        </p>
        <nav className="text-xs text-gray-500 mb-10 flex flex-wrap gap-x-4 gap-y-1">
          <a href="#contest" className="underline text-teal hover:opacity-80">Contest Rules</a>
          <a href="#studio" className="underline text-teal hover:opacity-80">Studio Services</a>
          <a href="#gift-certificates" className="underline text-teal hover:opacity-80">Gift Certificates</a>
          <a href="#deposits" className="underline text-teal hover:opacity-80">Holding Deposits</a>
          <a href="#appointments" className="underline text-teal hover:opacity-80">Appointments</a>
          <a href="#copyright" className="underline text-teal hover:opacity-80">Copyright</a>
        </nav>

        <div id="contest" className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-black mt-2 mb-3">
            Contest Rules
          </h2>
          <section>
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
              No Purchase Necessary
            </h2>
            <p>
              NO PURCHASE IS NECESSARY TO ENTER OR WIN. A purchase will not
              increase your chances of winning. Void where prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-2 mb-3">Sponsor</h2>
            <p>
              This contest is sponsored by 3 Birds Studio, 6850 Mullan Way,
              Missoula, MT 59808, operated by 3 Birds Studio, LLP.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-2 mb-3">Eligibility</h2>
            <p>
              Open to legal residents of the United States who are 18 years of
              age or older at the time of entry. Employees of 3 Birds Studio,
              LLP and their immediate families are not eligible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">Prizes</h2>
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">
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
            <h2 className="text-lg font-bold text-black mt-2 mb-3">Contact</h2>
            <p>
              Questions about the contest? Reach us at{" "}
              <a href="mailto:hello@3birdsstudio.com" className="underline text-teal">
                hello@3birdsstudio.com
              </a>{" "}
              or 406-239-3442.
            </p>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════════
             STUDIO SERVICES T&C (general business operations)
             ═══════════════════════════════════════════════════════════ */}
        <div id="studio" className="space-y-8 text-sm text-gray-600 leading-relaxed mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-black mt-2 mb-3">
            Studio Services
          </h2>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Competitions and Giveaways
            </h3>
            <p>
              Entrants must be 18 or older United States residents who have not
              won a 3 Birds Studio giveaway in the past 12 months. Original
              entry coupons must arrive by the promotion deadline. Copies are
              not accepted. Multiple entries are allowed. Winners are notified
              by mail, email, or phone. The major prize winner will be the
              first valid entry coupon drawn on the day of the draw. Primary
              prizes expire one month from notification; runner-up prizes
              expire two months from notification. Photography prizes are for
              family or pet portraiture only. They are non-transferable and
              non-exchangeable for cash.
            </p>
          </section>

          <section id="gift-certificates">
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Gift Certificates and Promotional Vouchers
            </h3>
            <p>
              Gift certificates and promotional vouchers must be redeemed
              before their expiry date by holders who have not redeemed any
              competing 3 Birds Studio offer within the prior 12 months.
              Certificates are limited to family and pet portraiture and
              exclude commercial work. Limit one certificate per household.
              Certificates cannot be combined with other offers.
            </p>
            <p className="mt-3 font-semibold text-black">
              Gift certificates are non-transferable and cannot be exchanged
              for cash or combined with other offers.
            </p>
          </section>

          <section id="deposits">
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Appointment Holding Deposits
            </h3>
            <p>
              A $100 deposit secures your appointment. The deposit is
              refundable once you complete both your portrait session and your
              appointment purchase on schedule. Missing your appointment
              forfeits the deposit and the prize.
            </p>
          </section>

          <section id="appointments">
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Appointment Reschedule Policy
            </h3>
            <p>
              Single appointment only. Rescheduling requires management
              approval in exceptional circumstances.
            </p>

            <h3 className="text-lg font-bold text-black mt-6 mb-3">
              No-Show Policy
            </h3>
            <p>
              Missing an appointment without providing at least 72 hours of
              notice forfeits your deposit and voids any associated
              certificate.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Extended Family Policy
            </h3>
            <p>
              Groups exceeding 8 people qualify as extended families.
              Promotional vouchers do not apply to extended family sessions.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Artistic Control
            </h3>
            <p>
              The photographer reserves sole discretion over design, content,
              style, and image sizes for all sessions and final products.
            </p>
          </section>

          <section id="copyright">
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Copyright
            </h3>
            <p>
              All images belong exclusively to 3 Birds Studio.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Order Changes and Refunds
            </h3>
            <p>
              Orders once made cannot be changed. Exchanges occur at studio
              discretion only.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Facebook and Social Media Competitions
            </h3>
            <p>
              Entrants in any 3 Birds Studio social media promotion
              acknowledge that the promotion is in no way sponsored, endorsed,
              administered by, or associated with Facebook, Instagram, TikTok,
              or any other social platform.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              SMS and Text Messaging
            </h3>
            <p>
              By providing your mobile number and opting in on any 3 Birds
              Studio form, you consent to receive automated booking
              confirmations, reminders, follow-up messages, and occasional
              promotional content from 3 Birds Studio. Message frequency
              varies, typically 1 to 5 messages per booking. Message and data
              rates may apply. Reply STOP to any message to opt out. Reply
              HELP for assistance or call 406-239-3442. See our{" "}
              <a href="/privacy" className="underline text-teal">
                Privacy Policy
              </a>{" "}
              for full SMS disclosure.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black mt-2 mb-3">
              Contact
            </h3>
            <p>
              Questions? Email{" "}
              <a href="mailto:hello@3birdsstudio.com" className="underline text-teal">
                hello@3birdsstudio.com
              </a>{" "}
              or call 406-239-3442.
            </p>
            <p className="mt-3 text-xs text-gray-400">
              3 Birds Studio, LLP<br />
              6850 Mullan Way, Missoula, MT 59808
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
