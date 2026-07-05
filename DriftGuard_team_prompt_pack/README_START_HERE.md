# DriftGuard Team Prompt Pack

This folder is the working pack for building **DriftGuard** during the hackathon.

## Product decision

We are building:

> **DriftGuard: Cursor-native design-system drift detection and auto-patching.**

Use **DriftGraph** as the internal memory/graph engine, not the main product name.

## Winning demo flow

```txt
Cursor changes UI
→ DriftGuard scans project
→ detects design drift
→ explains why it matters
→ generates git-style patch
→ applies fix
→ records markdown memory incident
→ shows before/after
```

## Team split

```txt
Person 1 — Demo SaaS App + Design System
Person 2 — Scanner + Markdown Rules Engine
Person 3 — Patch Engine + AI Reasoning Prompt
Person 4 — Report UI + Memory Graph
Person 5 — Cursor Integration + Demo Orchestration
Optional Person 6 — Markdown Graph Parser / DriftGraph Owner
```

## Build rule

Everyone works against the same artifact:

```txt
findings.json
```

Scanner writes it. Patcher updates it. Report UI reads it. Cursor extension triggers scripts around it.

## Scope lock

Build the smallest polished vertical slice. Do **not** build auth, Supabase, cloud sync, multi-tenant SaaS, real-time save blocking, or Figma integration until the core demo is finished.

## How to use this pack

1. Each person opens their own folder.
2. Start with `README_person_X.md`.
3. Paste the first prompt into Cursor.
4. Use `technical_guide.md` to harden the implementation.
5. Use `acceptance_checklist.md` before handing off.
6. Person 5 owns final integration and rehearsal.

## Demo north star

A judge should understand the product in 15 seconds and see a real fix in 60 seconds.
