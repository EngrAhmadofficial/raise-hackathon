import { DriftFinding, DriftOccurrence } from "scanner";

/** True when a suggestion is a plain utility-class swap (e.g. `bg-[#fff]` -> `bg-slate-50`). */
function isClassSwap(occurrence: DriftOccurrence): boolean {
  return (
    !!occurrence.suggestion &&
    !occurrence.suggestion.startsWith("<") &&
    !occurrence.suggestion.includes(" ") &&
    occurrence.suggestion !== occurrence.match
  );
}

export function applyClassFixes(content: string, findings: DriftFinding[]): string {
  let updated = content;
  const swaps = new Map<string, string>();
  for (const finding of findings) {
    for (const occurrence of finding.occurrences) {
      if (isClassSwap(occurrence)) {
        swaps.set(occurrence.match, occurrence.suggestion as string);
      }
    }
  }
  for (const [from, to] of swaps) {
    updated = updated.split(from).join(to);
  }
  return updated;
}

/** Classes the Button primitive already provides through variant/size props. */
const BUTTON_OWNED_CLASS = /^(?:hover:)?(?:bg-|text-white$|text-(?:xs|sm|base|lg)$|font-|shadow|rounded|px-|py-|transition|focus)/;

function inferVariant(classes: string[]): "primary" | "secondary" | "ghost" {
  if (classes.some(c => /^bg-(?!transparent)/.test(c))) return "primary";
  if (classes.some(c => /^border(?:$|-)/.test(c))) return "secondary";
  return "ghost";
}

function inferSize(classes: string[]): "sm" | "md" | "lg" {
  if (classes.includes("text-xs")) return "sm";
  if (classes.includes("text-base") || classes.includes("text-lg")) return "lg";
  return "md";
}

/**
 * Converts raw `<button>` elements to the design-system `<Button>` component.
 * Variant and size are inferred from the utility classes present, and classes
 * the primitive already owns (background, padding, radius, ...) are dropped.
 */
export function fixRawButtons(content: string): { content: string; changed: boolean } {
  let changed = false;

  let updated = content.replace(/<button\b([^>]*)>/g, (full, attrs: string) => {
    changed = true;
    const selfClosing = /\/\s*$/.test(attrs);
    let rest = selfClosing ? attrs.replace(/\/\s*$/, "") : attrs;

    let classAttr = "";
    const classMatch = rest.match(/\s*className=(?:"([^"]*)"|\{`([^`]*)`\})/);
    if (classMatch) {
      rest = rest.replace(classMatch[0], "");
      const classes = (classMatch[1] ?? classMatch[2] ?? "").split(/\s+/).filter(Boolean);
      const variant = inferVariant(classes);
      const size = inferSize(classes);
      const kept = classes.filter(c => !BUTTON_OWNED_CLASS.test(c));
      classAttr = kept.length > 0 ? ` className="${kept.join(" ")}"` : "";
      return `<Button variant="${variant}" size="${size}"${classAttr}${rest.trimEnd()}${selfClosing ? " /" : ""}>`;
    }

    return `<Button variant="primary" size="md"${rest.trimEnd()}${selfClosing ? " /" : ""}>`;
  });

  if (changed) {
    updated = updated.replace(/<\/button>/g, "</Button>");
  }

  return { content: updated, changed };
}

/** Inserts a design-system import after the last existing import statement. */
export function ensureImport(content: string, importLine: string, modulePath: string): string {
  if (content.includes(modulePath)) return content;

  const importRegex = /^import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm;
  let lastImportEnd = -1;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    lastImportEnd = match.index + match[0].length;
  }

  if (lastImportEnd === -1) {
    return `${importLine}\n${content}`;
  }
  return `${content.slice(0, lastImportEnd)}\n${importLine}${content.slice(lastImportEnd)}`;
}
