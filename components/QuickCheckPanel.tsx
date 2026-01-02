import { useState } from "react";
import clsx from "clsx";
import { QuickCheck } from "@/types";

interface Props {
  check: QuickCheck;
}

export default function QuickCheckPanel({ check }: Props) {
  const [selection, setSelection] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (check.kind === "mcq") {
      if (selection === null) return;
      const isCorrect = selection === check.correctIndex;
      setCorrect(isCorrect);
      setSubmitted(true);
    } else {
      const isCorrect = input.trim().toLowerCase() === check.answer.trim().toLowerCase();
      setCorrect(isCorrect);
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Quick check</p>
        {submitted && correct !== null && (
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-semibold",
              correct ? "bg-emerald-400/20 text-emerald-50" : "bg-rose-500/20 text-rose-100"
            )}
          >
            {correct ? "Nice!" : "Try again"}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-ink-200">{check.prompt}</p>

      {check.kind === "mcq" ? (
        <div className="mt-3 space-y-2">
          {check.options.map((option, idx) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelection(idx)}
              className={clsx(
                "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                selection === idx
                  ? "border-brand-300 bg-brand-400/20 text-white"
                  : "border-white/10 bg-white/5 text-ink-100 hover:border-white/20"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-ink-50 focus:border-brand-400/60 focus:outline-none"
            placeholder="Type your answer"
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
        >
          {check.kind === "mcq" ? "Check answer" : "Reveal"}
        </button>
        {submitted && <span className="text-xs text-ink-300">Explanation below</span>}
      </div>

      {submitted && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-ink-200">
          {check.kind === "short" && (
            <p className="mb-2">
              <span className="font-semibold text-white">Answer:</span> {check.answer}
            </p>
          )}
          <p>{check.explanation}</p>
        </div>
      )}
    </div>
  );
}
