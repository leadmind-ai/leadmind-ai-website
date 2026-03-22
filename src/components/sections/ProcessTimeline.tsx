"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type ProcessTimelineProps = {
  title: string;
  steps: { title: string; description: string }[];
};

export default function ProcessTimeline({
  title,
  steps,
}: ProcessTimelineProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <h2 className="text-3xl text-on-surface">
          {title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg text-on-surface">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg text-on-surface">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
