# Prompt — Create Markdown Rules

```txt
Inside apps/demo-saas/.driftguard/rules, create markdown rule files with YAML frontmatter.

Create:
- button-standard.md
- color-tokens.md
- spacing-scale.md
- radius-scale.md
- typography-scale.md
- auth-middleware.md
- repository-standard.md

Each file should include:
- id
- type: "rule"
- category
- severity_threshold
- target_paths
- links

Rules:

button-standard.md:
All interactive CTAs must use src/components/ui/Button.tsx. Raw <button> elements are not allowed in product surfaces unless they are inside the Button component.

color-tokens.md:
Do not use hardcoded hex colors in JSX className strings. Use semantic Tailwind tokens mapped from tokens.json.

spacing-scale.md:
Do not use arbitrary Tailwind spacing values like p-[19px], px-[18px], py-[9px]. Use the spacing scale.

radius-scale.md:
Do not use arbitrary border radius values like rounded-[11px]. Use rounded-md, rounded-lg, rounded-xl based on the component standard.

typography-scale.md:
Do not use arbitrary text sizes like text-[15px]. Use text-sm, text-base, text-lg, or component variants.

auth-middleware.md:
All API route mutations must invoke validateSession().

repository-standard.md:
API routes should not call db.insert, db.update, db.delete, db.query, or prisma mutations directly. Use repository interfaces.

Also create an empty apps/demo-saas/.driftguard/incidents directory.
```
