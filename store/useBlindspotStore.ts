import { create } from "zustand";
import { analyzeMaterial } from "@/lib/services/analyze";
import { BlindspotReport, UploadJob, UploadType, UserItemStatus } from "@/types";
import { exampleReport } from "@/data/exampleReport";

type JobInput = {
  type: UploadType;
  filename?: string;
  url?: string;
  text?: string;
};

interface BlindspotStore {
  jobs: UploadJob[];
  reports: BlindspotReport[];
  itemStatuses: Record<string, UserItemStatus>;
  createJob: (input: JobInput) => UploadJob;
  analyzeJob: (jobId: string) => Promise<BlindspotReport>;
  setItemStatus: (itemId: string, status: UserItemStatus["status"]) => void;
  getReport: (reportId: string) => BlindspotReport | undefined;
  getReports: () => BlindspotReport[];
  getConfidence: (reportId: string) => number;
  getGotItCount: (reportId: string) => number;
}

const makeId = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2, 8)}`);

export const useBlindspotStore = create<BlindspotStore>((set, get) => ({
  jobs: [],
  reports: [exampleReport],
  itemStatuses: exampleReport.items.reduce<Record<string, UserItemStatus>>((acc, item) => {
    acc[item.id] = { itemId: item.id, status: "unrated" };
    return acc;
  }, {}),
  createJob: (input) => {
    const job: UploadJob = {
      id: makeId(),
      type: input.type,
      filename: input.filename,
      url: input.url,
      text: input.text,
      createdAt: new Date().toISOString()
    };
    set((state) => ({ jobs: [job, ...state.jobs] }));
    return job;
  },
  analyzeJob: async (jobId) => {
    const job = get().jobs.find((j) => j.id === jobId);
    if (!job) throw new Error("Job not found");
    const report = await analyzeMaterial(job);
    set((state) => ({
      reports: [report, ...state.reports],
      itemStatuses: {
        ...state.itemStatuses,
        ...report.items.reduce<Record<string, UserItemStatus>>((acc, item) => {
          acc[item.id] = { itemId: item.id, status: "unrated" };
          return acc;
        }, {})
      }
    }));
    return report;
  },
  setItemStatus: (itemId, status) =>
    set((state) => ({
      itemStatuses: {
        ...state.itemStatuses,
        [itemId]: { itemId, status }
      }
    })),
  getReport: (reportId) => get().reports.find((r) => r.id === reportId),
  getReports: () => get().reports,
  getConfidence: (reportId) => {
    const report = get().reports.find((r) => r.id === reportId);
    if (!report) return 0;
    const gotIt = report.items.filter(
      (item) => get().itemStatuses[item.id]?.status === "got_it"
    ).length;
    return report.items.length === 0 ? 0 : gotIt / report.items.length;
  },
  getGotItCount: (reportId: string) => {
    const report = get().reports.find((r) => r.id === reportId);
    if (!report) return 0;
    return report.items.filter((item) => get().itemStatuses[item.id]?.status === "got_it").length;
  }
}));
