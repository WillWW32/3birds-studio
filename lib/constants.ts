export const WEBHOOK_URL =
  "https://starfish-production-c267.up.railway.app/api/webhook/lead";

export const STUDIO_PHONE = "406-239-3442";
export const STUDIO_PHONE_TEL = "tel:+14062393442";
export const DENISE_PHONE = "406-926-7354";
export const DENISE_PHONE_TEL = "tel:+14069267354";

// Raw Calendly event URLs. These power the EMBEDS on our branded /book/*
// pages and should not be handed out directly anymore: every outbound link
// (thank-you pages, SMS, email, agents) points at the branded BOOK_* URLs
// below, so the eventual switch off Calendly is a server-side swap with no
// link changes anywhere.
export const CALENDLY_OUTDOOR = "https://calendly.com/3birds/outdoor-portraits";
export const CALENDLY_LEGACY =
  "https://calendly.com/3birds/legacy-portrait-session";
export const CALENDLY_VIEWING =
  "https://calendly.com/3birds/viewing-and-ordering-sessions";
export const CALENDLY_CONSULT = "https://calendly.com/3birds/consultation";
export const CALENDLY_WEDDING =
  "https://calendly.com/3birds/wedding-photography-consult";

// The branded booking URLs (the links we own). Relative for in-site links,
// absolute for SMS/email/agents.
export const BOOK_OUTDOOR = "/book/outdoor";
export const BOOK_LEGACY = "/book/legacy";
export const BOOK_VIEWING = "/book/viewing";
export const BOOK_CONSULT = "/book/consult";
export const BOOK_WEDDING = "/book/wedding";
export const BOOK_OUTDOOR_URL = "https://3birdsstudio.com/book/outdoor";
export const BOOK_LEGACY_URL = "https://3birdsstudio.com/book/legacy";
export const BOOK_VIEWING_URL = "https://3birdsstudio.com/book/viewing";
export const BOOK_CONSULT_URL = "https://3birdsstudio.com/book/consult";
export const BOOK_WEDDING_URL = "https://3birdsstudio.com/book/wedding";

export const FACEBOOK_URL = "https://www.facebook.com/3birdsstudio";
export const INSTAGRAM_URL = "https://www.instagram.com/3.birds.studio";
export const WEBSITE_URL = "https://3birdsstudio.com";

export const STUDIO_ADDRESS = "6850 Mullan Way, Missoula, MT";

export const DEALERSHIPS = {
  honda: {
    name: "Denny Menholt University Honda",
    campaign: "honda",
    source: "3birds-honda-landing",
    shortName: "Honda",
  },
  lithia: {
    name: "Lithia Toyota of Missoula",
    campaign: "lithia",
    source: "3birds-lithia-landing",
    shortName: "Lithia Toyota",
  },
  goldenAge: {
    name: "Golden Age Couples",
    campaign: "golden-age",
    source: "3birds-golden-age-landing",
    shortName: "Golden Age",
  },
} as const;
