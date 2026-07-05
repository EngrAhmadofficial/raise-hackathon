import fs from "fs";
import { loadConfig, resolvePaths } from "./config";
import { runScan } from "./scan";
import { writeIncidents } from "./writeIncident";

export function scanAndPersist(rootDir: string) {
  const config = loadConfig(rootDir);
  const paths = resolvePaths(rootDir, config);
  const result = runScan(rootDir, config);

  fs.writeFileSync(paths.findingsFile, JSON.stringify(result.findings, null, 2), "utf-8");
  const incidentPaths = writeIncidents(paths.incidentsDir, result.findings);

  return { ...result, config, paths, incidentPaths };
}

function main() {
  const rootDir = process.cwd();
  console.log(`[DriftGuard Scanner] Starting scan from ${rootDir}...`);

  const { findings, rules, scannedFiles, paths, incidentPaths } = scanAndPersist(rootDir);

  console.log(`Loaded ${rules.length} design rules from ${paths.rulesDir}`);
  console.log(`Scanned ${scannedFiles} source files under ${paths.sourceDir}`);
  console.log(`Found ${findings.length} drift finding(s).`);
  for (const finding of findings) {
    console.log(
      `  - [${finding.severity}] ${finding.ruleId} @ ${finding.file} (${finding.occurrences.length} occurrence(s))`
    );
  }
  console.log(`Wrote findings to ${paths.findingsFile}`);
  if (incidentPaths.length > 0) {
    console.log(`Wrote ${incidentPaths.length} incident file(s) to ${paths.incidentsDir}`);
  }
}

if (require.main === module) {
  main();
}

export * from "./types";
export { runScan, detectComponentName } from "./scan";
export { loadRules, ruleSummary } from "./markdownRules";
export { writeIncidents } from "./writeIncident";
export { loadConfig, resolvePaths } from "./config";
export { DETECTORS } from "./detectors";
export {
  loadTokens,
  flattenColors,
  nearestColor,
  nearestScaleKey,
  hexToRgb,
  parsePx,
} from "./tokens";
export { globToRegExp, matchesAny } from "./glob";
