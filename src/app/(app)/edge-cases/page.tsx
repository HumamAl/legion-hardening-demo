"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { edgeCases, REMEDIATION_STATUSES } from "@/data/mock-data";
import type { EdgeCase, EdgeCaseSeverity, RemediationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Severity badge
// ---------------------------------------------------------------------------

function SeverityBadge({ severity }: { severity: EdgeCaseSeverity }) {
  const config: Record<EdgeCaseSeverity, { colorClass: string }> = {
    Critical: {
      colorClass:
        "text-destructive bg-destructive/15 border-destructive/30 font-bold",
    },
    High: {
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/12 border-[color:var(--warning)]/25",
    },
    Medium: {
      colorClass:
        "text-primary bg-primary/10 border-primary/20",
    },
    Low: {
      colorClass:
        "text-muted-foreground bg-muted/60 border-border",
    },
  };
  const c = config[severity];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full border", c.colorClass)}
    >
      {severity}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Remediation badge
// ---------------------------------------------------------------------------

function RemediationBadge({ status }: { status: RemediationStatus }) {
  const config: Record<RemediationStatus, { colorClass: string }> = {
    "Verified Fixed": {
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    "Accepted Risk": {
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/8 border-[color:var(--success)]/15",
    },
    "Patch Deployed": {
      colorClass:
        "text-primary bg-primary/10 border-primary/20",
    },
    "Under Investigation": {
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    "Escalated to Engineering": {
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    Detected: {
      colorClass:
        "text-destructive bg-destructive/8 border-destructive/20",
    },
    "Regression — Reintroduced": {
      colorClass:
        "text-destructive bg-destructive/15 border-destructive/30",
    },
  };
  const c = config[status] ?? {
    colorClass: "text-muted-foreground bg-muted border-border",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full border whitespace-nowrap", c.colorClass)}
    >
      {status}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SEVERITIES: EdgeCaseSeverity[] = ["Critical", "High", "Medium", "Low"];
const CATEGORIES = [
  "Boundary Violation",
  "Race Condition",
  "Memory Overflow",
  "Timeout Exceeded",
  "State Corruption",
  "API Contract Break",
  "Data Integrity Failure",
  "Concurrency Deadlock",
  "Cascading Failure",
  "Protocol Deviation",
  "Security Bypass",
  "Configuration Drift",
] as const;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}

// Severity ordering for sorting
const severityOrder: Record<EdgeCaseSeverity, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function EdgeCaseTrackerPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<"all" | EdgeCaseSeverity>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | string>("all");
  const [remediationFilter, setRemediationFilter] = useState<"all" | RemediationStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    return edgeCases
      .filter((ec) => {
        const matchesSeverity =
          severityFilter === "all" || ec.severity === severityFilter;
        const matchesCategory =
          categoryFilter === "all" || ec.category === categoryFilter;
        const matchesRemediation =
          remediationFilter === "all" || ec.remediationStatus === remediationFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          ec.id.toLowerCase().includes(q) ||
          ec.description.toLowerCase().includes(q) ||
          ec.category.toLowerCase().includes(q) ||
          ec.systemPath.toLowerCase().includes(q);
        return matchesSeverity && matchesCategory && matchesRemediation && matchesSearch;
      })
      .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }, [search, severityFilter, categoryFilter, remediationFilter]);

  const openCount = edgeCases.filter((ec) => ec.resolvedAt === null).length;
  const criticalCount = edgeCases.filter((ec) => ec.severity === "Critical").length;

  return (
    <div className="space-y-6 p-[var(--content-padding,1.5rem)]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Edge Case Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All 20 detected edge cases across active verification campaigns — sorted by severity.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span>
              <span className="font-mono font-medium text-destructive">
                {criticalCount}
              </span>{" "}
              critical
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>
              <span className="font-mono font-medium text-foreground">
                {openCount}
              </span>{" "}
              open findings
            </span>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search description, system path, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={severityFilter}
          onValueChange={(v) =>
            setSeverityFilter(v as "all" | EdgeCaseSeverity)
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All severities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severities</SelectItem>
            {SEVERITIES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={remediationFilter}
          onValueChange={(v) =>
            setRemediationFilter(v as "all" | RemediationStatus)
          }
        >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="All remediation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All remediation</SelectItem>
            {REMEDIATION_STATUSES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "finding" : "findings"}
        </span>
      </div>

      {/* Edge case cards */}
      <div className="space-y-2">
        {displayed.length === 0 ? (
          <div className="linear-card p-12 text-center text-sm text-muted-foreground">
            No edge cases match this filter. All systems hardened in this view.
          </div>
        ) : (
          displayed.map((ec: EdgeCase) => {
            const isExpanded = expandedId === ec.id;
            return (
              <div
                key={ec.id}
                className={cn(
                  "linear-card overflow-hidden transition-all",
                  isExpanded && "border-primary/20"
                )}
              >
                {/* Card header row — always visible */}
                <div
                  className="flex items-start gap-3 p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : ec.id)
                  }
                >
                  <div className="mt-0.5 shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <SeverityBadge severity={ec.severity} />
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/60">
                        {ec.category}
                      </span>
                      <RemediationBadge status={ec.remediationStatus} />
                    </div>
                    <p className="text-sm text-foreground font-medium line-clamp-2 leading-snug">
                      {ec.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatDate(ec.detectedAt)}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">
                      {ec.id}
                    </p>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-border/50 bg-[color:var(--surface-active)]/40 px-4 py-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        System Execution Path
                      </p>
                      <code className="font-mono text-xs text-primary bg-primary/8 px-2 py-1.5 rounded border border-primary/15 block break-all leading-relaxed">
                        {ec.systemPath}
                      </code>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Full Description
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {ec.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Detected
                        </p>
                        <p className="font-mono text-xs text-foreground">
                          {new Date(ec.detectedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Resolved
                        </p>
                        <p className="font-mono text-xs text-foreground">
                          {ec.resolvedAt
                            ? formatDate(ec.resolvedAt)
                            : "Open"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Test Run
                        </p>
                        <p className="font-mono text-xs text-foreground">
                          {ec.testRunId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Detecting Agent
                        </p>
                        <p className="font-mono text-xs text-foreground">
                          {ec.agentId}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
