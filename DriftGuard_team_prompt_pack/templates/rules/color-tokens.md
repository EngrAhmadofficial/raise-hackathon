---
id: "color-tokens"
type: "rule"
category: "design"
severity_threshold: "high"
target_paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
links:
  - [[button-standard]]
---

# Color Tokens

Do not use hardcoded hex colors in JSX `className` strings.

Use semantic Tailwind tokens mapped from `tokens.json`.

## Violation examples

```tsx
<div className="bg-[#2563eb]" />
<div className="border-[#D6E4FF]" />
```

## Fix pattern

Use semantic classes or shared components:

```tsx
<Button variant="primary" size="md" />
<Card className="bg-surface" />
```
