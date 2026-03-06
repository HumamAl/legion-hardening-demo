import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most prototype-to-production efforts focus on adding features and fixing obvious bugs — patching symptoms rather than interrogating the structural assumptions the system was built on.",
  differentApproach:
    "I'd focus on the structural integrity issues that only surface under adversarial conditions — the kind of edge cases that 50 autonomous agents are specifically designed to find, and that human reviewers cannot.",
  accentWord: "structural integrity",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Recursive Self-Verification Without Feedback Loops",
    description:
      "When a platform deploys its own agents to test its orchestration layer, circular dependencies emerge. An agent testing the scheduler that assigns agents creates a feedback loop where test failures and orchestration failures become indistinguishable — corrupting your integrity signals at the source.",
    visualizationType: "flow",
    outcome:
      "Could enable the colony to run integrity checks on its own orchestration layer without creating circular test dependencies that corrupt verification results",
  },
  {
    id: "challenge-2",
    title: "Edge Case Detection in Multi-Layered Agent Logic",
    description:
      "With 50+ agents running concurrent exploration paths, buried edge cases in decision trees are invisible to manual review. The combinatorial explosion of agent interactions makes traditional test coverage metrics meaningless — you need a different model entirely.",
    visualizationType: "before-after",
    outcome:
      "Could surface buried edge cases in agent decision trees that manual review consistently misses, targeting a reduction in production defects reaching Aerospace clients",
  },
  {
    id: "challenge-3",
    title: "Production Reliability at Enterprise Scale",
    description:
      "Moving from prototype to production means meeting reliability standards that Aerospace & Defense environments demand. The gap between 'works in testing' and 'verifiably stable under production load' requires systematic hardening with audit trails that can survive a compliance review.",
    visualizationType: "metrics",
    outcome:
      "Could bring system stability from prototype-grade to the uptime and audit-trail standards required for Defense environment deployment",
  },
];
