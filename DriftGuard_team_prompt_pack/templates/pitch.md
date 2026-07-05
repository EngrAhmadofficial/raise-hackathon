# DriftGuard Pitch

## 10-second pitch

Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.

## 30-second pitch

AI agents can generate product UI in seconds, but they often bypass design systems: hardcoded colors, arbitrary spacing, raw buttons, inconsistent radius, and one-off typography. DriftGuard scans Cursor-generated changes, maps them against local tokens and markdown rules, explains the drift, and generates a patch to bring the code back into system alignment.

## 60-second pitch

DriftGuard is a Cursor-native design-system drift auditor. When Cursor or an AI agent modifies a React/Next.js product, DriftGuard scans the codebase for drift against local tokens, shared components, and markdown rules. It detects concrete evidence like hardcoded hex colors, arbitrary Tailwind values, and raw component misuse. Then it classifies whether the drift looks accidental or intentional, explains why it matters, generates a git-style patch, applies the fix, and records a markdown memory incident. It is not a chatbot and not basic RAG. It is a local codebase guardrail for the agentic development era.
