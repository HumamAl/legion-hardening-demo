"use client";

import type { Challenge } from "@/lib/types";
import type { ReactNode } from "react";
import { ChallengeCard } from "./challenge-card";
import { OutcomeStatement } from "./outcome-statement";
import { VizRecursiveFlow } from "./viz-recursive-flow";
import { VizEdgeCaseToggle } from "./viz-edge-case-toggle";
import { VizReliabilityMetrics } from "./viz-reliability-metrics";

const VISUALIZATIONS: Record<string, ReactNode> = {
  "challenge-1": <VizRecursiveFlow />,
  "challenge-2": <VizEdgeCaseToggle />,
  "challenge-3": <VizReliabilityMetrics />,
};

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
        >
          {VISUALIZATIONS[challenge.id]}
          {challenge.outcome && (
            <OutcomeStatement outcome={challenge.outcome} />
          )}
        </ChallengeCard>
      ))}
    </div>
  );
}
