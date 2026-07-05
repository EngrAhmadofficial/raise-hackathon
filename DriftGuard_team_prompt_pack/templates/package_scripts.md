# Root package.json Scripts Template

```json
{
  "scripts": {
    "dev:demo": "npm --workspace apps/demo-saas run dev",
    "dev:web": "npm --workspace apps/web run dev",
    "driftguard:scan": "tsx packages/scanner/src/index.ts",
    "driftguard:patch": "tsx packages/patcher/src/index.ts generate",
    "driftguard:fix": "tsx packages/patcher/src/index.ts apply"
  }
}
```

If ports need to be explicit:

```json
{
  "scripts": {
    "dev:demo": "npm --workspace apps/demo-saas run dev -- -p 3000",
    "dev:web": "npm --workspace apps/web run dev -- -p 3001"
  }
}
```
