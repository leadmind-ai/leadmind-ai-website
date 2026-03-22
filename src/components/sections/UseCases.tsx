"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type UseCasesProps = {
  useCases: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

export default function UseCases({ useCases }: UseCasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div>
            <h2 className="text-3xl font-normal text-on-surface md:text-4xl lg:text-5xl">
              {useCases.title}
            </h2>
            {useCases.subtitle && (
              <p className="mt-4 max-w-3xl text-lg text-on-surface-muted">
                {useCases.subtitle}
              </p>
            )}
          </div>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6">
                <h3 className="text-base font-medium text-on-surface">
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
