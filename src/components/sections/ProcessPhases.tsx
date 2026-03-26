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
          <h2 className="text-3xl text-white md:text-4xl lg:text-[48px]">
            {phases.title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-16 grid gap-5 md:grid-cols-3">
          {phases.items.map((phase, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="flex h-full flex-col">
                <span className="text-sm font-medium tracking-wider text-accent">
                  {phase.number}
                </span>
                <h3 className="mt-3 text-xl text-white">
                  {phase.title}
                </h3>
                <p className="mt-4 text-base leading-[1.45] text-[#818181]">
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
