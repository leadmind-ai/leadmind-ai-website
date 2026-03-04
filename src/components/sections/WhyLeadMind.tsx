"use client";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

type WhyLeadMindProps = {
  why: {
    title: string;
    pillars: {
      title: string;
      description: string;
      stat: string;
      stat_label: string;
    }[];
  };
};

export default function WhyLeadMind({ why }: WhyLeadMindProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary md:text-4xl">
          {why.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {why.pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">
                  <Counter value={pillar.stat} />
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {pillar.stat_label}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
