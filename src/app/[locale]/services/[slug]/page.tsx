import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";

const serviceSlugs = [
  "agent-reporting-s2",
  "calculateur-scr-marche",
  "agent-alm-modelisation",
  "agent-portfolio-management",
  "formation-ia-actuariat-finance",
  "transformation-ia-equipes",
] as const;

type ServiceItem = {
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

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of serviceSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = (dict.services.items as ServiceItem[]).find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {};
  }

  return createMetadata({
    title: `${service.title} — LeadMind AI`,
    description: service.description,
    locale: locale as Locale,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = (dict.services.items as ServiceItem[]).find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero section */}
      <section className="py-16 md:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="text-xs">
              {service.badge}
            </Badge>
            <h1 className="mt-6 text-4xl font-normal text-on-surface md:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-on-surface-muted">
              {service.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Details section */}
      <section className="py-16 md:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Card shine className="p-8">
              <h2 className="text-2xl font-normal text-on-surface">
                {service.title}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.details.map((detail, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base text-on-surface-muted"
                  >
                    <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing & timeline */}
      <section className="py-16 md:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <Card shine className="p-8 text-center">
              <p className="text-sm uppercase tracking-wider text-on-surface-muted">
                {locale === "fr" ? "Tarification" : "Pricing"}
              </p>
              <p className="mt-3 text-2xl font-medium text-on-surface">
                {service.pricing}
              </p>
            </Card>
            <Card shine className="p-8 text-center">
              <p className="text-sm uppercase tracking-wider text-on-surface-muted">
                {locale === "fr" ? "Calendrier" : "Timeline"}
              </p>
              <p className="mt-3 text-2xl font-medium text-on-surface">
                {service.timeline}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-[var(--spacing-section)]">
        <Container>
          <div className="text-center">
            <Button href={`/${locale}/contact`} variant="primary">
              {service.cta_label}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
