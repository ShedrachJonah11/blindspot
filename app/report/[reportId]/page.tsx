'use client';

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import BlindspotItemCard from "@/components/BlindspotItemCard";
import ReportSummaryChips from "@/components/ReportSummaryChips";
import { useBlindspotStore } from "@/store/useBlindspotStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function ReportPage() {
  const params = useParams<{ reportId: string }>();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const store = useBlindspotStore();
  const report = store.getReport(params.reportId);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const confidence = useMemo(() => store.getConfidence(params.reportId), [store, params.reportId]);

  if (!report) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg font-semibold text-white">Report not found</p>
        <Link href="/scan" className="mt-2 inline-block text-sm text-amber-200">
          Start a new scan
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card flex flex-col gap-4 border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Your Blindspot Report</p>
          <h1 className="text-3xl font-bold text-white mb-2">{report.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-300">
            <span>
              <span className="font-semibold text-ink-200">From:</span> <span className="text-white">{report.sourceLabel}</span>
            </span>
            <span>•</span>
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <Link
          href="/library"
          className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 hover:border-white/30"
        >
          ← Back to Library
        </Link>
      </div>

      <ReportSummaryChips report={report} />

      <div className="card border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-bold text-white">Your Progress</p>
            <p className="text-xs text-ink-300 mt-1">Mark items as "Got it" to track your confidence</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{Math.round(confidence * 100)}%</p>
            <p className="text-xs text-ink-300">Got it</p>
          </div>
        </div>
        <div className="h-4 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-500 shadow-lg shadow-emerald-500/30"
            style={{ width: `${Math.max(confidence * 100, 4)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-400">
          {report.items.filter(item => store.itemStatuses[item.id]?.status === "got_it").length} of {report.items.length} items marked as "Got it"
        </p>
      </div>

      <div className="space-y-4">
        {report.items.map((item) => {
          const status = store.itemStatuses[item.id]?.status ?? "unrated";
          return (
            <BlindspotItemCard
              key={item.id}
              item={item}
              status={status}
              onStatusChange={(s) => store.setItemStatus(item.id, s)}
            />
          );
        })}
      </div>
    </div>
  );
}
