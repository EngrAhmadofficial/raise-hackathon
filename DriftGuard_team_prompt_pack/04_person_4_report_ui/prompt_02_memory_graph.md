# Prompt — Build Memory Graph

```txt
Create a simple MemoryGraph component in apps/web.

Do not use a complex graph library unless already installed.

Render nodes as cards/circles connected by simple CSS lines or a lightweight SVG.

Show these nodes:
- drift-001: Billing CTA Token Drift
- button-standard
- color-tokens
- spacing-scale
- radius-scale
- typography-scale

Edges:
- drift-001 -> button-standard: misused
- drift-001 -> color-tokens: mismatched
- drift-001 -> spacing-scale: violated
- drift-001 -> radius-scale: violated
- drift-001 -> typography-scale: violated

Visual style:
- incident node should look prominent
- rule nodes should look connected
- use labels like "violated", "mismatched", "misused"
- make it visually impressive enough for a demo, but keep implementation simple

No heavy graph library required.
```
