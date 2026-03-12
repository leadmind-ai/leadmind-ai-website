import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.legal.mentions_title}`,
    description: dict.legal.mentions_title,
    locale: locale as Locale,
    path: "/mentions-legales",
  });
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const content = dict.legal.mentions_content;

  const sections = [
    { title: content.editor_title, text: content.editor_text },
    { title: content.hosting_title, text: content.hosting_text },
    { title: content.ip_title, text: content.ip_text },
    { title: content.liability_title, text: content.liability_text },
  ];

  return (
    <section className="py-20">
      <Container>
        <h1 className="text-3xl font-normal text-on-surface md:text-4xl">
          {dict.legal.mentions_title}
        </h1>
        <div className="mt-12 max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-medium text-on-surface">{s.title}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-on-surface-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
