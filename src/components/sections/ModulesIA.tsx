"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ModulesIAProps = {
  modules: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      badge: string;
    }>;
    custom_text: string;
    custom_cta: string;
  };
};

export default function ModulesIA({ modules }: ModulesIAProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="mx-auto max-w-4xl text-center text-3xl text-on-surface md:text-4xl lg:text-[48px] lg:leading-tight">
            {modules.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-on-surface-muted">
            {modules.subtitle}
          </p>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {modules.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="flex h-full flex-col p-6">
                {item.badge && (
                  <Badge variant="accent" className="mb-3 w-fit text-xs">
                    {item.badge}
                  </Badge>
                )}
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
