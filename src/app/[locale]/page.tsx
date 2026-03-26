import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata, organizationJsonLd, faqJsonLd } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import ProcessPhases from "@/components/sections/ProcessPhases";
import UseCases from "@/components/sections/UseCases";
import CredibilityStats from "@/components/sections/CredibilityStats";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import FloatingCards from "@/components/sections/FloatingCards";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(dict.faq.items)),
        }}
      />
      <Hero hero={dict.hero} locale={locale as Locale} />
      <FloatingCards />
      <PainPoints painPoints={dict.pain_points} />
      <ProcessPhases phases={dict.process_phases} />
      <UseCases useCases={dict.use_cases} />
      <CredibilityStats credibility={dict.credibility} />
      <Testimonials testimonials={dict.testimonials} />
      <FAQ faq={dict.faq} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
