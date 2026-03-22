"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type CTASectionProps = {
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  locale: Locale;
};

export default function CTASection({ cta, locale }: CTASectionProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div className="rounded-2xl border border-surface-elevated bg-surface-container px-8 py-20 text-center">
            <h2 className="text-3xl font-normal text-on-surface md:text-4xl lg:text-5xl">
              {cta.title}
            </h2>
            {cta.subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-on-surface-muted">
                {cta.subtitle}
              </p>
            )}
            <div className="mt-8">
              <Button href={`/${locale}/contact`} variant="primary" size="lg">
                {cta.button}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
