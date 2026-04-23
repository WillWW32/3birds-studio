"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { STUDIO_PHONE, STUDIO_PHONE_TEL } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-black.png"
            alt="3 Birds Studio"
            width={50}
            height={59}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#sessions"
            className="text-sm font-medium text-gray-600 hover:text-teal transition-colors"
          >
            Sessions
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-gray-600 hover:text-teal transition-colors"
          >
            About
          </Link>
          <Link
            href="/book"
            className="text-sm font-medium text-gray-600 hover:text-teal transition-colors"
          >
            Book
          </Link>
          <a
            href={STUDIO_PHONE_TEL}
            className="text-sm font-medium text-gray-500"
          >
            {STUDIO_PHONE}
          </a>
          <Link
            href="/call"
            className="px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-full hover:bg-teal-dark transition-colors"
          >
            Talk to Denise
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link
            href="/#sessions"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-gray-700 py-2"
          >
            Sessions
          </Link>
          <Link
            href="/#about"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-gray-700 py-2"
          >
            About
          </Link>
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-gray-700 py-2"
          >
            Book a Session
          </Link>
          <Link
            href="/call"
            onClick={() => setOpen(false)}
            className="block text-center px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-full"
          >
            Talk to Denise
          </Link>
        </div>
      )}
    </header>
  );
}
