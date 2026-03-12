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
    items: Testimonial[];
  };
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-3xl font-normal text-on-surface md:text-4xl">
          {testimonials.title}
        </h2>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card shine className="h-full">
                <blockquote className="text-sm italic leading-relaxed text-on-surface-muted">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-surface-elevated pt-4">
                  <p className="font-normal text-on-surface">{item.author}</p>
                  <p className="text-sm text-accent">{item.company}</p>
                  <p className="mt-1 text-xs text-on-surface-muted">
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
