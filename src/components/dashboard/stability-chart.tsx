"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { StabilityChartPoint } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/40 bg-card p-3 text-sm shadow-lg">
      <p className="font-medium text-foreground mb-2 font-mono text-xs">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-medium text-foreground">
            {typeof entry.value === "number"
              ? entry.name === "Regression Rate"
                ? `${entry.value}%`
                : `${entry.value}%`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

interface StabilityChartProps {
  data: StabilityChartPoint[];
}

export function StabilityChart({ data }: StabilityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="fillReliability" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.30} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillRegression" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.4}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          domain={[80, 100]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 4]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", paddingTop: "8px" }}
          formatter={(value) => (
            <span style={{ color: "var(--muted-foreground)" }}>{value}</span>
          )}
        />
        {/* Target reliability line */}
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="target"
          name="Target Reliability"
          stroke="var(--chart-5)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
          dot={false}
        />
        {/* Actual reliability score area */}
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="reliabilityScore"
          name="Reliability Score"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillReliability)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-1)" }}
        />
        {/* Regression rate area on right axis */}
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="regressionRate"
          name="Regression Rate"
          stroke="var(--chart-4)"
          strokeWidth={1.5}
          fill="url(#fillRegression)"
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0, fill: "var(--chart-4)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
