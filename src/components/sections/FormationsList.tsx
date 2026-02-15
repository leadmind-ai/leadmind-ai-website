"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type FormationsListProps = {
  formationsTitle: string;
  servicesTitle: string;
  items: { title: string; description: string }[];
};

export default function FormationsList({
  formationsTitle,
  servicesTitle,
  items,
}: FormationsListProps) {
  // First 2 items are formations, last 2 are services
  const formations = items.slice(0, 2);
  const services = items.slice(2);

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-3xl font-semibold text-primary">
          {formationsTitle}
        </h2>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {formations.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <Badge variant="accent">Formation</Badge>
                <h3 className="mt-3 text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <h2 className="mt-16 text-3xl font-semibold text-primary">
          {servicesTitle}
        </h2>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <Badge variant="primary">Service</Badge>
                <h3 className="mt-3 text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
