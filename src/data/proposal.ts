import type { PortfolioProject } from "@/lib/types";

// ---------------------------------------------------------------------------
// proposalData — Structured content for Tab 3: "Work With Me"
// Proposal Builder agent populates this from the Creative Brief + job context.
// All portfolio outcomes are exact text from references/developer-profile.md.
// ---------------------------------------------------------------------------

export const proposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "Full-stack developer who hardens complex systems for production — agent orchestration, monitoring pipelines, and enterprise-grade reliability tooling, already built for your review in Tab 1.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "15+", label: "Industries Served" },
      { value: "< 48hr", label: "Demo Turnaround" },
    ],
  },

  portfolioProjects: [
    {
      name: "WMF Agent Dashboard",
      description:
        "AI-powered customer service agent for manufacturing — email classification, RFQ extraction, human-in-the-loop approval workflow.",
      outcome:
        "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
      tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
      url: "https://wmf-agent-dashboard.vercel.app",
      relevance:
        "Multi-agent orchestration with human-in-the-loop approval — directly analogous to the colony verification patterns in this project.",
    },
    {
      name: "Data Intelligence Platform",
      description:
        "Multi-source data aggregation, visualization, and insight generation dashboard.",
      outcome:
        "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
      tech: ["Next.js", "TypeScript", "shadcn/ui", "Recharts"],
      url: "https://data-intelligence-platform-sandy.vercel.app",
      relevance:
        "Monitoring and reporting pipelines — the same pattern used for integrity reporting in multi-agent test environments.",
    },
    {
      name: "Auction Violations Monitor",
      description:
        "Compliance monitoring tool tracking violations, seller behavior, and enforcement actions across auction activity.",
      outcome:
        "Compliance dashboard with violation detection, seller flagging, and enforcement action tracking",
      tech: ["Next.js", "TypeScript", "shadcn/ui"],
      url: "https://auction-violations.vercel.app",
      relevance:
        "Automated detection and flagging logic — the structural equivalent of edge case detection and remediation workflows.",
    },
  ],

  approach: [
    {
      step: "01",
      title: "Audit",
      description:
        "Review the existing codebase. Map agent orchestration paths, identify fragile test dependencies, document edge cases before writing a single fix. One reading session clarifies weeks of guesswork.",
      timeline: "Week 1",
    },
    {
      step: "02",
      title: "Harden",
      description:
        "Systematic production hardening — stability fixes, recursive test isolation, reliability improvements. Each change verified by the colony itself. No dark periods, visible progress every few days.",
      timeline: "Week 2–3",
    },
    {
      step: "03",
      title: "Verify",
      description:
        "Run full colony verification suites. Edge case regression tests. Adversarial condition checks. Every fix confirmed stable before moving to the next.",
      timeline: "Week 3–4",
    },
    {
      step: "04",
      title: "Report",
      description:
        "Integrity reports, stability metrics, handoff documentation. Your engineering team can maintain the hardened system confidently — no tribal knowledge, clean handoff.",
      timeline: "Ongoing",
    },
  ],

  skills: [
    {
      category: "Full-Stack",
      items: ["TypeScript", "React", "Next.js", "Python", "Tailwind CSS", "shadcn/ui"],
    },
    {
      category: "AI & Tooling",
      items: ["Claude API", "Cursor", "AI-assisted debugging", "Prompt Engineering"],
    },
    {
      category: "Quality & Reliability",
      items: [
        "Production Hardening",
        "Automated Testing",
        "Edge Case Analysis",
        "CI/CD",
      ],
    },
  ],

  cta: {
    headline: "Let's harden this together.",
    body: "Built this demo to show I understand multi-agent systems at the level your project demands. The production work will be even more rigorous.",
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
  },
};

// ---------------------------------------------------------------------------
// Legacy exports — kept for backward compatibility with any existing imports.
// The proposal page now reads from proposalData above.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who hardens complex systems for production — agent orchestration, monitoring pipelines, and enterprise-grade reliability tooling.",
  bio: "I build MVPs and production apps that solve real operational problems — CRM systems, fleet management platforms, AI-powered dashboards, and e-commerce tools. My approach: understand the business need, build something that works, and ship it fast.",
  approach: proposalData.approach.map((s) => ({
    title: s.title,
    description: s.description,
  })),
  skillCategories: proposalData.skills.map((c) => ({
    name: c.category,
    skills: c.items,
  })),
};

export const portfolioProjects: PortfolioProject[] = proposalData.portfolioProjects.map(
  (p, i) => ({
    id: `proj-${i}`,
    title: p.name,
    description: p.description,
    tech: p.tech,
    outcome: p.outcome,
    relevance: p.relevance,
    liveUrl: p.url ?? undefined,
  })
);
