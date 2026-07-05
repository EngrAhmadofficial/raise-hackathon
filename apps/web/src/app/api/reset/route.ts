import { NextResponse } from "next/server";
import path from "path";
import { resetDrift } from "patcher";

export const dynamic = "force-dynamic";

const rootDir = path.resolve(process.cwd(), "../../");

export async function POST() {
  try {
    const { restoredFiles, findings } = resetDrift(rootDir);
    console.log(`[Dashboard API] Restored ${restoredFiles.length} file(s) from backup.`);
    return NextResponse.json({ success: true, restoredFiles, findings });
  } catch (err: any) {
    console.error(`[Dashboard API] Reset failed:`, err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
