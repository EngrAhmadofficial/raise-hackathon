import { NextResponse } from "next/server";
import path from "path";
import { loadConfig, loadRules, resolvePaths, ruleSummary } from "scanner";

export const dynamic = "force-dynamic";

const rootDir = path.resolve(process.cwd(), "../../");

export async function GET() {
  try {
    const { rulesDir } = resolvePaths(rootDir, loadConfig(rootDir));
    const rules = loadRules(rulesDir).map(rule => ({
      id: rule.id,
      title: rule.title,
      category: rule.category,
      detector: rule.detector,
      severity: rule.severity_threshold,
      links: rule.links,
      summary: ruleSummary(rule),
    }));
    return NextResponse.json({ success: true, rules });
  } catch (err: any) {
    console.error(`[Dashboard API] Rules load failed:`, err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
