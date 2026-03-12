"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
  };
  locale: Locale;
};

export default function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* Radial glow — visible ambient effect */}
      <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.15] blur-[120px]" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="gradient-hero-text text-4xl font-normal leading-tight tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-surface-muted md:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={`/${locale}/contact`} variant="cta" className="px-8 py-3.5">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/formations`} variant="ghost" className="text-on-surface/60 hover:text-on-surface">
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
