# Site Vitrine LeadMind AI — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (FR/EN) corporate website for LeadMind AI — an AI consulting firm for insurance/finance — with 4 pages, Framer Motion animations, Formspree contact form, Calendly embed, and Vercel Analytics.

**Architecture:** Next.js 16 App Router with `[locale]` dynamic segment for i18n. All pages are SSG (static). Content lives in JSON dictionaries (`fr.json`, `en.json`). Middleware detects browser locale and redirects. Design system uses Navy (#1a365d) + Teal (#0d9488) palette with Inter font.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion, @formspree/react, @vercel/analytics, next-sitemap

**Design doc:** `docs/plans/2026-02-15-site-vitrine-design.md`

---

## Task 1: Install dependencies and configure Tailwind design tokens

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `next-sitemap.config.js`

**Step 1: Install production dependencies**

Run:
```bash
npm install framer-motion @formspree/react @vercel/analytics
```

**Step 2: Install dev dependencies**

Run:
```bash
npm install -D next-sitemap @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest ts-node
```

**Step 3: Configure Tailwind design tokens in globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: #1a365d;
  --color-primary-light: #2c5282;
  --color-accent: #0d9488;
  --color-accent-light: #14b8a6;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --font-sans: var(--font-inter);
}

body {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

**Step 4: Update root layout to use Inter font**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeadMind AI — Conseil & Formation IA pour l'Assurance et la Finance",
  description:
    "Cabinet spécialisé en formation et solutions IA pour les professionnels de l'assurance et de la finance : actuaires, comptables, asset managers, analystes, data scientists et plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Step 5: Create next-sitemap config**

Create `next-sitemap.config.js`:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://leadmind-ai.com",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://leadmind-ai.com/fr", hreflang: "fr" },
    { href: "https://leadmind-ai.com/en", hreflang: "en" },
  ],
};
```

**Step 6: Add postbuild script to package.json**

Add to `scripts` in `package.json`:
```json
"postbuild": "next-sitemap",
"test": "jest"
```

**Step 7: Verify build works**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: install deps, configure Tailwind tokens, Inter font, Vercel Analytics"
```

---

## Task 2: Set up Jest testing infrastructure

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `tsconfig.json`

**Step 1: Create Jest config**

Create `jest.config.ts`:

```ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
```

**Step 2: Create Jest setup file**

Create `jest.setup.ts`:

```ts
import "@testing-library/jest-dom";
```

**Step 3: Write a smoke test**

Create `tests/smoke.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";

function Smoke() {
  return <div>smoke</div>;
}

describe("test infrastructure", () => {
  it("renders a component", () => {
    render(<Smoke />);
    expect(screen.getByText("smoke")).toBeInTheDocument();
  });
});
```

**Step 4: Run test**

Run:
```bash
npm test -- tests/smoke.test.tsx
```

Expected: 1 test passes.

**Step 5: Commit**

```bash
git add jest.config.ts jest.setup.ts tests/smoke.test.tsx
git commit -m "chore: set up Jest + React Testing Library"
```

---

## Task 3: Create i18n system (middleware + dictionaries)

**Files:**
- Create: `src/dictionaries/fr.json`
- Create: `src/dictionaries/en.json`
- Create: `src/lib/i18n.ts`
- Create: `src/middleware.ts`

**Step 1: Create the i18n config and dictionary loader**

Create `src/lib/i18n.ts`:

```ts
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
```

**Step 2: Create French dictionary**

Create `src/dictionaries/fr.json`:

```json
{
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    "services": "Formations & Services",
    "contact": "Contact",
    "cta": "Prendre rendez-vous"
  },
  "hero": {
    "title": "L'IA au service de l'assurance et de la finance",
    "subtitle": "Formation opérationnelle et solutions IA sur-mesure pour les métiers techniques de l'assurance et de la finance : actuaires, comptables, asset managers, analystes financiers, data scientists et bien d'autres.",
    "cta_primary": "Prendre rendez-vous",
    "cta_secondary": "Nos formations"
  },
  "services": {
    "title": "Nos expertises",
    "subtitle": "Des solutions concrètes pour accélérer votre transformation IA",
    "items": [
      {
        "title": "Formation Claude Code & Agentic Coding",
        "description": "Formez vos équipes aux outils IA de dernière génération. Prise en main opérationnelle en 2 jours."
      },
      {
        "title": "Agents IA Métier",
        "description": "Développement d'agents intelligents adaptés à vos processus métier en assurance et finance."
      },
      {
        "title": "Automatisation Solvabilité 2",
        "description": "Automatisez vos reportings réglementaires et calculs SCR avec des pipelines IA robustes."
      },
      {
        "title": "Conseil Stratégique IA",
        "description": "Accompagnement de votre direction dans la définition et l'exécution de votre feuille de route IA."
      }
    ]
  },
  "why": {
    "title": "Pourquoi LeadMind AI ?",
    "pillars": [
      {
        "title": "Expertise technique",
        "description": "Maîtrise avancée des LLM, agents IA et frameworks de développement modernes.",
        "stat": "10+",
        "stat_label": "années d'expérience"
      },
      {
        "title": "Connaissance métier",
        "description": "Double compétence assurance/finance et IA — nous parlons le langage de vos métiers techniques.",
        "stat": "50+",
        "stat_label": "professionnels formés"
      },
      {
        "title": "Résultats mesurables",
        "description": "ROI démontrable sur chaque mission. Livrables concrets, pas de slides.",
        "stat": "30+",
        "stat_label": "projets livrés"
      }
    ]
  },
  "cta_section": {
    "title": "Prêt à transformer vos métiers avec l'IA ?",
    "subtitle": "Actuaires, comptables, analystes, data scientists — discutons de vos enjeux IA lors d'un appel de 30 minutes.",
    "button": "Réserver un créneau"
  },
  "about": {
    "mission_title": "Notre mission",
    "mission_text": "Rendre l'IA accessible et opérationnelle pour l'ensemble des métiers techniques de l'assurance et de la finance — actuaires, comptables, gestionnaires d'actifs, analystes quantitatifs, data scientists, IT et bien d'autres. Ni consultant IA généraliste, ni technicien sans vision métier — nous combinons expertise sectorielle et maîtrise technologique.",
    "founder_title": "Fondateur",
    "founder_name": "[Nom du fondateur]",
    "founder_bio": "[Bio du fondateur — parcours actuariat + IA]",
    "values_title": "Nos valeurs",
    "values": [
      { "title": "Expertise", "description": "Maîtrise technique profonde, formation continue, veille permanente." },
      { "title": "Pragmatisme", "description": "Solutions concrètes, livrables tangibles, pas de buzzwords." },
      { "title": "Impact mesurable", "description": "Chaque mission produit un ROI documenté et vérifiable." }
    ],
    "stats_title": "En chiffres"
  },
  "formations": {
    "hero_title": "Formations & Services",
    "hero_subtitle": "Un catalogue adapté à tous les métiers techniques de l'assurance et de la finance",
    "formations_title": "Formations",
    "services_title": "Services",
    "process_title": "Notre approche",
    "process_steps": [
      { "title": "Audit", "description": "Analyse de vos besoins et de votre maturité IA" },
      { "title": "Formation", "description": "Sessions pratiques adaptées à votre contexte métier" },
      { "title": "Implémentation", "description": "Développement et déploiement des solutions IA" },
      { "title": "Support", "description": "Accompagnement continu et montée en compétences" }
    ],
    "cta": "Demander un devis"
  },
  "contact": {
    "title": "Contactez-nous",
    "subtitle": "Une question, un projet ? Parlons-en.",
    "form": {
      "name": "Nom complet",
      "email": "Email professionnel",
      "company": "Entreprise",
      "subject": "Objet",
      "subject_options": ["Formation", "Projet IA", "Conseil", "Autre"],
      "message": "Votre message",
      "submit": "Envoyer",
      "success": "Message envoyé ! Nous reviendrons vers vous sous 24h.",
      "error": "Erreur lors de l'envoi. Veuillez réessayer."
    },
    "calendly_title": "Ou réservez directement un créneau",
    "info": {
      "email": "contact@leadmind-ai.com",
      "linkedin": "linkedin.com/company/leadmind-ai",
      "location": "Paris, France"
    }
  },
  "footer": {
    "copyright": "© 2026 LeadMind AI. Tous droits réservés.",
    "links": {
      "privacy": "Politique de confidentialité",
      "legal": "Mentions légales"
    }
  }
}
```

**Step 3: Create English dictionary**

Create `src/dictionaries/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Training & Services",
    "contact": "Contact",
    "cta": "Book a call"
  },
  "hero": {
    "title": "AI for insurance and finance professionals",
    "subtitle": "Hands-on training and custom AI solutions for technical roles in insurance and finance: actuaries, accountants, asset managers, financial analysts, data scientists and more.",
    "cta_primary": "Book a call",
    "cta_secondary": "Our training programs"
  },
  "services": {
    "title": "Our expertise",
    "subtitle": "Concrete solutions to accelerate your AI transformation",
    "items": [
      {
        "title": "Claude Code & Agentic Coding Training",
        "description": "Train your teams on cutting-edge AI tools. Operational proficiency in 2 days."
      },
      {
        "title": "Custom AI Agents",
        "description": "Intelligent agents tailored to your business processes in insurance and finance."
      },
      {
        "title": "Solvency 2 Automation",
        "description": "Automate your regulatory reporting and SCR calculations with robust AI pipelines."
      },
      {
        "title": "AI Strategy Consulting",
        "description": "Guiding your leadership in defining and executing your AI roadmap."
      }
    ]
  },
  "why": {
    "title": "Why LeadMind AI?",
    "pillars": [
      {
        "title": "Technical expertise",
        "description": "Advanced mastery of LLMs, AI agents, and modern development frameworks.",
        "stat": "10+",
        "stat_label": "years of experience"
      },
      {
        "title": "Domain knowledge",
        "description": "Dual insurance/finance and AI expertise — we speak the language of your technical roles.",
        "stat": "50+",
        "stat_label": "professionals trained"
      },
      {
        "title": "Measurable results",
        "description": "Demonstrable ROI on every engagement. Concrete deliverables, not slides.",
        "stat": "30+",
        "stat_label": "projects delivered"
      }
    ]
  },
  "cta_section": {
    "title": "Ready to transform your work with AI?",
    "subtitle": "Actuaries, accountants, analysts, data scientists — let's discuss your AI challenges in a 30-minute call.",
    "button": "Book a slot"
  },
  "about": {
    "mission_title": "Our mission",
    "mission_text": "Making AI accessible and operational for all technical roles in insurance and finance — actuaries, accountants, asset managers, quantitative analysts, data scientists, IT professionals and beyond. Neither a generalist AI consultant nor a technician without business insight — we combine sector expertise with technological mastery.",
    "founder_title": "Founder",
    "founder_name": "[Founder name]",
    "founder_bio": "[Founder bio — actuarial + AI background]",
    "values_title": "Our values",
    "values": [
      { "title": "Expertise", "description": "Deep technical mastery, continuous learning, constant monitoring." },
      { "title": "Pragmatism", "description": "Concrete solutions, tangible deliverables, no buzzwords." },
      { "title": "Measurable impact", "description": "Every engagement produces documented, verifiable ROI." }
    ],
    "stats_title": "By the numbers"
  },
  "formations": {
    "hero_title": "Training & Services",
    "hero_subtitle": "A catalog tailored to all technical roles in insurance and finance",
    "formations_title": "Training programs",
    "services_title": "Services",
    "process_title": "Our approach",
    "process_steps": [
      { "title": "Audit", "description": "Analysis of your needs and AI maturity" },
      { "title": "Training", "description": "Hands-on sessions tailored to your business context" },
      { "title": "Implementation", "description": "Development and deployment of AI solutions" },
      { "title": "Support", "description": "Ongoing support and skills development" }
    ],
    "cta": "Request a quote"
  },
  "contact": {
    "title": "Contact us",
    "subtitle": "A question, a project? Let's talk.",
    "form": {
      "name": "Full name",
      "email": "Professional email",
      "company": "Company",
      "subject": "Subject",
      "subject_options": ["Training", "AI Project", "Consulting", "Other"],
      "message": "Your message",
      "submit": "Send",
      "success": "Message sent! We'll get back to you within 24 hours.",
      "error": "Error sending message. Please try again."
    },
    "calendly_title": "Or book a slot directly",
    "info": {
      "email": "contact@leadmind-ai.com",
      "linkedin": "linkedin.com/company/leadmind-ai",
      "location": "Paris, France"
    }
  },
  "footer": {
    "copyright": "© 2026 LeadMind AI. All rights reserved.",
    "links": {
      "privacy": "Privacy policy",
      "legal": "Legal notice"
    }
  }
}
```

**Step 4: Create the middleware for locale detection**

Create `src/middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.includes("fr") ? "fr" : "en";
  const locale = locales.includes(preferredLocale as any)
    ? preferredLocale
    : defaultLocale;

  // Redirect to localized path
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
```

**Step 5: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

**Step 6: Commit**

```bash
git add src/dictionaries/ src/lib/i18n.ts src/middleware.ts
git commit -m "feat: add i18n system with FR/EN dictionaries and middleware"
```

---

## Task 4: Generate UI mockups with Stitch MCP

**Files:**
- Create: `docs/design/stitch-screens.md` (screen IDs and links reference)

> **Prerequisite:** Tasks 1-3 completed (project scaffolded, design tokens defined, i18n dictionaries ready).
> **Output:** Validated mockups for all 4 pages, serving as visual reference for Tasks 5-12.

**Step 1: Create a Stitch project**

Use `mcp__stitch__create_project` to create a new project:
- Title: `LeadMind AI — Site Vitrine`

Save the returned `projectId` for all subsequent calls.

**Step 2: Generate Home page mockup**

Use `mcp__stitch__generate_screen_from_text` with:
- `projectId`: (from Step 1)
- `deviceType`: `DESKTOP`
- `prompt`:

```
Corporate landing page for LeadMind AI, an AI consulting firm for insurance and finance professionals (actuaries, accountants, asset managers, financial analysts, data scientists, IT).

Design system: Navy (#1a365d) primary, Teal (#0d9488) accent, white background, Inter font.

Sections from top to bottom:
1. HEADER: Sticky white bar with "LeadMind AI" logo left, nav links (Accueil, À propos, Formations & Services, Contact), language switcher (FR/EN), teal CTA button "Prendre rendez-vous"
2. HERO: Full-width navy background, large white headline "L'IA au service de l'assurance et de la finance", subtitle mentioning technical roles (actuaries, accountants, asset managers, analysts, data scientists), two buttons: teal "Prendre rendez-vous" + outlined white "Nos formations". Subtle gradient accent on the right.
3. LOGO BAR: Light gray strip with scrolling client placeholder logos (Assureur A, Mutuelle B, Banque C, etc.)
4. SERVICES: White section, centered title "Nos expertises", 4 cards in a row — Formation Claude Code, Agents IA Métier, Automatisation Solvabilité 2, Conseil Stratégique IA. Each card with title + short description.
5. WHY US: Light gray section, "Pourquoi LeadMind AI ?", 3 columns with large animated numbers (10+, 50+, 30+), stat labels, titles and descriptions.
6. CTA BANNER: Navy section, "Prêt à transformer vos métiers avec l'IA ?", subtitle listing target roles, teal button.
7. FOOTER: Navy background, 3 columns (brand + tagline, navigation links, contact info), bottom bar with copyright + legal links.

Style: Professional, clean, modern SaaS feel. No illustrations. Generous whitespace. Cards have subtle hover shadow.
```

**Step 3: Generate Home page mobile variant**

Use `mcp__stitch__generate_screen_from_text` with:
- `deviceType`: `MOBILE`
- `prompt`: Same as Step 2 but add: `Mobile responsive version. Hamburger menu. Single column layout. Stacked cards. Collapsed logo bar.`

**Step 4: Generate About page mockup**

Use `mcp__stitch__generate_screen_from_text` with:
- `deviceType`: `DESKTOP`
- `prompt`:

```
About page for LeadMind AI. Same design system (Navy #1a365d, Teal #0d9488, Inter font).

Sections:
1. MISSION: White section, centered h1 "Notre mission", paragraph about making AI accessible for all technical roles in insurance and finance (actuaries, accountants, asset managers, quant analysts, data scientists, IT).
2. FOUNDER: Light gray section, circular photo placeholder on the left, name and bio on the right.
3. VALUES: White section, 3 cards — Expertise, Pragmatisme, Impact mesurable. Each with title + description.
4. STATS: Navy banner, 3 large teal numbers (10+, 50+, 30+) with labels.

Same header/footer as Home page.
```

**Step 5: Generate Formations & Services page mockup**

Use `mcp__stitch__generate_screen_from_text` with:
- `deviceType`: `DESKTOP`
- `prompt`:

```
Training & Services page for LeadMind AI. Same design system.

Sections:
1. PAGE HERO: Navy background, h1 "Formations & Services", subtitle "Un catalogue adapté à tous les métiers techniques de l'assurance et de la finance".
2. FORMATIONS: White section, h2 "Formations", 2 cards with teal "Formation" badge — Claude Code training, Agents IA training.
3. SERVICES: White section, h2 "Services", 2 cards with navy "Service" badge — Solvabilité 2 automation, AI Strategy consulting.
4. PROCESS TIMELINE: Light gray section, h2 "Notre approche", 4 numbered circles in a row (1-Audit, 2-Formation, 3-Implémentation, 4-Support). Each with title and short description.
5. CTA: Teal button "Demander un devis".

Same header/footer as Home page.
```

**Step 6: Generate Contact page mockup**

Use `mcp__stitch__generate_screen_from_text` with:
- `deviceType`: `DESKTOP`
- `prompt`:

```
Contact page for LeadMind AI. Same design system.

Sections:
1. CONTACT FORM: White section, h1 "Contactez-nous", subtitle, form fields (Nom, Email, Entreprise, Objet dropdown, Message textarea), teal submit button. Max-width 600px centered.
2. CALENDLY: Light gray section, h2 "Ou réservez directement un créneau", embedded Calendly widget placeholder (rounded border).
3. CONTACT INFO: White section, 3 columns — Email, LinkedIn, Location (Paris, France).

Same header/footer as Home page.
```

**Step 7: Review and iterate**

- Use `mcp__stitch__list_screens` to list all generated screens.
- Review each screen visually. If adjustments are needed, use `mcp__stitch__edit_screens` with specific feedback (e.g., "Make the CTA button larger", "Add more spacing between cards").
- Optionally use `mcp__stitch__generate_variants` on the Home page to explore color or layout alternatives.

**Step 8: Document screen references**

Create `docs/design/stitch-screens.md`:

```markdown
# Stitch Mockups — LeadMind AI Site Vitrine

**Project ID:** [projectId]

| Page | Device | Screen ID | Status |
|------|--------|-----------|--------|
| Home | Desktop | [screenId] | Validated |
| Home | Mobile | [screenId] | Validated |
| About | Desktop | [screenId] | Validated |
| Formations | Desktop | [screenId] | Validated |
| Contact | Desktop | [screenId] | Validated |

## Design decisions
- [Notes from review iterations]
```

**Step 9: Commit**

```bash
git add docs/design/
git commit -m "feat: generate Stitch UI mockups for all 4 pages (desktop + mobile)"
```

---

## Task 5: Create UI components (Button, Card, Container, Badge)

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `tests/components/ui/Button.test.tsx`

**Step 1: Write Button test**

Create `tests/components/ui/Button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with primary variant by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("bg-accent");
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/contact">Contact</Button>);
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button", { name: "Secondary" });
    expect(btn.className).toContain("border-primary");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/components/ui/Button.test.tsx`
Expected: FAIL — module not found.

**Step 3: Create Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-text-muted hover:text-text hover:bg-surface",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/components/ui/Button.test.tsx`
Expected: 3 tests pass.

**Step 5: Create remaining UI components**

Create `src/components/ui/Container.tsx`:

```tsx
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

Create `src/components/ui/Card.tsx`:

```tsx
type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white p-6 ${
        hover ? "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

Create `src/components/ui/Badge.tsx`:

```tsx
type BadgeProps = {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "muted";
  className?: string;
};

export function Badge({
  children,
  variant = "accent",
  className = "",
}: BadgeProps) {
  const variants = {
    accent: "bg-accent/10 text-accent",
    primary: "bg-primary/10 text-primary",
    muted: "bg-gray-100 text-text-muted",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

**Step 6: Commit**

```bash
git add src/components/ui/ tests/components/
git commit -m "feat: add UI components — Button, Card, Container, Badge"
```

---

## Task 6: Create animation utilities (Framer Motion wrappers)

**Files:**
- Create: `src/components/ui/FadeIn.tsx`
- Create: `src/components/ui/Counter.tsx`

**Step 1: Create FadeIn wrapper (scroll reveal)**

Create `src/components/ui/FadeIn.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Create Counter component (count-up animation)**

Create `src/components/ui/Counter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = {
  value: string; // e.g. "10+", "50+", "30+"
  className?: string;
};

export function Counter({ value, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      start = Math.floor(eased * numericPart);
      setDisplayValue(String(start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, numericPart]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/components/ui/FadeIn.tsx src/components/ui/Counter.tsx
git commit -m "feat: add Framer Motion animation utilities — FadeIn, StaggerChildren, Counter"
```

---

## Task 7: Create Header and Footer layout components

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `tests/components/layout/Header.test.tsx`

**Step 1: Write Header test**

Create `tests/components/layout/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock dictionary
const nav = {
  home: "Accueil",
  about: "À propos",
  services: "Formations & Services",
  contact: "Contact",
  cta: "Prendre rendez-vous",
};

describe("Header", () => {
  it("renders navigation links", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("À propos")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders language switcher", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<Header nav={nav} locale="fr" />);
    expect(screen.getByText("Prendre rendez-vous")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/components/layout/Header.test.tsx`
Expected: FAIL.

**Step 3: Create Header component**

Create `src/components/layout/Header.tsx`:

```tsx
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
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          <Button href={`/${locale}/contact`} variant="primary" className="mt-2 w-full">
            {nav.cta}
          </Button>
        </nav>
      )}
    </header>
  );
}
```

**Step 4: Run test**

Run: `npm test -- tests/components/layout/Header.test.tsx`
Expected: 3 tests pass.

**Step 5: Create Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
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
              <li><Link href={`/${locale}`} className="text-sm text-gray-300 hover:text-white">{nav.home}</Link></li>
              <li><Link href={`/${locale}/a-propos`} className="text-sm text-gray-300 hover:text-white">{nav.about}</Link></li>
              <li><Link href={`/${locale}/formations`} className="text-sm text-gray-300 hover:text-white">{nav.services}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-sm text-gray-300 hover:text-white">{nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact
            </h4>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-gray-300">contact@leadmind-ai.com</li>
              <li className="text-sm text-gray-300">Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-gray-300">{footer.copyright}</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-300 hover:text-white">{footer.links.privacy}</Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white">{footer.links.legal}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

**Step 6: Commit**

```bash
git add src/components/layout/ tests/components/layout/
git commit -m "feat: add Header and Footer layout components with mobile nav"
```

---

## Task 8: Create locale layout and root redirect

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (remove lang from html if needed)

**Step 1: Create the locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { notFound } from "next/navigation";
import { locales, type Locale, getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    <>
      <Header nav={dict.nav} locale={locale as Locale} />
      <main className="min-h-screen">{children}</main>
      <Footer footer={dict.footer} nav={dict.nav} locale={locale as Locale} />
    </>
  );
}
```

**Step 2: Replace root page.tsx with redirect**

Replace `src/app/page.tsx` with:

```tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
```

**Step 3: Update root layout to use dynamic lang**

Update `src/app/layout.tsx` — change `<html lang="fr">` to `<html suppressHydrationWarning>` since the locale layout handles the lang context.

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds, pages generated for `/fr` and `/en`.

**Step 5: Commit**

```bash
git add src/app/
git commit -m "feat: add locale layout with Header/Footer and root redirect"
```

---

## Task 9: Build Home page sections

**Files:**
- Create: `src/app/[locale]/page.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/LogoBar.tsx`
- Create: `src/components/sections/ServicesOverview.tsx`
- Create: `src/components/sections/WhyLeadMind.tsx`
- Create: `src/components/sections/CTASection.tsx`
- Create: `tests/pages/home.test.tsx`

**Step 1: Write home page render test**

Create `tests/pages/home.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

const heroDict = {
  title: "L'IA au service de l'assurance et de la finance",
  subtitle: "Formation et solutions IA",
  cta_primary: "Prendre rendez-vous",
  cta_secondary: "Nos formations",
};

describe("Home page Hero", () => {
  it("renders headline and CTAs", () => {
    render(<Hero hero={heroDict} locale="fr" />);
    expect(screen.getByText(heroDict.title)).toBeInTheDocument();
    expect(screen.getByText(heroDict.cta_primary)).toBeInTheDocument();
    expect(screen.getByText(heroDict.cta_secondary)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/pages/home.test.tsx`
Expected: FAIL.

**Step 3: Create Hero section**

Create `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
  };
  locale: Locale;
};

export default function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={`/${locale}/contact`} variant="primary">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/formations`} variant="secondary" className="border-white text-white hover:bg-white hover:text-primary">
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
      {/* Background gradient decoration */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-accent/10 to-transparent" />
    </section>
  );
}
```

**Step 4: Run test**

Run: `npm test -- tests/pages/home.test.tsx`
Expected: PASS.

**Step 5: Create LogoBar section**

Create `src/components/sections/LogoBar.tsx`:

```tsx
import { Container } from "@/components/ui/Container";

const logos = [
  "Assureur A",
  "Mutuelle B",
  "Banque C",
  "Réassureur D",
  "Groupe E",
  "Institution F",
];

export default function LogoBar() {
  return (
    <section className="border-b border-gray-100 bg-surface py-8">
      <Container>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-12">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-sm font-medium text-text-muted"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

Note: Add to `globals.css` the scroll animation:

```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
}
```

**Step 6: Create ServicesOverview section**

Create `src/components/sections/ServicesOverview.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ServicesOverviewProps = {
  services: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
};

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-primary md:text-4xl">
            {services.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{services.subtitle}</p>
        </div>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
```

**Step 7: Create WhyLeadMind section**

Create `src/components/sections/WhyLeadMind.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

type WhyLeadMindProps = {
  why: {
    title: string;
    pillars: {
      title: string;
      description: string;
      stat: string;
      stat_label: string;
    }[];
  };
};

export default function WhyLeadMind({ why }: WhyLeadMindProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary md:text-4xl">
          {why.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {why.pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">
                  <Counter value={pillar.stat} />
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {pillar.stat_label}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

**Step 8: Create CTA section**

Create `src/components/sections/CTASection.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

type CTASectionProps = {
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  locale: Locale;
};

export default function CTASection({ cta, locale }: CTASectionProps) {
  return (
    <section className="bg-primary py-20">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-lg text-gray-300">{cta.subtitle}</p>
            <div className="mt-8">
              <Button href={`/${locale}/contact`} variant="primary">
                {cta.button}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
```

**Step 9: Assemble the Home page**

Replace `src/app/[locale]/page.tsx`:

```tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyLeadMind from "@/components/sections/WhyLeadMind";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero hero={dict.hero} locale={locale as Locale} />
      <LogoBar />
      <ServicesOverview services={dict.services} />
      <WhyLeadMind why={dict.why} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
```

**Step 10: Verify build**

Run: `npm run build`
Expected: Build succeeds with `/fr` and `/en` pages generated.

**Step 11: Commit**

```bash
git add src/components/sections/ src/app/[locale]/page.tsx src/app/globals.css tests/pages/
git commit -m "feat: build Home page — Hero, LogoBar, Services, WhyLeadMind, CTA sections"
```

---

## Task 10: Build About page

**Files:**
- Create: `src/app/[locale]/a-propos/page.tsx`
- Create: `src/components/sections/Mission.tsx`
- Create: `src/components/sections/Founder.tsx`
- Create: `src/components/sections/Values.tsx`
- Create: `src/components/sections/Stats.tsx`

**Step 1: Create section components**

Create `src/components/sections/Mission.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

type MissionProps = {
  title: string;
  text: string;
};

export default function Mission({ title, text }: MissionProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-primary md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              {text}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
```

Create `src/components/sections/Founder.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

type FounderProps = {
  title: string;
  name: string;
  bio: string;
};

export default function Founder({ title, name, bio }: FounderProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold text-primary">{title}</h2>
            <div className="mt-8 flex flex-col items-center gap-8 md:flex-row">
              <div className="h-48 w-48 flex-shrink-0 rounded-full bg-gray-200" />
              <div>
                <h3 className="text-xl font-semibold text-text">{name}</h3>
                <p className="mt-2 leading-relaxed text-text-muted">{bio}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
```

Create `src/components/sections/Values.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ValuesProps = {
  title: string;
  values: { title: string; description: string }[];
};

export default function Values({ title, values }: ValuesProps) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary">
          {title}
        </h2>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <StaggerItem key={i}>
              <Card className="text-center">
                <h3 className="text-lg font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
```

Create `src/components/sections/Stats.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

type StatsProps = {
  title: string;
  pillars: { stat: string; stat_label: string }[];
};

export default function Stats({ title, pillars }: StatsProps) {
  return (
    <section className="bg-primary py-16">
      <Container>
        <h2 className="text-center text-2xl font-semibold text-white">
          {title}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">
                  <Counter value={p.stat} />
                </div>
                <p className="mt-1 text-sm text-gray-300">{p.stat_label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Assemble About page**

Create `src/app/[locale]/a-propos/page.tsx`:

```tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import Mission from "@/components/sections/Mission";
import Founder from "@/components/sections/Founder";
import Values from "@/components/sections/Values";
import Stats from "@/components/sections/Stats";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Mission title={dict.about.mission_title} text={dict.about.mission_text} />
      <Founder
        title={dict.about.founder_title}
        name={dict.about.founder_name}
        bio={dict.about.founder_bio}
      />
      <Values title={dict.about.values_title} values={dict.about.values} />
      <Stats title={dict.about.stats_title} pillars={dict.why.pillars} />
    </>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: `/fr/a-propos` and `/en/a-propos` pages generated.

**Step 4: Commit**

```bash
git add src/components/sections/Mission.tsx src/components/sections/Founder.tsx src/components/sections/Values.tsx src/components/sections/Stats.tsx src/app/[locale]/a-propos/
git commit -m "feat: build About page — Mission, Founder, Values, Stats sections"
```

---

## Task 11: Build Formations/Services page

**Files:**
- Create: `src/app/[locale]/formations/page.tsx`
- Create: `src/components/sections/FormationsHero.tsx`
- Create: `src/components/sections/FormationsList.tsx`
- Create: `src/components/sections/ProcessTimeline.tsx`

**Step 1: Create FormationsHero**

Create `src/components/sections/FormationsHero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type FormationsHeroProps = {
  title: string;
  subtitle: string;
};

export default function FormationsHero({ title, subtitle }: FormationsHeroProps) {
  return (
    <section className="bg-primary py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-gray-300">{subtitle}</p>
        </motion.div>
      </Container>
    </section>
  );
}
```

**Step 2: Create FormationsList (formations + services cards)**

Create `src/components/sections/FormationsList.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type FormationsListProps = {
  formationsTitle: string;
  servicesTitle: string;
  items: { title: string; description: string }[];
};

export default function FormationsList({
  formationsTitle,
  servicesTitle,
  items,
}: FormationsListProps) {
  // First 2 items are formations, last 2 are services
  const formations = items.slice(0, 2);
  const services = items.slice(2);

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-3xl font-semibold text-primary">{formationsTitle}</h2>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {formations.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <Badge variant="accent">Formation</Badge>
                <h3 className="mt-3 text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <h2 className="mt-16 text-3xl font-semibold text-primary">{servicesTitle}</h2>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="h-full">
                <Badge variant="primary">Service</Badge>
                <h3 className="mt-3 text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
```

**Step 3: Create ProcessTimeline**

Create `src/components/sections/ProcessTimeline.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type ProcessTimelineProps = {
  title: string;
  steps: { title: string; description: string }[];
};

export default function ProcessTimeline({ title, steps }: ProcessTimelineProps) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-primary">{title}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

**Step 4: Assemble Formations page**

Create `src/app/[locale]/formations/page.tsx`:

```tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import FormationsHero from "@/components/sections/FormationsHero";
import FormationsList from "@/components/sections/FormationsList";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTASection from "@/components/sections/CTASection";

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <FormationsHero
        title={dict.formations.hero_title}
        subtitle={dict.formations.hero_subtitle}
      />
      <FormationsList
        formationsTitle={dict.formations.formations_title}
        servicesTitle={dict.formations.services_title}
        items={dict.services.items}
      />
      <ProcessTimeline
        title={dict.formations.process_title}
        steps={dict.formations.process_steps}
      />
      <CTASection
        cta={{
          title: dict.formations.cta,
          subtitle: "",
          button: dict.formations.cta,
        }}
        locale={locale as Locale}
      />
    </>
  );
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: `/fr/formations` and `/en/formations` generated.

**Step 6: Commit**

```bash
git add src/components/sections/FormationsHero.tsx src/components/sections/FormationsList.tsx src/components/sections/ProcessTimeline.tsx src/app/[locale]/formations/
git commit -m "feat: build Formations page — Hero, FormationsList, ProcessTimeline sections"
```

---

## Task 12: Build Contact page (Formspree + Calendly)

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/forms/ContactForm.tsx`
- Create: `src/components/sections/CalendlyEmbed.tsx`
- Create: `tests/components/forms/ContactForm.test.tsx`

**Step 1: Write ContactForm test**

Create `tests/components/forms/ContactForm.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/forms/ContactForm";

const formDict = {
  name: "Nom complet",
  email: "Email professionnel",
  company: "Entreprise",
  subject: "Objet",
  subject_options: ["Formation", "Projet IA", "Conseil", "Autre"],
  message: "Votre message",
  submit: "Envoyer",
  success: "Message envoyé !",
  error: "Erreur lors de l'envoi.",
};

// Mock @formspree/react
jest.mock("@formspree/react", () => ({
  useForm: () => [{ succeeded: false, submitting: false, errors: [] }, jest.fn()],
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm form={formDict} />);
    expect(screen.getByLabelText("Nom complet")).toBeInTheDocument();
    expect(screen.getByLabelText("Email professionnel")).toBeInTheDocument();
    expect(screen.getByLabelText("Entreprise")).toBeInTheDocument();
    expect(screen.getByLabelText("Objet")).toBeInTheDocument();
    expect(screen.getByLabelText("Votre message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/components/forms/ContactForm.test.tsx`
Expected: FAIL.

**Step 3: Create ContactForm component**

Create `src/components/forms/ContactForm.tsx`:

```tsx
"use client";

import { useForm } from "@formspree/react";

type FormDict = {
  name: string;
  email: string;
  company: string;
  subject: string;
  subject_options: string[];
  message: string;
  submit: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  form: FormDict;
};

export function ContactForm({ form }: ContactFormProps) {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID || "xplaceholder"
  );

  if (state.succeeded) {
    return (
      <div className="rounded-xl bg-accent/10 p-8 text-center">
        <p className="text-lg font-medium text-accent">{form.success}</p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-text">
          {form.name}
        </label>
        <input id="name" name="name" type="text" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-text">
          {form.email}
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-text">
          {form.company}
        </label>
        <input id="company" name="company" type="text" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-text">
          {form.subject}
        </label>
        <select id="subject" name="subject" required className={inputClasses}>
          <option value="">--</option>
          {form.subject_options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-text">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>
      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-500">{form.error}</p>
      )}
      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-50"
      >
        {state.submitting ? "..." : form.submit}
      </button>
    </form>
  );
}
```

**Step 4: Run test**

Run: `npm test -- tests/components/forms/ContactForm.test.tsx`
Expected: PASS.

**Step 5: Create Calendly embed**

Create `src/components/sections/CalendlyEmbed.tsx`:

```tsx
"use client";

import { Container } from "@/components/ui/Container";

type CalendlyEmbedProps = {
  title: string;
};

export default function CalendlyEmbed({ title }: CalendlyEmbedProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/leadmind-ai/30min";

  return (
    <section className="bg-surface py-16">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold text-primary">
          {title}
        </h2>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="630"
            frameBorder="0"
            title="Calendly"
          />
        </div>
      </Container>
    </section>
  );
}
```

**Step 6: Assemble Contact page**

Create `src/app/[locale]/contact/page.tsx`:

```tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import CalendlyEmbed from "@/components/sections/CalendlyEmbed";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold text-primary">
              {dict.contact.title}
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              {dict.contact.subtitle}
            </p>
            <div className="mt-8">
              <ContactForm form={dict.contact.form} />
            </div>
          </div>
        </Container>
      </section>
      <CalendlyEmbed title={dict.contact.calendly_title} />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Email</h3>
                <p className="mt-1 text-text">{dict.contact.info.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">LinkedIn</h3>
                <p className="mt-1 text-text">{dict.contact.info.linkedin}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Location</h3>
                <p className="mt-1 text-text">{dict.contact.info.location}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
```

**Step 7: Update .env.example with new vars**

Add to `.env.example`:
```
NEXT_PUBLIC_FORMSPREE_ID=xplaceholder
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/leadmind-ai/30min
```

**Step 8: Verify build**

Run: `npm run build`
Expected: All pages generated.

**Step 9: Commit**

```bash
git add src/components/forms/ src/components/sections/CalendlyEmbed.tsx src/app/[locale]/contact/ tests/components/forms/ .env.example
git commit -m "feat: build Contact page — ContactForm (Formspree), CalendlyEmbed, contact info"
```

---

## Task 13: Add SEO metadata and JSON-LD

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (add per-locale metadata)
- Modify: `src/app/[locale]/page.tsx` (add generateMetadata)
- Modify: `src/app/[locale]/a-propos/page.tsx` (add generateMetadata)
- Modify: `src/app/[locale]/formations/page.tsx` (add generateMetadata)
- Modify: `src/app/[locale]/contact/page.tsx` (add generateMetadata)
- Create: `src/lib/metadata.ts`

**Step 1: Create metadata helper**

Create `src/lib/metadata.ts`:

```ts
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leadmind-ai.com";

type MetadataInput = {
  title: string;
  description: string;
  locale: Locale;
  path: string;
};

export function createMetadata({ title, description, locale, path }: MetadataInput): Metadata {
  const url = `${siteUrl}/${locale}${path}`;
  const otherLocale = locale === "fr" ? "en" : "fr";

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
      alternateLocale: otherLocale === "fr" ? "fr_FR" : "en_US",
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
    description: "Conseil & Formation IA pour l'Assurance et la Finance",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
  };
}
```

**Step 2: Add generateMetadata to each page**

Add `generateMetadata` export to each page file. For example, in `src/app/[locale]/page.tsx`, add before the default export:

```ts
import { createMetadata, organizationJsonLd } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.hero.title}`,
    description: dict.hero.subtitle,
    locale: locale as Locale,
    path: "",
  });
}
```

And add JSON-LD script to the home page JSX:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
/>
```

Similarly add `generateMetadata` to about, formations, and contact pages with appropriate titles/descriptions.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/lib/metadata.ts src/app/
git commit -m "feat: add SEO metadata, Open Graph, hreflang, and JSON-LD structured data"
```

---

## Task 14: Final integration test and cleanup

**Files:**
- Run all tests
- Run build
- Run lint
- Clean up any unused default files

**Step 1: Remove unused default files**

Delete any unused Next.js default assets:
- `public/next.svg`
- `public/vercel.svg`
- `public/file.svg`
- `public/globe.svg`
- `public/window.svg`

**Step 2: Run lint**

Run: `npm run lint`
Expected: No errors.

**Step 3: Run all tests**

Run: `npm test`
Expected: All tests pass.

**Step 4: Run full build**

Run: `npm run build`
Expected: Build succeeds with all 8 pages generated (4 FR + 4 EN).

**Step 5: Visual check**

Run: `npm run dev`
Check in browser:
- `http://localhost:3000` → redirects to `/fr`
- `/fr` — Home page with all sections
- `/fr/a-propos` — About page
- `/fr/formations` — Formations page
- `/fr/contact` — Contact form + Calendly
- `/en` — English versions of all pages
- Language switcher works
- Mobile nav works

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: final cleanup, remove unused defaults, verify all pages"
```

---

## Summary

| Task | Description | Estimated Steps |
|------|-------------|-----------------|
| 1 | Dependencies + Tailwind tokens + Analytics | 8 |
| 2 | Jest testing infrastructure | 5 |
| 3 | I18n (middleware + dictionaries) | 6 |
| **4** | **Stitch UI mockups (4 pages desktop + 1 mobile)** | **9** |
| 5 | UI components (Button, Card, Container, Badge) | 6 |
| 6 | Framer Motion animation utilities | 4 |
| 7 | Header + Footer layout | 6 |
| 8 | Locale layout + root redirect | 5 |
| 9 | Home page (5 sections) | 11 |
| 10 | About page (4 sections) | 4 |
| 11 | Formations page (3 sections) | 6 |
| 12 | Contact page (Formspree + Calendly) | 9 |
| 13 | SEO metadata + JSON-LD | 4 |
| 14 | Final integration + cleanup | 6 |
| **Total** | | **89 steps** |
