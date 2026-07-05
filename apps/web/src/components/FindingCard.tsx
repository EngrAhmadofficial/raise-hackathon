import React from "react";
import { SeverityBadge, FindingSeverity } from "./SeverityBadge";
import { DriftTypeBadge } from "./DriftTypeBadge";
import { AlertCircle, Code, Info, Sparkles, HelpCircle } from "lucide-react";

export type FindingOccurrence = {
  line: number;
  column: number;
  match: string;
  lineText: string;
  suggestion?: string;
};

export type Finding = {
  id: string;
  ruleId: string;
  title: string;
  file: string;
  component: string;
  driftType: string;
  severity: FindingSeverity;
  evidence: string;
  occurrences: FindingOccurrence[];
  tokenExpected?: string;
  actualValue?: string;
  reasoning?: string;
  suggestedFix?: string;
  patch?: string;
  confidence: number;
};

export function FindingCard({ finding }: { finding: Finding }) {
  const occurrences = finding.occurrences ?? [];

  return (
    <div className="bg-slate-900 border border-slate-800/80 hover:border-indigo-500/30 transition-all rounded-xl p-6 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-tight text-base">{finding.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Detected in <span className="font-mono text-slate-400">{finding.file}</span> &middot; <span className="font-semibold text-slate-400">{finding.component}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DriftTypeBadge driftType={finding.driftType} />
          <SeverityBadge severity={finding.severity} />
        </div>
      </div>

      {/* Reasoning or Description */}
      {finding.reasoning && (
        <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-4 flex gap-3">
          <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={11} className="text-indigo-400" />
              Reasoning
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">{finding.reasoning}</p>
          </div>
        </div>
      )}

      {/* Occurrences with exact locations */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Code size={13} />
          <span>Occurrences ({occurrences.length})</span>
        </div>
        <div className="bg-slate-950 border border-slate-900/80 rounded-lg divide-y divide-slate-900 overflow-hidden">
          {occurrences.slice(0, 6).map((occ, idx) => (
            <div key={idx} className="px-3 py-2 flex items-center gap-3 overflow-x-auto">
              <span className="font-mono text-[10px] text-slate-500 shrink-0 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
                L{occ.line}:{occ.column}
              </span>
              <code className="text-xs font-mono text-rose-400 whitespace-pre shrink-0">{occ.match}</code>
              {occ.suggestion && (
                <>
                  <span className="text-slate-600 text-xs shrink-0">&rarr;</span>
                  <code className="text-xs font-mono text-emerald-400 whitespace-pre shrink-0">{occ.suggestion}</code>
                </>
              )}
            </div>
          ))}
          {occurrences.length > 6 && (
            <div className="px-3 py-2 text-[11px] text-slate-500">
              + {occurrences.length - 6} more occurrence(s)
            </div>
          )}
        </div>
      </div>

      {/* Suggested Fix */}
      {finding.suggestedFix && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <HelpCircle size={13} className="text-emerald-400" />
            <span className="text-slate-400 font-medium">Suggested Fix</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed bg-emerald-950/10 border border-emerald-900/20 rounded-lg p-3 flex gap-2.5">
            <span className="text-emerald-400 font-bold shrink-0">&rarr;</span>
            <span>{finding.suggestedFix}</span>
          </div>
        </div>
      )}

      {/* Metadata confidence */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/40 pt-3">
        <span>Rule: <code className="font-mono text-slate-400">{finding.ruleId}</code></span>
        <span className="flex items-center gap-1">
          Confidence: 
          <span className="font-semibold text-indigo-400">{Math.round(finding.confidence * 100)}%</span>
        </span>
      </div>
    </div>
  );
}
export default FindingCard;
