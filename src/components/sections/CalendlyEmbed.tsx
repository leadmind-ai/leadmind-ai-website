"use client";

import { Container } from "@/components/ui/Container";

type CalendlyEmbedProps = {
  title: string;
};

export default function CalendlyEmbed({ title }: CalendlyEmbedProps) {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/leadmind-ai/30min";

  return (
    <section className="py-16">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold text-white">
          {title}
        </h2>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="630"
            frameBorder="0"
            title="Calendly"
          />
        </div>
      </Container>
    </section>
  );
}
