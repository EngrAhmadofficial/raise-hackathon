# Person 4 Technical Guide

## Layout structure

Suggested page sections:

```txt
Hero
Scan Summary
Detected Drift
Why This Matters
Suggested Patch
Apply Fix
Memory Graph
Before / After
```

## UI copy

Use:

```txt
DriftGuard
Cursor-native design drift detection and auto-patching
Scan Workspace
Generate Patch
Apply Fix
Accidental Regression
Token Mismatch
Component Misuse
```

## API safety

Use only fixed commands. Do not accept arbitrary command strings from the client.

```ts
const allowed = {
  scan: ["npm", ["run", "driftguard:scan"]],
  patch: ["npm", ["run", "driftguard:patch"]],
  apply: ["npm", ["run", "driftguard:fix"]]
};
```

## Diff display

Render patch strings with monospace formatting.

Minimum visual improvement:

```txt
lines starting with + look distinct
lines starting with - look distinct
file headers look muted
```

## Memory graph

Keep it simple. SVG or CSS layout is enough.

## Empty state

If no findings:

```txt
No drift found. This workspace is currently aligned with the design system.
```

## Loading state

Buttons should show:

```txt
Scanning...
Generating patch...
Applying fix...
```
