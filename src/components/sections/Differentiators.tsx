"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type DifferentiatorsProps = {
  title: string;
  items: { title: string; description: string }[];
};

export default function Differentiators({ title, items }: DifferentiatorsProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <Card shine className="h-full">
                <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">
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
