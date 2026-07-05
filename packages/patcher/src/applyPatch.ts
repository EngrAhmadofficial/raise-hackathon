import fs from "fs";
import path from "path";
import { scanAndPersist } from "scanner";
import { computeFixes, getPaths } from "./computeFixes";

type BackupManifest = {
  createdAt: string;
  files: { file: string; backup: string }[];
};

function manifestPath(backupsDir: string): string {
  return path.join(backupsDir, "manifest.json");
}

export function readManifest(backupsDir: string): BackupManifest | null {
  const file = manifestPath(backupsDir);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as BackupManifest;
  } catch {
    return null;
  }
}

function backupFileName(file: string): string {
  return `${file.replace(/[^a-zA-Z0-9.]+/g, "__")}.orig`;
}

export type ApplyResult = {
  appliedFiles: string[];
  findings: ReturnType<typeof scanAndPersist>["findings"];
};

/**
 * Applies the computed token-aligned fixes in place. The pre-fix content of
 * every touched file is snapshotted (once) so the drift can be restored later
 * with `resetDrift`. Afterwards the workspace is re-scanned so findings and
 * incident memory reflect the actual post-fix state.
 */
export function applyPatch(rootDir: string = process.cwd()): ApplyResult {
  const { fixes } = computeFixes(rootDir);
  const { paths } = getPaths(rootDir);

  if (!fs.existsSync(paths.backupsDir)) {
    fs.mkdirSync(paths.backupsDir, { recursive: true });
  }

  const manifest: BackupManifest = readManifest(paths.backupsDir) ?? {
    createdAt: new Date().toISOString(),
    files: [],
  };

  for (const fix of fixes) {
    // Preserve the very first (drifted) snapshot even across repeated applies
    if (!manifest.files.some(entry => entry.file === fix.file)) {
      const backup = backupFileName(fix.file);
      fs.writeFileSync(path.join(paths.backupsDir, backup), fix.original, "utf-8");
      manifest.files.push({ file: fix.file, backup });
    }
    fs.writeFileSync(fix.absolutePath, fix.fixed, "utf-8");
  }

  if (manifest.files.length > 0) {
    fs.writeFileSync(manifestPath(paths.backupsDir), JSON.stringify(manifest, null, 2), "utf-8");
  }

  const result = scanAndPersist(rootDir);
  return { appliedFiles: fixes.map(f => f.file), findings: result.findings };
}

export type ResetResult = {
  restoredFiles: string[];
  findings: ReturnType<typeof scanAndPersist>["findings"];
};

/**
 * Restores every file from its pre-fix snapshot (reintroducing the drift),
 * clears the backups, and re-scans.
 */
export function resetDrift(rootDir: string = process.cwd()): ResetResult {
  const { paths } = getPaths(rootDir);
  const manifest = readManifest(paths.backupsDir);

  if (!manifest || manifest.files.length === 0) {
    throw new Error("No drift backup found — apply a fix first, then reset.");
  }

  const restored: string[] = [];
  for (const entry of manifest.files) {
    const backupFile = path.join(paths.backupsDir, entry.backup);
    if (!fs.existsSync(backupFile)) continue;
    fs.writeFileSync(path.join(rootDir, entry.file), fs.readFileSync(backupFile, "utf-8"), "utf-8");
    fs.unlinkSync(backupFile);
    restored.push(entry.file);
  }
  fs.unlinkSync(manifestPath(paths.backupsDir));

  const result = scanAndPersist(rootDir);
  return { restoredFiles: restored, findings: result.findings };
}
