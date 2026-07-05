import fs from "fs";
import path from "path";
import { DriftFinding } from "./types";

function slugifyFile(file: string): string {
  return file
    .replace(/\.[a-z]+$/i, "")
    .split("/")
    .slice(-2)
    .join("-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .toLowerCase();
}

const severityRank = { critical: 0, high: 1, medium: 2, low: 3 } as const;

/**
 * Writes one markdown memory incident per affected file, generated entirely
 * from the actual findings. Returns the list of written file paths.
 */
export function writeIncidents(incidentsDir: string, findings: DriftFinding[]): string[] {
  if (!fs.existsSync(incidentsDir)) {
    fs.mkdirSync(incidentsDir, { recursive: true });
  }

  // Clear stale generated incidents so the memory folder mirrors reality
  for (const existing of fs.readdirSync(incidentsDir)) {
    if (existing.startsWith("drift-") && existing.endsWith(".md")) {
      fs.unlinkSync(path.join(incidentsDir, existing));
    }
  }

  if (findings.length === 0) return [];

  const byFile = new Map<string, DriftFinding[]>();
  for (const finding of findings) {
    const list = byFile.get(finding.file) ?? [];
    list.push(finding);
    byFile.set(finding.file, list);
  }

  const written: string[] = [];
  for (const [file, fileFindings] of byFile) {
    const worst = [...fileFindings].sort(
      (a, b) => severityRank[a.severity] - severityRank[b.severity]
    )[0];
    const ruleIds = [...new Set(fileFindings.map(f => f.ruleId))];
    const component = worst.component;
    const incidentId = `drift-${slugifyFile(file)}`;
    const totalOccurrences = fileFindings.reduce((sum, f) => sum + f.occurrences.length, 0);

    const body = fileFindings
      .map(f => {
        const occurrenceLines = f.occurrences
          .slice(0, 8)
          .map(o => `- Line ${o.line}, col ${o.column}: \`${o.match}\`${o.suggestion ? ` → \`${o.suggestion}\`` : ""}`)
          .join("\n");
        return `## ${f.title}\n\nSeverity: **${f.severity}** · Rule: \`${f.ruleId}\` · Confidence: ${Math.round(f.confidence * 100)}%\n\n${f.reasoning ?? ""}\n\n${occurrenceLines}`;
      })
      .join("\n\n");

    const content = `---
id: "${incidentId}"
type: "incident"
drift_type: "${worst.driftType}"
file_path: "${file}"
component: "${component}"
detected_at: "${new Date().toISOString()}"
severity: "${worst.severity}"
finding_count: ${fileFindings.length}
occurrence_count: ${totalOccurrences}
links:
${ruleIds.map(id => `  - [[${id}]]`).join("\n")}
---

# Drift incident: ${component}

DriftGuard detected ${fileFindings.length} rule violation(s) (${totalOccurrences} occurrence(s)) in \`${file}\`.

${body}
`;

    const incidentPath = path.join(incidentsDir, `${incidentId}.md`);
    fs.writeFileSync(incidentPath, content, "utf-8");
    written.push(incidentPath);
  }

  return written;
}
