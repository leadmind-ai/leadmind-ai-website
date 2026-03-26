import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import ModulesIA from "@/components/sections/ModulesIA";
import Accompagnement from "@/components/sections/Accompagnement";
import FormationsCatalog from "@/components/sections/FormationsCatalog";
import Differentiators from "@/components/sections/Differentiators";
import TargetProfiles from "@/components/sections/TargetProfiles";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.modules_ia.title}`,
    description: dict.modules_ia.subtitle,
    locale: locale as Locale,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <div className="pt-20 md:pt-28" />
      <ModulesIA modules={dict.modules_ia} />
      <Accompagnement accompagnement={dict.accompagnement} />
      <FormationsCatalog formations={dict.formations} />
      <Differentiators
        title={dict.formations.differentiators_title}
        items={dict.formations.differentiators}
      />
      <TargetProfiles
        title={dict.formations.target_profiles_title}
        profiles={dict.formations.target_profiles}
      />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
