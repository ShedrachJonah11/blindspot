import { useEffect, useState } from "react";

const messages = [
  "Finding the sneaky parts…",
  "Spotting ‘looks easy but isn’t’ sections…",
  "Hunting confusing definitions…",
  "Marking likely exam twists…"
];

export default function AnalyzingProgress() {
  const [progress, setProgress] = useState(12);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(99, p + Math.random() * 12));
      setMessageIndex((m) => (m + 1) % messages.length);
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card w-full max-w-2xl border-white/10 bg-white/5 p-6 text-center shadow-card">
      <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Analyzing</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">We&apos;re spotting the tricky bits</h2>
      <p className="mt-1 text-sm text-ink-200">{messages[messageIndex]}</p>
      <div className="mt-6">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-brand-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-300">Progress {Math.round(progress)}%</p>
      </div>
    </div>
  );
}
