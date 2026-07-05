# Person 5 Technical Guide

## Extension commands

Minimum commands:

```txt
DriftGuard: Scan Workspace
DriftGuard: Open Report
DriftGuard: Generate Patch
DriftGuard: Apply Fix
```

## Do not implement yet

```txt
onWillSaveTextDocument
save blocking
multi-file agent queue
background daemon
cloud sync
```

## Why command-based is okay

Use this explanation:

> For the MVP, we use explicit Cursor commands so the demo is reliable and does not slow the IDE. The same engine can run on save for lightweight checks in production.

## Root scripts

Make sure these work from root:

```bash
npm run dev:demo
npm run dev:web
npm run driftguard:scan
npm run driftguard:patch
npm run driftguard:fix
```

## Demo rehearsal flow

```txt
1. Start demo app on 3000.
2. Start report app on 3001.
3. Open Cursor.
4. Show billing page.
5. Show drift block.
6. Run extension command or CLI.
7. Open report.
8. Generate patch.
9. Apply fix.
10. Refresh billing page.
11. Open incident markdown.
```

## Final line

> Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.
