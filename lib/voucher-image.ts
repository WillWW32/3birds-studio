import { list } from "@vercel/blob";

/**
 * Keys for images that can be swapped from the /admin/images panel.
 * Add a new entry here, then add a matching committed fallback file
 * under public/images/ named `${KEY}.jpg` to keep the page working
 * before anyone has uploaded a new version.
 */
export const SWAPPABLE_IMAGE_KEYS = [
  "voucher-honda",
  "voucher-lithia",
  "review-screenshot",
] as const;

export type SwappableImageKey = (typeof SWAPPABLE_IMAGE_KEYS)[number];

export interface SwappableImage {
  key: SwappableImageKey;
  /** The URL to render. Either a Blob URL or the committed fallback. */
  src: string;
  /** true when the image is served from Vercel Blob (uploaded by admin). */
  fromBlob: boolean;
  /** ISO date of last upload when fromBlob is true. */
  uploadedAt?: string;
}

function fallback(key: SwappableImageKey): SwappableImage {
  return {
    key,
    src: `/images/${key}.jpg`,
    fromBlob: false,
  };
}

/**
 * Returns the current image for the given key. Reads Vercel Blob if a
 * token is configured; otherwise returns the committed fallback in
 * public/images/. Designed so the page still works on local dev and on
 * Vercel deploys without the Blob integration enabled.
 *
 * Callers should set `export const revalidate = 60` (or similar) on the
 * page so fresh uploads propagate within a minute.
 */
export async function getSwappableImage(
  key: SwappableImageKey,
): Promise<SwappableImage> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return fallback(key);
  }
  try {
    const { blobs } = await list({
      prefix: `vouchers/${key}`,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (blobs.length === 0) return fallback(key);
    // Pick the most recently uploaded blob. Admin uploads use a timestamped
    // pathname so each upload creates a new blob instead of overwriting.
    const latest = blobs
      .slice()
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      )[0];
    return {
      key,
      src: latest.url,
      fromBlob: true,
      uploadedAt: new Date(latest.uploadedAt).toISOString(),
    };
  } catch (e) {
    // Never crash a landing page because Blob had a bad day.
    console.error(`[voucher-image] list() failed for ${key}:`, e);
    return fallback(key);
  }
}

/**
 * Fetch multiple swappable images in one call so a page can Promise.all
 * them together.
 */
export async function getSwappableImages(
  keys: readonly SwappableImageKey[],
): Promise<Record<SwappableImageKey, SwappableImage>> {
  const entries = await Promise.all(
    keys.map(async (k) => [k, await getSwappableImage(k)] as const),
  );
  return Object.fromEntries(entries) as Record<
    SwappableImageKey,
    SwappableImage
  >;
}
