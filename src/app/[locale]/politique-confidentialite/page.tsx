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
    title: `LeadMind AI — ${dict.legal.privacy_title}`,
    description: dict.legal.privacy_title,
    locale: locale as Locale,
    path: "/politique-confidentialite",
  });
}

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const content = dict.legal.privacy_content;

  const sections = [
    { title: content.intro_title, text: content.intro_text },
    { title: content.data_title, text: content.data_text },
    { title: content.purpose_title, text: content.purpose_text },
    { title: content.legal_basis_title, text: content.legal_basis_text },
    { title: content.retention_title, text: content.retention_text },
    { title: content.rights_title, text: content.rights_text },
    { title: content.cookies_title, text: content.cookies_text },
    { title: content.changes_title, text: content.changes_text },
  ];

  return (
    <section className="py-20">
      <Container>
        <h1 className="text-3xl text-on-surface md:text-4xl">
          {dict.legal.privacy_title}
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
