import fs from "fs";
import path from "path";
import { DriftGuardConfig } from "./types";

const DEFAULT_CONFIG: DriftGuardConfig = {
  target: "apps/demo-saas",
  sourceDir: "src",
  rulesDir: ".driftguard/rules",
  incidentsDir: ".driftguard/incidents",
  backupsDir: ".driftguard/backups",
  tokensFile: "tokens.json",
  findingsFile: "findings.json",
  extensions: [".ts", ".tsx"],
  ignoreDirs: ["node_modules", ".next", "dist", ".driftguard"],
};

export function loadConfig(rootDir: string): DriftGuardConfig {
  const configPath = path.join(rootDir, "driftguard.config.json");
  if (!fs.existsSync(configPath)) {
    return { ...DEFAULT_CONFIG };
  }
  const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return { ...DEFAULT_CONFIG, ...raw };
}

export function resolvePaths(rootDir: string, config: DriftGuardConfig) {
  const targetDir = path.join(rootDir, config.target);
  return {
    targetDir,
    sourceDir: path.join(targetDir, config.sourceDir),
    rulesDir: path.join(targetDir, config.rulesDir),
    incidentsDir: path.join(targetDir, config.incidentsDir),
    backupsDir: path.join(targetDir, config.backupsDir),
    tokensFile: path.join(targetDir, config.tokensFile),
    findingsFile: path.join(rootDir, config.findingsFile),
  };
}
