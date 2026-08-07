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

/**
 * Capture an inbound referral token from `?ref=...` in the URL.
 * Used by the giveaway flow — when an existing entrant shares their link
 * from /entered, friends land on /win with their share_token in the URL.
 * We persist it to sessionStorage so attribution survives refreshes.
 */
function captureReferral(): string {
  if (typeof window === "undefined") return "";
  const ref = new URL(window.location.href).searchParams.get("ref") || "";
  try {
    if (ref) {
      sessionStorage.setItem("3birds_referred_by", ref);
      return ref;
    }
    return sessionStorage.getItem("3birds_referred_by") || "";
  } catch {
    return ref;
  }
}

/** Short URL-safe token used as this entrant's share id on /entered. */
function generateShareToken(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID().split("-")[0]; // 8 hex chars
  }
  return Math.random().toString(36).slice(2, 10);
}

interface LeadFormProps {
  campaign: string;
  source: string;
  buttonText?: string;
  successRedirect?: string;
  compact?: boolean;
  /**
   * Gift-certificate registration layout (lithia/honda dealer pages).
   * Five fields in order of commitment (William 8/6): people count, then
   * certificate code, then name, email, phone. No session-preference field;
   * the thank-you page books the session directly.
   */
  certificate?: boolean;
  /**
   * Collect full mailing address (street / city / state / zip).
   * Use for sweepstakes entries where winners are notified by postal mail.
   */
  includeAddress?: boolean;
  /** Consent copy override. Sweepstakes entries may skip TCPA call/text consent. */
  consentLabel?: React.ReactNode;
  /** Optional REQUIRED checkbox for contest/entry terms. Keep legal agreement
      (can be required) separate from SMS consent (never required). */
  termsLabel?: React.ReactNode;
}

export default function LeadForm({
  campaign,
  source,
  buttonText = "Claim My Gift Certificate",
  successRedirect = "/thankyou",
  compact = false,
  certificate = false,
  includeAddress = false,
  consentLabel,
  termsLabel,
}: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<AttributionParams>({});
  const [referredBy, setReferredBy] = useState("");

  useEffect(() => {
    setAttribution(captureAttribution());
    setReferredBy(captureReferral());
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    // This entrant's outbound share token — embedded in /entered share links
    // so we can credit them when a friend enters via their link.
    const shareToken = generateShareToken();

    const data: Record<string, string | boolean | AttributionParams> = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      campaign,
      source,
      // Brand tag — routes into 3 Birds Studio's dashboard view, keeps these
      // leads separated from Starfish leads in the /leads page.
      brand: "3birds",
      tcpa_consent: fd.get("tcpa_consent") === "on",
      attribution,
      share_token: shareToken,
      referred_by_share_token: referredBy,
    };

    if (certificate) {
      data.people_count = fd.get("people_count") as string;
      data.redemption_code = fd.get("redemption_code") as string;
    } else if (!compact) {
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
        // Append the entrant's share token to the redirect so /entered can
        // build share URLs like https://win.3birdsstudio.com?ref=<token>.
        const sep = successRedirect.includes("?") ? "&" : "?";
        window.location.href = `${successRedirect}${sep}ref=${encodeURIComponent(shareToken)}`;
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

  const inputClass =
    "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {certificate && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How Many in Your Portrait Session?
            </label>
            <select name="people_count" defaultValue="2" className={inputClass}>
              <option value="1">Just me</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Gift Certificate Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="redemption_code"
              required
              placeholder="The code on your certificate"
              className={inputClass}
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      {certificate ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="(406) 555-1234"
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </>
      )}

      {!certificate && !compact && !includeAddress && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              People in Portrait
            </label>
            <select
              name="people_count"
              defaultValue="2"
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
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
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
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
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
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
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
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
                className="w-20 px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all uppercase"
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
                className="w-28 px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-all"
              />
            </div>
          </div>
        </>
      )}

      {termsLabel && (
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            name="terms_agree"
            id={`terms_agree_${campaign}`}
            required
            className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
          />
          <label htmlFor={`terms_agree_${campaign}`} className="text-xs text-gray-500 leading-relaxed">
            {termsLabel}
          </label>
        </div>
      )}

      {/* SMS/call consent is OPTIONAL by carrier rule: consent can never be a
          required condition of entry or purchase (Twilio error 30923). The
          unchecked box still submits; the backend gates every phone touch on
          the boolean this sends. */}
      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          name="tcpa_consent"
          id={`tcpa_consent_${campaign}`}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
        />
        <label htmlFor={`tcpa_consent_${campaign}`} className="text-xs text-gray-500 leading-relaxed">
          {consentLabel || (
            <>
              (Optional) I agree to receive automated calls and text messages from
              3 Birds Studio about my session and offers. Consent is not a condition
              of purchase or entry. Message frequency varies. Msg &amp; data rates
              may apply. Reply STOP to opt out, HELP for help. View our{" "}
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
