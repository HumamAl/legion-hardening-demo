import Link from "next/link";

interface ExecutiveSummaryProps {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export function ExecutiveSummary({
  commonApproach,
  differentApproach,
  accentWord,
}: ExecutiveSummaryProps) {
  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 md:p-8"
      style={{
        background: "var(--section-dark, oklch(0.06 0.02 62))",
        backgroundImage:
          "radial-gradient(ellipse at 30% 50%, oklch(0.72 0.18 62 / 0.06), transparent 70%)",
      }}
    >
      {/* Subtle amber glow accent — dark-premium treatment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, oklch(0.72 0.18 62 / 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <p className="text-sm md:text-base leading-relaxed text-white/50 relative">
        {commonApproach}
      </p>

      <hr className="my-4 border-white/10" />

      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90 relative">
        {renderDifferentApproach()}
      </p>

      <p className="text-xs text-white/35 mt-4 relative">
        <Link
          href="/"
          className="hover:text-white/60 transition-colors underline underline-offset-2"
          style={{ transitionDuration: "var(--dur-fast, 120ms)" }}
        >
          &larr; Back to the live demo
        </Link>
      </p>
    </div>
  );
}
