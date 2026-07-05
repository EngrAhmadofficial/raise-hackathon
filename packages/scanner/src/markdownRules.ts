import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { DriftRule, Severity } from "./types";

const KNOWN_SEVERITIES: Severity[] = ["low", "medium", "high", "critical"];

function normalizeLinks(links: unknown): string[] {
  if (!Array.isArray(links)) return [];
  // Frontmatter uses obsidian-style wikilinks: `[[rule-id]]` which YAML
  // parses as nested arrays, e.g. [["button-standard"]].
  return links
    .map(link => {
      if (typeof link === "string") return link.replace(/^\[\[|\]\]$/g, "");
      if (Array.isArray(link)) return String(link.flat(Infinity)[0] ?? "");
      return "";
    })
    .filter(Boolean);
}

export function loadRules(rulesDir: string): DriftRule[] {
  if (!fs.existsSync(rulesDir)) {
    return [];
  }

  const files = fs.readdirSync(rulesDir).filter(f => f.endsWith(".md")).sort();
  const rules: DriftRule[] = [];

  for (const file of files) {
    const fullPath = path.join(rulesDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (!match) continue;

    try {
      const parsed = yaml.load(match[1]) as Record<string, unknown>;
      const body = content.slice(match[0].length).trim();
      const titleMatch = body.match(/^#\s+(.+)$/m);
      const description = body
        .replace(/^#\s+.+$/m, "")
        .trim();

      const severity = KNOWN_SEVERITIES.includes(parsed.severity_threshold as Severity)
        ? (parsed.severity_threshold as Severity)
        : "medium";

      const id = String(parsed.id ?? path.basename(file, ".md"));
      rules.push({
        id,
        type: String(parsed.type ?? "rule"),
        category: String(parsed.category ?? "design"),
        detector: String(parsed.detector ?? id),
        severity_threshold: severity,
        target_paths: Array.isArray(parsed.target_paths) ? parsed.target_paths.map(String) : [],
        exempt_paths: Array.isArray(parsed.exempt_paths) ? parsed.exempt_paths.map(String) : [],
        links: normalizeLinks(parsed.links),
        title: titleMatch ? titleMatch[1].trim() : String(parsed.id ?? file),
        description,
      });
    } catch (err) {
      console.error(`Error parsing rule frontmatter for ${file}:`, err);
    }
  }

  return rules;
}

/** First paragraph of a rule description, for compact display. */
export function ruleSummary(rule: DriftRule): string {
  const firstBlock = rule.description.split(/\r?\n\r?\n/).find(block => {
    const trimmed = block.trim();
    return trimmed.length > 0 && !trimmed.startsWith("#") && !trimmed.startsWith("```");
  });
  return (firstBlock ?? "").replace(/\r?\n/g, " ").trim();
}
