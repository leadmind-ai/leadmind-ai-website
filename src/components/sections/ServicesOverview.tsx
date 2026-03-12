"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

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

type ServicesOverviewProps = {
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
    custom: {
      title: string;
      description: string;
      cta_label: string;
    };
  };
  locale?: string;
};

export default function ServicesOverview({ services, locale }: ServicesOverviewProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-normal text-on-surface md:text-4xl">
              {services.title}
            </h2>
            {services.subtitle && (
              <p className="mt-4 text-lg text-on-surface-muted">{services.subtitle}</p>
            )}
          </div>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card shine className="flex h-full flex-col p-8">
                <Badge variant="accent" className="text-xs">{item.badge}</Badge>
                <h3 className="mt-4 text-base font-medium text-on-surface">
                  {item.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm text-on-surface-muted"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
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

        {/* Custom use case - full width */}
        <FadeIn>
          <Card shine className="mt-6 text-center" hover={false}>
            <h3 className="text-xl font-normal text-on-surface">
              {services.custom.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-muted">
              {services.custom.description}
            </p>
            <div className="mt-6">
              <Button href={`/${locale || "fr"}/contact`} variant="primary">
                {services.custom.cta_label}
              </Button>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </section>
  );
}
