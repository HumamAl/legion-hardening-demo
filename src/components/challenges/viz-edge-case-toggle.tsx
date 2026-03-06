"use client";

import { useState } from "react";

const WITHOUT_COVERAGE = {
  label: "Without Colony-Driven Verification",
  items: [
    "Manual QA covers ~12% of possible agent interaction paths",
    "Combinatorial state explosion: 50 agents × N states = untestable search space",
    "Race conditions in concurrent agent handoffs go undetected until production",
    "Edge cases in boundary negotiation logic invisible to unit tests",
    "Defect slips into Aerospace client environment after sign-off",
  ],
};

const WITH_COVERAGE = {
  label: "With Colony-Driven Verification",
  items: [
    "Autonomous agents probe all reachable interaction paths in parallel",
    "Boundary Explorer agents stress-test every decision tree branch",
    "Race Condition Hunters deliberately trigger concurrent handoff conflicts",
    "State Mutators inject adversarial inputs at agent negotiation boundaries",
    "Edge cases surface in the hardening environment, not in client deployment",
  ],
};

export function VizEdgeCaseToggle() {
  const [showSolution, setShowSolution] = useState(false);
  const active = showSolution ? WITH_COVERAGE : WITHOUT_COVERAGE;

  return (
    <div className="space-y-3">
      {/* Toggle control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSolution(false)}
          className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
          style={{
            transitionDuration: "var(--dur-fast, 120ms)",
            backgroundColor: !showSolution
              ? "color-mix(in oklch, var(--destructive) 10%, transparent)"
              : "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: !showSolution
              ? "color-mix(in oklch, var(--destructive) 25%, transparent)"
              : "color-mix(in oklch, var(--border) 60%, transparent)",
            color: !showSolution ? "var(--destructive)" : "var(--muted-foreground)",
          }}
        >
          Without
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
          style={{
            transitionDuration: "var(--dur-fast, 120ms)",
            backgroundColor: showSolution
              ? "color-mix(in oklch, var(--success) 8%, transparent)"
              : "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: showSolution
              ? "color-mix(in oklch, var(--success) 20%, transparent)"
              : "color-mix(in oklch, var(--border) 60%, transparent)",
            color: showSolution ? "var(--success)" : "var(--muted-foreground)",
          }}
        >
          With Colony-Driven Verification
        </button>
      </div>

      {/* Panel */}
      <div
        className="rounded-lg p-4 transition-all"
        style={{
          transitionDuration: "var(--dur-normal, 200ms)",
          backgroundColor: showSolution
            ? "color-mix(in oklch, var(--success) 6%, transparent)"
            : "color-mix(in oklch, var(--destructive) 6%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: showSolution
            ? "color-mix(in oklch, var(--success) 14%, transparent)"
            : "color-mix(in oklch, var(--destructive) 14%, transparent)",
        }}
      >
        <p
          className="text-xs font-semibold mb-3 uppercase tracking-wide"
          style={{
            color: showSolution ? "var(--success)" : "var(--destructive)",
          }}
        >
          {active.label}
        </p>
        <ul className="space-y-2">
          {active.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm"
              style={{
                color: showSolution ? "var(--success)" : "var(--destructive)",
              }}
            >
              <span className="shrink-0 mt-0.5 text-[11px] font-bold">
                {showSolution ? "✓" : "✗"}
              </span>
              <span className="text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
