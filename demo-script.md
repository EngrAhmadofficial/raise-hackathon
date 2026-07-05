# DriftGuard: 90-Second Live Demo Script

This script is designed for a 90-second high-fidelity demonstration of DriftGuard. It highlights the problem, the drift detection, the AI-ready explanation, the side-by-side visual diff patch, the auto-patch application, and the persistent incident memory graph.

---

## Part 1: The Setup & The Problem (0s - 20s)

| Time | Visual Action | Speaker Lines | Presenter Notes |
| :--- | :--- | :--- | :--- |
| **00:00** | Open **Demo SaaS App** at [http://localhost:3000/billing](http://localhost:3000/billing) in dark mode. Scroll to the "Upgrade" card with raw custom colors. | "We built DriftGuard because AI-native IDEs like Cursor help teams ship features at lightspeed, but AI-generated code introduces a major problem: **silent design system drift**." | Introduce the core hook clearly and quickly. |
| **00:10** | Point at the "Upgrade Card" (un-styled raw button, custom `#2563eb` color, arbitrary spacing like `p-[19px]`, `rounded-[11px]`). | "Here, an AI agent was asked to make the billing upgrade card more prominent. It made it look okay on the surface, but it bypassed our design system entirely: introducing raw native button tags, hardcoded hex colors, arbitrary Tailwind spacing, and custom rounding tokens." | Focus the judge's attention on the concrete visual elements of the drift. |

---

## Part 2: The Audit & Scan (20s - 40s)

| Time | Visual Action | Speaker Lines | Presenter Notes |
| :--- | :--- | :--- | :--- |
| **00:20** | Switch to the **DriftGuard Auditor Dashboard** at [http://localhost:3001](http://localhost:3001) and click **"Run Scan"**. | "Instead of manual code review or waiting for PR feedback, we trigger **DriftGuard**. It immediately performs a deterministic scan of our codebase against our local, version-controlled markdown rules." | The scan should execute and show findings instantly. |
| **00:30** | Scroll through the visual card list of findings showing Color, Spacing, Radius, Typography, and Native Element violations. | "DriftGuard immediately catches every violation: the hardcoded brand color `#2563eb`, the arbitrary `p-[19px]` spacing, and the native un-styled button tag. It links each finding directly back to our active design system markdown laws." | Emphasize that DriftGuard maps code onto localized rules. |

---

## Part 3: Intent Classification & Reconciliation Diff (40s - 60s)

| Time | Visual Action | Speaker Lines | Presenter Notes |
| :--- | :--- | :--- | :--- |
| **00:40** | Click **"Generate Patch"** on the dashboard. Visual diff displays in red/green inline highlighting. | "Now we generate the reconciliation patch. Rather than treating this as a simple linter warning, DriftGuard parses the layout context to classify intent. It determines this is an **accidental regression**, not an intentional redesign, because the drift is isolated to a single component." | Point out the AI reasoning classification badge on the dashboard. |
| **00:50** | Scroll through the side-by-side diff preview. | "It constructs a precise git-style unified diff, swapping raw Tailwind overrides for standard design system components—converting the raw button into our shared `<Button variant="primary">` and the raw container into our token-compliant `<Card>`." | Explain that we are swapping raw CSS with shared design system components. |

---

## Part 4: Auto-Fixing & Incident Memory Graph (60s - 90s)

| Time | Visual Action | Speaker Lines | Presenter Notes |
| :--- | :--- | :--- | :--- |
| **01:00** | Click **"Apply Fix"**. Watch the status transition to "Clean". Open the **Memory Graph** SVG section at the bottom. | "With a single click on **Apply Fix**, DriftGuard edits our code in real-time, importing correct components, reconciling spacing, and wiping the active incident. It then records a structured Markdown memory file in our git history." | Direct the judges' eyes to the beautiful SVG network nodes representing rule files. |
| **01:10** | Hover or click nodes on the interactive **Memory Graph** SVG to show linkages (`drift-001` node linking to `button-standard` and `color-tokens` nodes). | "This incident is committed directly to our local repo memory graph. If an AI agent or developer tries to make a similar mistake, the codebase itself remembers the context, preventing future regressions before they happen." | Highlight the custom SVG-based network graph representing design system standards. |
| **01:20** | Switch back to the **SaaS Billing Page** and refresh or show it perfectly aligned. | "The billing page looks premium, but now the underlying code is 100% compliant with our design standards. Cursor helps engineers ship faster; **DriftGuard** ensures we keep our design system consistent while we ship." | Finish with a strong, memorable, and polished final elevator pitch line. |

---

## Technical Rehearsal Checklist

- [ ] Ensure `npm run dev:demo` is running on Port 3000.
- [ ] Ensure `npm run dev:web` is running on Port 3001.
- [ ] Verify that the SaaS App has the raw drift card visible before starting the demo.
- [ ] Ensure findings can be scanned, patched, and applied successfully.
- [ ] Have the `.driftguard/incidents` folder open in your sidebar to demonstrate that git tracks the incident memory.
