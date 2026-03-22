"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  hero: {
    title: string;
    subtitle_line1: string;
    subtitle_line2: string;
    cta_primary: string;
    cta_secondary: string;
  };
  locale: Locale;
};

export default function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[140px]" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="gradient-hero-text text-[2.5rem] font-normal leading-[1.1] tracking-tight md:text-[3.25rem] lg:text-[4rem]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-on-surface/80 md:text-lg">
            {hero.subtitle_line1}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-on-surface-muted md:text-lg">
            {hero.subtitle_line2}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/solutions`} variant="outline">
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
