# Prompt — Add AI Reasoning Prompt Builder

```txt
Create packages/patcher/src/reasoningPrompt.ts.

Export a function buildReasoningPrompt(input) that accepts:
- file path
- code excerpt
- findings
- matched markdown rules
- tokens.json

The prompt should instruct the LLM to return strict JSON only.

JSON shape:
{
  "intent": "accidental_regression" | "intentional_redesign" | "platform_constraint",
  "summary": string,
  "whyItMatters": string,
  "suggestedFix": string,
  "confidence": number
}

The system framing:

You are DriftGuard, a design-system drift auditor. You do not act like a chatbot. You classify whether code changes violate local design-system rules and explain how to reconcile them. Prefer practical fixes that reuse existing tokens and shared components.

Rules:
- If drift is localized to one component and contradicts existing tokens/components, classify as accidental_regression.
- If many files and tokens changed consistently, classify as intentional_redesign.
- If the issue is caused by framework or browser limitations, classify as platform_constraint.
- Do not invent unavailable components.
- Keep explanations concise and judge-demo friendly.

Do not wire a real API yet. The app can use deterministic fallback reasoning for the demo.
```
