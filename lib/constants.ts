export const WEBHOOK_URL =
  "https://starfish-production-c267.up.railway.app/api/webhook/lead";

export const STUDIO_PHONE = "406-239-3442";
export const STUDIO_PHONE_TEL = "tel:+14062393442";
export const DENISE_PHONE = "406-926-7354";
export const DENISE_PHONE_TEL = "tel:+14069267354";

export const CALENDLY_OUTDOOR = "https://calendly.com/3birds/outdoor-portraits";
export const CALENDLY_LEGACY =
  "https://calendly.com/3birds/legacy-portrait-session";

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
