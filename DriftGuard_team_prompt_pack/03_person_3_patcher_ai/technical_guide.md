# Person 3 Technical Guide

## Strategy

Use deterministic replacement between known markers.

This is acceptable for the hackathon because the live demo needs reliability.

## Marker constants

```ts
const START = "{/* DRIFTGUARD_DEMO_DRIFT_START */}";
const END = "{/* DRIFTGUARD_DEMO_DRIFT_END */}";
```

## Replacement block

```tsx
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
```

## Import handling

Add these if missing:

```ts
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
```

Do not duplicate imports.

## Patch output

The diff should look like this:

```diff
diff --git a/apps/demo-saas/src/app/billing/page.tsx b/apps/demo-saas/src/app/billing/page.tsx
--- a/apps/demo-saas/src/app/billing/page.tsx
+++ b/apps/demo-saas/src/app/billing/page.tsx
@@
- <div className="p-[19px] rounded-[11px] bg-[#F8FAFF] border border-[#D6E4FF]">
+ <Card className="p-5 rounded-xl bg-surface">
...
-   <button className="mt-4 bg-[#2563eb] text-white px-[18px] py-[9px] rounded-[10px] text-[15px] font-medium shadow-sm">
+   <Button variant="primary" size="md" className="mt-4">
      Upgrade Plan
-   </button>
+   </Button>
- </div>
+ </Card>
```

## Commands

```bash
npm run driftguard:patch
npm run driftguard:fix
```

## Judge explanation

> For the hackathon MVP, patch application is deterministic for reliability. The system still demonstrates the full contract: detection, reasoning, diff generation, apply fix, and incident memory.
