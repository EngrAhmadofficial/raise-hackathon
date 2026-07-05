# Prompt — Create Demo Rehearsal Script

```txt
Write demo-script.md for a 90-second live demo.

The demo flow:
1. Show polished SaaS billing dashboard.
2. Explain it uses shared Button/Card primitives and tokens.
3. Ask Cursor: "Make the billing upgrade card more prominent. Add stronger visual emphasis and a more noticeable CTA."
4. Show that Cursor introduced drift: raw button, hardcoded color, arbitrary spacing, radius, typography.
5. Run DriftGuard: Scan Workspace.
6. Open the report.
7. Show findings and reasoning.
8. Generate patch.
9. Apply fix.
10. Refresh app and show UI still looks good.
11. Open .driftguard/incidents/drift-001.md.
12. Say final line: "Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster."

Also include fallback lines if the extension fails and we use CLI commands.
```
