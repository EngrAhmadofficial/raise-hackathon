---
id: "typography-scale"
type: "rule"
category: "design"
detector: "arbitrary-font-size"
severity_threshold: "medium"
target_paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
links:
  - [[button-standard]]
---

# Typography Scale

Do not use arbitrary text sizes such as `text-[15px]`.

Use the typography scale or component variants.

## Violation example

```tsx
<p className="text-[15px]" />
```

## Fix pattern

```tsx
<p className="text-sm" />
<Button size="md" />
```
