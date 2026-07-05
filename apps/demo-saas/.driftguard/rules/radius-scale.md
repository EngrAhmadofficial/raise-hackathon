---
id: "radius-scale"
type: "rule"
category: "design"
detector: "arbitrary-radius"
severity_threshold: "medium"
target_paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
links:
  - [[button-standard]]
---

# Radius Scale

Do not use arbitrary radius values such as `rounded-[11px]`.

Use the design-system radius scale.

## Violation examples

```tsx
<div className="rounded-[11px]" />
<button className="rounded-[10px]" />
```

## Fix pattern

```tsx
<Card className="rounded-xl" />
<Button size="md" />
```
