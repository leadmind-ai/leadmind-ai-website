import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type FooterDict = {
  copyright: string;
  links: {
    privacy: string;
    legal: string;
  };
};

type NavDict = {
  home: string;
  about: string;
  services: string;
  contact: string;
};

type FooterProps = {
  footer: FooterDict;
  nav: NavDict;
  locale: Locale;
};

export function Footer({ footer, nav, locale }: FooterProps) {
  return (
    <footer className="border-t border-gray-100 bg-primary text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">LeadMind AI</h3>
            <p className="mt-2 text-sm text-gray-300">
              Conseil & Formation IA pour l&apos;Assurance et la Finance
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/a-propos`}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/formations`}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  {nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact
            </h4>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-gray-300">
                contact@leadmind-ai.com
              </li>
              <li className="text-sm text-gray-300">Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-gray-300">{footer.copyright}</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-300 hover:text-white"
            >
              {footer.links.privacy}
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-300 hover:text-white"
            >
              {footer.links.legal}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
