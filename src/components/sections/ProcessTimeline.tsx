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
    <section className="bg-surface py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary">
          {title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
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
