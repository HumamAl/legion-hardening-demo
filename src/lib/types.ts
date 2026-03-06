import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Screen definition for frame-based demo formats
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// Conversion element variant types
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ---------------------------------------------------------------------------
// LEGION HARDENING DOMAIN TYPES
// Multi-agent autonomous testing platform for Aerospace & Defense systems
// ---------------------------------------------------------------------------

// --- Agent Registry ---

export type AgentStatus =
  | "Passing"
  | "Degraded"
  | "Edge Case Detected"
  | "Under Review"
  | "Hardened"
  | "Flagged"
  | "Regressed"
  | "Verified";

export type AgentSpecialization =
  | "Boundary Explorer"
  | "Load Stressor"
  | "State Mutator"
  | "Concurrency Prober"
  | "API Fuzzer"
  | "Data Integrity Validator"
  | "Timeout Sentinel"
  | "Memory Profiler"
  | "Race Condition Hunter"
  | "Fault Injector"
  | "Protocol Verifier"
  | "Regression Watchdog"
  | "Security Prober"
  | "Chaos Orchestrator"
  | "Compliance Auditor";

export interface Agent {
  /** Prefixed ID: agt_xxxxx */
  id: string;
  name: string;
  specialization: AgentSpecialization;
  status: AgentStatus;
  /** ID of the SystemUnderTest the agent is currently assigned to — null if idle */
  currentAssignment: string | null;
  lastActive: string;
  /** Percentage 0–100 of test cycles completed without defect */
  successRate: number;
  edgeCasesFound: number;
  /** Total test cycles executed across all runs */
  totalCyclesRun: number;
  /** Colony this agent belongs to */
  colonyId: string;
}

// --- Test Runs ---

export type TestRunStatus =
  | "Passing"
  | "Degraded"
  | "Edge Case Detected"
  | "Under Review"
  | "Hardened"
  | "Flagged"
  | "Regressed"
  | "Verified";

export interface TestRun {
  /** Prefixed ID: run_xxxxx */
  id: string;
  /** ID of the SystemUnderTest */
  systemUnderTest: string;
  agentColonySize: number;
  status: TestRunStatus;
  /** Percentage 0–100 */
  passRate: number;
  edgeCases: number;
  /** Duration in minutes */
  duration: number;
  startedAt: string;
  completedAt: string | null;
  /** Brief note on outcome or blockage */
  statusNote?: string | null;
}

// --- Edge Cases ---

export type EdgeCaseSeverity = "Critical" | "High" | "Medium" | "Low";

export type EdgeCaseCategory =
  | "Boundary Violation"
  | "Race Condition"
  | "Memory Overflow"
  | "Timeout Exceeded"
  | "State Corruption"
  | "API Contract Break"
  | "Data Integrity Failure"
  | "Concurrency Deadlock"
  | "Cascading Failure"
  | "Protocol Deviation"
  | "Security Bypass"
  | "Configuration Drift";

export type RemediationStatus =
  | "Detected"
  | "Under Investigation"
  | "Patch Deployed"
  | "Verified Fixed"
  | "Accepted Risk"
  | "Escalated to Engineering"
  | "Regression — Reintroduced";

export interface EdgeCase {
  /** Prefixed ID: ec_xxxxx */
  id: string;
  /** References TestRun.id */
  testRunId: string;
  /** References Agent.id — the agent that detected this edge case */
  agentId: string;
  severity: EdgeCaseSeverity;
  category: EdgeCaseCategory;
  description: string;
  /** System module / execution path where the edge case was isolated */
  systemPath: string;
  remediationStatus: RemediationStatus;
  detectedAt: string;
  /** ISO timestamp when remediation was completed — null if still open */
  resolvedAt: string | null;
}

// --- Stability Metrics (monthly time-series) ---

export interface StabilityMetric {
  month: string;
  /** Overall system reliability score 0–100 */
  reliabilityScore: number;
  /** Percentage of test cycles that introduced regressions */
  regressionRate: number;
  /** Percentage of system code paths covered by active agents 0–100 */
  agentCoverage: number;
  /** Number of complete test cycles completed by the colony in the month */
  throughput: number;
  /** Total edge cases detected in the month */
  edgeCasesDetected: number;
}

// --- Integrity Reports ---

export type IntegrityReportStatus =
  | "Verified"
  | "Hardened"
  | "Under Review"
  | "Flagged"
  | "Degraded";

export interface IntegrityReport {
  /** Prefixed ID: rpt_xxxxx */
  id: string;
  /** Display name of the verified system */
  systemName: string;
  /** References SystemUnderTest.id */
  systemId: string;
  verificationDate: string;
  status: IntegrityReportStatus;
  passedChecks: number;
  totalChecks: number;
  /** Number of P0/P1 findings that block sign-off */
  criticalFindings: number;
  agentsDeployed: number;
  /** Free-text summary from the colony */
  summary: string;
  /** ID of the lead verifier agent */
  leadAgentId: string;
}

// --- Systems Under Test ---

export type SystemTier = "Mission-Critical" | "Flight-Safety" | "Operational" | "Supporting";

export type SystemStatus =
  | "Verified"
  | "Under Verification"
  | "Hardened"
  | "Degraded"
  | "Pending Hardening"
  | "Flagged";

export interface SystemUnderTest {
  /** Prefixed ID: sys_xxxxx */
  id: string;
  name: string;
  tier: SystemTier;
  lastVerified: string | null;
  /** Stability score 0–100 from the last completed verification */
  stabilityScore: number | null;
  status: SystemStatus;
  /** Owning subsystem / program */
  program: string;
  activeAgents: number;
}

// --- Dashboard KPI ---

export interface DashboardStats {
  /** Total agent-hours executed across all colonies this period */
  totalAgentCycles: number;
  agentCyclesChange: number;
  /** Colony-wide verification pass rate (%) */
  verificationPassRate: number;
  passRateChange: number;
  /** Total unique edge cases detected this period */
  edgeCasesDetected: number;
  edgeCasesChange: number;
  /** Overall platform reliability score (%) */
  reliabilityScore: number;
  reliabilityChange: number;
  /** Active agents currently deployed */
  activeAgents: number;
  activeAgentsChange: number;
  /** Number of systems that passed final hardening sign-off */
  hardenedSystems: number;
  hardenedSystemsChange: number;
}

// --- Chart Data Shapes ---

export interface StabilityChartPoint {
  month: string;
  reliabilityScore: number;
  regressionRate: number;
  target: number;
}

export interface ThroughputChartPoint {
  month: string;
  throughput: number;
  edgeCasesDetected: number;
}

export interface CoverageBreakdownPoint {
  system: string;
  coverage: number;
  agents: number;
}

export interface EdgeCaseBySeverity {
  severity: EdgeCaseSeverity;
  count: number;
  resolved: number;
}

export interface PassRateBySystem {
  system: string;
  passRate: number;
  runs: number;
}
