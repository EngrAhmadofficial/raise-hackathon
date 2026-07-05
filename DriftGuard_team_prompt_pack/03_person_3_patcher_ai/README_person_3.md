# Person 3 — Patch Engine + AI Reasoning Prompt

## Mission

Build the "wow" moment: DriftGuard generates a patch and applies it.

The patcher can be deterministic and demo-specific. Reliability is more important than generality.

## Owns

```txt
packages/patcher
generatePatch.ts
applyPatch.ts
reasoningPrompt.ts
patch fields in findings.json
incident write after fix
```

## Start here

1. Paste `prompt_01_patch_engine.md` into Cursor.
2. Paste `prompt_02_reasoning_prompt.md`.
3. Use `prompt_03_hardening_patch.md` after initial implementation.
4. Use `technical_guide.md` to verify deterministic replacement.
5. Use `acceptance_checklist.md` before handoff.
