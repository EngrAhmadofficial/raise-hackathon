# DriftGuard

> Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.

## What is DriftGuard?

DriftGuard is a Cursor-native design-system drift auditor. It scans a React/Next.js codebase, detects drift against local tokens and shared components, explains why the issue matters, generates a git-style patch, applies the fix, and records a markdown memory incident.

## Why Cursor needs it

AI agents can generate product UI quickly, but they often bypass local design conventions: hardcoded colors, arbitrary Tailwind values, raw buttons, inconsistent spacing, and one-off typography. DriftGuard catches that drift before it spreads.

## Demo flow

```txt
Cursor changes UI
→ DriftGuard scans project
→ detects drift
→ explains reasoning
→ generates patch
→ applies fix
→ shows before/after
→ records markdown incident
```

## Commands

```bash
npm run dev:demo
npm run dev:web
npm run driftguard:scan
npm run driftguard:patch
npm run driftguard:fix
```

## Hackathon scope

For the MVP, DriftGuard focuses on design-system drift because it is visual, painful, and demoable. The same markdown graph architecture can extend to security, API, and architecture guardrails.
