import React from "react";

export type FindingSeverity = "low" | "medium" | "high" | "critical";

const STYLES: Record<FindingSeverity, { label: string; className: string }> = {
  critical: {
    label: "Critical Severity",
    className: "bg-rose-950/60 text-rose-300 border border-rose-800/60 shadow-sm shadow-rose-900/10",
  },
  high: {
    label: "High Severity",
    className: "bg-red-950/50 text-red-400 border border-red-900/50 shadow-sm shadow-red-900/10",
  },
  medium: {
    label: "Medium Severity",
    className: "bg-amber-950/50 text-amber-400 border border-amber-900/50 shadow-sm shadow-amber-900/10",
  },
  low: {
    label: "Low Severity",
    className: "bg-slate-800 text-slate-300 border border-slate-700 shadow-sm",
  },
};

export function SeverityBadge({ severity }: { severity: FindingSeverity }) {
  const style = STYLES[severity] ?? STYLES.low;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.className}`}>
      {style.label}
    </span>
  );
}
