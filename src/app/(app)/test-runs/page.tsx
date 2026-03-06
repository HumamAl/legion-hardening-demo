"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { testRuns, systems } from "@/data/mock-data";
import type { TestRun, TestRunStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function RunStatusBadge({ status }: { status: TestRunStatus }) {
  const config: Record<TestRunStatus, { label: string; colorClass: string }> = {
    Hardened: {
      label: "Hardened",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/15 border-[color:var(--success)]/25",
    },
    Verified: {
      label: "Verified",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    Passing: {
      label: "Passing",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    "Edge Case Detected": {
      label: "Edge Case",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    "Under Review": {
      label: "Under Review",
      colorClass: "text-primary bg-primary/10 border-primary/20",
    },
    Degraded: {
      label: "Degraded",
      colorClass:
        "text-destructive bg-destructive/10 border-destructive/20",
    },
    Flagged: {
      label: "Flagged",
      colorClass:
        "text-destructive bg-destructive/10 border-destructive/20",
    },
    Regressed: {
      label: "Regressed",
      colorClass:
        "text-destructive bg-destructive/15 border-destructive/25",
    },
  };

  const c = config[status] ?? {
    label: status,
    colorClass: "text-muted-foreground bg-muted border-border",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full border", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSystemName(systemId: string): string {
  const sys = systems.find((s) => s.id === systemId);
  return sys ? sys.name : systemId;
}

function formatDuration(minutes: number): string {
  if (minutes === 0) return "In Progress";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
}

const STATUS_OPTIONS: TestRunStatus[] = [
  "Passing",
  "Verified",
  "Hardened",
  "Edge Case Detected",
  "Under Review",
  "Degraded",
  "Flagged",
  "Regressed",
];

// ---------------------------------------------------------------------------
// Sort helpers
// ---------------------------------------------------------------------------

type SortKey = "startedAt" | "passRate" | "edgeCases" | "duration" | "agentColonySize";

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function TestRunHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TestRunStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("startedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const displayed = useMemo(() => {
    return testRuns
      .filter((r) => {
        const matchesStatus =
          statusFilter === "all" || r.status === statusFilter;
        const q = search.toLowerCase();
        const sysName = getSystemName(r.systemUnderTest).toLowerCase();
        const matchesSearch =
          q === "" ||
          r.id.toLowerCase().includes(q) ||
          sysName.includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === null || av === undefined) return 1;
        if (bv === null || bv === undefined) return -1;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  const columns: { key: SortKey; label: string }[] = [
    { key: "startedAt", label: "Started" },
    { key: "passRate", label: "Pass Rate" },
    { key: "edgeCases", label: "Edge Cases" },
    { key: "agentColonySize", label: "Colony Size" },
    { key: "duration", label: "Duration" },
  ];

  return (
    <div className="space-y-6 p-[var(--content-padding,1.5rem)]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Test Run History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All 15 verification runs across 8 systems under test — most recent
            first.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>
            <span className="font-mono font-medium text-foreground">
              {testRuns.filter((r) => r.completedAt === null).length}
            </span>{" "}
            run in progress
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search run ID or system name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v as "all" | TestRunStatus)
          }
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "run" : "runs"}
        </span>
      </div>

      {/* Table */}
      <div className="linear-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Run ID
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  System Under Test
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </TableHead>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <SortIcon col={col.key} />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No test runs match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((run: TestRun) => (
                  <>
                    <TableRow
                      key={run.id}
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors"
                      onClick={() =>
                        setExpandedId(expandedId === run.id ? null : run.id)
                      }
                    >
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {run.id}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground max-w-[180px] truncate">
                        {getSystemName(run.systemUnderTest)}
                      </TableCell>
                      <TableCell>
                        <RunStatusBadge status={run.status} />
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatDate(run.startedAt)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-mono text-sm font-medium tabular-nums",
                            run.passRate >= 90
                              ? "text-[color:var(--success)]"
                              : run.passRate >= 75
                              ? "text-[color:var(--warning)]"
                              : "text-destructive"
                          )}
                        >
                          {run.passRate.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-mono text-sm tabular-nums",
                            run.edgeCases === 0
                              ? "text-[color:var(--success)]"
                              : run.edgeCases <= 4
                              ? "text-[color:var(--warning)]"
                              : "text-destructive"
                          )}
                        >
                          {run.edgeCases}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums text-muted-foreground">
                          {run.agentColonySize}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatDuration(run.duration)}
                        </span>
                      </TableCell>
                    </TableRow>
                    {expandedId === run.id && (
                      <TableRow key={`${run.id}-expanded`}>
                        <TableCell
                          colSpan={8}
                          className="bg-[color:var(--surface-active)]/60 border-y border-border/40"
                        >
                          <div className="py-2 space-y-2">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                  Completed
                                </p>
                                <p className="font-mono text-xs text-foreground">
                                  {run.completedAt
                                    ? new Date(run.completedAt).toLocaleString(
                                        "en-US",
                                        {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )
                                    : "In Progress"}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                  System ID
                                </p>
                                <p className="font-mono text-xs text-foreground">
                                  {run.systemUnderTest}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                  Run ID
                                </p>
                                <p className="font-mono text-xs text-foreground">
                                  {run.id}
                                </p>
                              </div>
                            </div>
                            {run.statusNote && (
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                  Status Note
                                </p>
                                <p className="text-xs text-foreground leading-relaxed max-w-prose">
                                  {run.statusNote}
                                </p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
