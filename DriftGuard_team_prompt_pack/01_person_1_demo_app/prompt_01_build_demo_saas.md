# Prompt — Build Demo SaaS App

```txt
You are Person 1 on DriftGuard.

Build the demo SaaS app.

Context:
DriftGuard is a Cursor-native design-system drift auditor. The winning demo is:
Cursor creates design drift -> DriftGuard scans -> explains -> patches -> shows before/after.

Your job:
Create a polished Next.js App Router + TypeScript + Tailwind demo SaaS app in apps/demo-saas.

Build:
- src/app/page.tsx
- src/app/billing/page.tsx
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- tokens.json

The /billing page should look like a modern B2B SaaS billing/settings page with:
- sidebar navigation
- header
- current plan card
- usage card
- team seats card
- invoices table
- upgrade CTA card

Create a design system:
Button:
- variant="primary" | "secondary" | "ghost"
- size="sm" | "md" | "lg"

Card:
- reusable shell with className support

Important:
Intentionally introduce design drift only in the billing upgrade CTA card.

The drift block must be wrapped exactly with:

{/* DRIFTGUARD_DEMO_DRIFT_START */}
...
{/* DRIFTGUARD_DEMO_DRIFT_END */}

Inside that block include:
- bg-[#2563eb]
- p-[19px]
- px-[18px]
- py-[9px]
- rounded-[11px]
- rounded-[10px]
- text-[15px]
- raw <button>

The rest of the page should use the shared Button and Card components correctly.

Do not add auth, database, Supabase, or external services.
Make the page visually polished and demo-ready.
```
