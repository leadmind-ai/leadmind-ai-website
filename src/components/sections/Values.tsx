"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ValuesProps = {
  title: string;
  values: { title: string; description: string }[];
};

export default function Values({ title, values }: ValuesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <h2 className="mx-auto max-w-4xl text-center text-3xl text-on-surface md:text-4xl lg:text-[48px] lg:leading-tight">
          {title}
        </h2>
        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-3 auto-rows-fr">
          {values.map((value, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="text-center h-full">
                <h3 className="text-lg text-on-surface">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
