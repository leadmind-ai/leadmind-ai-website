"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ValuesProps = {
  title: string;
  values: { title: string; description: string }[];
};

export default function Values({ title, values }: ValuesProps) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary">
          {title}
        </h2>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <StaggerItem key={i}>
              <Card className="text-center">
                <h3 className="text-lg font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
