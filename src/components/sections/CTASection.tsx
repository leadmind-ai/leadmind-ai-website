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
          <div className="shine bg-[#f9fbfe] rounded-2xl mx-4 md:mx-8 px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-normal text-[#002549] md:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 text-lg text-[#002549]/70">{cta.subtitle}</p>
              <div className="mt-8">
                <Button href={`/${locale}/contact`} variant="cta">
                  {cta.button}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
