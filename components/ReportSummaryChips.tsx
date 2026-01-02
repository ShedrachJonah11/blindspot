import clsx from "clsx";
import { BlindspotReport } from "@/types";
import { ConfusionPairIcon, HiddenConditionIcon, TrickyRephraseIcon, ExamTwistIcon } from "./ReportIcons";

const colorMap = {
  confusionPairs: { style: "bg-blue-500/20 text-blue-200 border-blue-400/50", Icon: ConfusionPairIcon },
  hiddenConditions: { style: "bg-amber-500/20 text-amber-200 border-amber-400/50", Icon: HiddenConditionIcon },
  trickyRephrases: { style: "bg-purple-500/20 text-purple-200 border-purple-400/50", Icon: TrickyRephraseIcon },
  examTwists: { style: "bg-red-500/20 text-red-200 border-red-400/50", Icon: ExamTwistIcon }
};

export default function ReportSummaryChips({ report }: { report: BlindspotReport }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-ink-300">Found in your material:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Chip 
          label="Confusion Pairs" 
          description="Easy to mix up"
          value={report.stats.confusionPairs} 
          color={colorMap.confusionPairs} 
        />
        <Chip 
          label="Hidden Conditions" 
          description="Easy to miss"
          value={report.stats.hiddenConditions} 
          color={colorMap.hiddenConditions} 
        />
        <Chip 
          label="Tricky Rephrases" 
          description="Wording traps"
          value={report.stats.trickyRephrases} 
          color={colorMap.trickyRephrases} 
        />
        <Chip 
          label="Exam Twists" 
          description="Common tricks"
          value={report.stats.examTwists} 
          color={colorMap.examTwists} 
        />
      </div>
    </div>
  );
}

function Chip({ label, description, value, color }: { label: string; description: string; value: number; color: { style: string; Icon: React.ComponentType<{ className?: string }> } }) {
  return (
    <div className={clsx("flex items-center gap-3 rounded-xl border px-5 py-4 w-full", color.style)}>
      <color.Icon className="w-6 h-6 flex-shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        <span className="text-xs opacity-80">{description}</span>
      </div>
    </div>
  );
}
