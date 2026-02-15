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
    <section className="bg-primary py-20">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-lg text-gray-300">{cta.subtitle}</p>
            <div className="mt-8">
              <Button href={`/${locale}/contact`} variant="primary">
                {cta.button}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
