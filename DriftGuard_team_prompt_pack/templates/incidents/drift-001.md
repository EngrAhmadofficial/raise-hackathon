---
id: "drift-001"
type: "incident"
drift_type: "token_mismatch"
file_path: "src/app/billing/page.tsx"
component: "BillingUpgradeCard"
intent: "accidental_regression"
severity: "high"
links:
  - [[button-standard]]
  - [[color-tokens]]
  - [[spacing-scale]]
  - [[radius-scale]]
  - [[typography-scale]]
---

# Billing CTA Token Drift

Cursor introduced hardcoded brand color, arbitrary spacing, arbitrary radius, arbitrary typography, and raw button usage in the billing upgrade card.

DriftGuard classified this as accidental regression because the change was localized while the rest of the app uses shared primitives and semantic tokens.

The issue was reconciled by replacing raw styles with the Button and Card components.
