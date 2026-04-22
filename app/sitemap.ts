import type { MetadataRoute } from "next";

const BASE = "https://3birdsstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/missoula-montana-family-portraits`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/golden-age`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/win`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/honda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/lithia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/call`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
