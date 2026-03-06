import { ExternalLink, TrendingUp } from "lucide-react";
import { proposalData } from "@/data/proposal";

// ---------------------------------------------------------------------------
// Tab 3 — Work With Me
// Sales page structure: Hero -> Proof of Work -> How I Work -> Skills -> CTA
// Dark-premium aesthetic: near-black canvas, amber-gold accent (--primary-h: 62)
// clientName is null — APP_CONFIG.projectName used where identity is needed.
// ---------------------------------------------------------------------------

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero — Dark Panel ─────────────────────────────────── */}
      <section
        className="relative rounded-xl overflow-hidden"
        style={{ background: "oklch(0.06 0.02 var(--primary-h, 62))" }}
      >
        {/* Radial highlight — amber tint from top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.72 0.18 62 / 0.10) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12">
          {/* Effort badge — pulsing dot, mandatory */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full mb-6">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            {proposalData.hero.badge}
          </span>

          {/* Role prefix */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-4">
            Senior Full-Stack Engineer
          </p>

          {/* Weight contrast headline */}
          <h1 className="text-4xl md:text-5xl tracking-tight leading-none mb-5">
            <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">{proposalData.hero.name}</span>
          </h1>

          {/* Tailored value prop */}
          <p className="text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            {proposalData.hero.valueProp}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 border-t border-white/10 px-8 py-4"
          style={{ background: "oklch(1 0 0 / 0.04)" }}
        >
          <div className="grid grid-cols-3 gap-4">
            {proposalData.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background:
                      "linear-gradient(to right, oklch(0.92 0 0), oklch(0.72 0.18 62))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ─────────────────────────────────────── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Proof of Work
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proposalData.portfolioProjects.map((project) => (
            <div
              key={project.name}
              className="aesthetic-card p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug">{project.name}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome — always present */}
              <div className="flex items-start gap-2 text-sm text-[color:var(--success)]">
                <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="leading-snug">{project.outcome}</span>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-primary/10 text-xs font-mono text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Relevance note */}
              {project.relevance && (
                <p className="text-xs text-primary/60 italic leading-relaxed">
                  {project.relevance}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Process
        </p>
        <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {proposalData.approach.map((step) => (
            <div key={step.step} className="aesthetic-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Step {step.step}
                </span>
                <span className="font-mono text-xs text-muted-foreground/60">
                  {step.timeline}
                </span>
              </div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ────────────────────────────────────────── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Tech Stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>

        <div className="space-y-3">
          {proposalData.skills.map((category) => (
            <div key={category.category} className="aesthetic-card p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground font-mono uppercase tracking-wider">
                {category.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md border border-border/60 text-sm font-mono text-foreground/80"
                    style={{ background: "oklch(1 0 0 / 0.04)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA — Dark Panel ──────────────────────────────────── */}
      <section
        className="relative rounded-xl overflow-hidden text-center"
        style={{ background: "oklch(0.06 0.02 var(--primary-h, 62))" }}
      >
        {/* Radial highlight from bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom, oklch(0.72 0.18 62 / 0.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-4">
          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
            </span>
            <span
              className="text-sm"
              style={{
                color: "color-mix(in oklch, var(--success) 80%, white)",
              }}
            >
              {proposalData.cta.availability}
            </span>
          </div>

          {/* Tailored headline */}
          <h2 className="text-2xl font-bold text-white">
            {proposalData.cta.headline}
          </h2>

          {/* Specific body copy */}
          <p className="text-white/65 max-w-lg mx-auto leading-relaxed">
            {proposalData.cta.body}
          </p>

          {/* Primary action — text, not a dead-end button */}
          <p className="text-lg font-semibold text-primary pt-2">
            {proposalData.cta.action}
          </p>

          {/* Back-link to demo */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Back to the demo
          </a>

          {/* Signature */}
          <p className="pt-4 text-sm text-white/30 border-t border-white/10 mt-4">
            -- Humam
          </p>
        </div>
      </section>

    </div>
  );
}
