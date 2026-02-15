import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import CalendlyEmbed from "@/components/sections/CalendlyEmbed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.contact.title}`,
    description: dict.contact.subtitle,
    locale: locale as Locale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold text-primary">
              {dict.contact.title}
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              {dict.contact.subtitle}
            </p>
            <div className="mt-8">
              <ContactForm form={dict.contact.form} />
            </div>
          </div>
        </Container>
      </section>
      <CalendlyEmbed title={dict.contact.calendly_title} />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Email
                </h3>
                <p className="mt-1 text-text">{dict.contact.info.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  LinkedIn
                </h3>
                <p className="mt-1 text-text">{dict.contact.info.linkedin}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Location
                </h3>
                <p className="mt-1 text-text">{dict.contact.info.location}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
