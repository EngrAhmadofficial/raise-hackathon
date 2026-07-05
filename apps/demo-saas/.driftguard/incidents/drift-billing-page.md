---
id: "drift-billing-page"
type: "incident"
drift_type: "component_misuse"
file_path: "apps/demo-saas/src/app/billing/page.tsx"
component: "BillingPage"
detected_at: "2026-07-04T14:37:07.238Z"
severity: "high"
finding_count: 5
occurrence_count: 17
links:
  - [[button-standard]]
  - [[color-tokens]]
  - [[radius-scale]]
  - [[spacing-scale]]
  - [[typography-scale]]
---

# Drift incident: BillingPage

DriftGuard detected 5 rule violation(s) (17 occurrence(s)) in `apps/demo-saas/src/app/billing/page.tsx`.

## Button Standard: raw <button> element

Severity: **high** · Rule: `button-standard` · Confidence: 92%

Detected 3 occurrence(s) of raw <button> element in apps/demo-saas/src/app/billing/page.tsx (<button), violating the "Button Standard" rule. All product CTAs must use `src/components/ui/Button.tsx`.

- Line 73, col 13: `<button` → `<Button variant="primary" size="md">`
- Line 76, col 13: `<button` → `<Button variant="primary" size="md">`
- Line 186, col 17: `<button` → `<Button variant="primary" size="md">`

## Color Tokens: hardcoded hex color

Severity: **high** · Rule: `color-tokens` · Confidence: 97%

Detected 4 occurrence(s) of hardcoded hex color in apps/demo-saas/src/app/billing/page.tsx (bg-[#030712], bg-[#101a31], border-[#1c2a44], bg-[#2563eb]), violating the "Color Tokens" rule. Do not use hardcoded hex colors in JSX `className` strings.

- Line 20, col 35: `bg-[#030712]` → `bg-slate-950`
- Line 176, col 55: `bg-[#101a31]` → `bg-brand-surface`
- Line 176, col 75: `border-[#1c2a44]` → `border-slate-800`
- Line 186, col 41: `bg-[#2563eb]` → `bg-brand-primary`

## Radius Scale: arbitrary border radius

Severity: **medium** · Rule: `radius-scale` · Confidence: 95%

Detected 2 occurrence(s) of arbitrary border radius in apps/demo-saas/src/app/billing/page.tsx (rounded-[11px], rounded-[10px]), violating the "Radius Scale" rule. Do not use arbitrary radius values such as `rounded-[11px]`.

- Line 176, col 40: `rounded-[11px]` → `rounded-lg`
- Line 186, col 84: `rounded-[10px]` → `rounded-md`

## Spacing Scale: arbitrary spacing value

Severity: **medium** · Rule: `spacing-scale` · Confidence: 95%

Detected 3 occurrence(s) of arbitrary spacing value in apps/demo-saas/src/app/billing/page.tsx (p-[19px], px-[18px], py-[9px]), violating the "Spacing Scale" rule. Do not use arbitrary Tailwind spacing values such as `p-[19px]`, `px-[18px]`, or `py-[9px]` in product UI.

- Line 176, col 31: `p-[19px]` → `p-5`
- Line 186, col 65: `px-[18px]` → `px-4`
- Line 186, col 75: `py-[9px]` → `py-2`

## Typography Scale: arbitrary font size

Severity: **medium** · Rule: `typography-scale` · Confidence: 95%

Detected 5 occurrence(s) of arbitrary font size in apps/demo-saas/src/app/billing/page.tsx (text-[10px], text-[15px]), violating the "Typography Scale" rule. Do not use arbitrary text sizes such as `text-[15px]`.

- Line 136, col 127: `text-[10px]` → `text-xs`
- Line 137, col 128: `text-[10px]` → `text-xs`
- Line 138, col 126: `text-[10px]` → `text-xs`
- Line 178, col 33: `text-[15px]` → `text-sm`
- Line 186, col 99: `text-[15px]` → `text-sm`
