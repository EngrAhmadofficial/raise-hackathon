import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('DriftGuard is now active inside Cursor!');

  // Helper function to execute shell commands from workspace root
  function runRootCommand(script: string, successMsg: string, errorMsgPrefix: string) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace folder detected.");
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `DriftGuard: Executing ${script}...`,
      cancellable: false
    }, () => {
      return new Promise<void>((resolve) => {
        exec(script, { cwd: rootPath }, (err, stdout, stderr) => {
          if (err) {
            vscode.window.showErrorMessage(`${errorMsgPrefix}: ${err.message}`);
            resolve();
            return;
          }
          vscode.window.showInformationMessage(successMsg);
          resolve();
        });
      });
    });
  }

  // 1. Scan Workspace command
  let scanCmd = vscode.commands.registerCommand("driftguard.scanWorkspace", () => {
    runRootCommand(
      "npm run driftguard:scan",
      "DriftGuard: Scan completed. Findings saved to findings.json.",
      "DriftGuard: Scan failed"
    );
  });

  // 2. Open Report command
  let reportCmd = vscode.commands.registerCommand("driftguard.openReport", () => {
    vscode.env.openExternal(vscode.Uri.parse("http://localhost:3001"));
  });

  // 3. Generate Patch command
  let patchCmd = vscode.commands.registerCommand("driftguard.generatePatch", () => {
    runRootCommand(
      "npm run driftguard:patch",
      "DriftGuard: Reconciliation patch generated inside findings.json.",
      "DriftGuard: Patch generation failed"
    );
  });

  // 4. Apply Fix command
  let fixCmd = vscode.commands.registerCommand("driftguard.applyFix", () => {
    runRootCommand(
      "npm run driftguard:fix",
      "DriftGuard: Design-system patch applied successfully! Layout is aligned.",
      "DriftGuard: Patch application failed"
    );
  });

  // 5. Reset Drift command (restores pre-fix snapshots)
  let resetCmd = vscode.commands.registerCommand("driftguard.resetDrift", () => {
    runRootCommand(
      "npm run driftguard:reset",
      "DriftGuard: Pre-fix snapshots restored — drift reintroduced.",
      "DriftGuard: Reset failed"
    );
  });

  context.subscriptions.push(scanCmd, reportCmd, patchCmd, fixCmd, resetCmd);
}

export function deactivate() {}
