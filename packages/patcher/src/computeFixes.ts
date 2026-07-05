import fs from "fs";
import path from "path";
import { DriftFinding, loadConfig, resolvePaths, runScan } from "scanner";
import { applyClassFixes, ensureImport, fixRawButtons } from "./fixes";

export type FileFix = {
  /** Repo-root-relative path */
  file: string;
  absolutePath: string;
  original: string;
  fixed: string;
  findings: DriftFinding[];
};

/**
 * Runs a fresh scan and computes the token-aligned content for every file
 * with auto-fixable findings. Pure computation — nothing is written.
 */
export function computeFixes(rootDir: string): { fixes: FileFix[]; findings: DriftFinding[] } {
  const config = loadConfig(rootDir);
  const { findings } = runScan(rootDir, config);

  const byFile = new Map<string, DriftFinding[]>();
  for (const finding of findings) {
    const list = byFile.get(finding.file) ?? [];
    list.push(finding);
    byFile.set(finding.file, list);
  }

  const fixes: FileFix[] = [];
  for (const [file, fileFindings] of byFile) {
    const absolutePath = path.join(rootDir, file);
    if (!fs.existsSync(absolutePath)) continue;

    const original = fs.readFileSync(absolutePath, "utf-8");
    let fixed = applyClassFixes(original, fileFindings);

    if (fileFindings.some(f => f.driftType === "component_misuse")) {
      const result = fixRawButtons(fixed);
      fixed = result.content;
      if (result.changed) {
        fixed = ensureImport(
          fixed,
          `import { Button } from "@/components/ui/Button";`,
          "@/components/ui/Button"
        );
      }
    }

    if (fixed !== original) {
      fixes.push({ file, absolutePath, original, fixed, findings: fileFindings });
    }
  }

  return { fixes, findings };
}

export function getPaths(rootDir: string) {
  const config = loadConfig(rootDir);
  return { config, paths: resolvePaths(rootDir, config) };
}
