'use client';

import Link from "next/link";
import BlindspotItemCard from "@/components/BlindspotItemCard";
import MascotMark from "@/components/MascotMark";
import ReportSummaryChips from "@/components/ReportSummaryChips";
import { exampleReport } from "@/data/exampleReport";
import { useBlindspotStore } from "@/store/useBlindspotStore";

export default function ExamplePage() {
  const store = useBlindspotStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MascotMark size={40} />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Example</p>
          <h1 className="text-3xl font-semibold text-white">Demo Blindspot Report</h1>
          <p className="text-sm text-ink-300">Preview the vibe before you upload.</p>
        </div>
        <Link
          href="/scan"
          className="ml-auto rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-brand-400 px-5 py-2 text-sm font-semibold text-[#0f1729]"
        >
          Upload & Scan
        </Link>
      </div>

      <ReportSummaryChips report={exampleReport} />

      <div className="grid gap-4 md:grid-cols-2">
        {exampleReport.items.map((item) => (
          <BlindspotItemCard
            key={item.id}
            item={item}
            status={store.itemStatuses[item.id]?.status ?? "unrated"}
            onStatusChange={(s) => store.setItemStatus(item.id, s)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Want more?</p>
          <p className="text-xs text-ink-300">Open this report in the full view.</p>
        </div>
        <Link
          href={`/report/${exampleReport.id}`}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-ink-100 hover:border-white/40 hover:text-white"
        >
          View full example →
        </Link>
      </div>
    </div>
  );
}
