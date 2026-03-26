"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type PainPointsProps = {
  painPoints: {
    headline: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
};

export default function PainPoints({ painPoints }: PainPointsProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="max-w-4xl text-3xl leading-snug text-white md:text-4xl lg:text-[48px]">
            {painPoints.headline}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-3">
          {painPoints.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group">
                <span className="text-5xl font-light text-accent/30">
                  {item.number}
                </span>
                <h3 className="mt-4 text-lg text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-[1.45] text-[#818181]">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
