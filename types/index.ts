// Blindspot data models
export type UploadType = "pdf" | "image" | "url" | "text";

export interface UploadJob {
  id: string;
  type: UploadType;
  filename?: string;
  url?: string;
  text?: string;
  createdAt: string;
}

export type BlindspotCategory = "ConfusionPair" | "HiddenCondition" | "TrickyRephrase" | "ExamTwist";

export type QuickCheck =
  | {
      kind: "mcq";
      prompt: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }
  | {
      kind: "short";
      prompt: string;
      answer: string;
      explanation: string;
    };

export interface BlindspotItem {
  id: string;
  category: BlindspotCategory;
  title: string;
  whyTripsPeople: string;
  howToThink: string;
  check: QuickCheck;
  tags: string[];
}

export interface BlindspotReport {
  id: string;
  jobId: string;
  title: string;
  sourceLabel: string;
  createdAt: string;
  items: BlindspotItem[];
  stats: {
    total: number;
    confusionPairs: number;
    hiddenConditions: number;
    trickyRephrases: number;
    examTwists: number;
  };
}

export interface UserItemStatus {
  itemId: string;
  status: "got_it" | "not_yet" | "unrated";
}
