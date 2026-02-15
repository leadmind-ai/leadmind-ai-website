import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://leadmind-ai.com";

type MetadataInput = {
  title: string;
  description: string;
  locale: Locale;
  path: string;
};

export function createMetadata({
  title,
  description,
  locale,
  path,
}: MetadataInput): Metadata {
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr${path}`,
        en: `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "LeadMind AI",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "website",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeadMind AI",
    url: siteUrl,
    description:
      "Conseil & Formation IA pour l'Assurance et la Finance",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
  };
}
