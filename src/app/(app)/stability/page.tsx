"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { TrendingUp, TrendingDown, Activity, Shield } from "lucide-react";
import { stabilityMetrics } from "@/data/mock-data";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Dynamic imports — no SSR for Recharts
// ---------------------------------------------------------------------------

const ReliabilityLineChart = dynamic(
  () =>
    import("@/components/stability/stability-charts").then(
      (m) => m.ReliabilityLineChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const RegressionBarChart = dynamic(
  () =>
    import("@/components/stability/stability-charts").then(
      (m) => m.RegressionBarChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const CoverageAreaChart = dynamic(
  () =>
    import("@/components/stability/stability-charts").then(
      (m) => m.CoverageAreaChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const ThroughputChart = dynamic(
  () =>
    import("@/components/stability/stability-charts").then(
      (m) => m.ThroughputChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

// ---------------------------------------------------------------------------
// Chart skeleton
// ---------------------------------------------------------------------------

function ChartSkeleton() {
  return (
    <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground animate-pulse border border-dashed border-border/50 rounded-md">
      Loading chart...
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary stat card
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  unit,
  change,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  unit: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: "up" | "down";
}) {
  // For regression rate, down is good. For everything else, up is good.
  return (
    <div className="linear-card p-5 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground ml-1">{unit}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {trend === "up" ? (
          <TrendingUp className="inline w-3 h-3 text-[color:var(--success)] mr-1" />
        ) : (
          <TrendingDown className="inline w-3 h-3 text-[color:var(--success)] mr-1" />
        )}
        {change}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Period tabs
// ---------------------------------------------------------------------------

type Period = "3m" | "6m" | "12m";

const PERIOD_LABELS: Record<Period, string> = {
  "3m": "3 Months",
  "6m": "6 Months",
  "12m": "12 Months",
};

// Latest month stats (Feb)
const latest = stabilityMetrics[stabilityMetrics.length - 1];
const earliest = stabilityMetrics[0];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function StabilityMetricsPage() {
  const [period, setPeriod] = useState<Period>("12m");

  const monthCounts: Record<Period, number> = { "3m": 3, "6m": 6, "12m": 12 };
  const sliceCount = monthCounts[period];

  // The charts read from full data inside the chart components,
  // but we can drive context text from local state.
  const sliced = stabilityMetrics.slice(-sliceCount);
  const periodLatest = sliced[sliced.length - 1];
  const periodEarliest = sliced[0];

  return (
    <div className="space-y-6 p-[var(--content-padding,1.5rem)]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Stability Metrics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            12-month colony performance trends — reliability, regression rate,
            coverage, and cycle throughput.
          </p>
        </div>
        {/* Period switcher */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 border border-border/60">
          {(["3m", "6m", "12m"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-[color:var(--surface-hover)]"
              )}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Reliability Score"
          value={periodLatest.reliabilityScore.toFixed(1)}
          unit="%"
          change={`+${(periodLatest.reliabilityScore - periodEarliest.reliabilityScore).toFixed(1)}% over period`}
          icon={Shield}
          trend="up"
        />
        <StatCard
          label="Regression Rate"
          value={periodLatest.regressionRate.toFixed(1)}
          unit="%"
          change={`${(periodLatest.regressionRate - periodEarliest.regressionRate).toFixed(1)}% vs period start`}
          icon={TrendingDown}
          trend="down"
        />
        <StatCard
          label="Agent Coverage"
          value={periodLatest.agentCoverage.toFixed(1)}
          unit="%"
          change={`+${(periodLatest.agentCoverage - periodEarliest.agentCoverage).toFixed(1)}% over period`}
          icon={Activity}
          trend="up"
        />
        <StatCard
          label="Monthly Throughput"
          value={periodLatest.throughput.toLocaleString()}
          unit="cycles"
          change={`+${(((periodLatest.throughput - periodEarliest.throughput) / periodEarliest.throughput) * 100).toFixed(0)}% vs period start`}
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Chart grid — 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reliability score */}
        <div className="linear-card p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Reliability Score vs Target
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Colony-wide verification pass quality — 12-month trend
            </p>
          </div>
          <ReliabilityLineChart />
        </div>

        {/* Regression rate */}
        <div className="linear-card p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Regression Rate
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Percentage of cycles that introduced regressions — target: &lt;1%
            </p>
          </div>
          <RegressionBarChart />
        </div>

        {/* Agent coverage */}
        <div className="linear-card p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Agent Coverage
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Percentage of system code paths covered by active agents
            </p>
          </div>
          <CoverageAreaChart />
        </div>

        {/* Throughput */}
        <div className="linear-card p-5 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Cycle Throughput vs Edge Cases Detected
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly test cycles vs new edge cases discovered
            </p>
          </div>
          <ThroughputChart />
        </div>
      </div>

      {/* Monthly data table */}
      <div className="linear-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">
          Monthly Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                {["Month", "Reliability", "Regression Rate", "Agent Coverage", "Throughput", "Edge Cases"].map((h) => (
                  <th
                    key={h}
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide pb-2 text-left first:text-left text-right first:pr-0 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sliced.map((row, idx) => (
                <tr
                  key={row.month}
                  className={cn(
                    "border-b border-border/30 hover:bg-[color:var(--surface-hover)] transition-colors",
                    idx === sliced.length - 1 && "border-0 font-semibold"
                  )}
                >
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">
                    {row.month}
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-right text-[color:var(--success)]">
                    {row.reliabilityScore.toFixed(1)}%
                  </td>
                  <td
                    className={cn(
                      "py-2 pr-4 font-mono text-xs text-right",
                      row.regressionRate <= 1.0
                        ? "text-[color:var(--success)]"
                        : row.regressionRate <= 2.0
                        ? "text-[color:var(--warning)]"
                        : "text-destructive"
                    )}
                  >
                    {row.regressionRate.toFixed(1)}%
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-right text-foreground">
                    {row.agentCoverage.toFixed(1)}%
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-right text-foreground">
                    {row.throughput.toLocaleString()}
                  </td>
                  <td
                    className={cn(
                      "py-2 font-mono text-xs text-right",
                      row.edgeCasesDetected <= 10
                        ? "text-[color:var(--success)]"
                        : row.edgeCasesDetected <= 18
                        ? "text-[color:var(--warning)]"
                        : "text-destructive"
                    )}
                  >
                    {row.edgeCasesDetected}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Period change summary */}
      <div className="linear-card p-4 border-primary/20 bg-primary/5">
        <p className="text-xs text-muted-foreground">
          Over the last{" "}
          <span className="font-medium text-foreground">{PERIOD_LABELS[period]}</span>:
          reliability improved from{" "}
          <span className="font-mono text-primary">{periodEarliest.reliabilityScore}%</span> to{" "}
          <span className="font-mono text-primary">{periodLatest.reliabilityScore}%</span>,
          regression rate dropped from{" "}
          <span className="font-mono">{periodEarliest.regressionRate}%</span> to{" "}
          <span className="font-mono text-[color:var(--success)]">{periodLatest.regressionRate}%</span>,
          and monthly throughput increased by{" "}
          <span className="font-mono text-foreground">
            {(periodLatest.throughput - periodEarliest.throughput).toLocaleString()}
          </span>{" "}
          cycles.
        </p>
      </div>
    </div>
  );
}
