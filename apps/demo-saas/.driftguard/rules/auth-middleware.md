---
id: "auth-middleware"
type: "rule"
category: "security"
detector: "missing-auth-middleware"
severity_threshold: "critical"
target_paths:
  - "src/app/api/**/*.ts"
links:
  - [[repository-standard]]
---

# Auth Middleware

All API route mutations must invoke `validateSession()` before performing privileged actions.

## Violation example

```ts
export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(users).values(body);
  return Response.json({ ok: true });
}
```

## Fix pattern

```ts
export async function POST(req: Request) {
  const session = await validateSession();
  // continue only if session is valid
}
```
