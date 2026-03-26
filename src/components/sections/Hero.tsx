import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
  };
  locale: Locale;
};

export default function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      {/* Blue radial glow from bottom — CodeWiki style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,122,244,0.15) 0%, transparent 70%)",
        }}
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <h1 className="font-heading text-[2.75rem] leading-[1] tracking-[-0.04em] text-white md:text-[4rem] lg:text-[6rem]">
            {hero.title}
          </h1>
          <p className="gradient-subtitle-text mx-auto mt-8 max-w-[600px] text-lg leading-[1.4] md:text-2xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/solutions`} variant="outline">
              {hero.cta_secondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
