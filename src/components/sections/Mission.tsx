"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type MissionProps = {
  title: string;
  text: string;
};

export default function Mission({ title, text }: MissionProps) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[140px]" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto text-center"
        >
          <h1 className="gradient-hero-text whitespace-pre-line text-[2.75rem] leading-[1.08] tracking-tight md:text-[4rem] lg:text-[5.5rem]">
            {title}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-on-surface-muted md:text-xl">
            {text}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
