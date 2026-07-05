import { NextResponse } from "next/server";
import path from "path";
import { generatePatch } from "patcher";

export const dynamic = "force-dynamic";

const rootDir = path.resolve(process.cwd(), "../../");

export async function POST() {
  try {
    const { patch, files, findings } = generatePatch(rootDir);
    console.log(`[Dashboard API] Generated patches for ${files.length} file(s).`);
    return NextResponse.json({ success: true, patch, files, findings });
  } catch (err: any) {
    console.error(`[Dashboard API] Patch generation failed:`, err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
