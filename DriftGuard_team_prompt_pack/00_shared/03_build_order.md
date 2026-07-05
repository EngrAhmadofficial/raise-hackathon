# Build Order

## Phase 1 — Visual demo app

Owner: Person 1

```txt
1. Create demo-saas app.
2. Add Tailwind.
3. Add Button and Card primitives.
4. Add tokens.json.
5. Build billing page.
6. Add intentional drift block.
```

## Phase 2 — Report UI from mock data

Owner: Person 4

```txt
1. Create apps/web.
2. Read mock findings.json.
3. Render findings.
4. Render patch preview.
5. Render memory graph.
```

## Phase 3 — Scanner

Owner: Person 2

```txt
1. Walk files.
2. Detect regex patterns.
3. Write findings.json.
4. Create markdown rules.
5. Create incident writer.
```

## Phase 4 — Patcher

Owner: Person 3

```txt
1. Generate diff.
2. Write patch into findings.json.
3. Apply deterministic fix.
4. Create incident file.
```

## Phase 5 — Cursor commands + rehearsal

Owner: Person 5

```txt
1. Wire root scripts.
2. Create minimal extension commands.
3. Write README.
4. Rehearse demo.
5. Record 1-minute video.
```
