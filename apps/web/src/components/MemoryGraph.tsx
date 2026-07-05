import React, { useState } from "react";
import { Network, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Finding } from "./FindingCard";

export type RuleInfo = {
  id: string;
  title: string;
  category: string;
  detector: string;
  severity: string;
  links: string[];
  summary: string;
};

const CENTER_ID = "__workspace__";

export function MemoryGraph({ rules, findings }: { rules: RuleInfo[]; findings: Finding[] }) {
  const [selectedNode, setSelectedNode] = useState<string>(CENTER_ID);

  const hasFindings = findings.length > 0;
  const violatedRuleIds = new Set(findings.map(f => f.ruleId));
  const affectedFiles = [...new Set(findings.map(f => f.file))];

  const activeRule = rules.find(r => r.id === selectedNode);
  const isCenterSelected = selectedNode === CENTER_ID;

  // Layout calculations
  const center = { x: 260, y: 170 };
  const radius = 115;
  const totalOuter = Math.max(rules.length, 1);

  const nodePosition = (idx: number) => {
    const angle = (idx * 2 * Math.PI) / totalOuter - Math.PI / 2;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  };

  const relationFor = (rule: RuleInfo): string => {
    const finding = findings.find(f => f.ruleId === rule.id);
    if (!finding) return "guards";
    return finding.driftType.replace(/_/g, " ");
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-lg space-y-6 flex flex-col md:flex-row md:items-start gap-6">
      {/* Visual Canvas Panel */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 self-start">
          <div className="h-6 w-6 rounded-md bg-indigo-950 flex items-center justify-center text-indigo-400">
            <Network size={14} />
          </div>
          <span className="text-xs font-semibold text-white tracking-wider uppercase">DriftGraph™ Rule Memory Map</span>
          <span className="text-[10px] text-slate-500">{rules.length} rules · {violatedRuleIds.size} violated</span>
        </div>

        {/* SVG Container */}
        <div className="relative bg-slate-950 border border-slate-900 rounded-xl p-4 w-full flex justify-center overflow-hidden">
          <svg width="520" height="340" className="max-w-full drop-shadow-xl">
            {/* Relationship lines */}
            {rules.map((rule, idx) => {
              const { x, y } = nodePosition(idx);
              const violated = violatedRuleIds.has(rule.id);
              return (
                <g key={`edge-${rule.id}`}>
                  <line
                    x1={center.x}
                    y1={center.y}
                    x2={x}
                    y2={y}
                    stroke={violated ? "#4f46e5" : "#334155"}
                    strokeWidth={selectedNode === rule.id ? "2.5" : "1"}
                    strokeDasharray={violated ? "0" : "4 4"}
                    className="transition-all"
                  />
                  {violated && (
                    <text
                      x={(center.x + x) / 2}
                      y={(center.y + y) / 2 - 4}
                      fill="#818cf8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="opacity-70"
                    >
                      {relationFor(rule)}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center workspace node */}
            <g className="cursor-pointer group" onClick={() => setSelectedNode(CENTER_ID)}>
              <circle
                cx={center.x}
                cy={center.y}
                r={26}
                fill={hasFindings ? "#1e1b4b" : "#020617"}
                stroke={hasFindings ? "#ef4444" : "#10b981"}
                strokeWidth={isCenterSelected ? "3" : "2"}
                className="transition-all group-hover:scale-105"
              />
              <text
                x={center.x}
                y={center.y + 4}
                fill={hasFindings ? "#f87171" : "#34d399"}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {hasFindings ? "DRIFT" : "CLEAN"}
              </text>
            </g>

            {/* Rule nodes */}
            {rules.map((rule, idx) => {
              const { x, y } = nodePosition(idx);
              const isSelected = selectedNode === rule.id;
              const violated = violatedRuleIds.has(rule.id);

              return (
                <g key={rule.id} className="cursor-pointer group" onClick={() => setSelectedNode(rule.id)}>
                  <circle
                    cx={x}
                    cy={y}
                    r={18}
                    fill={isSelected ? "#1e1b4b" : "#0f172a"}
                    stroke={violated ? "#f43f5e" : isSelected ? "#4f46e5" : "#1e293b"}
                    strokeWidth={isSelected ? "2.5" : violated ? "2" : "1.5"}
                    className="transition-all group-hover:scale-110"
                  />
                  <text
                    x={x}
                    y={y + 3}
                    fill={isSelected ? "#ffffff" : violated ? "#fda4af" : "#94a3b8"}
                    fontSize="7"
                    fontWeight="600"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {rule.id.split("-")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Node Details Side Panel */}
      <div className="w-full md:w-56 bg-slate-950 border border-slate-900 rounded-xl p-5 flex flex-col justify-between shrink-0 h-[380px] md:h-[400px]">
        {isCenterSelected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                hasFindings ? "bg-rose-950 text-rose-400 border border-rose-900/50" : "bg-emerald-950 text-emerald-400 border border-emerald-900/50"
              }`}>
                workspace
              </span>
              <span className="flex items-center gap-1 text-[10px]">
                {hasFindings ? (
                  <><AlertTriangle size={11} className="text-rose-400" /><span className="text-rose-400 font-semibold">drifted</span></>
                ) : (
                  <><CheckCircle2 size={11} className="text-emerald-400" /><span className="text-emerald-400 font-semibold">aligned</span></>
                )}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm tracking-tight">Audited Workspace</h4>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                {hasFindings
                  ? `${findings.length} active finding(s) across ${affectedFiles.length} file(s):`
                  : "All scanned files conform to the loaded design-system rules."}
              </p>
              {affectedFiles.map(file => (
                <p key={file} className="text-[10px] font-mono text-rose-300/80 mt-1.5 break-all">{file}</p>
              ))}
            </div>
          </div>
        ) : activeRule ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/50">
                {activeRule.category}
              </span>
              <span className="flex items-center gap-1 text-[10px]">
                {violatedRuleIds.has(activeRule.id) ? (
                  <><AlertTriangle size={11} className="text-rose-400" /><span className="text-rose-400 font-semibold">violated</span></>
                ) : (
                  <><ShieldCheck size={11} className="text-indigo-400" /><span className="text-indigo-400 font-semibold">guarding</span></>
                )}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm tracking-tight">{activeRule.title}</h4>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{activeRule.summary}</p>
              <p className="text-[10px] text-slate-500 mt-2">
                Detector: <code className="font-mono text-slate-400">{activeRule.detector}</code> · Severity: <span className="text-slate-400">{activeRule.severity}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-xs py-8">
            Select any node on the design map to inspect metadata.
          </div>
        )}

        {activeRule && (
          <div className="border-t border-slate-900 pt-4 flex gap-1.5 text-[10px] text-indigo-400">
            <FileText size={12} className="shrink-0 mt-0.5" />
            <span className="italic">Defined in `.driftguard/rules/{activeRule.id}.md`</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default MemoryGraph;
