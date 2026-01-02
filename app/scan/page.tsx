'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import FileDropzone from "@/components/FileDropzone";
import MascotMark from "@/components/MascotMark";
import { useBlindspotStore } from "@/store/useBlindspotStore";
import { useAuthStore } from "@/store/useAuthStore";

const tabs = [
  { key: "pdf", label: "PDF" },
  { key: "image", label: "Photos" },
  { key: "url", label: "URL" },
  { key: "text", label: "Paste text" }
] as const;

export default function ScanPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("pdf");
  const [fileName, setFileName] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createJob = useBlindspotStore((s) => s.createJob);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const onSubmit = () => {
    setError(null);
    if (active === "pdf" || active === "image") {
      if (!fileName) {
        setError("Add a file to scan.");
        return;
      }
      const job = createJob({ type: active, filename: fileName });
      router.push(`/analyzing/${job.id}`);
      return;
    }
    if (active === "url") {
      const valid = /^https?:\/\/\S+$/i.test(url.trim());
      if (!valid) {
        setError("Enter a valid URL (https://example.com).");
        return;
      }
      const job = createJob({ type: "url", url: url.trim() });
      router.push(`/analyzing/${job.id}`);
      return;
    }
    if (active === "text") {
      if (!text.trim()) {
        setError("Paste a little text to analyze.");
        return;
      }
      const job = createJob({ type: "text", text: text.trim() });
      router.push(`/analyzing/${job.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center gap-3">
        <MascotMark size={40} />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Scan</p>
          <h1 className="text-3xl font-semibold text-white">Upload your material</h1>
          <p className="text-sm text-ink-300">PDFs, photos, URLs, or pasted text—pick your lane.</p>
        </div>
      </div>

      <div className="card border-white/10 bg-white/5 p-6 shadow-card">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActive(tab.key);
                setError(null);
              }}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active === tab.key
                  ? "bg-white text-[#0f1729] shadow"
                  : "border border-white/10 bg-white/5 text-ink-100 hover:border-white/20"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {active === "pdf" && (
            <FileDropzone
              label="Drop a PDF or click to browse"
              accept=".pdf"
              hint={fileName ? `Selected: ${fileName}` : "We only keep the name for this mock scan."}
              onFiles={(files) => setFileName(files[0]?.name ?? null)}
            />
          )}
          {active === "image" && (
            <FileDropzone
              label="Drop images of your notes"
              accept="image/*"
              hint={fileName ? `Selected: ${fileName}` : "PNG, JPG, HEIC welcome."}
              onFiles={(files) => setFileName(files[0]?.name ?? null)}
            />
          )}
          {active === "url" && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-ink-200">Article or doc URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/study-notes"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-ink-50 focus:border-brand-400/60 focus:outline-none"
              />
            </div>
          )}
          {active === "text" && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-ink-200">Paste a chunk of text</label>
              <textarea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Drop a tricky paragraph or two…"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-ink-50 focus:border-brand-400/60 focus:outline-none"
              />
            </div>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-rose-200">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-ink-300">We won’t send files anywhere—this is UI-only.</p>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-brand-400 px-6 py-3 text-sm font-semibold text-[#0f1729] shadow-lg shadow-brand-900/30 transition hover:-translate-y-0.5"
          >
            Scan for Blindspots
          </button>
        </div>
      </div>
    </div>
  );
}
