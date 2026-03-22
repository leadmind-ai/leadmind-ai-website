"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

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

export default function ProcessPhases({ phases }: ProcessPhasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-3xl text-on-surface md:text-4xl lg:text-5xl">
            {phases.title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-3">
          {phases.items.map((phase, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-8">
                <span className="text-sm font-semibold tracking-wider text-accent">
                  {phase.number}
                </span>
                <h3 className="mt-3 text-xl font-medium text-on-surface">
                  {phase.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-muted">
                  {phase.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
