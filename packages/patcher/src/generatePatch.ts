import fs from "fs";
import { createTwoFilesPatch } from "diff";
import { computeFixes, getPaths } from "./computeFixes";

/** Converts jsdiff output into a git-style unified diff. */
function toGitDiff(file: string, original: string, fixed: string): string {
  const raw = createTwoFilesPatch(`a/${file}`, `b/${file}`, original, fixed, undefined, undefined, {
    context: 3,
  });
  const body = raw
    .split("\n")
    .filter(line => !line.startsWith("Index:") && !/^=+$/.test(line))
    .join("\n");
  return `diff --git a/${file} b/${file}\n${body}`;
}

export type GeneratedPatch = {
  patch: string;
  files: string[];
  findings: ReturnType<typeof computeFixes>["findings"];
};

/**
 * Scans the workspace, computes token-aligned fixes and generates a real
 * unified diff per drifted file. Diffs are attached to the corresponding
 * findings and persisted to the findings file.
 */
export function generatePatch(rootDir: string = process.cwd()): GeneratedPatch {
  const { fixes, findings } = computeFixes(rootDir);
  const { paths } = getPaths(rootDir);

  const diffs: string[] = [];
  for (const fix of fixes) {
    const diff = toGitDiff(fix.file, fix.original, fix.fixed);
    diffs.push(diff);
    for (const finding of findings) {
      if (finding.file === fix.file) {
        finding.patch = diff;
      }
    }
  }

  fs.writeFileSync(paths.findingsFile, JSON.stringify(findings, null, 2), "utf-8");

  return {
    patch: diffs.join("\n"),
    files: fixes.map(f => f.file),
    findings,
  };
}
