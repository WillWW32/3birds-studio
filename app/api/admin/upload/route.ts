import { NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { SWAPPABLE_IMAGE_KEYS, type SwappableImageKey } from "@/lib/voucher-image";

/**
 * POST /api/admin/upload
 *
 * multipart/form-data with fields:
 *   - key: one of SWAPPABLE_IMAGE_KEYS
 *   - file: image (jpeg, png, or webp, max 5 MB)
 *
 * Auth: enforced by middleware (HTTP Basic). This handler also double-checks
 * the Blob token is configured and validates the upload before writing.
 *
 * Behavior: timestamps the blob pathname so a bad upload can be rolled back
 * by re-uploading the previous image (old blobs remain accessible via
 * /admin/images history). getSwappableImage() picks the most-recent blob.
 */

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function extFromMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "bin";
}

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob is not configured. Set BLOB_READ_WRITE_TOKEN in Vercel env vars." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const key = form.get("key");
  const file = form.get("file");

  if (typeof key !== "string" || !SWAPPABLE_IMAGE_KEYS.includes(key as SwappableImageKey)) {
    return NextResponse.json(
      {
        error: `Invalid key. Expected one of: ${SWAPPABLE_IMAGE_KEYS.join(", ")}`,
      },
      { status: 400 },
    );
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type ${file.type}. Use JPEG, PNG, or WebP.` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 5 MB.` },
      { status: 413 },
    );
  }

  const ext = extFromMime(file.type);
  const pathname = `vouchers/${key}-${Date.now()}.${ext}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Trim old blobs beyond the 5 most recent per key so the bucket does not
    // grow forever. The latest one keeps being rendered by the landing page.
    try {
      const { blobs } = await list({
        prefix: `vouchers/${key}`,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const sorted = blobs
        .slice()
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
        );
      const stale = sorted.slice(5);
      if (stale.length > 0) {
        await Promise.all(
          stale.map((b) =>
            del(b.url, { token: process.env.BLOB_READ_WRITE_TOKEN }),
          ),
        );
      }
    } catch (cleanupErr) {
      // Cleanup is best-effort; do not fail the upload over it.
      console.error("[admin/upload] history cleanup failed:", cleanupErr);
    }

    return NextResponse.json({
      ok: true,
      key,
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[admin/upload] put() failed:", e);
    return NextResponse.json(
      { error: "Upload failed. Check server logs." },
      { status: 500 },
    );
  }
}
