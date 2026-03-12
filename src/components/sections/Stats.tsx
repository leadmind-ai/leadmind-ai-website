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
    <section className="py-16">
      <Container>
        <div className="shine rounded-2xl border border-white/[0.08] bg-surface-container px-8 py-12">
          <h2 className="text-center text-base font-medium text-on-surface">
            {title}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-normal text-accent">
                    <Counter value={p.stat} />
                  </div>
                  <p className="mt-2 text-sm text-on-surface-muted">{p.stat_label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
