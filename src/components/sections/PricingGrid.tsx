"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/i18n";

type PricingGridProps = {
  pricing: {
    formations_title: string;
    formations_grid: Array<{ label: string; price: string; detail: string }>;
    modules_title: string;
    modules_grid: Array<{ label: string; price: string; detail: string }>;
    note: string;
    cta_title: string;
    cta_button: string;
  };
  locale: Locale;
};

export default function PricingGrid({ pricing, locale }: PricingGridProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-xl font-medium text-on-surface">
            {pricing.formations_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-3">
          {pricing.formations_grid.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6 text-center">
                <p className="text-sm text-on-surface-muted">{item.label}</p>
                <p className="mt-4 text-2xl font-medium text-on-surface">
                  {item.price}
                </p>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {item.detail}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn>
          <h2 className="mt-16 text-xl font-medium text-on-surface">
            {pricing.modules_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {pricing.modules_grid.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6 text-center">
                <p className="text-sm text-on-surface-muted">{item.label}</p>
                <p className="mt-4 text-2xl font-medium text-on-surface">
                  {item.price}
                </p>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {item.detail}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <p className="mt-8 text-center text-sm text-on-surface-muted">
          {pricing.note}
        </p>

        <div className="mt-16 text-center">
          <h3 className="text-xl text-on-surface">
            {pricing.cta_title}
          </h3>
          <div className="mt-6">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {pricing.cta_button}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
