# Mock findings.json

Use this immediately so the UI can be built before the scanner is ready.

```json
[
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
    "patch": "- <button className=\"bg-[#2563eb] text-white px-[18px] py-[9px] rounded-[10px] text-[15px]\">\n-   Upgrade Plan\n- </button>\n+ <Button variant=\"primary\" size=\"md\">\n+   Upgrade Plan\n+ </Button>",
    "confidence": 0.94
  }
]
```
