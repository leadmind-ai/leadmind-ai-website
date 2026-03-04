"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type FormationsHeroProps = {
  title: string;
  subtitle: string;
};

export default function FormationsHero({
  title,
  subtitle,
}: FormationsHeroProps) {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-300">{subtitle}</p>
        </motion.div>
      </Container>
    </section>
  );
}
