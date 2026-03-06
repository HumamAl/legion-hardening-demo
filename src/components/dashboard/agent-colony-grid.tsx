"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Agent, AgentStatus } from "@/lib/types";

function getStatusColor(status: AgentStatus): string {
  switch (status) {
    case "Passing":
    case "Verified":
    case "Hardened":
      return "bg-success";
    case "Edge Case Detected":
    case "Under Review":
      return "bg-warning";
    case "Flagged":
    case "Degraded":
    case "Regressed":
      return "bg-destructive";
    default:
      return "bg-muted-foreground";
  }
}

function getStatusRingColor(status: AgentStatus): string {
  switch (status) {
    case "Passing":
    case "Verified":
    case "Hardened":
      return "ring-success/30";
    case "Edge Case Detected":
    case "Under Review":
      return "ring-warning/30";
    case "Flagged":
    case "Degraded":
    case "Regressed":
      return "ring-destructive/30";
    default:
      return "ring-border";
  }
}

function getStatusLabel(status: AgentStatus): { label: string; color: string } {
  switch (status) {
    case "Passing":
      return { label: "Passing", color: "text-success" };
    case "Verified":
      return { label: "Verified", color: "text-success" };
    case "Hardened":
      return { label: "Hardened", color: "text-success" };
    case "Edge Case Detected":
      return { label: "Edge Case Detected", color: "text-warning" };
    case "Under Review":
      return { label: "Under Review", color: "text-warning" };
    case "Flagged":
      return { label: "Flagged", color: "text-destructive" };
    case "Degraded":
      return { label: "Degraded", color: "text-destructive" };
    case "Regressed":
      return { label: "Regressed", color: "text-destructive" };
    default:
      return { label: status, color: "text-muted-foreground" };
  }
}

function AgentCell({ agent }: { agent: Agent }) {
  const [hovered, setHovered] = useState(false);
  const dotColor = getStatusColor(agent.status);
  const ringColor = getStatusRingColor(agent.status);
  const { label: statusLabel, color: statusTextColor } = getStatusLabel(agent.status);
  const isActive = agent.currentAssignment !== null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Agent cell */}
      <div
        className={cn(
          "flex flex-col items-center gap-1.5 p-2.5 rounded-lg border cursor-default",
          "transition-all duration-150",
          "border-border/30 bg-card",
          "hover:border-border/60 hover:bg-surface-hover",
          isActive && "border-primary/20"
        )}
        style={{ minWidth: "76px" }}
      >
        {/* Status indicator dot */}
        <div className={cn("relative flex items-center justify-center")}>
          <div
            className={cn(
              "w-3 h-3 rounded-full ring-2",
              dotColor,
              ringColor
            )}
          />
          {/* Pulse animation for actively running agents */}
          {(agent.status === "Passing" || agent.status === "Edge Case Detected") &&
            isActive && (
              <div
                className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-40",
                  dotColor
                )}
                style={{ animationDuration: "2s" }}
              />
            )}
        </div>

        {/* Agent name */}
        <span className="text-[10px] font-mono font-medium text-foreground/80 leading-none text-center">
          {agent.name}
        </span>

        {/* Colony badge */}
        <span className="text-[9px] font-mono text-muted-foreground/60 leading-none">
          {agent.colonyId.replace("col_", "")}
        </span>
      </div>

      {/* Tooltip on hover */}
      {hovered && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg border border-border/60 bg-card p-3 shadow-lg text-xs"
          style={{ boxShadow: "var(--card-shadow-hover)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-semibold text-foreground">{agent.name}</span>
            <span className={cn("text-[10px] font-medium", statusTextColor)}>
              {statusLabel}
            </span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div className="flex justify-between">
              <span>Specialization</span>
              <span className="text-foreground/80 font-medium">{agent.specialization}</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-mono text-foreground/80">{agent.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cycles Run</span>
              <span className="font-mono text-foreground/80">
                {agent.totalCyclesRun.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Edge Cases Found</span>
              <span className="font-mono text-foreground/80">{agent.edgeCasesFound}</span>
            </div>
            {agent.currentAssignment ? (
              <div className="flex justify-between">
                <span>Assignment</span>
                <span className="text-primary text-[10px]">Active</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>Assignment</span>
                <span className="text-muted-foreground text-[10px]">Idle</span>
              </div>
            )}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border/60" />
        </div>
      )}
    </div>
  );
}

interface AgentColonyGridProps {
  agents: Agent[];
}

export function AgentColonyGrid({ agents }: AgentColonyGridProps) {
  const passing = agents.filter(
    (a) => a.status === "Passing" || a.status === "Verified" || a.status === "Hardened"
  ).length;
  const flagged = agents.filter(
    (a) =>
      a.status === "Flagged" || a.status === "Degraded" || a.status === "Regressed"
  ).length;
  const caution = agents.filter(
    (a) => a.status === "Edge Case Detected" || a.status === "Under Review"
  ).length;

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Passing / Verified / Hardened</span>
          <span className="font-mono font-medium text-foreground ml-1">({passing})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-muted-foreground">Edge Case / Under Review</span>
          <span className="font-mono font-medium text-foreground ml-1">({caution})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Flagged / Degraded / Regressed</span>
          <span className="font-mono font-medium text-foreground ml-1">({flagged})</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-2">
        {agents.map((agent) => (
          <AgentCell key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
