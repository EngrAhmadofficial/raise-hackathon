import { DriftOccurrence, DriftType } from "./types";
import { DesignTokens, FlatColor, nearestColor, nearestScaleKey, parsePx } from "./tokens";

export type DetectorContext = {
  tokens: DesignTokens;
  palette: FlatColor[];
  /** Base spacing unit in px, derived from the smallest spacing token */
  spacingBase: number;
};

export type Detector = {
  id: string;
  label: string;
  driftType: DriftType;
  /** Heuristic precision of this detector's pattern (deterministic, not fabricated per finding) */
  confidence: number;
  detect: (content: string, ctx: DetectorContext) => DriftOccurrence[];
};

function forEachLineMatch(
  content: string,
  regex: RegExp,
  onMatch: (match: RegExpExecArray, line: number, lineText: string) => DriftOccurrence | null
): DriftOccurrence[] {
  const occurrences: DriftOccurrence[] = [];
  const lines = content.split("\n");
  lines.forEach((lineText, index) => {
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(lineText)) !== null) {
      const occurrence = onMatch(match, index + 1, lineText);
      if (occurrence) occurrences.push(occurrence);
      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
  });
  return occurrences;
}

function occurrence(
  match: RegExpExecArray,
  line: number,
  lineText: string,
  suggestion?: string
): DriftOccurrence {
  return {
    line,
    column: match.index + 1,
    match: match[0],
    lineText: lineText.trim(),
    suggestion,
  };
}

/** Snaps a px value to the token grid, resolving ties toward the smaller step. */
function snapToGrid(px: number, base: number): number {
  return Math.ceil(px / base - 0.5) * base;
}

const VARIANT_PREFIX = "(?:[a-z-]+:)*";

const arbitraryHexColor: Detector = {
  id: "arbitrary-hex-color",
  label: "hardcoded hex color",
  driftType: "token_mismatch",
  confidence: 0.97,
  detect(content, ctx) {
    const regex = new RegExp(
      `${VARIANT_PREFIX}(?:bg|text|border|ring|outline|fill|stroke|from|via|to|shadow|accent|caret|decoration|divide)-\\[(#[0-9A-Fa-f]{3,8})\\]`,
      "g"
    );
    return forEachLineMatch(content, regex, (match, line, lineText) => {
      const hex = match[1];
      const prefix = match[0].slice(0, match[0].indexOf(`[${hex}]`) - 1);
      const nearest = nearestColor(hex, ctx.palette);
      const suggestion = nearest ? `${prefix}-${nearest.name}` : undefined;
      return occurrence(match, line, lineText, suggestion);
    });
  },
};

const arbitrarySpacing: Detector = {
  id: "arbitrary-spacing",
  label: "arbitrary spacing value",
  driftType: "spacing_drift",
  confidence: 0.95,
  detect(content, ctx) {
    const regex = new RegExp(
      `\\b${VARIANT_PREFIX}(-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y))-\\[(\\d+(?:\\.\\d+)?)px\\]`,
      "g"
    );
    return forEachLineMatch(content, regex, (match, line, lineText) => {
      const px = parseFloat(match[2]);
      const snapped = snapToGrid(px, ctx.spacingBase);
      const step = snapped / 4; // Tailwind numeric scale: 1 unit = 4px
      const prefix = match[0].slice(0, match[0].lastIndexOf("-["));
      const suggestion = Number.isInteger(step * 2) ? `${prefix}-${step}` : undefined;
      return occurrence(match, line, lineText, suggestion);
    });
  },
};

const arbitraryRadius: Detector = {
  id: "arbitrary-radius",
  label: "arbitrary border radius",
  driftType: "spacing_drift",
  confidence: 0.95,
  detect(content, ctx) {
    const regex = new RegExp(
      `\\b${VARIANT_PREFIX}(rounded(?:-(?:s|e|t|r|b|l|ss|se|ee|es|tl|tr|br|bl))?)-\\[(\\d+(?:\\.\\d+)?)px\\]`,
      "g"
    );
    return forEachLineMatch(content, regex, (match, line, lineText) => {
      const px = parseFloat(match[2]);
      const key = nearestScaleKey(px, ctx.tokens.borderRadius ?? {});
      const prefix = match[0].slice(0, match[0].lastIndexOf("-["));
      const suggestion = key ? `${prefix}-${key}` : undefined;
      return occurrence(match, line, lineText, suggestion);
    });
  },
};

const arbitraryFontSize: Detector = {
  id: "arbitrary-font-size",
  label: "arbitrary font size",
  driftType: "typography_drift",
  confidence: 0.95,
  detect(content, ctx) {
    const regex = new RegExp(`\\b${VARIANT_PREFIX}text-\\[(\\d+(?:\\.\\d+)?)px\\]`, "g");
    return forEachLineMatch(content, regex, (match, line, lineText) => {
      const px = parseFloat(match[1]);
      const key = nearestScaleKey(px, ctx.tokens.typography?.fontSize ?? {});
      // tokens use "md" for the default size; Tailwind names it "base"
      const twKey = key === "md" ? "base" : key;
      const prefix = match[0].slice(0, match[0].lastIndexOf("-["));
      const suggestion = twKey ? `${prefix}-${twKey}` : undefined;
      return occurrence(match, line, lineText, suggestion);
    });
  },
};

const rawButtonElement: Detector = {
  id: "raw-button-element",
  label: "raw <button> element",
  driftType: "component_misuse",
  confidence: 0.92,
  detect(content) {
    const regex = /<button\b/g;
    return forEachLineMatch(content, regex, (match, line, lineText) =>
      occurrence(match, line, lineText, `<Button variant="primary" size="md">`)
    );
  },
};

const directDbAccess: Detector = {
  id: "direct-db-access",
  label: "direct database client call",
  driftType: "state_inconsistency",
  confidence: 0.9,
  detect(content) {
    const regex = /\b(?:db\.(?:insert|update|delete|query)|prisma\.[a-zA-Z]+\.(?:create|update|delete|upsert))\b/g;
    return forEachLineMatch(content, regex, (match, line, lineText) =>
      occurrence(match, line, lineText)
    );
  },
};

const missingAuthMiddleware: Detector = {
  id: "missing-auth-middleware",
  label: "unauthenticated mutation handler",
  driftType: "platform_constraint",
  confidence: 0.85,
  detect(content) {
    if (content.includes("validateSession(")) return [];
    const regex = /export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)\b/g;
    return forEachLineMatch(content, regex, (match, line, lineText) =>
      occurrence(match, line, lineText, `const session = await validateSession();`)
    );
  },
};

export const DETECTORS: Record<string, Detector> = Object.fromEntries(
  [
    arbitraryHexColor,
    arbitrarySpacing,
    arbitraryRadius,
    arbitraryFontSize,
    rawButtonElement,
    directDbAccess,
    missingAuthMiddleware,
  ].map(d => [d.id, d])
);
