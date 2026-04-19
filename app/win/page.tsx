import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Win a Free Portrait Session!",
  description:
    "Enter to win a complimentary professional portrait session at 3 Birds Studio in Missoula, Montana. Families, couples, kids, and pets welcome.",
  alternates: { canonical: "/win" },
  openGraph: {
    url: "/win",
    images: [
      {
        url: "/images/family-portraits.jpg",
        width: 1200,
        height: 630,
        alt: "Free portrait session giveaway at 3 Birds Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/family-portraits.jpg"],
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
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Limited Time Giveaway
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            Win a Free
            <br />
            <span className="text-gold">Portrait Session</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Enter for a chance to win a complimentary professional portrait
            session at 3 Birds Studio. Families, couples, seniors, kids, and
            pets all welcome.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-16">
            What You Could Win
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/family-portraits.jpg"
                  alt="Professional portrait session"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Professional Session
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your choice of outdoor at Council Grove State Park or indoor
                Legacy studio session with Jesse & Nelli.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/ad-portrait.jpg"
                  alt="Professional editing"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Professional Editing
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every image hand-edited and retouched to perfection by our team.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/print-product.jpg"
                  alt="Fine art print"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                14&quot; Fine Art Print
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A beautiful museum-grade giclee print with archival finish to
                display in your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section id="enter" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-3">
            Enter the Giveaway
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Fill out the form below to enter. Winner will be contacted directly.
            Good luck!
          </p>
          <div className="bg-gray-50 rounded-2xl p-8">
            <LeadForm
              campaign="giveaway"
              source="3birds-giveaway-landing"
              buttonText="Enter to Win"
              successRedirect="/thankyou"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-navy mb-4">
            About 3 Birds Studio
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Jesse & Nelli have been capturing family portraits in Missoula,
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
