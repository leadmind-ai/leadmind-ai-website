import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import PricingGrid from "@/components/sections/PricingGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.pricing.title}`,
    description: dict.pricing.subtitle,
    locale: locale as Locale,
    path: "/tarifs",
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
          <h1 className="gradient-hero-text text-3xl font-normal md:text-4xl lg:text-5xl">
            {dict.pricing.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.pricing.subtitle}
          </p>
        </div>
      </section>
      <PricingGrid pricing={dict.pricing} locale={locale as Locale} />
    </>
  );
}
