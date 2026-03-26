"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type ProcessPhasesProps = {
  phases: {
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
};

/* ── Small icons for the icon box (24×24 viewBox) ── */
const PHASE_ICONS: Record<string, React.ReactNode> = {
  "01": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12L2 7M12 12v10M12 12l10-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

/* ── Decorative right-side illustrations ── */
const PHASE_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  // Diagnostic — data nodes & connections
  "01": (
    <svg viewBox="0 0 280 200" fill="none" className="h-full w-full">
      <circle cx="80" cy="60" r="24" stroke="rgba(0,122,244,0.2)" strokeWidth="1" />
      <circle cx="80" cy="60" r="4" fill="rgba(0,122,244,0.3)" />
      <circle cx="200" cy="50" r="18" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <circle cx="200" cy="50" r="3" fill="rgba(0,122,244,0.25)" />
      <circle cx="140" cy="140" r="30" stroke="rgba(0,122,244,0.2)" strokeWidth="1" />
      <circle cx="140" cy="140" r="5" fill="rgba(0,122,244,0.35)" />
      <circle cx="230" cy="150" r="14" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <circle cx="230" cy="150" r="3" fill="rgba(0,122,244,0.2)" />
      <line x1="80" y1="60" x2="200" y2="50" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="80" y1="60" x2="140" y2="140" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="200" y1="50" x2="140" y2="140" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <line x1="140" y1="140" x2="230" y2="150" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <rect x="40" y="100" width="40" height="28" rx="4" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <line x1="48" y1="110" x2="72" y2="110" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <line x1="48" y1="118" x2="66" y2="118" stroke="rgba(0,122,244,0.08)" strokeWidth="1" />
    </svg>
  ),
  // Build — flowchart / process
  "02": (
    <svg viewBox="0 0 280 200" fill="none" className="h-full w-full">
      <rect x="100" y="16" width="80" height="36" rx="6" stroke="rgba(0,122,244,0.2)" strokeWidth="1" />
      <line x1="108" y1="30" x2="148" y2="30" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <line x1="108" y1="38" x2="136" y2="38" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <line x1="140" y1="52" x2="140" y2="72" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <rect x="110" y="72" width="60" height="28" rx="4" stroke="rgba(0,122,244,0.18)" strokeWidth="1" />
      <path d="M118 84l4 4 8-8" stroke="rgba(0,122,244,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="140" y1="100" x2="140" y2="120" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <line x1="140" y1="120" x2="80" y2="140" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="140" y1="120" x2="200" y2="140" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <rect x="56" y="140" width="50" height="32" rx="4" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <line x1="64" y1="152" x2="98" y2="152" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <line x1="64" y1="160" x2="90" y2="160" stroke="rgba(0,122,244,0.08)" strokeWidth="1" />
      <rect x="176" y="140" width="50" height="32" rx="4" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <line x1="184" y1="152" x2="218" y2="152" stroke="rgba(0,122,244,0.1)" strokeWidth="1" />
      <line x1="184" y1="160" x2="210" y2="160" stroke="rgba(0,122,244,0.08)" strokeWidth="1" />
      {/* Diamond decision node */}
      <path d="M220 60l20 20-20 20-20-20z" stroke="rgba(0,122,244,0.18)" strokeWidth="1" />
    </svg>
  ),
  // Autonomy — cube / modular blocks
  "03": (
    <svg viewBox="0 0 280 200" fill="none" className="h-full w-full">
      <rect x="80" y="40" width="56" height="56" rx="6" stroke="rgba(0,122,244,0.2)" strokeWidth="1" />
      <rect x="88" y="48" width="40" height="40" rx="4" fill="rgba(0,122,244,0.06)" />
      <rect x="152" y="40" width="56" height="56" rx="6" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <rect x="160" y="48" width="40" height="40" rx="4" fill="rgba(0,122,244,0.04)" />
      <rect x="80" y="112" width="56" height="56" rx="6" stroke="rgba(0,122,244,0.15)" strokeWidth="1" />
      <rect x="88" y="120" width="40" height="40" rx="4" fill="rgba(0,122,244,0.04)" />
      <rect x="152" y="112" width="56" height="56" rx="6" stroke="rgba(0,122,244,0.2)" strokeWidth="1" />
      <rect x="160" y="120" width="40" height="40" rx="4" fill="rgba(0,122,244,0.06)" />
      {/* Connection lines */}
      <line x1="136" y1="68" x2="152" y2="68" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="136" y1="140" x2="152" y2="140" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="108" y1="96" x2="108" y2="112" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <line x1="180" y1="96" x2="180" y2="112" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      {/* People dots */}
      <circle cx="108" cy="68" r="3" fill="rgba(0,122,244,0.25)" />
      <circle cx="180" cy="140" r="3" fill="rgba(0,122,244,0.25)" />
      <circle cx="240" cy="80" r="10" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
      <circle cx="240" cy="76" r="3" fill="rgba(0,122,244,0.15)" />
      <path d="M234 85a6 6 0 0112 0" stroke="rgba(0,122,244,0.12)" strokeWidth="1" />
    </svg>
  ),
};

function StickyPhaseCard({
  phase,
  index,
}: {
  phase: { number: string; title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="sticky z-10 will-change-transform"
      data-sticky-top={72 + index * 16}
    >
      <style>{`
        [data-sticky-top="${72 + index * 16}"] {
          top: ${72 + index * 16}px;
        }
      `}</style>

      {/* Outer wrapper with shine border trail animation */}
      <div className="shine rounded-[var(--radius-card)] bg-surface-container p-px">
        <div className="grid overflow-hidden rounded-[calc(var(--radius-card)-1px)] md:grid-cols-[1fr,minmax(200px,40%)]"
          style={{
            background: "linear-gradient(135deg, #0a1225 0%, #000000 50%, #060d1a 100%)",
          }}
        >
          {/* Left — text content */}
          <div className="relative z-10 p-8 md:p-10 lg:px-14 lg:py-12">
            {/* Icon box + title row */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[rgba(0,122,244,0.08)]">
                {PHASE_ICONS[phase.number]}
              </div>
              <h3 className="font-heading text-xl tracking-tight text-white md:text-2xl lg:text-[28px]">
                {phase.title}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#818181] md:text-lg md:leading-relaxed">
              {phase.description}
            </p>
          </div>

          {/* Right — image placeholder with decorative illustration */}
          <div className="relative hidden items-center justify-center overflow-hidden md:flex">
            {/* Illustration SVG (will be replaced by real images later) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              {PHASE_ILLUSTRATIONS[phase.number]}
            </div>
            {/* Subtle left-edge fade to blend with text side */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16"
              style={{
                background: "linear-gradient(to right, #0a1225, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessPhases({ phases }: ProcessPhasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-3xl text-white md:text-4xl lg:text-[48px]">
            {phases.title}
          </h2>
        </FadeIn>

        <div className="mt-16 flex flex-col gap-6">
          {phases.items.map((phase, i) => (
            <StickyPhaseCard
              key={phase.number}
              phase={phase}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
