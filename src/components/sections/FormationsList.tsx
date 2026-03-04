"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ServiceItem = {
  title: string;
  badge: string;
  headline: string;
  description: string;
  details: string[];
  cta_label: string;
  pricing: string;
  timeline: string;
};

type FormationsListProps = {
  formationsTitle: string;
  servicesTitle: string;
  items: ServiceItem[];
  locale?: string;
};

export default function FormationsList({
  formationsTitle,
  servicesTitle,
  items,
  locale,
}: FormationsListProps) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-3xl font-semibold text-white">
          {formationsTitle} & {servicesTitle}
        </h2>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col">
                <Badge variant="accent">{item.badge}</Badge>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {item.headline}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm text-text-muted"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-accent">{item.pricing}</p>
                    <p className="text-xs text-text-muted">{item.timeline}</p>
                  </div>
                  <Button
                    href={`/${locale || "fr"}/contact`}
                    variant="ghost"
                    className="text-sm"
                  >
                    {item.cta_label}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
