"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          LeadMind AI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
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
        <nav className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-text-muted"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="block py-2 text-sm font-medium text-text-muted"
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
