import React from "react";
import { GitPullRequest, FileCode } from "lucide-react";

export function PatchPreview({ patch, files = [] }: { patch: string; files?: string[] }) {
  if (!patch) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-sm">
        No active patch to display. Click "Generate Patch" to compute diffs.
      </div>
    );
  }

  // Parse diff lines
  const lines = patch.split("\n");

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-950 border-b border-slate-900 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-indigo-950/50 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
            <GitPullRequest size={15} />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Reconciliation Git-Style Patch</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Token-aligned unified diff computed from the live scan</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
          <FileCode size={13} />
          <span className="font-mono text-[10px]">
            {files.length > 0 ? files.map(f => f.split("/").slice(-2).join("/")).join(", ") : "unified diff"}
          </span>
        </div>
      </div>

      {/* Code Monospace Panel */}
      <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-[11px] leading-relaxed select-text select-all">
        <div className="min-w-full space-y-0.5">
          {lines.map((line, idx) => {
            let lineClass = "text-slate-400";
            let bgClass = "transparent";

            if (line.startsWith("+")) {
              lineClass = "text-emerald-400";
              bgClass = "bg-emerald-950/20 px-1 border-l-2 border-emerald-500";
            } else if (line.startsWith("-")) {
              lineClass = "text-rose-400";
              bgClass = "bg-rose-950/20 px-1 border-l-2 border-rose-500";
            } else if (line.startsWith("diff") || line.startsWith("index") || line.startsWith("---") || line.startsWith("+++") || line.startsWith("@@")) {
              lineClass = "text-indigo-400/80 font-semibold";
              bgClass = "bg-slate-900/40 opacity-70 px-1";
            }

            return (
              <div
                key={idx}
                className={`py-0.5 whitespace-pre-wrap select-all font-mono transition-colors ${lineClass} ${bgClass}`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default PatchPreview;
