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
    <section className="relative overflow-hidden py-24 shadow-hero md:py-32">
      {/* Radial blue glow behind content */}
      <div className="gradient-blue-radial absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-[length:var(--text-display-large)] font-normal leading-[length:var(--leading-display-large)] text-on-surface">
            {hero.title}
          </h1>
          <p className="gradient-hero-text mt-6 text-lg leading-relaxed md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={`/${locale}/contact`} variant="cta">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/formations`} variant="ghost">
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
