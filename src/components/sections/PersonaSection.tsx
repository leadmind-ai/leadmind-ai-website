"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type PersonaSectionProps = {
  personas: {
    title: string;
    subtitle: string;
    items: {
      role: string;
      pain: string;
      solution: string;
      cta: string;
    }[];
  };
  locale: string;
};

export default function PersonaSection({ personas, locale }: PersonaSectionProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div>
            <h2 className="text-3xl text-on-surface md:text-4xl">
              {personas.title}
            </h2>
            {personas.subtitle && (
              <p className="mt-4 max-w-3xl text-lg text-on-surface-muted">
                {personas.subtitle}
              </p>
            )}
          </div>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {personas.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card shine className="flex h-full flex-col p-8">
                <h3 className="text-lg font-medium text-accent">
                  {item.role}
                </h3>
                <p className="mt-3 text-sm italic leading-relaxed text-on-surface-muted">
                  {item.pain}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
                  {item.solution}
                </p>
                <div className="mt-auto pt-6">
                  <Button
                    href={`/${locale}/contact`}
                    variant="ghost"
                    className="text-sm"
                  >
                    {item.cta}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
