import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import ModulesIA from "@/components/sections/ModulesIA";
import Accompagnement from "@/components/sections/Accompagnement";
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
    path: "/solutions",
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-28 md:pt-36">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.15] blur-[180px]" />
        <div className="relative z-10 mx-auto w-full px-6 md:px-12 lg:px-20 xl:px-28">
          <h1 className="gradient-hero-text text-3xl md:text-4xl lg:text-5xl">
            {dict.modules_ia.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.modules_ia.subtitle}
          </p>
        </div>
      </section>
      <ModulesIA modules={dict.modules_ia} />
      <Accompagnement accompagnement={dict.accompagnement} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
