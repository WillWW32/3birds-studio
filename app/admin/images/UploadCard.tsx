"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
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

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024;

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
  const [dragging, setDragging] = useState(false);

  function acceptFile(file: File | null | undefined): boolean {
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return false;
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      setError(
        `Unsupported file type (${file.type || "unknown"}). Use JPEG, PNG, or WebP.`,
      );
      return false;
    }
    if (file.size > MAX_BYTES) {
      setError(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 5 MB.`,
      );
      return false;
    }
    setError("");
    setSuccess("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    return true;
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    acceptFile(e.target.files?.[0]);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (!blobConfigured || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (acceptFile(file)) {
      // Mirror the dropped file into the file input so native form behavior
      // stays consistent (Enter-to-submit, re-submit after error, etc.).
      if (file && fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInputRef.current.files = dt.files;
      }
    }
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!blobConfigured || uploading) {
      e.dataTransfer.dropEffect = "none";
      return;
    }
    e.dataTransfer.dropEffect = "copy";
    if (!dragging) setDragging(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  function onZoneClick() {
    if (!blobConfigured || uploading) return;
    fileInputRef.current?.click();
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

          <div
            role="button"
            tabIndex={blobConfigured && !uploading ? 0 : -1}
            aria-disabled={!blobConfigured || uploading}
            aria-label="Drop an image here or click to pick one"
            onClick={onZoneClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onZoneClick();
              }
            }}
            onDragOver={onDragOver}
            onDragEnter={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={[
              "rounded-xl border-2 border-dashed p-4 min-h-[160px] flex items-center justify-center transition-colors outline-none",
              !blobConfigured || uploading
                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                : dragging
                  ? "border-teal bg-teal/5 cursor-copy ring-2 ring-teal/30"
                  : "border-gray-200 bg-gray-50 hover:border-teal/40 hover:bg-teal/5 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal/40",
            ].join(" ")}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-full h-auto max-h-56 object-contain rounded-lg pointer-events-none"
              />
            ) : (
              <div className="text-center px-4 pointer-events-none">
                <p className="text-sm text-gray-500 mb-1">
                  {dragging ? (
                    <strong className="text-teal">Drop to replace</strong>
                  ) : (
                    <>
                      <span className="font-semibold text-navy">
                        Drag &amp; drop
                      </span>{" "}
                      an image here, or click to pick one
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  JPEG, PNG, or WebP &middot; max 5 MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            disabled={!blobConfigured || uploading}
            className="sr-only"
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

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              disabled={!blobConfigured || !selectedFile || uploading}
              className="flex-1 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Replace live image"}
            </button>
            {selectedFile && !uploading && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                  setError("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="px-4 py-3 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>

          {selectedFile && (
            <p className="text-xs text-gray-400 mt-3 truncate">
              Selected: {selectedFile.name} (
              {(selectedFile.size / 1024).toFixed(0)} KB)
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
