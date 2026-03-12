import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import Mission from "@/components/sections/Mission";
import Founder from "@/components/sections/Founder";
import Values from "@/components/sections/Values";
import Stats from "@/components/sections/Stats";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.about.mission_title}`,
    description: dict.about.mission_text.slice(0, 160),
    locale: locale as Locale,
    path: "/a-propos",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Mission title={dict.about.mission_title} text={dict.about.mission_text} />
      <Founder
        title={dict.about.founder_title}
        name={dict.about.founder_name}
        role={dict.about.founder_role}
        intro={dict.about.founder_intro}
        credentials={dict.about.founder_credentials}
        highlights={dict.about.founder_highlights}
        conviction={dict.about.founder_conviction}
      />
      <Values title={dict.about.values_title} values={dict.about.values} />
      <Stats title={dict.about.stats_title} pillars={dict.why.pillars} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
