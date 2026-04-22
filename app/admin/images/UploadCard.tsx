"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface UploadCardProps {
  imageKey: string;
  title: string;
  subtitle: string;
  currentSrc: string;
  fromBlob: boolean;
  uploadedAt?: string;
  blobConfigured: boolean;
}

export default function UploadCard({
  imageKey,
  title,
  subtitle,
  currentSrc,
  fromBlob,
  uploadedAt,
  blobConfigured,
}: UploadCardProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    setError("");
    setSuccess("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedFile) {
      setError("Pick an image first.");
      return;
    }
    setUploading(true);
    setError("");
    setSuccess("");

    const fd = new FormData();
    fd.append("key", imageKey);
    fd.append("file", selectedFile);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || `Upload failed (HTTP ${res.status})`);
      } else {
        setSuccess("Uploaded. The live page will pick it up within a minute.");
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        // Refresh the server component so "Current" reflects the new blob.
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
            Currently live
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSrc}
              alt={title}
              className="w-full h-auto max-h-64 object-contain"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {fromBlob ? (
              <>
                Blob &middot;{" "}
                {uploadedAt
                  ? new Date(uploadedAt).toLocaleString()
                  : "recently uploaded"}
              </>
            ) : (
              <>Committed fallback (public/images/{imageKey}.jpg)</>
            )}
          </p>
        </div>

        {/* Upload */}
        <form onSubmit={onSubmit}>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
            Upload new
          </p>
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 bg-gray-50 min-h-[160px] flex items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-full h-auto max-h-56 object-contain rounded-lg"
              />
            ) : (
              <p className="text-sm text-gray-400 text-center px-4">
                Pick a JPEG, PNG, or WebP up to 5 MB. The new image replaces
                the live one everywhere that voucher is shown.
              </p>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            disabled={!blobConfigured || uploading}
            className="block w-full mt-3 text-sm text-gray-500 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-teal/10 file:text-teal file:font-semibold hover:file:bg-teal/20 file:cursor-pointer"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mt-3">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2 mt-3">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={!blobConfigured || !selectedFile || uploading}
            className="w-full mt-4 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Replace live image"}
          </button>
        </form>
      </div>
    </section>
  );
}
