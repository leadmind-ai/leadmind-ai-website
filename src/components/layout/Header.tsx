"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";

type NavDict = {
  home: string;
  about: string;
  services: string;
  contact: string;
  cta: string;
};

type HeaderProps = {
  nav: NavDict;
  locale: Locale;
};

export function Header({ nav, locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLocale = locale === "fr" ? "en" : "fr";

  const links = [
    { label: nav.about, href: `/${locale}/a-propos` },
    { label: nav.services, href: `/${locale}/formations` },
    { label: nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 gradient-header-fade">
      <div className="mx-auto flex h-[104px] max-w-[1200px] items-center justify-between px-6 md:px-8">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/images/logo-dark.png"
            alt="LeadMind AI"
            width={800}
            height={447}
            priority
            className="h-20 w-auto sm:h-24 md:h-28"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Button href={`/${locale}/contact`} variant="primary">
            {nav.cta}
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-surface/95 px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-on-surface-muted"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="block py-2 text-sm font-medium text-on-surface-muted"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            className="mt-2 w-full"
          >
            {nav.cta}
          </Button>
        </nav>
      )}
    </header>
  );
}
