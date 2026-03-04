"use client";

import { lazy, Suspense } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

const GLBackground = lazy(() => import("@/components/gl/GLBackground"));

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
    <section className="relative overflow-hidden bg-primary py-20">
      <Suspense fallback={null}>
        <GLBackground bgColor="#1a365d" />
      </Suspense>
      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-lg text-gray-300">{cta.subtitle}</p>
            <div className="mt-8">
              <Button href={`/${locale}/contact`} variant="cta">
                {cta.button}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
