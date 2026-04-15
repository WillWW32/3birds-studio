import Image from "next/image";
import Link from "next/link";
import {
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/images/logo.png"
                alt="3 Birds Studio"
                width={36}
                height={48}
                className="h-10 w-auto brightness-200"
              />
              <h3 className="font-display text-2xl font-bold">
                3 Birds Studio
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fine art portrait photography in Missoula, Montana. Capturing the
              beautiful moments of life since 2012.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                href="/book"
                className="block text-sm text-gray-300 hover:text-teal transition-colors"
              >
                Book a Session
              </Link>
              <Link
                href="/call"
                className="block text-sm text-gray-300 hover:text-teal transition-colors"
              >
                Talk to Denise
              </Link>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-300 hover:text-teal transition-colors"
              >
                Facebook
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-300 hover:text-teal transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <a
                href={STUDIO_PHONE_TEL}
                className="block hover:text-teal transition-colors"
              >
                {STUDIO_PHONE}
              </a>
              <p>Missoula, Montana</p>
              <p className="text-gray-500 text-xs mt-4">
                4.9 stars on Google &middot; 15K+ on Facebook
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} 3 Birds Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
