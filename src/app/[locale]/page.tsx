import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyLeadMind from "@/components/sections/WhyLeadMind";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero hero={dict.hero} locale={locale as Locale} />
      <LogoBar />
      <ServicesOverview services={dict.services} />
      <WhyLeadMind why={dict.why} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
