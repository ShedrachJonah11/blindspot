import Link from "next/link";
import { BlindspotReport } from "@/types";
import MascotMark from "./MascotMark";

export default function ReportCard({ report, gotItCount }: { report: BlindspotReport; gotItCount: number }) {
  return (
    <Link
      href={`/report/${report.id}`}
      className="card flex flex-col gap-3 border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-brand-300/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MascotMark size={36} />
          <div>
            <p className="text-sm text-ink-200">{new Date(report.createdAt).toLocaleDateString()}</p>
            <h3 className="text-lg font-semibold text-white">{report.title}</h3>
          </div>
        </div>
        <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-50">
          {gotItCount}/{report.stats.total} got it
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-ink-300">
        <span className="rounded-full bg-white/10 px-3 py-1">Total: {report.stats.total}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Confusion pairs: {report.stats.confusionPairs}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Hidden conditions: {report.stats.hiddenConditions}</span>
      </div>
    </Link>
  );
}
