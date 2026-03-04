"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ShimmerText } from "@/components/ui/ShimmerText";
import type { Locale } from "@/lib/i18n";

const GLBackground = lazy(() => import("@/components/gl/GLBackground"));

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
  const [hovering, setHovering] = useState(false);

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      <Suspense fallback={null}>
        <GLBackground hovering={hovering} bgColor="#1a365d" />
      </Suspense>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <ShimmerText
            as="h1"
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {hero.title}
          </ShimmerText>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Button href={`/${locale}/contact`} variant="cta">
                {hero.cta_primary}
              </Button>
            </div>
            <Button
              href={`/${locale}/formations`}
              variant="ghost"
              className="border-2 border-white text-white hover:bg-white/20 hover:text-white"
            >
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
