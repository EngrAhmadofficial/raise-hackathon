# DriftGuard — All Cursor Prompts Consolidated

Use this file when you want all prompts in one place. The same prompts are also split by person in the numbered folders.

---

## Master Repo Prompt

```txt
We are building DriftGuard for a hackathon.

Product:
DriftGuard is a Cursor-native design-system drift auditor. It scans a React/Next.js product, detects design drift against local tokens and shared components, explains why the issue matters, classifies whether the drift is accidental or intentional, generates a git-style patch, applies the fix, and records a local markdown memory incident.

Winning demo:
Cursor changes UI -> DriftGuard scans -> detects drift -> explains reasoning -> generates patch -> applies fix -> shows before/after -> records markdown incident.

Build the smallest polished vertical slice.

Tech:
- Next.js
- React
- TypeScript
- Tailwind
- npm workspaces
- local JSON findings
- markdown rules
- deterministic scanner
- deterministic patcher
- optional LLM prompt file, but no required API dependency

Repo structure:
driftguard/
  apps/demo-saas
  apps/web
  packages/scanner
  packages/patcher
  extension

Root scripts:
- dev:demo
- dev:web
- driftguard:scan
- driftguard:patch
- driftguard:fix

Do not build:
- auth
- database
- Supabase
- cloud sync
- multi-tenant dashboard
- complex AST parsing
- real-time save blocking
- Figma integration

Build:
1. Demo SaaS billing dashboard with shared Button/Card components.
2. tokens.json.
3. Intentional drift block in billing page.
4. .driftguard/rules markdown files.
5. Scanner that outputs findings.json.
6. Patcher that generates and applies a git-style diff.
7. Web report UI with scan, patch, apply buttons.
8. Markdown incident writer.
9. Minimal extension commands.

The intentional drift must include:
- bg-[#2563eb]
- p-[19px]
- px-[18px]
- py-[9px]
- rounded-[11px]
- rounded-[10px]
- text-[15px]
- raw <button>

The fix should replace raw styling with:
<Card className="p-5 rounded-xl bg-surface">
  <Button variant="primary" size="md">
    Upgrade Plan
  </Button>
</Card>

Make the demo beautiful and reliable.
```

---

## Person 1 Prompt — Demo SaaS App

```txt
You are Person 1 on DriftGuard.

Build the demo SaaS app.

Context:
DriftGuard is a Cursor-native design-system drift auditor. The winning demo is:
Cursor creates design drift -> DriftGuard scans -> explains -> patches -> shows before/after.

Your job:
Create a polished Next.js App Router + TypeScript + Tailwind demo SaaS app in apps/demo-saas.

Build:
- src/app/page.tsx
- src/app/billing/page.tsx
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- tokens.json

The /billing page should look like a modern B2B SaaS billing/settings page with:
- sidebar navigation
- header
- current plan card
- usage card
- team seats card
- invoices table
- upgrade CTA card

Create a design system:
Button:
- variant="primary" | "secondary" | "ghost"
- size="sm" | "md" | "lg"

Card:
- reusable shell with className support

Important:
Intentionally introduce design drift only in the billing upgrade CTA card.

The drift block must be wrapped exactly with:

{/* DRIFTGUARD_DEMO_DRIFT_START */}
...
{/* DRIFTGUARD_DEMO_DRIFT_END */}

Inside that block include:
- bg-[#2563eb]
- p-[19px]
- px-[18px]
- py-[9px]
- rounded-[11px]
- rounded-[10px]
- text-[15px]
- raw <button>

The rest of the page should use the shared Button and Card components correctly.

Do not add auth, database, Supabase, or external services.
Make the page visually polished and demo-ready.
```

---

## Person 2 Prompt — Scanner + Rules

```txt
You are Person 2 on DriftGuard.

Build the scanner and markdown rules engine.

Context:
DriftGuard is a Cursor-native design-system drift auditor. The scanner must deterministically find design drift in a Next.js/React codebase and write findings.json.

Create package:
packages/scanner

Files:
- src/types.ts
- src/scan.ts
- src/rules.ts
- src/markdownRules.ts
- src/writeIncident.ts
- src/index.ts

Use TypeScript.

Implement DriftFinding type exactly:

export type DriftFinding = {
  id: string;
  title: string;
  file: string;
  component: string;
  driftType:
    | "token_mismatch"
    | "component_misuse"
    | "state_inconsistency"
    | "visual_regression"
    | "spacing_drift"
    | "typography_drift"
    | "intentional_redesign"
    | "platform_constraint";
  severity: "low" | "medium" | "high";
  evidence: string;
  tokenExpected?: string;
  actualValue?: string;
  reasoning?: string;
  suggestedFix?: string;
  patch?: string;
  confidence: number;
};

Scanner requirements:
- scan apps/demo-saas/src
- include .tsx and .ts files
- ignore node_modules and .next
- write findings.json at repo root

Detect:
1. hardcoded hex colors: /#[0-9A-Fa-f]{3,8}/
2. arbitrary Tailwind spacing:
   /(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-\[[^\]]+\]/
3. arbitrary radius:
   /rounded-\[[^\]]+\]/
4. arbitrary text size:
   /text-\[[^\]]+\]/
5. raw button:
   /<button[\s>]/
6. direct DB access:
   /db\.(insert|update|delete|query)|prisma\.[a-zA-Z]+\.(create|update|delete)/
7. missing validateSession in src/app/api routes that export POST, PUT, PATCH, or DELETE

Map detections to DriftFinding objects with strong demo-friendly reasoning and suggestedFix fields.

Create markdown rules in:
apps/demo-saas/.driftguard/rules

Files:
- button-standard.md
- color-tokens.md
- spacing-scale.md
- radius-scale.md
- typography-scale.md
- auth-middleware.md
- repository-standard.md

Each rule must have YAML frontmatter:
id
type: "rule"
category
severity_threshold
target_paths
links

Create apps/demo-saas/.driftguard/incidents as an empty directory.

Implement writeIncident.ts:
- given findings, create apps/demo-saas/.driftguard/incidents/drift-001.md
- include YAML frontmatter
- include wiki-links to violated rules
- include a concise markdown explanation

Do not call an LLM.
Keep it deterministic and reliable for a live demo.
```

---

## Person 3 Prompt — Patch Engine + Reasoning Prompt

```txt
You are Person 3 on DriftGuard.

Build the patch engine and reasoning prompt.

Context:
DriftGuard scans a Next.js/React app for design drift and generates a git-style patch that reconciles the code with the design system.

Create package:
packages/patcher

Files:
- src/generatePatch.ts
- src/applyPatch.ts
- src/reasoningPrompt.ts
- src/index.ts

Target demo file:
apps/demo-saas/src/app/billing/page.tsx

The file contains a drift block:

{/* DRIFTGUARD_DEMO_DRIFT_START */}
...
{/* DRIFTGUARD_DEMO_DRIFT_END */}

generatePatch.ts:
- read the target file
- find the drift block
- generate a git-style diff replacing raw arbitrary Tailwind styles with shared Card and Button components
- return the diff as a string
- write that diff into every relevant finding.patch inside findings.json

Replacement block:

{/* DRIFTGUARD_DEMO_DRIFT_START */}
<Card className="p-5 rounded-xl bg-surface">
  <div>
    <p className="text-sm font-medium text-slate-900">
      Upgrade to Pro
    </p>
    <p className="mt-1 text-sm text-slate-500">
      Unlock advanced AI usage and team controls.
    </p>
  </div>

  <Button variant="primary" size="md" className="mt-4">
    Upgrade Plan
  </Button>
</Card>
{/* DRIFTGUARD_DEMO_DRIFT_END */}

applyPatch.ts:
- perform deterministic string replacement between the markers
- make sure imports exist:
  import { Button } from "@/components/ui/Button";
  import { Card } from "@/components/ui/Card";
- do not duplicate imports if already present
- write the updated file
- call the scanner incident writer if available, or write drift-001.md directly

index.ts:
- support CLI arguments:
  generate
  apply

Commands should support:
npm run driftguard:patch
npm run driftguard:fix

reasoningPrompt.ts:
Export buildReasoningPrompt(input) that returns a prompt for an LLM.

The LLM should return strict JSON only:

{
  "intent": "accidental_regression" | "intentional_redesign" | "platform_constraint",
  "summary": string,
  "whyItMatters": string,
  "suggestedFix": string,
  "confidence": number
}

Prompt identity:
You are DriftGuard, a design-system drift auditor. You classify whether code changes violate local design-system rules and explain how to reconcile them. Prefer practical fixes that reuse existing tokens and shared components.

Rules:
- Localized drift contradicting existing components = accidental_regression
- Broad coordinated token/component changes = intentional_redesign
- Framework/browser limitation = platform_constraint
- Do not invent unavailable components
- Keep explanations concise and judge-demo friendly

Do not call a real LLM API. Just create the prompt builder.
Keep the patcher deterministic and reliable.
```

---

## Person 4 Prompt — Report UI

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

API behavior:
GET /api/scan:
- read findings.json from repo root
- return [] if missing

POST /api/scan:
- run npm run driftguard:scan from repo root
- return findings.json

POST /api/patch:
- run npm run driftguard:patch from repo root
- return findings.json

POST /api/apply:
- run npm run driftguard:fix from repo root
- return findings.json and success true

MemoryGraph:
Do not use a heavy graph library.
Render a simple visual graph using cards/circles and SVG or CSS.
Nodes:
- drift-001: Billing CTA Token Drift
- button-standard
- color-tokens
- spacing-scale
- radius-scale
- typography-scale

Edges:
- drift-001 -> button-standard: misused
- drift-001 -> color-tokens: mismatched
- drift-001 -> spacing-scale: violated
- drift-001 -> radius-scale: violated
- drift-001 -> typography-scale: violated

Make it demo-ready and beautiful.
No auth. No database. No Supabase. No cloud sync.
```

---

## Person 5 Prompt — Cursor Integration + Demo Docs

```txt
You are Person 5 on DriftGuard.

Build the Cursor/VS Code integration and demo materials.

Context:
DriftGuard is a Cursor-native design-system drift auditor. The core demo already works through CLI and web report. Your job is to make it feel native to Cursor and make the final presentation bulletproof.

Part 1: Root scripts
Ensure root package.json has scripts:
- dev:demo
- dev:web
- driftguard:scan
- driftguard:patch
- driftguard:fix

Part 2: Minimal Cursor/VS Code extension
Create extension/ with:
- package.json
- tsconfig.json
- src/extension.ts

Register commands:
1. driftguard.scanWorkspace
   Display name: DriftGuard: Scan Workspace
   Behavior: run npm run driftguard:scan in the workspace root and show success/error message.

2. driftguard.openReport
   Display name: DriftGuard: Open Report
   Behavior: open http://localhost:3001 in external browser.

3. driftguard.generatePatch
   Display name: DriftGuard: Generate Patch
   Behavior: run npm run driftguard:patch.

4. driftguard.applyFix
   Display name: DriftGuard: Apply Fix
   Behavior: run npm run driftguard:fix.

Do not implement onWillSaveTextDocument yet.
Do not block saves.
Keep it reliable for live demo.

Part 3: README
Create README.md with:
- What is DriftGuard?
- Why Cursor needs it
- Demo flow
- Features
- Architecture
- Local setup
- Commands
- Finding schema
- Example drift
- Example patch
- Hackathon scope
- Future roadmap

Use this pitch:
Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.

Part 4: demo-script.md
Write a 90-second live demo script:
- show app
- ask Cursor to modify billing card
- show drift
- run DriftGuard scan
- show findings
- generate patch
- apply fix
- show before/after
- show markdown incident memory

Part 5: pitch.md
Write:
- 10-second pitch
- 30-second pitch
- 60-second pitch
- judge Q&A answers:
  - Is this just a linter?
  - Is this just RAG?
  - Why Cursor?
  - Why markdown rules?
  - What did you build during the hackathon?
  - What would you build next?

Keep all copy sharp, confident, and hackathon-ready.
```
