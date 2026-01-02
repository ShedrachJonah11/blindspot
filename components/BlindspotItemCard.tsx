import { useState } from "react";
import clsx from "clsx";
import QuickCheckPanel from "./QuickCheckPanel";
import StatusToggle from "./StatusToggle";
import { BlindspotItem, UserItemStatus } from "@/types";
import { ConfusionPairIcon, HiddenConditionIcon, TrickyRephraseIcon, ExamTwistIcon } from "./ReportIcons";

const categoryStyles: Record<string, { style: string; label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  ConfusionPair: {
    style: "bg-blue-500/20 text-blue-200 border-blue-400/50",
    label: "Confusion Pair",
    Icon: ConfusionPairIcon
  },
  HiddenCondition: {
    style: "bg-amber-500/20 text-amber-200 border-amber-400/50",
    label: "Hidden Condition",
    Icon: HiddenConditionIcon
  },
  TrickyRephrase: {
    style: "bg-purple-500/20 text-purple-200 border-purple-400/50",
    label: "Tricky Rephrase",
    Icon: TrickyRephraseIcon
  },
  ExamTwist: {
    style: "bg-red-500/20 text-red-200 border-red-400/50",
    label: "Exam Twist",
    Icon: ExamTwistIcon
  }
};

export default function BlindspotItemCard({
  item,
  status,
  onStatusChange
}: {
  item: BlindspotItem;
  status: UserItemStatus["status"];
  onStatusChange: (status: UserItemStatus["status"]) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const category = categoryStyles[item.category];

  return (
    <div className="card border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-card">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold", category.style)}>
            <category.Icon className="w-3.5 h-3.5" />
            <span>{category.label}</span>
          </span>
          <StatusToggle value={status} onChange={onStatusChange} />
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
      
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
        <p className="text-sm leading-relaxed text-ink-200">
          <span className="font-bold text-white">Why this is tricky:</span> {item.whyTripsPeople}
        </p>
      </div>

      {expanded && (
        <div className="mt-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-300 mb-2">How to handle it</p>
            <p className="text-sm leading-relaxed text-ink-200">{item.howToThink}</p>
          </div>
          {item.tags.length > 0 && (
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs font-semibold text-ink-300 mb-2">Topics:</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs text-ink-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4">
        <QuickCheckPanel check={item.check} />
      </div>
    </div>
  );
}
