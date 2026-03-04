import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata, organizationJsonLd } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyLeadMind from "@/components/sections/WhyLeadMind";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.hero.title}`,
    description: dict.hero.subtitle,
    locale: locale as Locale,
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Hero hero={dict.hero} locale={locale as Locale} />
      <LogoBar />
      <ServicesOverview services={dict.services} />
      <WhyLeadMind why={dict.why} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
