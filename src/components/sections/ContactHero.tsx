"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const GLBackground = lazy(() => import("@/components/gl/GLBackground"));

type ContactHeroProps = {
  title: string;
  subtitle: string;
};

export default function ContactHero({ title, subtitle }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <Suspense fallback={null}>
        <GLBackground bgColor="#1a365d" />
      </Suspense>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <h1 className="text-4xl font-normal text-on-surface">{title}</h1>
          <p className="mt-4 text-lg text-on-surface-muted">{subtitle}</p>
        </motion.div>
      </Container>
    </section>
  );
}
