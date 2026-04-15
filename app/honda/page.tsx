import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { DEALERSHIPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claim Your $1,500 Portrait Session | Honda",
  description:
    "Congratulations! Redeem your $1,500 gift certificate for a professional portrait session at 3 Birds Studio in Missoula, Montana.",
};

const dealer = DEALERSHIPS.honda;

export default function HondaPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative gradient-hero text-white pt-28 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-light/70 mb-4">
            {dealer.name}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Congratulations!
            <br />
            <span className="gold-shimmer">You&apos;ve Earned a $1,500</span>
            <br />
            Portrait Session
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            As one of Honda&apos;s most valued customers, you&apos;ve been
            selected to receive a complimentary professional portrait session at
            3 Birds Studio.
          </p>
          <a
            href="#claim"
            className="inline-block px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-all shadow-xl shadow-teal/30"
          >
            Claim Your Gift Certificate
          </a>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "📸",
                title: "Professional Session",
                desc: "Choose from outdoor portraits at Council Grove State Park or an indoor Legacy session at our Missoula studio.",
              },
              {
                icon: "🎨",
                title: "Expert Editing",
                desc: "Professional retouching by our team to make every shot perfect and gallery-ready.",
              },
              {
                icon: "🖼",
                title: "14\" Fine Art Portrait",
                desc: "Museum grade giclée with archival finish. A stunning piece of art for your home.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Types */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            Choose Your Session
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="h-52 bg-gradient-to-br from-emerald-700 via-teal to-emerald-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-5xl mb-2">🌿</p>
                  <p className="text-xs uppercase tracking-widest opacity-70">
                    Council Grove State Park
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  Outdoor Portraits
                </h3>
                <ul className="text-gray-500 text-sm space-y-1.5">
                  <li>30-minute session</li>
                  <li>Available Tuesdays & Saturdays</li>
                  <li>Natural light along the river</li>
                  <li>Pets welcome</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="h-52 bg-gradient-to-br from-gray-900 via-gray-800 to-navy flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-5xl mb-2">🎨</p>
                  <p className="text-xs uppercase tracking-widest opacity-70">
                    Missoula Studio
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  Legacy Studio Session
                </h3>
                <ul className="text-gray-500 text-sm space-y-1.5">
                  <li>2-hour premium session</li>
                  <li>Available Tuesdays & Wednesdays</li>
                  <li>Hand-painted backdrops & master lighting</li>
                  <li>Gallery-quality fine art</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section id="claim" className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-3">
            Claim Your Gift Certificate
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill out the form below and we&apos;ll call you to schedule your
            session. Certificates must be validated within 7 days.
          </p>
          <div className="bg-cream rounded-3xl p-8">
            <LeadForm campaign={dealer.campaign} source={dealer.source} />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal">15K+</p>
              <p className="text-sm text-gray-500">Facebook Followers</p>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-teal">1000+</p>
              <p className="text-sm text-gray-500">Sessions Completed</p>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-teal">4.9 ★</p>
              <p className="text-sm text-gray-500">Google Rating</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
