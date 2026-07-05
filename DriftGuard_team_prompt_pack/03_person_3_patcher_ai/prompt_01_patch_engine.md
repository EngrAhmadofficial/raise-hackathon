# Prompt — Build Patch Engine

```txt
You are Person 3 on DriftGuard.

Build the patch engine.

Context:
DriftGuard scans a Next.js/React app for design drift and generates a git-style patch that reconciles the code with the design system.

Create package:
packages/patcher

Files:
- src/generatePatch.ts
- src/applyPatch.ts
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

Keep the patcher deterministic and reliable.
```
