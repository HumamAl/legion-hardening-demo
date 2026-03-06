import {
  Network,
  CalendarClock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "colony",
    label: "Agent Colony",
    description: "50+ concurrent agents",
    icon: Network,
    highlight: false,
    warning: false,
  },
  {
    id: "scheduler",
    label: "Orchestration Layer",
    description: "Assignment scheduler",
    icon: CalendarClock,
    highlight: true,
    warning: false,
  },
  {
    id: "loop",
    label: "Circular Dependency",
    description: "Agent tests its own assigner",
    icon: AlertTriangle,
    highlight: false,
    warning: true,
  },
  {
    id: "isolation",
    label: "Isolation Boundary",
    description: "Shadow scheduler clone",
    icon: ShieldCheck,
    highlight: false,
    warning: false,
  },
];

export function VizRecursiveFlow() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
        Self-Test Architecture
      </p>

      {/* Flow steps */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
              style={
                step.warning
                  ? {
                      backgroundColor:
                        "color-mix(in oklch, var(--destructive) 8%, transparent)",
                      borderColor:
                        "color-mix(in oklch, var(--destructive) 20%, transparent)",
                    }
                  : step.highlight
                  ? {
                      backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
                      borderColor:
                        "color-mix(in oklch, var(--primary) 25%, transparent)",
                    }
                  : {
                      backgroundColor: "color-mix(in oklch, var(--muted) 60%, transparent)",
                      borderColor: "color-mix(in oklch, var(--border) 80%, transparent)",
                    }
              }
            >
              <step.icon
                className="w-4 h-4 shrink-0"
                style={{
                  color: step.warning
                    ? "var(--destructive)"
                    : step.highlight
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                }}
              />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: step.warning
                      ? "var(--destructive)"
                      : step.highlight
                      ? "var(--primary)"
                      : "var(--foreground)",
                  }}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* Explanation row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div
          className="rounded-md px-3 py-2"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--destructive) 6%, transparent)",
            borderColor:
              "color-mix(in oklch, var(--destructive) 14%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p className="text-xs font-medium text-destructive mb-1">
            Problem: Feedback loop
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Agent assigned by Scheduler A tests Scheduler A. A scheduler failure
            silences the test agent — no signal, no alert.
          </p>
        </div>
        <div
          className="rounded-md px-3 py-2"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--success) 6%, transparent)",
            borderColor:
              "color-mix(in oklch, var(--success) 14%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p className="text-xs font-medium text-[color:var(--success)] mb-1">
            Solution: Isolation boundary
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            A shadow orchestration clone handles self-test agent assignments,
            keeping verification signals independent of the system under test.
          </p>
        </div>
      </div>
    </div>
  );
}
