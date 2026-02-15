import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import FormationsHero from "@/components/sections/FormationsHero";
import FormationsList from "@/components/sections/FormationsList";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.formations.hero_title}`,
    description: dict.formations.hero_subtitle,
    locale: locale as Locale,
    path: "/formations",
  });
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <FormationsHero
        title={dict.formations.hero_title}
        subtitle={dict.formations.hero_subtitle}
      />
      <FormationsList
        formationsTitle={dict.formations.formations_title}
        servicesTitle={dict.formations.services_title}
        items={dict.services.items}
      />
      <ProcessTimeline
        title={dict.formations.process_title}
        steps={dict.formations.process_steps}
      />
      <CTASection
        cta={{
          title: dict.formations.cta,
          subtitle: "",
          button: dict.formations.cta,
        }}
        locale={locale as Locale}
      />
    </>
  );
}
