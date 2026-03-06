"use client";

import { useEffect, useRef, useState } from "react";

interface MetricItem {
  label: string;
  protoValue: number;
  hardenedValue: number;
  max: number;
  unit: string;
  direction: "higher-is-better" | "lower-is-better";
}

const METRICS: MetricItem[] = [
  {
    label: "System Reliability Score",
    protoValue: 61,
    hardenedValue: 97,
    max: 100,
    unit: "%",
    direction: "higher-is-better",
  },
  {
    label: "Agent Coverage (code paths)",
    protoValue: 34,
    hardenedValue: 89,
    max: 100,
    unit: "%",
    direction: "higher-is-better",
  },
  {
    label: "Regression Rate",
    protoValue: 18,
    hardenedValue: 3,
    max: 25,
    unit: "%",
    direction: "lower-is-better",
  },
  {
    label: "Audit Trail Completeness",
    protoValue: 42,
    hardenedValue: 100,
    max: 100,
    unit: "%",
    direction: "higher-is-better",
  },
];

export function VizReliabilityMetrics() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
            }}
          />
          Prototype
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
          After Hardening
        </span>
      </div>

      <div className="space-y-4">
        {METRICS.map((metric) => {
          const isGoodIfHigh = metric.direction === "higher-is-better";
          const protoWidth = (metric.protoValue / metric.max) * 100;
          const hardenedWidth = (metric.hardenedValue / metric.max) * 100;

          return (
            <div key={metric.label} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground/60">
                    {metric.protoValue}
                    {metric.unit}
                  </span>
                  <span className="text-muted-foreground/40">&rarr;</span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    {metric.hardenedValue}
                    {metric.unit}
                  </span>
                </div>
              </div>

              {/* Track with two bars: proto (ghost) + hardened (colored) */}
              <div
                className="relative h-2 rounded-full overflow-hidden"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--muted) 80%, transparent)",
                }}
              >
                {/* Prototype bar */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all"
                  style={{
                    width: animated ? `${protoWidth}%` : "0%",
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    backgroundColor:
                      "color-mix(in oklch, var(--muted-foreground) 30%, transparent)",
                  }}
                />
                {/* Hardened bar — overlaid, slightly transparent */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all"
                  style={{
                    width: animated ? `${hardenedWidth}%` : "0%",
                    transitionDuration: "900ms",
                    transitionDelay: "150ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    backgroundColor: isGoodIfHigh
                      ? "color-mix(in oklch, var(--primary) 85%, transparent)"
                      : "color-mix(in oklch, var(--success) 85%, transparent)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground/60 pt-1">
        Projected values based on systematic hardening methodology with colony-verified audit trails.
      </p>
    </div>
  );
}
