# Optional Person 6 Technical Guide

## Minimal graph data

```json
{
  "nodes": [
    { "id": "drift-001", "label": "Billing CTA Token Drift", "group": "incident", "severity": "high" },
    { "id": "button-standard", "label": "Button Standard", "group": "rule" },
    { "id": "color-tokens", "label": "Color Tokens", "group": "token" },
    { "id": "spacing-scale", "label": "Spacing Scale", "group": "token" },
    { "id": "radius-scale", "label": "Radius Scale", "group": "token" },
    { "id": "typography-scale", "label": "Typography Scale", "group": "token" }
  ],
  "edges": [
    { "source": "drift-001", "target": "button-standard", "relation": "misused" },
    { "source": "drift-001", "target": "color-tokens", "relation": "mismatched" },
    { "source": "drift-001", "target": "spacing-scale", "relation": "violated" },
    { "source": "drift-001", "target": "radius-scale", "relation": "violated" },
    { "source": "drift-001", "target": "typography-scale", "relation": "violated" }
  ]
}
```

## Cycle detection is optional

If you implement it, use DFS with visited states:

```txt
unvisited
visiting
visited
```

If cycle detection is not done, do not traverse recursively. Static graph is enough for demo.
