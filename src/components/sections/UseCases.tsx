"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type UseCasesProps = {
  useCases: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

export default function UseCases({ useCases }: UseCasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div>
            <h2 className="text-3xl text-white md:text-4xl lg:text-[48px]">
              {useCases.title}
            </h2>
            {useCases.subtitle && (
              <p className="mt-4 max-w-3xl text-lg text-[#818181]">
                {useCases.subtitle}
              </p>
            )}
          </div>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {useCases.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="flex h-full flex-col">
                <h3 className="text-lg text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-[1.45] text-[#818181]">
                  {item.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
