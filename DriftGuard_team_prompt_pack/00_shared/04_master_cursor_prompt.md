# Master Cursor Prompt

Paste this once when bootstrapping the repo.

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
