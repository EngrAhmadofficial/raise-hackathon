import { generatePatch } from "./generatePatch";
import { applyPatch, resetDrift } from "./applyPatch";

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "generate";

  console.log(`[DriftGuard Patcher] Running command: ${command}...`);

  if (command === "generate") {
    try {
      const { patch, files } = generatePatch();
      if (files.length === 0) {
        console.log("No auto-fixable drift found — nothing to patch.");
        return;
      }
      console.log(`Generated patches for ${files.length} file(s): ${files.join(", ")}`);
      console.log(`==========================================`);
      console.log(patch);
      console.log(`==========================================`);
    } catch (err: any) {
      console.error(`Error during patch generation:`, err.message);
      process.exit(1);
    }
  } else if (command === "apply") {
    try {
      const { appliedFiles, findings } = applyPatch();
      if (appliedFiles.length === 0) {
        console.log("No auto-fixable drift found — nothing applied.");
      } else {
        console.log(`Applied design-system fixes to ${appliedFiles.length} file(s):`);
        appliedFiles.forEach(f => console.log(`  - ${f}`));
      }
      console.log(`Post-fix scan: ${findings.length} finding(s) remain.`);
    } catch (err: any) {
      console.error(`Error during patch application:`, err.message);
      process.exit(1);
    }
  } else if (command === "reset") {
    try {
      const { restoredFiles, findings } = resetDrift();
      console.log(`Restored ${restoredFiles.length} file(s) from pre-fix snapshots:`);
      restoredFiles.forEach(f => console.log(`  - ${f}`));
      console.log(`Post-reset scan: ${findings.length} finding(s) active.`);
    } catch (err: any) {
      console.error(`Error during reset:`, err.message);
      process.exit(1);
    }
  } else {
    console.error(`Unknown patch command: ${command}. Use "generate", "apply" or "reset".`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generatePatch } from "./generatePatch";
export type { GeneratedPatch } from "./generatePatch";
export { applyPatch, resetDrift } from "./applyPatch";
export type { ApplyResult, ResetResult } from "./applyPatch";
export { computeFixes } from "./computeFixes";
export { applyClassFixes, fixRawButtons, ensureImport } from "./fixes";
export { buildReasoningPrompt } from "./reasoningPrompt";
