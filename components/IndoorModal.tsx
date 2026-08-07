"use client";

import { useEffect, useState } from "react";
import { CALENDLY_LEGACY } from "@/lib/constants";

/**
 * "Prefer an Indoor Studio Session instead?" button + full-screen modal with
 * the Legacy Studio Calendly. The thank-you page leads with the outdoor
 * calendar; this is the quiet second door (William 8/6).
 *
 * The embed is a plain iframe rather than the widget.js div: Calendly's
 * script only scans for .calendly-inline-widget at load time, so a div
 * mounted later inside a modal would stay blank. The iframe needs no script.
 */
export default function IndoorModal() {
  const [open, setOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    const u = new URL(CALENDLY_LEGACY);
    u.searchParams.set("embed_domain", window.location.host);
    u.searchParams.set("embed_type", "Inline");
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("primary_color", "0d9488");
    setEmbedUrl(u.toString());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block border border-gray-300 rounded-xl px-6 py-3.5 text-gray-700 hover:border-teal hover:text-teal transition-colors text-lg"
      >
        Prefer an Indoor Studio Session instead?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div>
                <p className="font-display text-lg font-bold text-black">
                  Legacy Portrait Studio Session
                </p>
                <p className="text-sm text-gray-500">
                  At the studio, 6850 Mullan Way &middot; Tuesdays &amp;
                  Wednesdays
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl"
              >
                &times;
              </button>
            </div>
            {embedUrl && (
              <iframe
                src={embedUrl}
                title="Book a Legacy Studio session"
                className="w-full flex-1 border-0"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
