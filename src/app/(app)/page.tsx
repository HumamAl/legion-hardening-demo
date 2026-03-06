"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  dashboardStats,
  stabilityChartData,
  agents,
  testRuns,
  systems,
} from "@/data/mock-data";
import { DemoBanner } from "@/components/layout/conversion-elements";
import { AgentColonyGrid } from "@/components/dashboard/agent-colony-grid";
import type { TestRunStatus } from "@/lib/types";

// SSR-safe chart import
const StabilityChart = dynamic(
  () =>
    import("@/components/dashboard/stability-chart").then(
      (m) => m.StabilityChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] bg-muted/20 rounded-lg animate-pulse" />
    ),
  }
);

// ── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Animated number display ────────────────────────────────────────────────
function AnimatedStat({
  value,
  formatter,
  duration = 1400,
}: {
  value: number;
  formatter: (n: number) => string;
  duration?: number;
}) {
  const { count, ref } = useCountUp(value, duration);
  return (
    <div ref={ref} className="text-3xl font-bold font-mono tabular-nums text-primary">
      {formatter(count)}
    </div>
  );
}

// ── Status badge for test runs ─────────────────────────────────────────────
function StatusBadge({ status }: { status: TestRunStatus }) {
  const config: Record<TestRunStatus, { label: string; classes: string }> = {
    Hardened: {
      label: "Hardened",
      classes: "bg-success/15 text-success border-success/30",
    },
    Verified: {
      label: "Verified",
      classes: "bg-success/15 text-success border-success/30",
    },
    Passing: {
      label: "Passing",
      classes: "bg-success/10 text-success border-success/20",
    },
    "Edge Case Detected": {
      label: "Edge Case",
      classes: "bg-warning/15 text-warning border-warning/30",
    },
    "Under Review": {
      label: "Under Review",
      classes: "bg-warning/10 text-warning border-warning/20",
    },
    Flagged: {
      label: "Flagged",
      classes: "bg-destructive/15 text-destructive border-destructive/30",
    },
    Degraded: {
      label: "Degraded",
      classes: "bg-destructive/10 text-destructive border-destructive/20",
    },
    Regressed: {
      label: "Regressed",
      classes: "bg-destructive/20 text-destructive border-destructive/40",
    },
  };

  const { label, classes } = config[status] ?? {
    label: status,
    classes: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-mono font-semibold uppercase tracking-wide",
        classes
      )}
    >
      {label}
    </span>
  );
}

// ── KPI stat card ──────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number;
  formatter: (n: number) => string;
  change: number;
  changeLabel: string;
  description: string;
  index: number;
  invertChange?: boolean;
}

function StatCard({
  title,
  value,
  formatter,
  change,
  changeLabel,
  description,
  index,
  invertChange = false,
}: StatCardProps) {
  const isPositive = invertChange ? change < 0 : change > 0;
  const changeDisplay = Math.abs(change);

  return (
    <div
      className="aesthetic-card p-5 animate-fade-up-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: "200ms",
        animationFillMode: "both",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
        {title}
      </p>
      <AnimatedStat value={value} formatter={formatter} />
      <div className="flex items-baseline gap-1.5 mt-2">
        <span
          className={cn(
            "text-xs font-mono font-semibold",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {change > 0 && !invertChange ? `+${changeDisplay}` : change < 0 && !invertChange ? `-${changeDisplay}` : invertChange && change < 0 ? `+${changeDisplay}` : `-${changeDisplay}`}
          {changeLabel}
        </span>
        <span className="text-[11px] text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

// ── Period filter ──────────────────────────────────────────────────────────
type Period = "3m" | "6m" | "12m";

// ── Main dashboard page ────────────────────────────────────────────────────
export default function ColonyOverviewPage() {
  const [period, setPeriod] = useState<Period>("12m");

  const chartData = useMemo(() => {
    if (period === "3m") return stabilityChartData.slice(-3);
    if (period === "6m") return stabilityChartData.slice(-6);
    return stabilityChartData;
  }, [period]);

  // 5 most recent test runs
  const recentRuns = useMemo(() => {
    return [...testRuns]
      .sort(
        (a, b) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      )
      .slice(0, 5);
  }, []);

  // System name lookup
  const systemName = (id: string) =>
    systems.find((s) => s.id === id)?.name ?? id;

  const stats: StatCardProps[] = [
    {
      title: "Total Agent Cycles",
      value: dashboardStats.totalAgentCycles,
      formatter: (n) => n.toLocaleString(),
      change: dashboardStats.agentCyclesChange,
      changeLabel: "%",
      description: "vs. prior period · colony throughput",
      index: 0,
    },
    {
      title: "Verification Pass Rate",
      value: Math.round(dashboardStats.verificationPassRate * 10) / 10,
      formatter: (n) => `${n.toFixed(n % 1 === 0 ? 0 : 1)}%`,
      change: dashboardStats.passRateChange,
      changeLabel: "pp",
      description: "· target 92%",
      index: 1,
    },
    {
      title: "Edge Cases Detected",
      value: dashboardStats.edgeCasesDetected,
      formatter: (n) => n.toLocaleString(),
      change: dashboardStats.edgeCasesChange,
      changeLabel: "%",
      description: "· 8 critical / high open",
      index: 2,
      invertChange: true,
    },
    {
      title: "Reliability Score",
      value: Math.round(dashboardStats.reliabilityScore * 10) / 10,
      formatter: (n) => `${n.toFixed(n % 1 === 0 ? 0 : 1)}%`,
      change: dashboardStats.reliabilityChange,
      changeLabel: "pp",
      description: "· fleet-wide · 12-month high",
      index: 3,
    },
    {
      title: "Active Agents",
      value: dashboardStats.activeAgents,
      formatter: (n) => n.toString(),
      change: dashboardStats.activeAgentsChange,
      changeLabel: "",
      description: "of 50 deployed · 4 colonies",
      index: 4,
    },
    {
      title: "Hardened Systems",
      value: dashboardStats.hardenedSystems,
      formatter: (n) => n.toString(),
      change: dashboardStats.hardenedSystemsChange,
      changeLabel: "",
      description: "sign-off granted · 8 total systems",
      index: 5,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight text-foreground"
            style={{ letterSpacing: "var(--heading-tracking)" }}
          >
            Colony Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fleet-wide verification status across all active systems and agent colonies
          </p>
        </div>
        <div className="shrink-0 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-success/30 bg-success/10">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-success font-medium">
            44 agents live
          </span>
        </div>
      </div>

      {/* ── KPI Stat Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* ── Stability Trend Chart ───────────────────────────────────── */}
      <div className="aesthetic-card p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Fleet Reliability vs. Regression Rate
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              12-month stability trajectory with target threshold overlay
            </p>
          </div>

          {/* Period filter */}
          <div className="flex gap-1.5 shrink-0">
            {(["3m", "6m", "12m"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1 text-xs font-mono rounded border transition-colors",
                  "duration-150",
                  period === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {p === "3m" ? "3 Mo" : p === "6m" ? "6 Mo" : "12 Mo"}
              </button>
            ))}
          </div>
        </div>

        <div className="px-2 pb-4">
          <StabilityChart data={chartData} />
        </div>
      </div>

      {/* ── Agent Colony Grid + Recent Runs ─────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        {/* Agent Colony Grid — 3/5 width */}
        <div className="xl:col-span-3 aesthetic-card p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Agent Colony — Live Status
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              All 20 active agents across col_alpha, col_bravo, col_charlie · hover for specialization
            </p>
          </div>
          <AgentColonyGrid agents={agents} />
        </div>

        {/* Recent Test Runs — 2/5 width */}
        <div className="xl:col-span-2 aesthetic-card p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Verification Runs
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Last 5 colony deployments across all systems under test
            </p>
          </div>

          <div className="space-y-2">
            {recentRuns.map((run) => (
              <div
                key={run.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border border-border/30",
                  "bg-muted/10 hover:bg-surface-hover transition-colors duration-150"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {systemName(run.systemUnderTest)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Pass rate:{" "}
                      <span className="text-foreground/80">{run.passRate}%</span>
                    </span>
                    <span className="text-border/60">·</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {run.edgeCases} edge cases
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground/60 font-mono">
                      {run.agentColonySize} agents ·{" "}
                      {run.duration > 0 ? `${run.duration}m` : "ongoing"}
                    </span>
                  </div>
                  {run.statusNote && (
                    <p className="text-[10px] text-muted-foreground/60 mt-1 leading-relaxed line-clamp-2">
                      {run.statusNote}
                    </p>
                  )}
                </div>
                <div className="shrink-0 mt-0.5">
                  <StatusBadge status={run.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Demo Banner ─────────────────────────────────────────────── */}
      <DemoBanner />
    </div>
  );
}
