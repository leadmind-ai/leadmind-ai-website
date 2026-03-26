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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,122,244,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto w-full px-6 md:px-12 lg:px-20 xl:px-28">
          <h1 className="font-heading text-3xl tracking-[-0.04em] text-white md:text-4xl lg:text-[48px]">
            {dict.modules_ia.title}
          </h1>
          <p className="gradient-subtitle-text mt-4 max-w-2xl text-base md:text-lg">
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
