# Prompt — Build Scanner Package

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

Do not call an LLM.
Keep it deterministic and reliable for a live demo.
```
