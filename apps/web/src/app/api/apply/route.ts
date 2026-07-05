import { NextResponse } from "next/server";
import path from "path";
import { applyPatch } from "patcher";

export const dynamic = "force-dynamic";

const rootDir = path.resolve(process.cwd(), "../../");

export async function POST() {
  try {
    const { appliedFiles, findings } = applyPatch(rootDir);
    console.log(`[Dashboard API] Applied fixes to ${appliedFiles.length} file(s).`);
    return NextResponse.json({ success: true, appliedFiles, findings });
  } catch (err: any) {
    console.error(`[Dashboard API] Patch application failed:`, err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
