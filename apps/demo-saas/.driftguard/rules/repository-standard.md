---
id: "repository-standard"
type: "rule"
category: "architecture"
detector: "direct-db-access"
severity_threshold: "high"
target_paths:
  - "src/app/api/**/*.ts"
links:
  - [[auth-middleware]]
---

# Repository Standard

API routes should not call database clients directly.

Use repository interfaces under `src/lib/repositories`.

## Violation examples

```ts
await db.insert(users).values(body);
await prisma.user.create({ data: body });
```

## Fix pattern

```ts
await UserRepository.create(body);
```
