import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import {
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  BOOK_LEGACY,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "3 Birds Studio Membership | $50/mo, $1,500 Portrait Credit Yearly",
  description:
    "Join the 3 Birds Studio membership for $50/month. Get a $1,500 portrait gift certificate every year — use it yourself or gift it. Member pricing, priority booking, and a yearly reminder so portraits don't slip by.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "3 Birds Studio Membership",
    description:
      "$50/month, $1,500 portrait credit every year. Use it yourself or gift it.",
    images: ["/images/family-portraits.jpg"],
  },
  robots: { index: true, follow: true },
};

const BENEFITS = [
  {
    title: "$1,500 portrait credit every year",
    body: "Yours each membership year. Use it on your own family or gift it to someone you love. Mom, your sister, a new baby in the family, a couple celebrating an anniversary — you choose every year.",
  },
  {
    title: "Priority booking",
    body: "Members get first dibs on weekend slots, holiday minis, and golden-hour outdoor sessions before public release.",
  },
  {
    title: "Member pricing on portraits and albums",
    body: "20% off everything in the studio. Heirloom albums, framed wall portraits, gallery wraps, gift portraits — all member-priced, every order.",
  },
  {
    title: "An annual planning call with Nelli",
    body: "Once a year we sit down (in person or by phone) to plan your portraits around what's actually happening — a baby's first year, a senior graduation, a milestone anniversary, a brand refresh.",
  },
  {
    title: "Free digital files with every member session",
    body: "The full edited gallery, delivered to keep. No add-on fees, no per-image upcharges.",
  },
  {
    title: "Yearly reminder so portraits don't slip by",
    body: "Most families say they want portraits every year and end up doing them once every three. We send a friendly nudge each year so the people you love don't go uncaptured.",
  },
  {
    title: "Roll forward, no expiration anxiety",
    body: "Didn't use this year's credit? It rolls forward 12 months. Life happens. We'll be here.",
  },
  {
    title: "Cancel anytime after your first year",
    body: "Once you've used (or gifted) your first $1,500 credit, the membership is month-to-month. No long-term lock-in.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Sign up",
    body: "$50 charged today, then once a month. Takes 60 seconds.",
  },
  {
    step: "2",
    title: "Your $1,500 credit issues immediately",
    body: "Use it within your membership year on any session, package, or product in the studio. Or gift the certificate to someone special.",
  },
  {
    step: "3",
    title: "We remind, you book",
    body: "Each year, before your renewal date, Nelli reaches out to plan your next session. No pressure, just a friendly check-in so portraits actually happen.",
  },
];

const FAQ = [
  {
    q: "Can I really gift the $1,500 credit to anyone?",
    a: "Yes. Each membership year you choose to use the credit yourself or gift it. Most members do a mix over the years — use it for their own family, gift it to a new mom, gift it to a parent for the holidays. The certificate is transferable and the recipient books like any other client.",
  },
  {
    q: "What if my session is more than $1,500?",
    a: "The $1,500 applies as full credit toward any session, package, or product. If you choose a premium package above that, you pay the difference at member pricing. Most family and branding sessions are fully covered.",
  },
  {
    q: "What if I don't use my credit in a year?",
    a: "It rolls forward 12 months. We won't let it disappear on you.",
  },
  {
    q: "What does cancellation look like?",
    a: "After your first 12 months, cancel anytime. You keep any unused credit through its rollover period. No fees, no penalties.",
  },
  {
    q: "Do members really save money?",
    a: "Yes. Annual cost is $600. The credit alone is $1,500, plus 20% off portraits (the average member spends another $400-700/year on portraits and products at member pricing). Most members save $1,000+ per year vs paying retail.",
  },
  {
    q: "Can I gift the membership itself?",
    a: "Yes. Reach out and we'll set it up as a gift — perfect for new parents, grandparents, or as a wedding gift to a couple about to start a family.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative text-white pt-28 pb-20 overflow-hidden">
        <Image
          src="/images/family-portraits.jpg"
          alt="3 Birds Studio family portrait"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            3 Birds Studio Membership
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
            Make portraits part of your year,{" "}
            <span className="text-gold">not an afterthought.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            $50 a month gets you a <strong>$1,500 portrait credit every year</strong> —
            yours to use or gift. Priority booking, member pricing, and a yearly
            reminder so the people you love don&apos;t go uncaptured.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#join"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Join for $50/month
            </Link>
            <a
              href={STUDIO_PHONE_TEL}
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition-colors"
            >
              Talk to us: {STUDIO_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="bg-cream py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-teal mb-4">
            Why this exists
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-6">
            Most families say &ldquo;next year&rdquo; until five years go by.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We&apos;ve photographed Missoula families for years, and the
            conversation we hear most often is the same one:{" "}
            <em>I keep meaning to schedule another session.</em> Newborns become
            kindergartners. Grandparents pass. The kids grow up faster than the
            calendar warns you.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-5">
            Membership solves it the way a good friend would — by holding you
            accountable, gently. Once a year, without fail, you&apos;ve already
            paid for a session. All you have to do is show up.
          </p>
        </div>
      </section>

      {/* The Offer card */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-teal to-teal-dark rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cream mb-3">
              The offer, in one sentence
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-gold">$50</span> a month gets you a{" "}
              <span className="text-gold">$1,500</span> portrait credit every
              year.
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Use it yourself. Gift it to your mom. Surprise a friend with a
              newborn. Pay $600 a year, pocket $1,500 in portraits — plus member
              pricing on everything else.
            </p>
            <div className="mt-10">
              <Link
                href="#join"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-semibold px-10 py-4 rounded-xl transition-colors text-lg shadow-lg"
              >
                Become a member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-teal mb-3">
              What you get
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
              The benefits, in plain language.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm"
              >
                <h3 className="font-display text-xl font-bold text-black mb-3">
                  {b.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-teal mb-3">
              How it works
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
              Three steps. No catch.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.step}
                className="bg-cream p-7 rounded-2xl text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal text-white font-bold text-lg flex items-center justify-center">
                  {s.step}
                </div>
                <h3 className="font-display text-xl font-bold text-black mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value math callout */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            The math
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            $600 in. $1,500+ out. Every year.
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-3xl font-bold text-gold mb-1">$600</p>
              <p className="text-sm text-gray-300">Annual membership</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-3xl font-bold text-gold mb-1">$1,500</p>
              <p className="text-sm text-gray-300">Portrait credit</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-3xl font-bold text-gold mb-1">20%</p>
              <p className="text-sm text-gray-300">Off portraits &amp; products</p>
            </div>
          </div>
          <p className="text-gray-400 mt-8 text-[15px] leading-relaxed max-w-xl mx-auto">
            Average member savings vs paying retail: <strong className="text-white">$1,000+ per year</strong>.
            And the gift option means a $1,500 cert under the tree is just $50/month away.
          </p>
        </div>
      </section>

      {/* Sign-up form */}
      <section id="join" className="py-20 bg-cream scroll-mt-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-teal mb-3">
              Become a member
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
              Tell us a little about you.
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We&apos;ll reach out within one business day to set up your card
              on file and issue your first $1,500 credit. No surprise fees, no
              commitment beyond the first year.
            </p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-md">
            <LeadForm
              campaign="membership"
              source="3birds-membership-landing"
              buttonText="Start my membership"
              successRedirect="/thankyou?type=membership"
              compact
              consentLabel={
                <>
                  (Optional) I agree to be contacted by 3 Birds Studio about my
                  membership by phone, text, or email. Consent is not a
                  condition of joining. Reply STOP to opt out.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-teal mb-3">
              Common questions
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
              Good questions, honest answers.
            </h2>
          </div>
          <div className="space-y-5">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group bg-cream rounded-2xl p-6 border border-transparent hover:border-teal/30 transition-colors"
              >
                <summary className="cursor-pointer font-semibold text-black text-lg list-none flex items-start justify-between gap-4">
                  <span className="font-display">{f.q}</span>
                  <span className="text-teal text-xl group-open:rotate-45 transition-transform leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-gradient-to-br from-teal to-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
            Ready to make portraits part of your year?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            $50 a month. $1,500 in portraits or gifts. Cancel after the first
            year. No catch — just a way to make sure the most important people
            in your life don&apos;t go uncaptured.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#join"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Sign up now
            </Link>
            <a
              href={BOOK_LEGACY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition-colors"
            >
              Book a chat first
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
