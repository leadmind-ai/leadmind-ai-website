"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

type MissionProps = {
  title: string;
  text: string;
};

export default function Mission({ title, text }: MissionProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-primary md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              {text}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
