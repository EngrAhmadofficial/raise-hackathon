# Prompt — Harden Patch Engine

```txt
Harden the DriftGuard patcher for a live demo.

Requirements:
- If findings.json does not exist, create [] and continue gracefully.
- If drift markers are missing, throw a clear error explaining the marker names.
- If imports already exist, do not duplicate them.
- If only one import exists, add the missing one.
- Preserve file formatting as much as possible.
- Add useful console output:
  - Generated patch for apps/demo-saas/src/app/billing/page.tsx
  - Applied patch successfully
  - Wrote incident drift-001.md
- Do not add external dependencies unless necessary.
- Keep deterministic string replacement.

Also make sure npm run driftguard:patch does not modify source code, only findings.json.
```
