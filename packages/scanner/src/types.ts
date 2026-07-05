export type Severity = "low" | "medium" | "high" | "critical";

export type DriftType =
  | "token_mismatch"
  | "component_misuse"
  | "state_inconsistency"
  | "visual_regression"
  | "spacing_drift"
  | "typography_drift"
  | "intentional_redesign"
  | "platform_constraint";

export type DriftOccurrence = {
  /** 1-based line number in the source file */
  line: number;
  /** 1-based column of the match start */
  column: number;
  /** The exact source text that violated the rule */
  match: string;
  /** The trimmed source line, for display context */
  lineText: string;
  /** Token-aligned replacement computed from tokens.json (when auto-fixable) */
  suggestion?: string;
};

export type DriftFinding = {
  /** Deterministic id derived from rule id + file path */
  id: string;
  ruleId: string;
  title: string;
  /** Repo-root-relative file path */
  file: string;
  component: string;
  driftType: DriftType;
  severity: Severity;
  evidence: string;
  occurrences: DriftOccurrence[];
  tokenExpected?: string;
  actualValue?: string;
  reasoning?: string;
  suggestedFix?: string;
  patch?: string;
  confidence: number;
};

export type DriftRule = {
  id: string;
  type: string;
  category: string;
  /** Id of the detection engine this rule activates (see detectors.ts) */
  detector: string;
  severity_threshold: Severity;
  target_paths: string[];
  exempt_paths: string[];
  links: string[];
  title: string;
  description: string;
};

export type DriftGuardConfig = {
  /** Repo-root-relative directory of the app under audit */
  target: string;
  /** Target-relative source directory to walk */
  sourceDir: string;
  /** Target-relative directory containing markdown rules */
  rulesDir: string;
  /** Target-relative directory where incident memory files are written */
  incidentsDir: string;
  /** Target-relative directory where pre-fix backups are stored */
  backupsDir: string;
  /** Target-relative path of the design tokens file */
  tokensFile: string;
  /** Repo-root-relative path of the findings output */
  findingsFile: string;
  extensions: string[];
  ignoreDirs: string[];
};

export type ScanResult = {
  findings: DriftFinding[];
  rules: DriftRule[];
  scannedFiles: number;
};
