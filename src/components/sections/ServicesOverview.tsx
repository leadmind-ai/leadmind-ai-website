"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ServicesOverviewProps = {
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
};

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-primary md:text-4xl">
            {services.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{services.subtitle}</p>
        </div>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
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
