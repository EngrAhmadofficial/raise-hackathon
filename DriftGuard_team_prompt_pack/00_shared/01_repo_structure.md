# Shared Repo Structure

Use this exact shape unless the team agrees to change it.

```txt
driftguard/
  apps/
    demo-saas/
      src/
        app/
          page.tsx
          billing/page.tsx
          api/admin/route.ts
        components/
          ui/Button.tsx
          ui/Card.tsx
        lib/
          auth.ts
          db.ts
          repositories/UserRepository.ts
      tokens.json
      .driftguard/
        rules/
          button-standard.md
          color-tokens.md
          spacing-scale.md
          radius-scale.md
          typography-scale.md
          auth-middleware.md
          repository-standard.md
        incidents/

    web/
      app/
        page.tsx
        api/scan/route.ts
        api/patch/route.ts
        api/apply/route.ts
      components/
        FindingCard.tsx
        PatchPreview.tsx
        MemoryGraph.tsx
        SeverityBadge.tsx
        DriftTypeBadge.tsx

  packages/
    scanner/
      src/
        types.ts
        scan.ts
        rules.ts
        markdownRules.ts
        writeIncident.ts
        index.ts

    patcher/
      src/
        generatePatch.ts
        applyPatch.ts
        reasoningPrompt.ts
        index.ts

  extension/
    src/
      extension.ts

  findings.json
  package.json
  README.md
  demo-script.md
  pitch.md
```
