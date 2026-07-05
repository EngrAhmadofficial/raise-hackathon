import React from "react";

export function DriftTypeBadge({ driftType }: { driftType: string }) {
  const mapping: { [key: string]: { label: string; style: string } } = {
    token_mismatch: {
      label: "Token Mismatch",
      style: "bg-orange-950/40 text-orange-400 border border-orange-900/40",
    },
    component_misuse: {
      label: "Component Misuse",
      style: "bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-900/40",
    },
    state_inconsistency: {
      label: "State Inconsistency",
      style: "bg-indigo-950/40 text-indigo-400 border border-indigo-900/40",
    },
    visual_regression: {
      label: "Visual Regression",
      style: "bg-rose-950/40 text-rose-400 border border-rose-900/40",
    },
    spacing_drift: {
      label: "Spacing Drift",
      style: "bg-blue-950/40 text-blue-400 border border-blue-900/40",
    },
    typography_drift: {
      label: "Typography Drift",
      style: "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40",
    },
    intentional_redesign: {
      label: "Intentional Redesign",
      style: "bg-violet-950/40 text-violet-400 border border-violet-900/40",
    },
    platform_constraint: {
      label: "Platform Constraint",
      style: "bg-cyan-950/40 text-cyan-400 border border-cyan-900/40",
    },
  };

  const item = mapping[driftType] || {
    label: driftType.replace("_", " ").toUpperCase(),
    style: "bg-slate-800 text-slate-400 border border-slate-700",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${item.style}`}>
      {item.label}
    </span>
  );
}
export default DriftTypeBadge;
