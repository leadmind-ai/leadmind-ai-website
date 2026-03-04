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
    <footer className="border-t border-white/10 bg-background text-white">
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
                <span className="text-xl font-bold text-white md:text-2xl">
                  LeadMind<span className="text-accent">AI</span>
                </span>
                <p className="text-sm text-gray-300">AI Training &amp; Solutions</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              {footer.brand_description}
            </p>
          </div>

          {/* Column 2: Offers */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              {footer.columns.offers.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {footer.columns.offers.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${locale}/formations`}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              {footer.columns.resources.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {footer.columns.resources.links.map((link) => (
                <li key={link} className="text-sm text-gray-300">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              {footer.columns.contact.title}
            </h4>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-gray-300">
                {footer.columns.contact.email}
              </li>
              <li className="text-sm text-gray-300">
                LinkedIn: {footer.columns.contact.linkedin}
              </li>
              <li className="text-sm text-gray-300">
                {footer.columns.contact.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-gray-300">{footer.copyright}</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-300 hover:text-white"
            >
              {footer.links.privacy}
            </Link>
            <span className="text-gray-500">|</span>
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
