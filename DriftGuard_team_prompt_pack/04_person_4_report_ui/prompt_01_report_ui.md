# Prompt — Build Report UI

```txt
You are Person 4 on DriftGuard.

Build the report UI.

Context:
DriftGuard is a Cursor-native design-system drift auditor. The report UI should make the demo understandable to judges:
scan project -> detect drift -> explain reasoning -> generate patch -> apply fix -> show memory graph.

Create app:
apps/web

Use:
- Next.js App Router
- TypeScript
- Tailwind
- local filesystem reads
- local API routes

Build files:
- app/page.tsx
- app/api/scan/route.ts
- app/api/patch/route.ts
- app/api/apply/route.ts
- components/FindingCard.tsx
- components/PatchPreview.tsx
- components/MemoryGraph.tsx
- components/SeverityBadge.tsx
- components/DriftTypeBadge.tsx

UI requirements:
- polished SaaS-style interface
- title: DriftGuard
- subtitle: Cursor-native design drift detection and auto-patching
- hero section with short explanation
- Scan Summary card
- Detected Drift list
- each finding card shows:
  - title
  - severity
  - driftType
  - file
  - component
  - evidence
  - reasoning
  - suggestedFix
  - confidence
- patch preview with diff formatting
- buttons:
  - Run Scan
  - Generate Patch
  - Apply Fix
- Memory Graph section

Make it demo-ready and beautiful.
No auth. No database. No Supabase. No cloud sync.
```
