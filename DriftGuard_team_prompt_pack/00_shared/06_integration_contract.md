# Integration Contract

## One shared file

```txt
findings.json
```

## Who touches it?

```txt
Person 2 scanner writes it.
Person 3 patcher updates finding.patch.
Person 4 report UI reads it.
Person 5 extension commands trigger scripts that modify it.
```

## Root scripts

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

## Expected command behavior

```txt
npm run driftguard:scan
  - writes findings.json

npm run driftguard:patch
  - reads findings.json
  - writes finding.patch values
  - does not modify source files

npm run driftguard:fix
  - applies deterministic source fix
  - writes incident markdown
  - may re-run scanner or update findings
```

## Demo ports

```txt
apps/demo-saas: http://localhost:3000
apps/web:       http://localhost:3001
```
