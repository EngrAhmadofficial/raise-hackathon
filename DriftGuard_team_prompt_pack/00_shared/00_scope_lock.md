# DriftGuard Scope Lock

## Final product framing

**DriftGuard** is a Cursor-native design-system drift auditor.

It scans a React/Next.js product, detects drift against design tokens and shared components, explains why the issue matters, classifies intent, generates a patch, applies the fix, and records local markdown memory.

## Keep

```txt
✅ Next.js demo app
✅ tokens.json
✅ shared Button/Card components
✅ intentional drift block
✅ scanner
✅ findings.json
✅ patch preview
✅ apply fix
✅ markdown rules
✅ incident markdown memory
✅ report UI
✅ minimal Cursor command integration
```

## Cut from MVP

```txt
❌ Supabase
❌ auth
❌ cloud sync
❌ multi-tenant dashboard
❌ Figma integration
❌ perfect AST parser
❌ real-time save blocking
❌ cross-repo herd immunity
```

## Pitch the cut scope as roadmap

Use this if judges ask:

> For the hackathon MVP, we focused on the most visual and demoable problem: design-system drift in AI-generated UI. The same markdown graph architecture can extend to security, API, and architecture guardrails, and we included those as roadmap-compatible rule templates.
