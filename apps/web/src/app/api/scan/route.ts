import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { loadConfig, resolvePaths, scanAndPersist } from "scanner";

export const dynamic = "force-dynamic";

// The dev server runs inside apps/web; the workspace root is two levels up
const rootDir = path.resolve(process.cwd(), "../../");

function readFindings() {
  const { findingsFile } = resolvePaths(rootDir, loadConfig(rootDir));
  if (!fs.existsSync(findingsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(findingsFile, "utf-8"));
  } catch {
    return [];
  }
}

export async function GET() {
  return NextResponse.json(readFindings());
}

export async function POST() {
  try {
    const { findings, scannedFiles, rules } = scanAndPersist(rootDir);
    console.log(
      `[Dashboard API] Scan: ${scannedFiles} files, ${rules.length} rules, ${findings.length} finding(s).`
    );
    return NextResponse.json({ success: true, findings, scannedFiles, rulesCount: rules.length });
  } catch (err: any) {
    console.error(`[Dashboard API] Scan failed:`, err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
