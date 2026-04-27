"use client";

import { useEffect, useState } from "react";

const SHARE_BASE_URL = "https://win.3birdsstudio.com";

/**
 * Share section rendered on /entered. Lets the entrant share /win with
 * friends to earn an additional drawing entry per friend who enters via
 * their share link.
 *
 * Reads `?ref=<token>` from the /entered URL (LeadForm injects this on
 * successful submission). The token is appended to share URLs so when
 * a friend lands on /win, the form captures it as `referred_by_share_token`
 * and the server credits the original entrant.
 *
 * - Facebook button: opens Facebook Share Dialog in a popup.
 * - Native share button: feature-detects `navigator.share`. On mobile this
 *   surfaces Instagram, Messages, Messenger, etc. via the OS share sheet.
 *   Hidden on browsers without Web Share API (most desktops).
 * - Copy Link button: clipboard fallback that always works.
 *
 * If `?ref=` is missing (e.g. someone navigates here directly), we still
 * render the share UI but with the bare URL. They just won't get credit.
 */
export default function ShareEntry() {
  const [shareUrl, setShareUrl] = useState(SHARE_BASE_URL);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    setShareUrl(
      ref ? `${SHARE_BASE_URL}?ref=${encodeURIComponent(ref)}` : SHARE_BASE_URL
    );
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const shareText =
    "I just entered to win a $3,000 Portrait Collection from 3 Birds Studio in Missoula. Free to enter:";

  const handleFb = () => {
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(u, "fb-share", "width=626,height=436,resizable=yes,scrollbars=yes");
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "$3,000 Portrait Giveaway · 3 Birds Studio",
        text: shareText,
        url: shareUrl,
      });
    } catch {
      // User dismissed or share unsupported — silent.
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Older browsers without clipboard API — silent fallback.
    }
  };

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
          Want a Better Chance?
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-4">
          Share for an Extra Entry
        </h2>
        <p className="text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto">
          For every friend who enters using your share link, you get one
          additional entry in the drawing. Share on Facebook, Instagram, or
          copy the link.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleFb}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full font-semibold hover:bg-[#1466d3] transition-colors shadow-sm"
            aria-label="Share on Facebook"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Share on Facebook
          </button>

          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full font-semibold transition-opacity hover:opacity-90 shadow-sm"
              style={{
                background:
                  "linear-gradient(45deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)",
              }}
              aria-label="Share to Instagram and other apps"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Share to Instagram &amp; More
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-black rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Copy share link"
          >
            {copied ? (
              <>
                <svg
                  className="w-5 h-5 text-teal"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Link Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 11-5.656-5.656l1.102-1.101m-.758-4.899a4 4 0 015.656 0l4 4a4 4 0 010 5.656l-1.1 1.1"
                  />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>

        {!canNativeShare && (
          <p className="text-xs text-gray-400 mt-6 max-w-md mx-auto leading-relaxed">
            Sharing on Instagram? Tap{" "}
            <strong className="text-gray-600">Copy Link</strong>, then paste it
            into your Story or DM. Every friend who enters using your link
            earns you an extra entry in the drawing.
          </p>
        )}
      </div>
    </section>
  );
}
