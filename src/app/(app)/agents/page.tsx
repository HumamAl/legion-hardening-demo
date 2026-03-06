"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Activity } from "lucide-react";
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
import React from "react";
import { agents, systems, AGENT_STATUSES } from "@/data/mock-data";
import type { Agent, AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  const config: Record<AgentStatus, { label: string; colorClass: string }> = {
    Passing: {
      label: "Passing",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    Verified: {
      label: "Verified",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
    },
    Hardened: {
      label: "Hardened",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/15 border-[color:var(--success)]/25",
    },
    "Edge Case Detected": {
      label: "Edge Case",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    },
    "Under Review": {
      label: "Under Review",
      colorClass: "text-primary bg-primary/10 border-primary/20",
    },
    Degraded: {
      label: "Degraded",
      colorClass: "text-destructive bg-destructive/10 border-destructive/20",
    },
    Flagged: {
      label: "Flagged",
      colorClass: "text-destructive bg-destructive/10 border-destructive/20",
    },
    Regressed: {
      label: "Regressed",
      colorClass: "text-destructive bg-destructive/15 border-destructive/25",
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
// Sort helpers
// ---------------------------------------------------------------------------

type SortKey = "name" | "specialization" | "successRate" | "edgeCasesFound" | "totalCyclesRun";

function getSystemName(systemId: string | null): string {
  if (!systemId) return "—";
  const sys = systems.find((s) => s.id === systemId);
  return sys ? sys.name : systemId;
}

function formatRate(val: number): string {
  return `${val.toFixed(1)}%`;
}

function formatNumber(val: number): string {
  return val.toLocaleString();
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AgentRegistryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AgentStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("successRate");
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
    return agents
      .filter((a) => {
        const matchesStatus = statusFilter === "all" || a.status === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          a.name.toLowerCase().includes(q) ||
          a.specialization.toLowerCase().includes(q) ||
          a.colonyId.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Agent ID" },
    { key: "specialization", label: "Specialization" },
    { key: "successRate", label: "Success Rate" },
    { key: "edgeCasesFound", label: "Edge Cases" },
    { key: "totalCyclesRun", label: "Total Cycles" },
  ];

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  return (
    <div className="space-y-6 p-[var(--content-padding,1.5rem)]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Registry</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All 20 autonomous testing agents across Alpha, Bravo, and Charlie colonies.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4 text-primary" />
          <span>
            <span className="font-mono font-medium text-foreground">
              {agents.filter((a) => a.currentAssignment !== null).length}
            </span>{" "}
            agents deployed
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search agents, specializations, colonies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | AgentStatus)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {AGENT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "agent" : "agents"}
        </span>
      </div>

      {/* Table */}
      <div className="linear-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Assignment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No agents match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((agent: Agent) => (
                  <React.Fragment key={agent.id}>
                    <TableRow
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors"
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors"
                      onClick={() =>
                        setExpandedId(expandedId === agent.id ? null : agent.id)
                      }
                    >
                      <TableCell>
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {agent.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {agent.specialization}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-mono text-sm font-medium tabular-nums",
                            agent.successRate >= 95
                              ? "text-[color:var(--success)]"
                              : agent.successRate >= 85
                              ? "text-[color:var(--warning)]"
                              : "text-destructive"
                          )}
                        >
                          {formatRate(agent.successRate)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums text-foreground">
                          {agent.edgeCasesFound}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums text-muted-foreground">
                          {formatNumber(agent.totalCyclesRun)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <AgentStatusBadge status={agent.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {getSystemName(agent.currentAssignment)}
                      </TableCell>
                    </TableRow>
                    {expandedId === agent.id && (
                      <TableRow key={`${agent.id}-expanded`}>
                        <TableCell
                          colSpan={7}
                          className="bg-[color:var(--surface-active)]/60 border-y border-border/40"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 text-sm">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                Agent ID
                              </p>
                              <p className="font-mono text-xs text-foreground">
                                {agent.id}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                Colony
                              </p>
                              <p className="font-mono text-xs text-primary">
                                {agent.colonyId}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                Last Active
                              </p>
                              <p className="font-mono text-xs text-foreground">
                                {new Date(agent.lastActive).toLocaleString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                Current Assignment
                              </p>
                              <p className="text-xs text-foreground">
                                {getSystemName(agent.currentAssignment)}
                              </p>
                            </div>
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
