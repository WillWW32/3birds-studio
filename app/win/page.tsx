import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Win a Free Portrait Session!",
  description:
    "Enter to win a complimentary professional portrait session at 3 Birds Studio in Missoula, Montana. Families, couples, kids, and pets welcome.",
};

export default function WinPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative gradient-hero text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gold/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Limited Time Giveaway
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            Win a Free
            <br />
            <span className="gold-shimmer">Portrait Session</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Enter for a chance to win a complimentary professional portrait
            session at 3 Birds Studio. Families, couples, seniors, kids, and
            pets all welcome.
          </p>
          <a
            href="#enter"
            className="inline-block px-8 py-4 bg-gold text-navy rounded-full text-lg font-bold hover:brightness-110 transition-all shadow-xl shadow-gold/30"
          >
            Enter to Win
          </a>
        </div>
      </section>

      {/* Prize Details */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-navy mb-12">
            What You Could Win
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📸",
                title: "Professional Session",
                desc: "Your choice of outdoor at Council Grove State Park or indoor Legacy studio session with Jesse & Nelli.",
              },
              {
                icon: "🎨",
                title: "Professional Editing",
                desc: "Every image hand-edited and retouched to perfection by our team.",
              },
              {
                icon: "🖼",
                title: "14\" Fine Art Print",
                desc: "A beautiful museum-grade giclée print with archival finish to display in your home.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

      {/* Entry Form */}
      <section id="enter" className="py-20 bg-cream">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-center text-navy mb-3">
            Enter the Giveaway
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill out the form below to enter. Winner will be contacted directly.
            Good luck!
          </p>
          <div className="bg-white rounded-3xl p-8 shadow-sm">
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
      <section className="py-16 bg-white">
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
            <span>4.9 ★ Google</span>
            <span>15K+ Facebook</span>
            <span>1000+ sessions</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
