# Person 2 Technical Guide

## Scanner strategy

Keep detection deterministic.

Do not try to parse a full AST during the hackathon. Use file walking plus regex patterns.

## Regex patterns

```ts
const HEX_COLOR_REGEX = /#[0-9A-Fa-f]{3,8}/g;

const ARBITRARY_SPACING_REGEX =
  /\b(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-\[[^\]]+\]/g;

const ARBITRARY_RADIUS_REGEX = /\brounded-\[[^\]]+\]/g;

const ARBITRARY_TEXT_REGEX = /\btext-\[[^\]]+\]/g;

const RAW_BUTTON_REGEX = /<button[\s>]/g;

const DIRECT_DB_REGEX =
  /\b(db\.(insert|update|delete|query)|prisma\.[a-zA-Z]+\.(create|update|delete))\b/g;
```

## Missing auth rule

```txt
If file path includes src/app/api/
and file exports POST, PUT, PATCH, or DELETE
and file does not include validateSession(
then create a high-severity platform/security finding.
```

## Finding IDs

Use stable IDs:

```txt
drift-001 token_mismatch
drift-002 spacing_drift
drift-003 spacing_drift for radius evidence
drift-004 typography_drift
drift-005 component_misuse
```

## Component name

For the demo, you can use:

```txt
BillingUpgradeCard
```

If you want to infer it, search upward for function names, but do not spend too much time.

## Scanner output location

```txt
findings.json at repo root
```

## No drift case

If no drift is found, write:

```json
[]
```

and do not crash.

## Rule parsing

Minimal frontmatter parser is enough:

```txt
Read between first --- and second ---.
Extract id, type, category, target_paths, links.
Extract wiki links with /\[\[([^\]]+)\]\]/g.
```
