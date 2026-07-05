import fs from "fs";
import path from "path";
import { DriftFinding, DriftGuardConfig, DriftRule, ScanResult } from "./types";
import { DETECTORS, DetectorContext } from "./detectors";
import { loadRules, ruleSummary } from "./markdownRules";
import { matchesAny } from "./glob";
import { flattenColors, loadTokens, parsePx } from "./tokens";
import { resolvePaths } from "./config";

function walkFiles(dir: string, extensions: string[], ignoreDirs: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.includes(entry.name)) continue;
      files.push(...walkFiles(fullPath, extensions, ignoreDirs));
    } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

/** Derives the primary React component name exported by a file. */
export function detectComponentName(content: string, filePath: string): string {
  const defaultFn = content.match(/export\s+default\s+(?:async\s+)?function\s+([A-Z]\w*)/);
  if (defaultFn) return defaultFn[1];

  const namedConst = content.match(/export\s+const\s+([A-Z]\w*)\s*=/);
  if (namedConst) return namedConst[1];

  const namedFn = content.match(/export\s+(?:async\s+)?function\s+([A-Z]\w*)/);
  if (namedFn) return namedFn[1];

  if (filePath.includes(`${path.sep}api${path.sep}`) || filePath.includes("/api/")) {
    return "API Route Handler";
  }

  const base = path.basename(filePath).replace(/\.(tsx?|jsx?)$/, "");
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function buildFindingId(ruleId: string, relFile: string): string {
  const slug = relFile.replace(/\.[a-z]+$/i, "").replace(/[^a-zA-Z0-9]+/g, "-");
  return `${ruleId}--${slug}`;
}

function buildDetectorContext(tokensFile: string): DetectorContext {
  const tokens = loadTokens(tokensFile);
  const palette = flattenColors(tokens.colors ?? {});
  const spacingValues = Object.values(tokens.spacing ?? {})
    .map(parsePx)
    .filter((v): v is number => v !== null && v > 0);
  const spacingBase = spacingValues.length > 0 ? Math.min(...spacingValues) : 4;
  return { tokens, palette, spacingBase };
}

export function runScan(rootDir: string, config: DriftGuardConfig): ScanResult {
  const paths = resolvePaths(rootDir, config);
  const rules = loadRules(paths.rulesDir);
  const ctx = buildDetectorContext(paths.tokensFile);
  const files = walkFiles(paths.sourceDir, config.extensions, config.ignoreDirs);
  const findings: DriftFinding[] = [];

  for (const rule of rules) {
    const detector = DETECTORS[rule.detector];
    if (!detector) {
      console.warn(`[DriftGuard] Rule "${rule.id}" references unknown detector "${rule.detector}" — skipped.`);
      continue;
    }

    for (const filePath of files) {
      const targetRelPath = path.relative(paths.targetDir, filePath).replace(/\\/g, "/");
      if (rule.target_paths.length > 0 && !matchesAny(targetRelPath, rule.target_paths)) continue;
      if (rule.exempt_paths.length > 0 && matchesAny(targetRelPath, rule.exempt_paths)) continue;

      const content = fs.readFileSync(filePath, "utf-8");
      const occurrences = detector.detect(content, ctx);
      if (occurrences.length === 0) continue;

      const rootRelPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
      const uniqueMatches = [...new Set(occurrences.map(o => o.match))];
      const uniqueSuggestions = [
        ...new Set(occurrences.filter(o => o.suggestion).map(o => o.suggestion as string)),
      ];

      const evidence = occurrences
        .slice(0, 5)
        .map(o => `L${o.line}: ${o.match}`)
        .join("\n");

      const fixPairs = occurrences
        .filter(o => o.suggestion && o.suggestion !== o.match)
        .map(o => `${o.match} -> ${o.suggestion}`);
      const uniqueFixPairs = [...new Set(fixPairs)];

      findings.push({
        id: buildFindingId(rule.id, rootRelPath),
        ruleId: rule.id,
        title: `${rule.title}: ${detector.label}`,
        file: rootRelPath,
        component: detectComponentName(content, filePath),
        driftType: detector.driftType,
        severity: rule.severity_threshold,
        evidence,
        occurrences,
        tokenExpected: uniqueSuggestions.join(", ") || undefined,
        actualValue: uniqueMatches.join(", "),
        reasoning:
          `Detected ${occurrences.length} occurrence(s) of ${detector.label} in ${rootRelPath} ` +
          `(${uniqueMatches.slice(0, 4).join(", ")}${uniqueMatches.length > 4 ? ", ..." : ""}), ` +
          `violating the "${rule.title}" rule. ${ruleSummary(rule)}`,
        suggestedFix:
          uniqueFixPairs.length > 0
            ? `Replace with design-system tokens: ${uniqueFixPairs.slice(0, 6).join("; ")}.`
            : `Review ${rootRelPath} against the "${rule.title}" rule and refactor to design-system primitives.`,
        confidence: detector.confidence,
      });
    }
  }

  const severityRank = { critical: 0, high: 1, medium: 2, low: 3 } as const;
  findings.sort(
    (a, b) => severityRank[a.severity] - severityRank[b.severity] || a.id.localeCompare(b.id)
  );

  return { findings, rules, scannedFiles: files.length };
}
