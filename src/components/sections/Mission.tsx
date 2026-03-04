"use client";

import { lazy, Suspense } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

const GLBackground = lazy(() => import("@/components/gl/GLBackground"));

type MissionProps = {
  title: string;
  text: string;
};

export default function Mission({ title, text }: MissionProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <Suspense fallback={null}>
        <GLBackground bgColor="#1a365d" />
      </Suspense>
      <Container className="relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              {text}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
