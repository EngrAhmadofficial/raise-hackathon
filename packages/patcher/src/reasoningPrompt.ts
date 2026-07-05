export function buildReasoningPrompt(input: {
  file: string;
  component: string;
  evidence: string;
  violatedRules: string[];
}): string {
  return `You are DriftGuard, a design-system drift auditor. You classify whether code changes violate local design-system rules and explain how to reconcile them.

=== TARGET DESIGN LAWS ===
File context: ${input.file}
Component Context: ${input.component}
Detected violations:
${input.evidence}

Violated standard files:
${input.violatedRules.map(r => `- ${r}.md`).join("\n")}

=== CLASSIFICATION BOUNDARIES ===
- "accidental_regression": Localized design deviations (e.g. standard components exist in file but raw attributes were added in one isolated place).
- "intentional_redesign": Broad coordinated token/component changes that propose systemic updates.
- "platform_constraint": Framework or browser technical limitations preventing use of design standards.

=== INSTRUCTIONS ===
1. Classify the user's intent.
2. Formulate a short, professional, and clear summary of the issue.
3. Formulate a concise "whyItMatters" explanation detailing the impact on code quality and UI integrity.
4. Provide the exact suggested JSX/TSX replacement code.
5. Provide a confidence score between 0.0 and 1.0.

Your response MUST be strict, raw JSON only matching the schema:
{
  "intent": "accidental_regression" | "intentional_redesign" | "platform_constraint",
  "summary": "Concise description of detected visual drift.",
  "whyItMatters": "Strategic explanation of how this hurts design uniformity and scale.",
  "suggestedFix": "Coded components swap guidelines.",
  "confidence": 0.95
}
`;
}
export default buildReasoningPrompt;
