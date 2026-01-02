import { BlindspotReport } from "@/types";

export const exampleReport: BlindspotReport = {
  id: "example-report",
  jobId: "example-job",
  title: "Sample Physics + Logic Notes",
  sourceLabel: "Uploaded PDF",
  createdAt: new Date().toISOString(),
  items: [
    {
      id: "ex-1",
      category: "ConfusionPair",
      title: "Velocity vs. Acceleration",
      whyTripsPeople: "Both use similar units and change over time; easy to mix rate with change-of-rate.",
      howToThink: "Velocity is change of position; acceleration is change of velocity. If velocity changes direction, acceleration exists even when speed is constant.",
      check: {
        kind: "mcq",
        prompt: "A car moves at constant speed around a curve. Acceleration?",
        options: ["Zero", "Non-zero, direction change", "Only if speeding up", "Only if slowing down"],
        correctIndex: 1,
        explanation: "Turning changes velocity vector, so acceleration is non-zero."
      },
      tags: ["kinematics", "vectors"]
    },
    {
      id: "ex-2",
      category: "HiddenCondition",
      title: "Domain checks before logs",
      whyTripsPeople: "Algebra steps ignore that log inputs must be positive.",
      howToThink: "Before simplifying, mark domain: inside of ln(x-2) > 0 ⇒ x > 2. Reject solutions outside.",
      check: {
        kind: "short",
        prompt: "Solve ln(x-2)=0. Valid x?",
        answer: "x = 3",
        explanation: "e^0 = 1 ⇒ x-2 = 1 ⇒ x = 3, which satisfies x > 2."
      },
      tags: ["calculus", "algebra"]
    },
    {
      id: "ex-3",
      category: "TrickyRephrase",
      title: "Only if vs. If",
      whyTripsPeople: "Language feels symmetric; adds false reverse logic.",
      howToThink: "'Only if B' means A ⇒ B. Do not assume B ⇒ A.",
      check: {
        kind: "mcq",
        prompt: "'A only if B' translates to:",
        options: ["A ⇒ B and B ⇒ A", "A ⇒ B", "B ⇒ A", "Neither"],
        correctIndex: 1,
        explanation: "Only-if supplies a necessary condition."
      },
      tags: ["logic", "reading"]
    },
    {
      id: "ex-4",
      category: "ExamTwist",
      title: "Graph axes swap",
      whyTripsPeople: "Assume time is x-axis; reversed axes flip interpretation.",
      howToThink: "Read labels first; if time is vertical, slopes flip meaning.",
      check: {
        kind: "mcq",
        prompt: "If time is on y-axis and concentration on x-axis, a downward slope means?",
        options: ["Concentration drops over time", "Time decreases", "Concentration constant", "No relationship"],
        correctIndex: 0,
        explanation: "As time increases (upwards), concentration decreases."
      },
      tags: ["data", "graphs"]
    }
  ],
  stats: {
    total: 4,
    confusionPairs: 1,
    hiddenConditions: 1,
    trickyRephrases: 1,
    examTwists: 1
  }
};
