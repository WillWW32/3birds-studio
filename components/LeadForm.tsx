"use client";

import { useEffect, useState, type FormEvent } from "react";
import { WEBHOOK_URL } from "@/lib/constants";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

type AttributionParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function captureAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const captured: AttributionParams = {};
  for (const key of UTM_KEYS) {
    const v = url.searchParams.get(key);
    if (v) captured[key] = v;
  }
  // Persist so leads that land on A and submit on B still attribute to A
  try {
    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem("3birds_attribution", JSON.stringify(captured));
    } else {
      const saved = sessionStorage.getItem("3birds_attribution");
      if (saved) return JSON.parse(saved) as AttributionParams;
    }
  } catch {
    // sessionStorage unavailable (privacy mode); just return whatever we captured
  }
  return captured;
}

interface LeadFormProps {
  campaign: string;
  source: string;
  buttonText?: string;
  successRedirect?: string;
  compact?: boolean;
  /**
   * Collect full mailing address (street / city / state / zip).
   * Use for sweepstakes entries where winners are notified by postal mail.
   */
  includeAddress?: boolean;
  /** Consent copy override. Sweepstakes entries may skip TCPA call/text consent. */
  consentLabel?: React.ReactNode;
}

export default function LeadForm({
  campaign,
  source,
  buttonText = "Claim My Gift Certificate",
  successRedirect = "/thankyou",
  compact = false,
  includeAddress = false,
  consentLabel,
}: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<AttributionParams>({});

  useEffect(() => {
    setAttribution(captureAttribution());
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const data: Record<string, string | boolean | AttributionParams> = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      campaign,
      source,
      tcpa_consent: fd.get("tcpa_consent") === "on",
      attribution,
    };

    if (!compact) {
      data.people_count = fd.get("people_count") as string;
      data.session_preference = fd.get("session_preference") as string;
    }

    if (includeAddress) {
      data.address = fd.get("address") as string;
      data.city = fd.get("city") as string;
      data.state = fd.get("state") as string;
      data.zip = fd.get("zip") as string;
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Fire Meta Pixel Lead event before redirecting — this is the ad
        // conversion signal Meta uses to optimize delivery. CompleteRegistration
        // fires separately on /thankyou via PixelEvent.
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_category: campaign,
            content_name: source,
          });
        }
        window.location.href = successRedirect;
      } else {
        const err = await res.json().catch(() => ({}));
        setError(
          (err as { error?: string }).error ||
            "Something went wrong. Please try again."
        );
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your full name"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="(406) 555-1234"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
        />
      </div>

      {!compact && !includeAddress && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              People in Portrait
            </label>
            <select
              name="people_count"
              defaultValue="2"
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
            >
              <option value="1">Just me</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Preference
            </label>
            <select
              name="session_preference"
              defaultValue="outdoor"
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
            >
              <option value="outdoor">Outdoor</option>
              <option value="indoor_legacy">Legacy Studio</option>
              <option value="undecided">Not sure</option>
            </select>
          </div>
        </div>
      )}

      {includeAddress && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mailing Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="Street address (no P.O. Boxes)"
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
            />
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="Missoula"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                State <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="state"
                required
                maxLength={2}
                placeholder="MT"
                className="w-20 px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                ZIP <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="zip"
                required
                pattern="\d{5}(-\d{4})?"
                placeholder="59801"
                className="w-28 px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
              />
            </div>
          </div>
        </>
      )}

      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          name="tcpa_consent"
          id={`tcpa_consent_${campaign}`}
          required
          className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
        />
        <label htmlFor={`tcpa_consent_${campaign}`} className="text-xs text-gray-500 leading-relaxed">
          {consentLabel || (
            <>
              By checking this box, I consent to receive automated calls, text messages,
              and emails from 3 Birds Studio regarding my portrait session booking.
              Message frequency varies. Msg &amp; data rates may apply. Reply STOP to
              opt out, HELP for help. View our{" "}
              <a href="/privacy" className="underline text-teal">Privacy Policy</a>.
            </>
          )}
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-teal text-white rounded-xl font-semibold text-lg hover:bg-teal-dark transition-colors disabled:opacity-60 shadow-lg shadow-teal/20"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
