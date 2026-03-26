"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type AccompagnementProps = {
  accompagnement: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      duration: string;
    }>;
  };
};

export default function Accompagnement({ accompagnement }: AccompagnementProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-3xl text-on-surface md:text-4xl lg:text-5xl">
            {accompagnement.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-on-surface-muted">
            {accompagnement.subtitle}
          </p>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {accompagnement.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <span className="text-sm font-semibold text-accent">
                  {item.duration}
                </span>
                <h3 className="mt-3 text-base font-medium text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
                  {item.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
