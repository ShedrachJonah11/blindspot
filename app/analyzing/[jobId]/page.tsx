'use client';

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AnalyzingProgress from "@/components/AnalyzingProgress";
import MascotMark from "@/components/MascotMark";
import { useBlindspotStore } from "@/store/useBlindspotStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function AnalyzingPage() {
  const params = useParams<{ jobId: string }>();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const analyzeJob = useBlindspotStore((s) => s.analyzeJob);
  const jobs = useBlindspotStore((s) => s.jobs);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const job = jobs.find((j) => j.id === params.jobId);
    if (!job) {
      router.replace("/scan");
      return;
    }
    const timer = setTimeout(async () => {
      const report = await analyzeJob(job.id);
      router.push(`/report/${report.id}`);
    }, 1200 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, [analyzeJob, jobs, params.jobId, router, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const job = jobs.find((j) => j.id === params.jobId);
  if (!job) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg font-semibold text-white">Upload not found</p>
        <p className="text-sm text-ink-300">Start a new scan.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
      <MascotMark size={56} />
      <AnalyzingProgress />
      <p className="text-sm text-ink-300">
        Source: <span className="text-white">{job.filename ?? job.url ?? "Pasted text"}</span>
      </p>
    </div>
  );
}
