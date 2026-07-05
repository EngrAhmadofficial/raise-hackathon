# Prompt — Build Minimal Cursor Extension

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
```
