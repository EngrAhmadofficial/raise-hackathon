# Prompt — Wire Local API Routes

```txt
Implement local API routes for apps/web.

Routes:

GET /api/scan:
- read findings.json from repo root
- return [] if missing

POST /api/scan:
- run npm run driftguard:scan from repo root
- return findings.json

POST /api/patch:
- run npm run driftguard:patch from repo root
- return findings.json

POST /api/apply:
- run npm run driftguard:fix from repo root
- return findings.json and success true

Implementation details:
- use node:child_process execFile or spawn
- do not execute arbitrary user input
- hardcode the allowed npm script names
- set cwd to the monorepo root
- handle errors gracefully and return JSON with error message

The UI buttons should call these routes and refresh the findings list.
```
