# DriftGuard: Elevator Pitches & Judge Q&A Guide

This document is your tactical handbook for pitching DriftGuard and handling judges' questions during the live hackathon demo or video submission.

---

## 1. Elevator Pitches

### The 10-Second Pitch (The Headline)
> "Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster."

### The 30-Second Pitch (The Problem & Solution)
> "AI-assisted tools like Cursor can generate beautiful product UI in seconds, but they frequently bypass design systems—introducing hardcoded colors, arbitrary Tailwind spacing, raw native buttons, and custom radius tokens. DriftGuard is a developer guardrail that runs native in the workspace. It scans Cursor-generated changes, maps them against local design tokens and markdown rules, explains the drift, and automatically generates and applies the patch to bring the codebase back into full compliance."

### The 60-Second Pitch (The Full Narrative)
> "DriftGuard is a Cursor-native design-system drift auditor and auto-patcher built for the agentic development era. When a developer or AI agent modifies a React or Next.js app, DriftGuard scans the codebase to find concrete evidence of drift—such as raw `<button>` elements, arbitrary spacing token scales, or hardcoded hex colors.
> 
> Instead of just printing a linter error, DriftGuard classifies whether the drift is an accidental regression or an intentional redesign. It then maps the incident to localized markdown rules, explains why the issue matters, generates a precise side-by-side git-style diff patch, and applies the fix directly in place. Finally, it commits a markdown incident summary into a local repository memory graph. DriftGuard isn't a simple chatbot or generic RAG—it's a deterministic codebase compliance engine that ensures design velocity never sacrifices design standards."

---

## 2. Judge Q&A Preparation

### Q1: Is this just a linter?
**A**: No. A traditional linter catches generic syntax errors, static typing mistakes, or code style guidelines. DriftGuard goes far beyond this by mapping code-level changes to a product-specific design system. It reads local token values (`tokens.json`), parses localized Markdown design guidelines (`.driftguard/rules`), classifies whether the violation is an accidental regression or an intentional redesign, generates a clean component swap, and tracks the permanent audit trail in a git-based memory graph.

### Q2: Is this just another RAG system?
**A**: Absolutely not. RAG systems are designed to answer natural language questions. DriftGuard is an automated codebase enforcement system. It operates on deterministic regex scanning to locate exact, concrete code violations. The reasoning layer only receives highly targeted excerpts of drifted code alongside matched design laws. The outcome is an actionable UI finding, an architectural classification, a git-style diff patch, and an automated component swap—not a generic conversational reply.

### Q3: Why is Cursor-native integration important?
**A**: AI-assisted coding tools like Cursor allow developers to perform multi-file modifications in seconds. This speed makes manual PR review of Tailwind overrides, un-tokenized spacing, and raw native HTML tags a bottleneck. By bringing DriftGuard native into the IDE via VS Code/Cursor commands, developers can check design system compliance on-the-fly and fix any drift instantly before committing or raising a pull request.

### Q4: Why are design rules represented as Markdown files?
**A**: Markdown files with YAML frontmatter are the perfect bridge between designers, developers, and AI agents. They are:
1. **Human-readable**: Designers can easily edit guidelines in their favorite docs editor.
2. **Developer-friendly**: They are version-controlled, git-trackable, and reside directly in the workspace beside the source code.
3. **Agent-readable**: Frontmatter metadata and wiki-style references are easily indexed by our scanner and AI parsing routines.

### Q5: What did your team build from scratch during this hackathon?
**A**: We built the complete end-to-end monorepo MVP:
1. **The Demo SaaS App**: A premium dark-themed billing dashboard with intentional design-system drift.
2. **The Scanner Engine**: A deterministic regex-based scanner parsing CSS, spacing, typography, and raw elements.
3. **The Markdown Rules Parser**: A framework reading `.driftguard/rules/*.md` files and matching rules to findings.
4. **The Patch Engine**: A deterministic algorithm that computes unified diffs and safely swaps raw styles for standard design primitives (Card, Button).
5. **The Web Report Dashboard**: A beautiful, responsive glassmorphic UI featuring a monospace diff viewer and a custom interactive SVG Memory Graph mapping incident nodes to active design standards.
6. **The VS Code/Cursor Extension**: IDE command registrations invoking monorepo CLI scripts.

### Q6: What is the future roadmap for DriftGuard?
**A**: Our immediate next steps are:
1. **Figma API Integration**: Automatically sync token parameters from Figma design libraries directly into `tokens.json`.
2. **On-Save Daemon**: Run lightweight background auditing on-save to alert the developer in the IDE instantly.
3. **Expanded Guardrails**: Apply the same Markdown rules-based verification to backend standards, database access controls (e.g., verifying that raw database queries do not exist inside React view layers), and API authorization routes.
