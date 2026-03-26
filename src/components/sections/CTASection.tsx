"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type CTASectionProps = {
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  locale: Locale;
};

export default function CTASection({ cta, locale }: CTASectionProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div className="shine relative overflow-hidden rounded-[var(--radius-card)] bg-surface-container p-px">
            <div
              className="relative overflow-hidden rounded-[calc(var(--radius-card)-1px)] px-8 py-16 md:py-24"
              style={{
                background:
                  "linear-gradient(135deg, #0a1225 0%, #000000 40%, #060d1a 100%)",
              }}
            >
              {/* Radial glow behind content */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,122,244,0.1) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 flex flex-col items-center md:flex-row md:items-end md:justify-between md:gap-12">
                {/* Left — text */}
                <div className="max-w-2xl text-center md:text-left">
                  {cta.subtitle && (
                    <p className="text-base leading-relaxed text-[#818181] md:text-lg">
                      {cta.subtitle}
                    </p>
                  )}
                  <h2 className="mt-4 text-3xl font-medium text-white md:text-4xl lg:text-[44px] lg:leading-tight">
                    {cta.title}
                  </h2>
                </div>

                {/* Right — animated CTA button */}
                <div className="mt-8 shrink-0 md:mt-0">
                  <a
                    href={`/${locale}/contact`}
                    className="group/cta relative flex items-center gap-3 overflow-hidden rounded-full border border-white/10 px-8 py-4 transition-colors duration-300 hover:border-accent/40"
                  >
                    {/* Progress bar that fills on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
                      <div className="h-full w-0 bg-accent transition-all duration-500 group-hover/cta:w-full" />
                    </div>

                    <span className="text-base font-medium text-white">
                      {cta.button}
                    </span>

                    {/* Arrow that slides on hover */}
                    <span className="relative h-5 w-5 overflow-hidden">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="absolute inset-0 h-5 w-5 text-white transition-transform duration-300 group-hover/cta:translate-x-5"
                      >
                        <path
                          d="M4 10h12m0 0l-4-4m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="absolute inset-0 h-5 w-5 -translate-x-5 text-accent transition-transform duration-300 group-hover/cta:translate-x-0"
                      >
                        <path
                          d="M4 10h12m0 0l-4-4m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
