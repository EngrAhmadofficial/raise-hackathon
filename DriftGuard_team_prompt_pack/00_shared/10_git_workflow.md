# Git Workflow

## Branches

```txt
main
person-1-demo-app
person-2-scanner
person-3-patcher
person-4-report-ui
person-5-extension-docs
```

## Commit style

```txt
feat(demo): add billing dashboard and design tokens
feat(scanner): detect tailwind arbitrary drift
feat(patcher): apply deterministic billing card fix
feat(web): add DriftGuard findings report
feat(extension): add scan/open report commands
docs: add demo script and pitch
```

## Merge checklist

Before merge:

```bash
npm run driftguard:scan
npm run driftguard:patch
npm run driftguard:fix
```

Also verify:

```txt
apps/demo-saas still runs
apps/web still runs
findings.json format did not change
```
