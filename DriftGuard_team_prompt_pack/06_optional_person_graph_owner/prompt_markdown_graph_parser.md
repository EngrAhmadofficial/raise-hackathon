# Prompt — Markdown Graph Parser

```txt
You are the DriftGuard markdown graph owner.

Implement the local DriftGraph memory layer.

Create markdown rules in apps/demo-saas/.driftguard/rules and incident files in apps/demo-saas/.driftguard/incidents.

Implement packages/scanner/src/markdownRules.ts.

It should:
- read markdown files
- parse YAML frontmatter
- extract id, type, category, severity_threshold, target_paths, links
- extract wiki-links like [[button-standard]]
- return a graph JSON object:

{
  "nodes": [
    { "id": string, "label": string, "group": string, "severity"?: string }
  ],
  "edges": [
    { "source": string, "target": string, "relation": string }
  ]
}

Create a static graph fallback for the demo:
- drift-001 -> button-standard
- drift-001 -> color-tokens
- drift-001 -> spacing-scale
- drift-001 -> radius-scale
- drift-001 -> typography-scale

Keep it local. No database. No Supabase. No cloud sync.
```
