import { BlindspotCategory, BlindspotItem, BlindspotReport, UploadJob } from "@/types";

const pick = <T>(arr: T[], index: number) => arr[index % arr.length];

function makeItems(job: UploadJob): BlindspotItem[] {
  const base: BlindspotItem[] = [
    {
      id: `${job.id}-c1`,
      category: "ConfusionPair",
      title: "Concept twins: A vs. B",
      whyTripsPeople: "Both show up in the same section and share jargon.",
      howToThink: "Label the units and definitions explicitly; contrast when to use each.",
      check: {
        kind: "mcq",
        prompt: "When you see both A and B mentioned, what should you check first?",
        options: ["Units and definitions", "Page color", "Longest term", "Which comes first"],
        correctIndex: 0,
        explanation: "Clarifying definitions and units prevents swapping them."
      },
      tags: ["confusion", "pairs"]
    },
    {
      id: `${job.id}-h1`,
      category: "HiddenCondition",
      title: "Edge-case clause",
      whyTripsPeople: "Small print flips the rule under certain ranges.",
      howToThink: "Spot inequality bounds and exceptions; rewrite them in your own words.",
      check: {
        kind: "short",
        prompt: "What should you do before applying a formula with bounds?",
        answer: "Check the allowed range",
        explanation: "Most mistakes come from using formulas outside their conditions."
      },
      tags: ["bounds", "exceptions"]
    },
    {
      id: `${job.id}-t1`,
      category: "TrickyRephrase",
      title: "Reworded definition trap",
      whyTripsPeople: "Same concept phrased with inverted order misleads direction.",
      howToThink: "Translate to symbolic form; compare to the original statement.",
      check: {
        kind: "mcq",
        prompt: "If a statement is rephrased, what keeps you safe?",
        options: ["Memory only", "Symbolic rewrite", "Guess tone", "Skip it"],
        correctIndex: 1,
        explanation: "Symbolic rewriting exposes reversals."
      },
      tags: ["language", "logic"]
    },
    {
      id: `${job.id}-e1`,
      category: "ExamTwist",
      title: "Data pivot twist",
      whyTripsPeople: "Question swaps axes or units, so intuition points wrong way.",
      howToThink: "Rebuild the relationship with the given labels before answering.",
      check: {
        kind: "mcq",
        prompt: "Axes swapped—first move?",
        options: ["Answer fast", "Redraw with labels", "Pick middle option", "Ignore units"],
        correctIndex: 1,
        explanation: "Relabeling restores the correct relationship."
      },
      tags: ["graphs", "units"]
    }
  ];

  const bonus: BlindspotItem[] = [
    {
      id: `${job.id}-c2`,
      category: "ConfusionPair",
      title: "Similar symbols, different meaning",
      whyTripsPeople: "Greek letters and subscript versions look interchangeable.",
      howToThink: "Create a quick legend; highlight units or roles for each symbol.",
      check: {
        kind: "mcq",
        prompt: "What distinguishes similar symbols the fastest?",
        options: ["Color", "Units/roles", "Alphabet position", "Font size"],
        correctIndex: 1,
        explanation: "Units and roles anchor the meaning."
      },
      tags: ["symbols", "notation"]
    },
    {
      id: `${job.id}-h2`,
      category: "HiddenCondition",
      title: "Initial conditions missing",
      whyTripsPeople: "Assuming defaults when none are stated.",
      howToThink: "List given conditions; if initial values are absent, mark them as variables.",
      check: {
        kind: "short",
        prompt: "Before solving differential setups, what should you confirm?",
        answer: "Initial conditions or boundaries",
        explanation: "They change the specific solution."
      },
      tags: ["setup", "differential"]
    }
  ];

  const variants: Record<BlindspotCategory, string[]> = {
    ConfusionPair: ["Method vs. formula", "Definition swap", "Input vs. parameter"],
    HiddenCondition: ["Domain guardrails", "Boundary cases", "When rule flips"],
    TrickyRephrase: ["Only-if twist", "Double-negative phrasing", "Sneaky synonym"],
    ExamTwist: ["Unit trap", "Graph flip", "Edge-case distractor"]
  };

  const selected =
    job.type === "url" || job.url
      ? base.concat([pick(bonus, job.id.length)])
      : job.type === "pdf"
        ? base.concat(bonus)
        : job.type === "image"
          ? base
          : base.slice(0, 3);

  return selected.map((item, idx) => ({
    ...item,
    title: `${item.title} ${pick(variants[item.category], idx + job.id.length).toLowerCase()}`
  }));
}

export async function analyzeMaterial(job: UploadJob): Promise<BlindspotReport> {
  const items = makeItems(job);
  const stats = items.reduce(
    (acc, item) => {
      acc.total += 1;
      if (item.category === "ConfusionPair") acc.confusionPairs += 1;
      if (item.category === "HiddenCondition") acc.hiddenConditions += 1;
      if (item.category === "TrickyRephrase") acc.trickyRephrases += 1;
      if (item.category === "ExamTwist") acc.examTwists += 1;
      return acc;
    },
    { total: 0, confusionPairs: 0, hiddenConditions: 0, trickyRephrases: 0, examTwists: 0 }
  );

  const sourceLabel =
    job.type === "pdf"
      ? job.filename ?? "Uploaded PDF"
      : job.type === "image"
        ? job.filename ?? "Uploaded images"
        : job.type === "url"
          ? job.url ?? "Shared link"
          : "Pasted text";

  return Promise.resolve({
    id: `report-${job.id}`,
    jobId: job.id,
    title: `Blindspot Report · ${sourceLabel}`,
    sourceLabel,
    createdAt: new Date().toISOString(),
    items,
    stats
  });
}
