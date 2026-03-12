"use client";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

type StatsProps = {
  title: string;
  pillars: { stat: string; stat_label: string }[];
};

export default function Stats({ title, pillars }: StatsProps) {
  return (
    <section className="bg-surface-container py-16">
      <Container>
        <h2 className="text-center text-2xl font-normal text-on-surface">
          {title}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-normal text-accent">
                  <Counter value={p.stat} />
                </div>
                <p className="mt-1 text-sm text-on-surface-muted">{p.stat_label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
