import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
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
      <section className="pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
          <h1 className="gradient-hero-text text-3xl font-normal md:text-4xl lg:text-5xl">
            {dict.formations.hero_title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.formations.hero_subtitle}
          </p>
        </div>
      </section>
      <FormationsCatalog formations={dict.formations} />
      <Differentiators
        title={dict.formations.differentiators_title}
        items={dict.formations.differentiators}
      />
      <TargetProfiles
        title={dict.formations.target_profiles_title}
        profiles={dict.formations.target_profiles}
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
