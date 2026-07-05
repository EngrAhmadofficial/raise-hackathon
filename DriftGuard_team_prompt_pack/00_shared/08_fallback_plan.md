# Live Demo Fallback Plan

## If Cursor generates bad code live

Paste the known drift block manually:

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

## If extension fails

Run the CLI:

```bash
npm run driftguard:scan
npm run driftguard:patch
npm run driftguard:fix
```

Then open:

```txt
http://localhost:3001
```

## If patch apply fails

Show the patch preview and say:

> The scanner and reasoning flow are live. The patch preview is generated as a git-style diff; in this fallback run we will apply the deterministic fix manually to keep the demo moving.

## If web report fails

Open `findings.json` and `apps/demo-saas/.driftguard/incidents/drift-001.md` directly in Cursor.

## If demo app fails

Use screenshots or code view and focus on:

```txt
1. detected evidence
2. reasoning
3. patch
4. memory incident
```
