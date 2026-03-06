"use client";

import Link from "next/link";

export function CtaCloser() {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--primary) 6%, var(--card)), var(--card))",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
        boxShadow: "var(--card-shadow, none)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Want to walk through the hardening plan?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            I&apos;ve mapped out the specific structural problems. Happy to walk through
            any of this on a call — or review your current agent architecture before
            we scope the work.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast, 120ms)" }}
          >
            See the proposal &rarr;
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-md"
            style={{
              background:
                "color-mix(in oklch, var(--primary) 10%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </div>
  );
}
