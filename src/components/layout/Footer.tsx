import Link from "next/link";
import Image from "next/image";
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
    <footer className="border-t border-white/10 bg-background text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/icon-square.png"
                alt=""
                width={400}
                height={400}
                className="h-12 w-12 md:h-14 md:w-14"
              />
              <div>
                <span className="text-xl font-bold text-white md:text-2xl">
                  LeadMind<span className="text-accent">AI</span>
                </span>
                <p className="text-sm text-gray-300">AI Training &amp; Solutions</p>
              </div>
            </div>
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
