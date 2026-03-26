"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type Testimonial = {
  quote: string;
  author: string;
  company: string;
  context: string;
};

type TestimonialsProps = {
  testimonials: {
    title: string;
    disclaimer?: string;
    items: Testimonial[];
  };
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <h2 className="text-3xl text-white md:text-4xl lg:text-[48px]">
          {testimonials.title}
        </h2>
        {testimonials.disclaimer && (
          <p className="mt-2 text-base text-[#818181]/60">
            {testimonials.disclaimer}
          </p>
        )}
        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card shine className="h-full">
                <blockquote className="text-base italic leading-[1.45] text-[#818181]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-surface-elevated pt-4">
                  <p className="text-white">{item.author}</p>
                  <p className="text-base text-accent">{item.company}</p>
                  <p className="mt-1 text-sm text-[#818181]">
                    {item.context}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
