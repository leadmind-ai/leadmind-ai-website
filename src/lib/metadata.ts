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
      images: [
        {
          url: `${siteUrl}/images/icon-512.png`,
          width: 512,
          height: 512,
          alt: "LeadMind AI",
        },
      ],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeadMind AI",
    url: siteUrl,
    logo: `${siteUrl}/images/icon-512.png`,
    description:
      "IA Training & Solutions pour l'Assurance et la Finance",
    founder: {
      "@type": "Person",
      name: "Herman Njouonang",
    },
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
  };
}
