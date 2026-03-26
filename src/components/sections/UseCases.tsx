"use client";

import { Container } from "@/components/ui/Container";
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
              <div className="group/uc relative h-full overflow-hidden rounded-[var(--radius-card)] bg-surface-container p-px transition-colors duration-300 hover:bg-[#003d7a]">
                <div
                  className="relative flex h-full flex-col rounded-[calc(var(--radius-card)-1px)] p-8 md:p-10 transition-colors duration-300 group-hover/uc:bg-[rgba(0,10,30,0.9)]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,18,37,0.95) 0%, rgba(0,0,0,0.95) 100%)",
                  }}
                >
                  <h3 className="text-lg font-medium text-white transition-colors duration-300 group-hover/uc:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#818181]">
                    {item.description}
                  </p>
                  {/* Hover arrow indicator */}
                  <div className="mt-auto pt-6">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5 text-white/20 transition-all duration-300 group-hover/uc:translate-x-1 group-hover/uc:text-accent"
                    >
                      <path
                        d="M4 10h12m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
