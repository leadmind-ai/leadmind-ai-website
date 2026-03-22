import { notFound } from "next/navigation";
import { locales, type Locale, getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SetLang } from "@/components/util/SetLang";
import GLBackgroundWrapper from "@/components/gl/GLBackgroundWrapper";
import { CookieBanner } from "@/components/ui/CookieBanner";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="relative min-h-screen">
      <SetLang locale={locale as Locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <GLBackgroundWrapper />
      <Header nav={dict.nav} locale={locale as Locale} />
      <main id="main-content" className="min-h-screen pt-[72px]">{children}</main>
      <Footer footer={dict.footer} locale={locale as Locale} />
      <CookieBanner locale={locale as string} />
    </div>
  );
}
