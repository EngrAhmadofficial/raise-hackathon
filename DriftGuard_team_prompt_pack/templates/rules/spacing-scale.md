---
id: "spacing-scale"
type: "rule"
category: "design"
severity_threshold: "medium"
target_paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
links:
  - [[button-standard]]
---

# Spacing Scale

Do not use arbitrary Tailwind spacing values such as `p-[19px]`, `px-[18px]`, or `py-[9px]` in product UI.

Use the spacing scale.

## Violation examples

```tsx
<div className="p-[19px]" />
<button className="px-[18px] py-[9px]" />
```

## Fix pattern

```tsx
<Card className="p-5" />
<Button size="md" />
```
