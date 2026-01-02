'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReportCard from "@/components/ReportCard";
import MascotMark from "@/components/MascotMark";
import { useBlindspotStore } from "@/store/useBlindspotStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function LibraryPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const reports = useBlindspotStore((s) => s.getReports());
  const getGotIt = useBlindspotStore((s) => s.getGotItCount);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MascotMark size={40} />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Library</p>
          <h1 className="text-3xl font-semibold text-white">Saved Blindspot Reports</h1>
          <p className="text-sm text-ink-300">Revisit your scans anytime.</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="card border-white/10 bg-white/5 p-6 text-center">
          <p className="text-lg font-semibold text-white">No reports yet.</p>
          <p className="text-sm text-ink-300">Drop something in Scan to create your first Blindspot Report.</p>
          <Link
            href="/scan"
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-brand-400 px-5 py-2 text-sm font-semibold text-[#0f1729]"
          >
            Go to Scan
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} gotItCount={getGotIt(report.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
