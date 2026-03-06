"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { integrityReports, getAgentById } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import type { IntegrityReportStatus } from "@/lib/types";
import {
  FileCheck,
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
  Bot,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// ── Status badge ────────────────────────────────────────────────────────────
function ReportStatusBadge({ status }: { status: IntegrityReportStatus }) {
  const config: Record<IntegrityReportStatus, { label: string; colorClass: string }> = {
    Verified: {
      label: "Verified",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    Hardened: {
      label: "Hardened",
      colorClass: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10 border-[color:var(--chart-3)]/20",
    },
    "Under Review": {
      label: "Under Review",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    Flagged: {
      label: "Flagged",
      colorClass: "text-[color:var(--destructive)] bg-[color:var(--destructive)]/10 border-[color:var(--destructive)]/20",
    },
    Degraded: {
      label: "Degraded",
      colorClass: "text-[color:var(--chart-4)] bg-[color:var(--chart-4)]/10 border-[color:var(--chart-4)]/20",
    },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-[10px] font-mono px-2 py-0.5", c.colorClass)}>
      {c.label}
    </Badge>
  );
}

// ── Progress bar ────────────────────────────────────────────────────────────
function CheckProgress({ passed, total }: { passed: number; total: number }) {
  const pct = Math.round((passed / total) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Checks Passed</span>
        <span className="font-mono font-medium">
          {passed}/{total} ({pct}%)
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            pct >= 95
              ? "bg-[color:var(--success)]"
              : pct >= 80
                ? "bg-[color:var(--warning)]"
                : "bg-[color:var(--destructive)]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Single report card ──────────────────────────────────────────────────────
function ReportCard({ report }: { report: (typeof integrityReports)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const leadAgent = getAgentById(report.leadAgentId);

  return (
    <div className="linear-card rounded-lg border border-border/60 bg-card overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-4 flex items-start gap-4 hover:bg-[color:var(--surface-hover)] transition-colors"
      >
        <div className="pt-0.5 shrink-0">
          {report.criticalFindings === 0 ? (
            <CheckCircle2 className="h-5 w-5 text-[color:var(--success)]" />
          ) : (
            <XCircle className="h-5 w-5 text-[color:var(--destructive)]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold truncate">{report.systemName}</h3>
            <ReportStatusBadge status={report.status} />
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(report.verificationDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              {report.agentsDeployed} agents
            </span>
            {report.criticalFindings > 0 && (
              <span className="flex items-center gap-1 text-[color:var(--destructive)]">
                <AlertTriangle className="h-3 w-3" />
                {report.criticalFindings} critical
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 pt-1">
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/30 pt-4">
          <CheckProgress passed={report.passedChecks} total={report.totalChecks} />

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Summary</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">{report.summary}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-2 rounded bg-muted/10 border border-border/20">
              <div className="text-lg font-bold font-mono">{report.passedChecks}</div>
              <div className="text-[10px] text-muted-foreground">Passed</div>
            </div>
            <div className="text-center p-2 rounded bg-muted/10 border border-border/20">
              <div className="text-lg font-bold font-mono">{report.totalChecks - report.passedChecks}</div>
              <div className="text-[10px] text-muted-foreground">Failed</div>
            </div>
            <div className="text-center p-2 rounded bg-muted/10 border border-border/20">
              <div className="text-lg font-bold font-mono">{report.criticalFindings}</div>
              <div className="text-[10px] text-muted-foreground">Critical</div>
            </div>
            <div className="text-center p-2 rounded bg-muted/10 border border-border/20">
              <div className="text-lg font-bold font-mono">{report.agentsDeployed}</div>
              <div className="text-[10px] text-muted-foreground">Agents</div>
            </div>
          </div>

          {leadAgent && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/20">
              <Shield className="h-3 w-3 text-primary" />
              <span>
                Lead Agent: <span className="font-mono text-foreground/70">{leadAgent.name}</span> ({leadAgent.specialization})
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Filter tabs ─────────────────────────────────────────────────────────────
type Filter = "all" | "verified" | "issues";

export default function IntegrityReportsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = integrityReports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "verified") return r.status === "Verified" || r.status === "Hardened";
    return r.status === "Flagged" || r.status === "Degraded" || r.status === "Under Review";
  });

  const verifiedCount = integrityReports.filter(
    (r) => r.status === "Verified" || r.status === "Hardened"
  ).length;
  const issueCount = integrityReports.length - verifiedCount;

  return (
    <div style={{ padding: "var(--content-padding)" }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrity Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            System verification summaries from colony sign-off runs
          </p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-md bg-muted/30 border border-border/40">
          {([
            { key: "all" as Filter, label: `All (${integrityReports.length})` },
            { key: "verified" as Filter, label: `Cleared (${verifiedCount})` },
            { key: "issues" as Filter, label: `Issues (${issueCount})` },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="linear-card p-3 rounded-lg border border-border/60 bg-card text-center">
          <div className="text-2xl font-bold font-mono text-[color:var(--success)]">{verifiedCount}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Systems Cleared</div>
        </div>
        <div className="linear-card p-3 rounded-lg border border-border/60 bg-card text-center">
          <div className="text-2xl font-bold font-mono text-[color:var(--destructive)]">{issueCount}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Pending Issues</div>
        </div>
        <div className="linear-card p-3 rounded-lg border border-border/60 bg-card text-center">
          <div className="text-2xl font-bold font-mono">
            {integrityReports.reduce((s, r) => s + r.criticalFindings, 0)}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Critical Findings</div>
        </div>
        <div className="linear-card p-3 rounded-lg border border-border/60 bg-card text-center">
          <div className="text-2xl font-bold font-mono">
            {Math.round(
              integrityReports.reduce((s, r) => s + (r.passedChecks / r.totalChecks) * 100, 0) /
                integrityReports.length
            )}
            %
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Avg Pass Rate</div>
        </div>
      </div>

      {/* Report cards */}
      <div className="space-y-3">
        {filtered.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            No reports match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
