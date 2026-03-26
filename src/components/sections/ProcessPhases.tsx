"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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

/* ── Phase images ── */
const PHASE_IMAGES: Record<string, string> = {
  "01": "/images/phases/phase-01.png",
  "02": "/images/phases/phase-02.png",
  "03": "/images/phases/phase-03.png",
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

          {/* Right — photo panel */}
          <div className="relative hidden min-h-[240px] overflow-hidden md:block">
            <Image
              src={PHASE_IMAGES[phase.number]}
              alt={phase.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 0px"
            />
            {/* Left-edge fade to blend with text side */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
              style={{
                background: "linear-gradient(to right, #000000, transparent)",
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
