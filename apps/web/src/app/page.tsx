"use client";

import React, { useState, useEffect, useCallback } from "react";
import FindingCard, { Finding } from "../components/FindingCard";
import PatchPreview from "../components/PatchPreview";
import MemoryGraph, { RuleInfo } from "../components/MemoryGraph";
import {
  ShieldAlert,
  RefreshCw,
  GitPullRequest,
  CheckCircle2,
  Layout,
  Gauge,
  Sparkles,
  RotateCcw,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [rules, setRules] = useState<RuleInfo[]>([]);
  const [patch, setPatch] = useState<string>("");
  const [patchFiles, setPatchFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    scan: false,
    patch: false,
    apply: false,
    reset: false,
  });
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" | null }>({
    text: "",
    type: null,
  });

  function showMsg(text: string, type: "success" | "error" | "info") {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: null }), 6000);
  }

  function ingestFindings(data: Finding[]) {
    setFindings(data);
    const withPatch = data.filter(f => f.patch);
    if (withPatch.length > 0) {
      const uniquePatches = [...new Set(withPatch.map(f => f.patch as string))];
      setPatch(uniquePatches.join("\n"));
      setPatchFiles([...new Set(withPatch.map(f => f.file))]);
    } else {
      setPatch("");
      setPatchFiles([]);
    }
  }

  const fetchInitialState = useCallback(async () => {
    try {
      const [findingsRes, rulesRes] = await Promise.all([fetch("/api/scan"), fetch("/api/rules")]);
      ingestFindings(await findingsRes.json());
      const rulesData = await rulesRes.json();
      if (rulesData.success) setRules(rulesData.rules);
    } catch {
      showMsg("Failed to load workspace state.", "error");
    }
  }, []);

  useEffect(() => {
    fetchInitialState();
  }, [fetchInitialState]);

  async function handleScan() {
    setLoading(prev => ({ ...prev, scan: true }));
    showMsg("Scanning workspace against design-system rules...", "info");
    try {
      const res = await fetch("/api/scan", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        ingestFindings(data.findings);
        showMsg(
          `Scan completed: ${data.scannedFiles} files checked against ${data.rulesCount} rules — ${data.findings.length} drift finding(s).`,
          data.findings.length > 0 ? "info" : "success"
        );
      } else {
        showMsg(`Scan failed: ${data.error}`, "error");
      }
    } catch (err: any) {
      showMsg(`Scan error: ${err.message}`, "error");
    } finally {
      setLoading(prev => ({ ...prev, scan: false }));
    }
  }

  async function handleGeneratePatch() {
    if (findings.length === 0) {
      showMsg("No active design drift to patch.", "error");
      return;
    }
    setLoading(prev => ({ ...prev, patch: true }));
    showMsg("Computing token-aligned reconciliation diff...", "info");
    try {
      const res = await fetch("/api/patch", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setFindings(data.findings);
        setPatch(data.patch ?? "");
        setPatchFiles(data.files ?? []);
        showMsg(`Reconciliation patch computed for ${data.files.length} file(s).`, "success");
      } else {
        showMsg(`Patch generation failed: ${data.error}`, "error");
      }
    } catch (err: any) {
      showMsg(`Patch error: ${err.message}`, "error");
    } finally {
      setLoading(prev => ({ ...prev, patch: false }));
    }
  }

  async function handleApplyFix() {
    if (!patch) {
      showMsg("Generate a patch before attempting to apply a fix.", "error");
      return;
    }
    setLoading(prev => ({ ...prev, apply: true }));
    showMsg("Applying token-aligned fixes to codebase...", "info");
    try {
      const res = await fetch("/api/apply", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        ingestFindings(data.findings);
        showMsg(
          data.findings.length === 0
            ? `Fixes applied to ${data.appliedFiles.length} file(s) — workspace fully aligned!`
            : `Fixes applied; ${data.findings.length} finding(s) require manual review.`,
          "success"
        );
      } else {
        showMsg(`Failed to apply fix: ${data.error}`, "error");
      }
    } catch (err: any) {
      showMsg(`Apply error: ${err.message}`, "error");
    } finally {
      setLoading(prev => ({ ...prev, apply: false }));
    }
  }

  async function handleReset() {
    setLoading(prev => ({ ...prev, reset: true }));
    showMsg("Restoring pre-fix snapshots to reintroduce drift...", "info");
    try {
      const res = await fetch("/api/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        ingestFindings(data.findings);
        showMsg(`Restored ${data.restoredFiles.length} file(s) — drift reintroduced for demo.`, "success");
      } else {
        showMsg(`Reset failed: ${data.error}`, "error");
      }
    } catch (err: any) {
      showMsg(`Reset error: ${err.message}`, "error");
    } finally {
      setLoading(prev => ({ ...prev, reset: false }));
    }
  }

  const highSeverityCount = findings.filter(f => f.severity === "high" || f.severity === "critical").length;
  const totalOccurrences = findings.reduce((sum, f) => sum + (f.occurrences?.length ?? 0), 0);
  const healthScore = findings.length === 0 ? 100 : Math.max(10, 100 - (findings.length * 10 + highSeverityCount * 10));

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-16">
      {/* Header Panel */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-white shadow-lg shadow-indigo-500/20">
              DG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white">DriftGuard</span>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950 border border-indigo-900/60 px-2 py-0.5 rounded-full">LIVE ENGINE</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Cursor-Native Design System Guard & Auto-Patcher</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleScan}
              disabled={loading.scan}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-indigo-500/10"
            >
              <RefreshCw size={15} className={loading.scan ? "animate-spin" : ""} />
              {loading.scan ? "Scanning Workspace..." : "Scan Workspace"}
            </button>
            
            {findings.length > 0 && !patch && (
              <button 
                onClick={handleGeneratePatch}
                disabled={loading.patch}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-purple-500/10 animate-pulse"
              >
                <GitPullRequest size={15} className={loading.patch ? "animate-spin" : ""} />
                {loading.patch ? "Generating..." : "Generate Patch"}
              </button>
            )}

            {patch && findings.length > 0 && (
              <button 
                onClick={handleApplyFix}
                disabled={loading.apply}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-500/10 animate-bounce"
              >
                <CheckCircle2 size={15} className={loading.apply ? "animate-spin" : ""} />
                {loading.apply ? "Applying..." : "Apply Fix"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Status Notification Message */}
        {message.text && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all animate-fadeIn ${
            message.type === "success" ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-400" :
            message.type === "error" ? "bg-rose-950/20 border-rose-900/60 text-rose-400" :
            "bg-indigo-950/20 border-indigo-900/60 text-indigo-400"
          }`}>
            <Sparkles size={18} className="shrink-0" />
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Hero metrics bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Findings</span>
              <h3 className="text-2xl font-bold text-white mt-1">{findings.length}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{totalOccurrences} occurrence(s)</p>
            </div>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
              findings.length > 0 ? "bg-rose-950/30 text-rose-400 border-rose-900/40" : "bg-emerald-950/30 text-emerald-400 border-emerald-900/40"
            }`}>
              <ShieldAlert size={18} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">High Severity</span>
              <h3 className="text-2xl font-bold text-white mt-1">{highSeverityCount}</h3>
            </div>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
              highSeverityCount > 0 ? "bg-red-950/30 text-red-400 border-red-900/40" : "bg-slate-800 text-slate-400 border-slate-700"
            }`}>
              <AlertTriangle size={18} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Design Alignment</span>
              <h3 className="text-2xl font-bold text-white mt-1">{healthScore}%</h3>
            </div>
            <div className="h-9 w-9 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-indigo-400 flex items-center justify-center">
              <Gauge size={18} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Memory Rules</span>
              <h3 className="text-2xl font-bold text-white mt-1">{rules.length} Rules</h3>
            </div>
            <div className="h-9 w-9 rounded-lg bg-purple-950/30 border border-purple-900/40 text-purple-400 flex items-center justify-center">
              <Layout size={18} />
            </div>
          </div>
        </div>

        {/* Memory Graph Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">System Mapping</h3>
          <MemoryGraph rules={rules} findings={findings} />
        </div>

        {/* Dual Panel: Findings List & Patch Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left panel: Findings List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Detected Design Drift ({findings.length})</h3>
              {findings.length === 0 && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Active Alignment
                </span>
              )}
            </div>

            {findings.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {findings.map(finding => (
                  <FindingCard key={finding.id} finding={finding} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-10 text-center space-y-4 flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-emerald-950/40 border border-emerald-900/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="font-bold text-white text-base">Perfect System Alignment!</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No design-system drift detected in this workspace. All classes match defined tokens.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  disabled={loading.reset}
                  className="mt-2 text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RotateCcw size={12} className={loading.reset ? "animate-spin" : ""} />
                  {loading.reset ? "Restoring..." : "Reset / Reintroduce Drift"}
                </button>
              </div>
            )}
          </div>

          {/* Right panel: Patch Preview */}
          <div className="space-y-4 h-full">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Unified Visual Diff</h3>
            <div className="h-[600px]">
              <PatchPreview patch={patch} files={patchFiles} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
