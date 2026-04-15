import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  STUDIO_PHONE_TEL,
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          <p className="text-teal-light/80 text-sm uppercase tracking-[0.3em] mb-6 animate-fade-up">
            Missoula, Montana
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 animate-fade-up">
            The Beautiful Moments
            <br />
            <span className="gold-shimmer">of Life, Unforgettable</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up-delay">
            Professional portrait photography by Jesse & Nelli. Outdoor sessions
            surrounded by Montana wilderness, or timeless Legacy portraits in
            our Missoula studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
            <Link
              href="/book"
              className="px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-all shadow-xl shadow-teal/30 hover:-translate-y-0.5"
            >
              Book Your Session
            </Link>
            <Link
              href="/call"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Talk to Denise
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              4.9 on Google
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>15,000+ Facebook followers</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>13+ years in Missoula</span>
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              Choose Your Experience
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
              Two Ways to Be Remembered
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Outdoor */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="h-72 bg-gradient-to-br from-emerald-700 via-teal to-emerald-500 flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white z-10">
                  <p className="text-6xl mb-3">🌿</p>
                  <p className="text-sm uppercase tracking-widest opacity-70">
                    Council Grove State Park
                  </p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-navy mb-3">
                  Outdoor Portraits
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  30 minutes surrounded by towering Ponderosa pines along the
                  Clark Fork River. Natural light, stunning scenery, relaxed
                  vibes. Pets welcome.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Tue & Sat
                  </span>
                </div>
                <a
                  href={CALENDLY_OUTDOOR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
                >
                  Book Outdoor Session
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Legacy Studio */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="h-72 bg-gradient-to-br from-gray-900 via-gray-800 to-navy flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white z-10">
                  <p className="text-6xl mb-3">🎨</p>
                  <p className="text-sm uppercase tracking-widest opacity-70">
                    Missoula Studio
                  </p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-navy mb-3">
                  Legacy Fine Portraits
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  2 hours of refined, gallery-quality portraiture. Hand-painted
                  backdrops, master lighting. Finished on French cotton with
                  Italian gold-leafed frames.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Tue & Wed
                  </span>
                </div>
                <a
                  href={CALENDLY_LEGACY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
                >
                  Book Legacy Session
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              The Experience
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
              More Than Just Photos
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "📸", title: "Professional Session", desc: "Guided by Jesse & Nelli with 13+ years of experience. Relaxed, fun, and natural." },
              { icon: "🎨", title: "Expert Editing", desc: "Every image professionally retouched and edited to bring out its absolute best." },
              { icon: "🖼", title: "Fine Art Prints", desc: "Museum grade giclée on archival paper, or Legacy portraits on French cotton." },
              { icon: "👗", title: "Wardrobe Guidance", desc: "We help you coordinate outfits so everything looks stunning and cohesive." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl hover:bg-cream transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-teal/20 to-navy/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-8xl mb-4">📷</p>
                  <p className="text-sm text-gray-400 italic">Jesse & Nelli</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
            </div>

            <div>
              <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
                Meet Your Photographers
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
                Jesse & Nelli
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We&apos;re a husband-and-wife photography team with over 13 years of
                experience capturing families in Missoula, Montana. We live
                here, we raise our kids here, and we love what we do.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our approach is comfortable and real. Whether we&apos;re out at
                Council Grove with the pines and the river, or in the studio
                with hand-painted backdrops and museum-quality lighting, we
                guide you through every moment so you can just be yourselves.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our Legacy portraits are inspired by the old masters. Finished
                on French cotton with brushstroke accents and housed in elegant
                hand-molded frames with gold leafing imported from Italy. These
                are heirloom pieces meant to last generations.
              </p>
              <div className="flex items-center gap-6">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href={STUDIO_PHONE_TEL} className="text-gray-400 hover:text-teal transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-teal text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Pick a session, pick a date, and we handle the rest. Outdoor or
            studio. Families, couples, seniors, or just you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-teal rounded-full text-lg font-semibold hover:bg-cream transition-colors shadow-xl"
            >
              Book Your Session
            </Link>
            <Link
              href="/call"
              className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Talk to Denise
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
