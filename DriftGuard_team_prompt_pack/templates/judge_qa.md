# Judge Q&A

## Is this just a linter?

No. A linter catches generic syntax or style violations. DriftGuard maps code changes to a product-specific design system: local tokens, shared components, markdown rules, and incident memory. It does not just say something is wrong; it explains why it drifted, classifies intent, and generates a patch.

## Is this just RAG?

No. RAG answers questions. DriftGuard performs codebase enforcement. The scanner first finds concrete evidence in code: hardcoded colors, arbitrary Tailwind values, and raw components. The reasoning layer receives only the relevant code excerpt, tokens, and matching rules. The output is a finding, classification, and patch — not a chat answer.

## Why Cursor?

Cursor accelerates multi-file AI code generation. That creates the exact problem DriftGuard solves: AI can ship UI quickly but bypass local design conventions. DriftGuard is built for that workflow: after Cursor changes the code, DriftGuard scans, explains, patches, and records memory.

## Why markdown rules?

Markdown rules are transparent, version-controlled, and agent-readable. They live beside the code, commit with the repo, and can be read by both humans and AI agents.

## What did you build during the hackathon?

We built the demo SaaS app, design tokens, markdown rules, scanner, findings format, reasoning prompt, patch generator, report UI, apply-fix flow, minimal Cursor command integration, and local markdown incident memory.

## What would you build next?

Next we would expand from design-system drift into architecture, API, and security guardrails; add lightweight on-save checks; and support shared organizational rule memory across repositories.

## Why not block saves live?

For the MVP, we use explicit Cursor commands so the demo is reliable and does not slow the IDE. The same engine can run on save for lightweight checks in production.
