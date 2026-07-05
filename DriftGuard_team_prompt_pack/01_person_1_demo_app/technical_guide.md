# Person 1 Technical Guide

## File targets

```txt
apps/demo-saas/src/app/page.tsx
apps/demo-saas/src/app/billing/page.tsx
apps/demo-saas/src/components/ui/Button.tsx
apps/demo-saas/src/components/ui/Card.tsx
apps/demo-saas/tokens.json
```

## Button API

```tsx
<Button variant="primary" size="md">
  Upgrade Plan
</Button>
```

Suggested props:

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};
```

## Card API

```tsx
<Card className="p-5 rounded-xl bg-surface">
  ...
</Card>
```

Suggested props:

```ts
type CardProps = React.HTMLAttributes<HTMLDivElement>;
```

## Required drift block

```tsx
{/* DRIFTGUARD_DEMO_DRIFT_START */}
<div className="p-[19px] rounded-[11px] bg-[#F8FAFF] border border-[#D6E4FF]">
  <div>
    <p className="text-[15px] font-medium text-slate-900">
      Upgrade to Pro
    </p>
    <p className="mt-1 text-sm text-slate-500">
      Unlock advanced AI usage and team controls.
    </p>
  </div>

  <button className="mt-4 bg-[#2563eb] text-white px-[18px] py-[9px] rounded-[10px] text-[15px] font-medium shadow-sm">
    Upgrade Plan
  </button>
</div>
{/* DRIFTGUARD_DEMO_DRIFT_END */}
```

## Important imports

`billing/page.tsx` should already import Button and Card, even if the drift block uses a raw button.

```ts
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
```

This makes the scanner/reasoning stronger because the correct local pattern exists in the same file.

## Visual standard

The app should look like something from a polished SaaS landing/demo environment:

```txt
clean sidebar
card-based layout
premium spacing
clear billing context
professional typography
```
