"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface PixelEventProps {
  /** Standard Meta Pixel event name, e.g. "CompleteRegistration", "Lead", "Purchase". */
  event: string;
  /** Optional parameters object passed to fbq. */
  params?: Record<string, unknown>;
}

/**
 * Fires a single Meta Pixel event on mount.
 * Drop this on a conversion page (e.g. /thankyou) with event="CompleteRegistration".
 */
export default function PixelEvent({ event, params }: PixelEventProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      if (params) {
        window.fbq("track", event, params);
      } else {
        window.fbq("track", event);
      }
    }
  }, [event, params]);

  return null;
}
