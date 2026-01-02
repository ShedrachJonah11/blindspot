# Blindspot

Upload your study material and get a playful “Blindspot Report” that highlights confusing bits—no backend, no AI calls here, just polished UI with mock analysis.

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Structure
- `app/` – Routes for landing, scan/upload, analyzing, report, library, and example demo.
- `components/` – UI blocks (mascot mark, dropzone, summary chips, blindspot cards, quick checks).
- `data/exampleReport.ts` – Prebuilt demo report for onboarding.
- `store/useBlindspotStore.ts` – Zustand store for upload jobs, reports, and item statuses.
- `lib/services/analyze.ts` – Placeholder analyzer returning deterministic mock reports.
- `types/index.ts` – Domain types for uploads, reports, and quick checks.

## Flow
1) `/scan` – Upload PDF/photo, add a URL, or paste text. Creates an `UploadJob`.
2) `/analyzing/[jobId]` – Playful progress screen, then calls the mock analyzer.
3) `/report/[reportId]` – Blindspot Report with confusion pairs, hidden conditions, rephrasings, exam twists, quick checks, and Got it/Not yet toggles (confidence bar updates).
4) `/library` – Saved reports for the session. `/example` shows a demo without uploading.

## Backend Hook
Replace `analyzeMaterial` in `lib/services/analyze.ts` with a real pipeline (OpenAI/LLM or your service) and persist reports/statuses behind the Zustand store contracts in `useBlindspotStore.ts`. Keep the shapes defined in `types/index.ts`.
