"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ServiceItem = {
  icon?: string;
  slug: string;
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

function ServiceIcon({ icon }: { icon?: string }) {
  const svgProps = {
    width: 40,
    height: 40,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-accent",
  };

  switch (icon) {
    case "reporting":
      return (
        <svg {...svgProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...svgProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8" />
          <path d="M8 10h2" />
          <path d="M14 10h2" />
          <path d="M8 14h2" />
          <path d="M14 14h2" />
          <path d="M8 18h2" />
          <path d="M14 18h2" />
        </svg>
      );
    case "alm":
      return (
        <svg {...svgProps}>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M7 9v6" />
          <path d="M17 9v2" />
        </svg>
      );
    case "portfolio":
      return (
        <svg {...svgProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M12 12v4" />
          <path d="M2 12h20" />
        </svg>
      );
    case "training":
      return (
        <svg {...svgProps}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        </svg>
      );
    case "transformation":
      return (
        <svg {...svgProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesOverview({ services, locale }: ServicesOverviewProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl text-on-surface md:text-4xl">
              {services.title}
            </h2>
            {services.subtitle && (
              <p className="mt-4 text-lg text-on-surface-muted">{services.subtitle}</p>
            )}
          </div>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {services.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card shine className="flex h-full flex-col p-8">
                <ServiceIcon icon={item.icon} />
                <Badge variant="accent" className={`text-xs${item.icon ? " mt-4" : ""}`}>{item.badge}</Badge>
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
                    href={`/${locale || "fr"}/services/${item.slug}`}
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
            <h3 className="text-xl text-on-surface">
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
