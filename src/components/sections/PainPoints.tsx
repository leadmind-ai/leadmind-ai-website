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
        <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-3 auto-rows-fr">
          {painPoints.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="shine group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-surface-container p-px">
                <div className="relative z-10 flex h-full flex-col justify-between rounded-[calc(var(--radius-card)-1px)] p-8 md:p-10 lg:p-12 transition-colors duration-300"
                  style={{
                    background: "linear-gradient(180deg, #0a1225 0%, #000000 100%)",
                  }}
                >
                  {/* Top — title + description */}
                  <div>
                    <h3 className="text-xl font-medium text-white md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#818181]">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom — large decorative number */}
                  <div className="mt-8 flex justify-end">
                    <span className="select-none font-heading text-[120px] font-light leading-none text-accent/[0.07] md:text-[140px]">
                      {item.number}
                    </span>
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
