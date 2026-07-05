---
id: "button-standard"
type: "rule"
category: "design"
severity_threshold: "high"
target_paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
links:
  - [[color-tokens]]
  - [[spacing-scale]]
  - [[radius-scale]]
---

# Button Standard

All product CTAs must use `src/components/ui/Button.tsx`.

Raw `<button>` elements are only allowed inside the Button primitive itself.

## Why this matters

Raw buttons drift quickly because AI-generated code often hardcodes colors, spacing, radius, hover states, and typography instead of reusing the design system.

## Fix pattern

Use:

```tsx
<Button variant="primary" size="md">
  Upgrade Plan
</Button>
```
