import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import {
  STUDIO_PHONE_TEL,
  CALENDLY_OUTDOOR,
  CALENDLY_LEGACY,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "@/lib/constants";

interface HomeContentProps {
  /** Optional keyword-anchored intro rendered between the hero and the Sessions grid. */
  intro?: {
    heading: string;
    body: string;
  };
}

export default function HomeContent({ intro }: HomeContentProps = {}) {
  return (
    <>
      <LocalBusinessSchema />
      <Header />

      {/* Hero - full-bleed image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/summer-banner.jpg"
          alt="Family portrait session at Council Grove State Park"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
          <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-6 animate-fade-up">
            Missoula, Montana
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 animate-fade-up max-w-3xl">
            The Beautiful Moments
            <br />
            <span className="text-gold">of Life, Unforgettable</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 leading-relaxed animate-fade-up-delay">
            Professional portrait photography by Jesse & Nelli. Outdoor sessions
            surrounded by Montana wilderness, or timeless Legacy portraits in
            our Missoula studio.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up-delay-2">
            <Link
              href="/book"
              className="px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-all shadow-xl hover:-translate-y-0.5"
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
        </div>
      </section>

      {intro ? (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-6">
              {intro.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {intro.body}
            </p>
          </div>
        </section>
      ) : null}

      {/* Sessions - image cards */}
      <section id="sessions" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              Choose Your Experience
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-black">
              Two Ways to Be Remembered
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Outdoor */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/family-portraits.jpg"
                  alt="Outdoor family portraits at Council Grove State Park"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white/70 text-xs uppercase tracking-widest">
                    Council Grove State Park
                  </p>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-black mb-3">
                Outdoor Portraits
              </h3>
              <p className="text-gray-500 mb-4 leading-relaxed">
                30 minutes surrounded by towering Ponderosa pines along the
                Clark Fork River. Natural light, stunning scenery, relaxed
                vibes. Pets welcome.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span>30 min</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Tue & Sat</span>
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

            {/* Legacy Studio */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/ad-portrait.jpg"
                  alt="Legacy fine art portrait in studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white/70 text-xs uppercase tracking-widest">
                    Missoula Studio
                  </p>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-black mb-3">
                Legacy Fine Portraits
              </h3>
              <p className="text-gray-500 mb-4 leading-relaxed">
                2 hours of refined, gallery-quality portraiture. Hand-painted
                backdrops, master lighting. Finished on French cotton with
                Italian gold-leafed frames.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span>2 hours</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Tue & Wed</span>
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
      </section>

      {/* What's Included - clean text grid with image accent */}
      <section className="py-28 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/print-product.jpg"
                alt="Fine art portrait print product"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
                The Experience
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-black mb-10">
                More Than Just Photos
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-lg font-bold text-black mb-1">
                    Professional Session
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Guided by Jesse & Nelli with 13+ years of experience.
                    Relaxed, fun, and natural.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-black mb-1">
                    Expert Editing
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Every image professionally retouched and edited to bring out
                    its absolute best.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-black mb-1">
                    Fine Art Prints
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Museum grade giclee on archival paper, or Legacy portraits on
                    French cotton.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-black mb-1">
                    Wardrobe Guidance
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    We help you coordinate outfits so everything looks stunning
                    and cohesive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              Kind Words
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-black">
              From Our Clients
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/testimonial-chris-liz.jpg"
                alt="Chris and Liz portrait session"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/testimonial-davy-angela.jpg"
                alt="Davy and Angela portrait session"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/reviews.jpg"
                  alt="5-star client reviews"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9 on Google</p>
              <p className="text-sm text-gray-400">15,000+ Facebook followers</p>
              <p className="text-sm text-gray-400">13+ years in Missoula</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-jesse-nelli.jpg"
                alt="Jesse and Nelli, photographers at 3 Birds Studio"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-teal text-sm uppercase tracking-[0.2em] font-semibold mb-3">
                Meet Your Photographers
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-black mb-6">
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
      <section className="relative py-28 overflow-hidden">
        <Image
          src="/images/hero-portrait.jpg"
          alt="Portrait photography"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
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
              className="px-8 py-4 bg-teal text-white rounded-full text-lg font-semibold hover:bg-teal-dark transition-colors shadow-xl"
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
