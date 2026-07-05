# Person 2 — Scanner + Markdown Rules Engine

## Mission

Build the deterministic engine that finds drift.

The scanner must produce real `findings.json` output without relying on an LLM.

## Owns

```txt
packages/scanner
apps/demo-saas/.driftguard/rules/*.md
apps/demo-saas/.driftguard/incidents/
findings.json generation
markdown incident writer
```

## Start here

1. Paste `prompt_01_scanner_package.md` into Cursor.
2. Paste `prompt_02_markdown_rules.md` to create the rule files.
3. Paste `prompt_03_incident_writer.md` to create memory writing.
4. Use `technical_guide.md` to harden regex behavior.
5. Use `acceptance_checklist.md` before handoff.
