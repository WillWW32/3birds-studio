import type { Metadata } from "next";
import {
  getSwappableImages,
  SWAPPABLE_IMAGE_KEYS,
} from "@/lib/voucher-image";
import UploadCard from "./UploadCard";

export const metadata: Metadata = {
  title: "Image Admin",
  robots: { index: false, follow: false },
};

// Always render fresh so Jesse sees the latest upload state.
export const dynamic = "force-dynamic";

const HUMAN_LABELS: Record<string, { title: string; subtitle: string }> = {
  "voucher-honda": {
    title: "Honda gift voucher",
    subtitle: "Shown as the focal image on /honda and honda.3birdsstudio.com",
  },
  "voucher-lithia": {
    title: "Lithia Toyota gift voucher",
    subtitle: "Shown as the focal image on /lithia and lithia.3birdsstudio.com",
  },
  "review-screenshot": {
    title: "5-star review screenshot (Footer)",
    subtitle:
      "Shown at the bottom of the footer on every page. Upload a screenshot of a Google review for maximum trust.",
  },
};

export default async function AdminImagesPage() {
  const images = await getSwappableImages(SWAPPABLE_IMAGE_KEYS);
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            3 Birds Studio &middot; Admin
          </p>
          <h1 className="font-display text-3xl font-bold text-black mb-2">
            Landing page images
          </h1>
          <p className="text-gray-600">
            Upload a new image to swap the gift voucher shown on the Honda or
            Lithia landing pages. JPEG, PNG, or WebP. Max 5 MB. Changes appear
            on the live page within about a minute.
          </p>
          {!blobConfigured && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
              <strong className="font-semibold">Blob storage is not configured.</strong>{" "}
              Uploads are disabled until <code className="bg-amber-100 px-1 rounded">BLOB_READ_WRITE_TOKEN</code>{" "}
              is set on this Vercel deployment. See{" "}
              <a
                href="https://vercel.com/docs/storage/vercel-blob"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Vercel Blob docs
              </a>
              .
            </div>
          )}
        </header>

        <div className="space-y-6">
          {SWAPPABLE_IMAGE_KEYS.map((key) => {
            const img = images[key];
            const label = HUMAN_LABELS[key];
            return (
              <UploadCard
                key={key}
                imageKey={key}
                title={label?.title ?? key}
                subtitle={label?.subtitle ?? ""}
                currentSrc={img.src}
                fromBlob={img.fromBlob}
                uploadedAt={img.uploadedAt}
                blobConfigured={blobConfigured}
              />
            );
          })}
        </div>

        <footer className="mt-10 text-xs text-gray-400">
          Signed in via HTTP Basic. Close the tab to sign out.
        </footer>
      </div>
    </div>
  );
}
