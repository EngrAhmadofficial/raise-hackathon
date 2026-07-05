# Shared DriftFinding Schema

Everyone must use this exact contract.

```ts
export type DriftFinding = {
  id: string;
  title: string;
  file: string;
  component: string;
  driftType:
    | "token_mismatch"
    | "component_misuse"
    | "state_inconsistency"
    | "visual_regression"
    | "spacing_drift"
    | "typography_drift"
    | "intentional_redesign"
    | "platform_constraint";
  severity: "low" | "medium" | "high";
  evidence: string;
  tokenExpected?: string;
  actualValue?: string;
  reasoning?: string;
  suggestedFix?: string;
  patch?: string;
  confidence: number;
};
```

## Example finding

```json
{
  "id": "drift-001",
  "title": "Billing CTA bypasses design system",
  "file": "apps/demo-saas/src/app/billing/page.tsx",
  "component": "BillingUpgradeCard",
  "driftType": "component_misuse",
  "severity": "high",
  "evidence": "Raw <button> uses bg-[#2563eb], px-[18px], py-[9px], rounded-[10px], text-[15px].",
  "tokenExpected": "Button variant=\"primary\" size=\"md\"",
  "actualValue": "Raw button with arbitrary Tailwind values",
  "reasoning": "This is likely accidental regression. The change is localized to one billing CTA while the rest of the app uses shared Button and Card primitives.",
  "suggestedFix": "Replace the raw button and arbitrary classes with Button and Card components.",
  "patch": "- <button ...>\n+ <Button variant=\"primary\" size=\"md\">",
  "confidence": 0.94
}
```
