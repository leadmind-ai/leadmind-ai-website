import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type FooterDict = {
  brand_description: string;
  columns: {
    offers: {
      title: string;
      links: string[];
    };
    resources: {
      title: string;
      links: string[];
    };
    contact: {
      title: string;
      email: string;
      linkedin: string;
      location: string;
    };
  };
  copyright: string;
  links: {
    privacy: string;
    legal: string;
  };
};

type FooterProps = {
  footer: FooterDict;
  locale: Locale;
};

export function Footer({ footer, locale }: FooterProps) {
  return (
    <footer className="border-t border-surface-elevated bg-surface text-on-surface">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
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
                <span className="text-xl font-bold text-on-surface md:text-2xl">
                  LeadMind<span className="text-accent">AI</span>
                </span>
                <p className="text-sm text-on-surface-muted">AI Training &amp; Solutions</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-muted">
              {footer.brand_description}
            </p>
          </div>

          {/* Column 2: Offers */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
              {footer.columns.offers.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {footer.columns.offers.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${locale}/formations`}
                    className="text-sm text-on-surface-muted hover:text-on-surface"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
              {footer.columns.resources.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {footer.columns.resources.links.map((link) => {
                const isFaq = link === "FAQ";
                if (isFaq) {
                  return (
                    <li key={link}>
                      <Link
                        href={`/${locale}/#faq`}
                        className="text-sm text-on-surface-muted hover:text-on-surface"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={link} className="text-sm text-on-surface-muted">
                    {link}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
              {footer.columns.contact.title}
            </h4>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-on-surface-muted">
                {footer.columns.contact.email}
              </li>
              <li className="text-sm text-on-surface-muted">
                LinkedIn: {footer.columns.contact.linkedin}
              </li>
              <li className="text-sm text-on-surface-muted">
                {footer.columns.contact.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-surface-elevated pt-8 md:flex-row">
          <p className="text-sm text-on-surface-muted">{footer.copyright}</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="text-sm text-on-surface-muted hover:text-on-surface"
            >
              {footer.links.privacy}
            </Link>
            <span className="text-on-surface-muted">|</span>
            <Link
              href={`/${locale}/mentions-legales`}
              className="text-sm text-on-surface-muted hover:text-on-surface"
            >
              {footer.links.legal}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
