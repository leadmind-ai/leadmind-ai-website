# Adaptation Site LeadMind AI — Style URLab + Nouvelle Offre

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapter le site LeadMind AI en s'inspirant du site URLab (structure, placement des boutons, typographie, parcours utilisateur) et intégrer le catalogue complet issu de `strategie-offre-leadmind-ai.md` (21 formations, 7 modules IA, 4 accompagnements, grille tarifaire transparente).

**Architecture:** Restructuration du site en 6 pages principales (Home, Solutions, Formations, Pricing, About, Contact) inspirées de la navigation URLab. Refonte du design system (typographie, boutons, CTA patterns) pour un style plus épuré et professionnel. Le contenu des dictionnaires FR/EN est enrichi avec le nouveau catalogue.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, TypeScript strict. Pas de nouvelle dépendance.

---

## Analyse des écarts LeadMind vs URLab

| Aspect | LeadMind (actuel) | URLab (cible) | Action |
|--------|-------------------|---------------|--------|
| **Navigation** | Home, À propos, Formations & Services, Contact | Home, Features, Pricing, Blog, About, Contact | Réorganiser en 6 pages |
| **Hero CTA** | 2 boutons (cta gradient + ghost) alignés gauche | 1 bouton proéminent "Request a Demo" centré | Centrer hero, 1 CTA primaire proéminent |
| **Pain points** | ProblemSolution (2 cartes gauche/droite) | 3 pain points avec icônes numérotées | Refactorer en 3 colonnes numérotées |
| **Processus** | ProcessTimeline (4 étapes dans Formations) | 3 phases numérotées (01, 02, 03) sur homepage | Ajouter processus numéroté sur homepage |
| **Use cases** | 6 services dans grille | 6 use cases en grille avec descriptions | Adapter la grille use cases |
| **CTA final** | Carte claire fond blanc avec gradient | Section sombre avec CTA centré | Refaire CTA section style URLab |
| **Pricing** | Aucune page dédiée | Page dédiée SaaS/BYOC | Créer page Pricing |
| **Typographie** | Inter (sans) + JetBrains Mono | Plus épurée, titres plus grands | Ajuster l'échelle typo |
| **Boutons** | 4 variantes (primary teal, secondary blue, ghost, cta gradient) | Style simple, un bouton primaire noir/blanc + outline | Simplifier les variantes |
| **Offre** | 6 services | 21 formations + 7 modules + 4 accompagnements | Enrichir le catalogue |

---

## File Structure

### Fichiers à créer

| Fichier | Responsabilité |
|---------|---------------|
| `src/app/[locale]/solutions/page.tsx` | Nouvelle page Solutions (modules IA + accompagnement) |
| `src/app/[locale]/tarifs/page.tsx` | Nouvelle page Tarifs (grille tarifaire transparente) |
| `src/components/sections/PainPoints.tsx` | Remplace ProblemSolution — 3 colonnes numérotées style URLab |
| `src/components/sections/ProcessPhases.tsx` | 3 phases numérotées (01, 02, 03) style URLab |
| `src/components/sections/UseCases.tsx` | Grille de cas d'usage style URLab |
| `src/components/sections/FormationsCatalog.tsx` | Catalogue complet des 21 formations |
| `src/components/sections/ModulesIA.tsx` | Grille des 7 modules IA sur mesure |
| `src/components/sections/Accompagnement.tsx` | 4 offres d'accompagnement |
| `src/components/sections/PricingGrid.tsx` | Grille tarifaire transparente |

### Fichiers à modifier

| Fichier | Modification |
|---------|-------------|
| `src/app/globals.css` | Nouveaux tokens typo, variantes bouton, couleurs CTA |
| `src/components/ui/Button.tsx` | Simplifier variantes (primary dark, outline, ghost) |
| `src/components/layout/Header.tsx` | Navigation 6 items, CTA "Demander une démo" |
| `src/components/layout/Footer.tsx` | Restructurer colonnes, liens vers nouvelles pages |
| `src/components/sections/Hero.tsx` | Centrer, 1 CTA proéminent, titre plus grand |
| `src/components/sections/CTASection.tsx` | Fond sombre, style URLab |
| `src/components/sections/PersonaSection.tsx` | Adapter aux nouveaux secteurs cibles |
| `src/app/[locale]/page.tsx` | Nouvelle structure homepage |
| `src/app/[locale]/formations/page.tsx` | Pointer vers le catalogue complet |
| `src/dictionaries/fr.json` | Enrichir avec tout le catalogue |
| `src/dictionaries/en.json` | Enrichir version anglaise |
| `src/lib/metadata.ts` | Metadata pour nouvelles pages |

### Fichiers à supprimer

| Fichier | Raison |
|---------|--------|
| `src/components/sections/ProblemSolution.tsx` | Remplacé par PainPoints.tsx |
| `src/components/sections/FormationsList.tsx` | Remplacé par FormationsCatalog.tsx |
| `src/components/sections/ContactHero.tsx` | Code mort (importé jamais utilisé) |

---

## Task 1: Refonte du Design System — Typographie & Boutons

**Files:**
- Modify: `src/app/globals.css:1-48` (tokens)
- Modify: `src/components/ui/Button.tsx:1-43` (variantes)

**Objectif:** Aligner la typographie et les boutons sur le style URLab — plus épuré, titres plus imposants, boutons simplifiés.

- [ ] **Step 1: Mettre à jour les tokens typographiques dans globals.css**

Augmenter l'échelle des titres pour un style plus editorial. Ajouter un token pour le tagline.

```css
/* Dans @theme inline, remplacer les valeurs Typography Scale */
--text-display-large: 4rem;      /* était 3.5rem — titres hero plus imposants */
--text-display-medium: 3rem;     /* était 2.75rem */
--text-display-small: 2.25rem;   /* inchangé */
--text-headline: 1.75rem;        /* était 1.5rem */
--text-tagline: 1.25rem;         /* NOUVEAU — sous-titres hero */

--leading-display-large: 4.5rem;  /* était 4rem */
--leading-display-medium: 3.5rem; /* était 3.25rem */
--leading-headline: 2.25rem;      /* était 2rem */
--leading-tagline: 1.75rem;       /* NOUVEAU */
```

- [ ] **Step 2: Ajouter de nouvelles couleurs CTA dans globals.css**

```css
/* Dans @theme inline, ajouter après --color-purple */
--color-cta-dark: #0f172a;        /* Fond bouton principal sombre */
--color-cta-dark-hover: #1e293b;  /* Hover bouton principal */
--color-surface-cta: #111827;     /* Fond section CTA finale */
```

- [ ] **Step 3: Simplifier les variantes du Button**

Modifier `src/components/ui/Button.tsx` — passer de 4 variantes à 3 variantes inspirées URLab :

```tsx
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "lg";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const sizes = {
    default: "rounded-lg px-6 py-3 text-base",
    lg: "rounded-xl px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-sm",
    outline:
      "border border-surface-elevated text-on-surface hover:bg-surface-elevated/50",
    ghost: "text-on-surface-muted hover:text-on-surface hover:bg-white/[0.06]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

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

- [ ] **Step 4: Vérifier que le build passe**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/revue-urlab && npm run build 2>&1 | tail -20`

Les erreurs de compilation attendues concernent les usages de `variant="cta"` et `variant="secondary"` dans d'autres composants — on les corrigera dans les tâches suivantes.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/ui/Button.tsx
git commit -m "refactor(design): simplify button variants and update typography scale for URLab style"
```

---

## Task 2: Refonte du Header — Navigation 6 pages + CTA proéminent

**Files:**
- Modify: `src/components/layout/Header.tsx:1-129`

**Objectif:** Passer à une navigation 6 items (Accueil, Solutions, Formations, Tarifs, À propos, Contact) avec un CTA "Demander une démo" proéminent, style URLab.

- [ ] **Step 1: Ajouter les clés de navigation dans le type NavDict**

```tsx
type NavDict = {
  home: string;
  solutions: string;
  formations: string;
  pricing: string;
  about: string;
  contact: string;
  cta: string;
};
```

- [ ] **Step 2: Mettre à jour les liens de navigation**

```tsx
const links = [
  { label: nav.solutions, href: `/${locale}/solutions` },
  { label: nav.formations, href: `/${locale}/formations` },
  { label: nav.pricing, href: `/${locale}/tarifs` },
  { label: nav.about, href: `/${locale}/a-propos` },
  { label: nav.contact, href: `/${locale}/contact` },
];
```

- [ ] **Step 3: Réduire la hauteur du header et améliorer le CTA**

Passer de `h-[104px]` à `h-[72px]`, réduire la taille du logo, et rendre le bouton CTA plus visible (variante `primary` au lieu de `primary` teal — maintenant bleu accent).

```tsx
<div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 md:px-8">
  <Link href={`/${locale}`} className="flex items-center">
    <Image
      src="/images/logo-dark.png"
      alt="LeadMind AI"
      width={800}
      height={447}
      priority
      className="h-14 w-auto sm:h-16"
    />
  </Link>
  {/* ... */}
  <Button href={`/${locale}/contact`} variant="primary">
    {nav.cta}
  </Button>
</div>
```

- [ ] **Step 4: Ajouter `aria-expanded` au hamburger mobile (fix audit P2 #15)**

```tsx
<button
  className="md:hidden"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Menu"
  aria-expanded={mobileOpen}
>
```

- [ ] **Step 5: Mettre à jour le padding du main dans le layout**

Modifier `src/app/[locale]/layout.tsx` : changer `pt-[104px]` en `pt-[72px]` pour compenser le nouveau header.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.tsx src/app/[locale]/layout.tsx
git commit -m "refactor(header): 6-page navigation, reduced height, prominent CTA button"
```

---

## Task 3: Refonte du Hero — Centré, 1 CTA proéminent, titre plus grand

**Files:**
- Modify: `src/components/sections/Hero.tsx:1-48`

**Objectif:** Passer d'un hero aligné gauche avec 2 CTAs à un hero centré avec 1 CTA proéminent — inspiré URLab.

- [ ] **Step 1: Refactorer le Hero**

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
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Radial glow — centered */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[140px]" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="gradient-hero-text text-[2.5rem] font-normal leading-[1.1] tracking-tight md:text-[3.25rem] lg:text-[4rem]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-on-surface-muted md:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {hero.cta_primary}
            </Button>
            <Button href={`/${locale}/solutions`} variant="outline">
              {hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "refactor(hero): center layout, prominent CTA, larger title — URLab style"
```

---

## Task 4: Nouveau composant PainPoints — 3 colonnes numérotées

**Files:**
- Create: `src/components/sections/PainPoints.tsx`
- Delete: `src/components/sections/ProblemSolution.tsx`

**Objectif:** Remplacer la section ProblemSolution par 3 pain points numérotés (01, 02, 03) en colonnes, style URLab.

- [ ] **Step 1: Créer PainPoints.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type PainPointsProps = {
  painPoints: {
    headline: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
};

export default function PainPoints({ painPoints }: PainPointsProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="mx-auto max-w-3xl text-center text-2xl font-normal leading-snug text-on-surface md:text-3xl">
            {painPoints.headline}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-3">
          {painPoints.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group">
                <span className="text-5xl font-light text-accent/30">
                  {item.number}
                </span>
                <h3 className="mt-4 text-lg font-medium text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Supprimer ProblemSolution.tsx**

```bash
rm src/components/sections/ProblemSolution.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PainPoints.tsx
git rm src/components/sections/ProblemSolution.tsx
git commit -m "feat(homepage): replace ProblemSolution with numbered PainPoints — URLab style"
```

---

## Task 5: Nouveau composant ProcessPhases — 3 phases numérotées

**Files:**
- Create: `src/components/sections/ProcessPhases.tsx`

**Objectif:** Section 3 phases numérotées (01 Master your data → 01 Diagnostic, 02 Solutions, 03 Transformation) sur la homepage — comme URLab.

- [ ] **Step 1: Créer ProcessPhases.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ProcessPhasesProps = {
  phases: {
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
};

export default function ProcessPhases({ phases }: ProcessPhasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-center text-2xl font-normal text-on-surface md:text-3xl">
            {phases.title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-3">
          {phases.items.map((phase, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-8">
                <span className="text-sm font-semibold tracking-wider text-accent">
                  {phase.number}
                </span>
                <h3 className="mt-3 text-xl font-medium text-on-surface">
                  {phase.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-muted">
                  {phase.description}
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

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ProcessPhases.tsx
git commit -m "feat(homepage): add ProcessPhases component — 3 numbered phases URLab style"
```

---

## Task 6: Nouveau composant UseCases — Grille de cas d'usage

**Files:**
- Create: `src/components/sections/UseCases.tsx`

**Objectif:** Grille de 6 cas d'usage métier (comme URLab : Life Pricing, Non-Life, Reserving...) adaptés à LeadMind.

- [ ] **Step 1: Créer UseCases.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type UseCasesProps = {
  useCases: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

export default function UseCases({ useCases }: UseCasesProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl font-normal text-on-surface md:text-3xl">
              {useCases.title}
            </h2>
            {useCases.subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-on-surface-muted">
                {useCases.subtitle}
              </p>
            )}
          </div>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6">
                <h3 className="text-base font-medium text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
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

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/UseCases.tsx
git commit -m "feat(homepage): add UseCases grid component — URLab style"
```

---

## Task 7: Refonte CTASection — Fond sombre, style URLab

**Files:**
- Modify: `src/components/sections/CTASection.tsx:1-39`

**Objectif:** Remplacer le fond clair `#f9fbfe` par un fond sombre avec accent, CTA centré — style URLab.

- [ ] **Step 1: Refactorer CTASection**

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
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <div className="rounded-2xl border border-surface-elevated bg-surface-container px-8 py-20 text-center">
            <h2 className="text-2xl font-normal text-on-surface md:text-3xl lg:text-4xl">
              {cta.title}
            </h2>
            {cta.subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-on-surface-muted">
                {cta.subtitle}
              </p>
            )}
            <div className="mt-8">
              <Button href={`/${locale}/contact`} variant="primary" size="lg">
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

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CTASection.tsx
git commit -m "refactor(cta): dark background style — URLab pattern"
```

---

## Task 8: Restructurer la Homepage — Nouveau parcours

**Files:**
- Modify: `src/app/[locale]/page.tsx:1-65`
- Modify: `src/dictionaries/fr.json` (sections pain_points, process_phases, use_cases)
- Modify: `src/dictionaries/en.json` (idem)

**Objectif:** La homepage passe de 9 sections à un parcours plus épuré inspiré URLab :
1. Hero (centré)
2. LogoBar
3. PainPoints (3 colonnes numérotées)
4. ProcessPhases (3 phases)
5. UseCases (6 cas d'usage métier)
6. CredibilityStats (fondateur)
7. Testimonials
8. FAQ
9. CTASection (fond sombre)

Le PersonaSection et ServicesOverview sont déplacés vers les pages dédiées.

- [ ] **Step 1: Ajouter les nouvelles clés dans fr.json**

Ajouter après `"problem_solution"` :

```json
"pain_points": {
  "headline": "Les meilleurs experts de l'assurance et de la finance passent des semaines à produire au lieu de décider.",
  "items": [
    {
      "number": "01",
      "title": "Le reporting réglementaire dévore vos experts",
      "description": "La production du SFCR prend 2 à 3 semaines chaque année. Copier-coller, reformulation, mise en forme — un travail fastidieux pour des actuaires surqualifiés."
    },
    {
      "number": "02",
      "title": "L'IA générique ne comprend pas vos métiers",
      "description": "ChatGPT ne connaît pas la structure d'un SFCR, ni les exigences ACPR. Il produit du texte plausible mais inexact — exactement le type d'erreur qui se sanctionne."
    },
    {
      "number": "03",
      "title": "Les budgets IA explosent, les résultats manquent",
      "description": "Les budgets IA augmentent de 430% dans le secteur, mais 80% des projets échouent en assurance. Pas par manque de technologie — par manque de compréhension métier."
    }
  ]
},
"process_phases": {
  "title": "Notre approche en 3 temps",
  "items": [
    {
      "number": "01",
      "title": "Diagnostic & Cadrage",
      "description": "Analyse de vos données, formats et contraintes. Identification des cas d'usage à fort ROI. Définition du périmètre et des critères de succès en 1 à 2 semaines."
    },
    {
      "number": "02",
      "title": "Construction & Déploiement",
      "description": "Développement de modules IA sur mesure ou formation intensive de vos équipes. Tests itératifs avec vos experts. Premiers résultats dès la semaine 4."
    },
    {
      "number": "03",
      "title": "Autonomie & Transformation",
      "description": "Vos équipes sont formées et autonomes. Support post-déploiement inclus. Mesure d'impact documentée. Élargissement progressif à d'autres processus."
    }
  ]
},
"use_cases": {
  "title": "Domaines d'application",
  "subtitle": "Notre expertise couvre l'ensemble des métiers techniques de l'assurance et de la finance.",
  "items": [
    {
      "title": "Reporting Réglementaire",
      "description": "SFCR, RSR, QRT, XBRL — automatisation de bout en bout du reporting Solvabilité 2, de l'extraction des données à la génération narrative."
    },
    {
      "title": "SCR & Capital",
      "description": "Calcul du SCR Marché automatisé, stress testing, scénarios ORSA, documentation des hypothèses générée automatiquement."
    },
    {
      "title": "ALM & Projections",
      "description": "Modélisation actif-passif, projections de flux, optimisation bilan, analyses de sensibilité et documentation des modèles internes."
    },
    {
      "title": "Portfolio Management",
      "description": "Gestion de portefeuille assistée IA : screening multi-critères, valorisation DCF, scoring ESG, rapports de gestion automatisés."
    },
    {
      "title": "Formation IA par Métier",
      "description": "21 formations spécialisées avec certification Bronze/Silver/Gold. De l'actuaire vie au dirigeant, en passant par le CFA et le développeur."
    },
    {
      "title": "Transformation & Accompagnement",
      "description": "De l'audit IA au déploiement complet, en passant par le POC rapide. Accompagnement 3 à 12 mois pour une transformation durable."
    }
  ]
}
```

- [ ] **Step 2: Ajouter les mêmes clés dans en.json**

Traduire les clés `pain_points`, `process_phases`, et `use_cases` en anglais.

- [ ] **Step 3: Mettre à jour la homepage**

```tsx
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import PainPoints from "@/components/sections/PainPoints";
import ProcessPhases from "@/components/sections/ProcessPhases";
import UseCases from "@/components/sections/UseCases";
import CredibilityStats from "@/components/sections/CredibilityStats";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

// Dans le return :
<>
  {/* JSON-LD inchangés */}
  <Hero hero={dict.hero} locale={locale as Locale} />
  <LogoBar title={dict.credibility.logos_title} logos={dict.credibility.logos} />
  <PainPoints painPoints={dict.pain_points} />
  <ProcessPhases phases={dict.process_phases} />
  <UseCases useCases={dict.use_cases} />
  <CredibilityStats credibility={dict.credibility} />
  <Testimonials testimonials={dict.testimonials} />
  <FAQ faq={dict.faq} />
  <CTASection cta={dict.cta_section} locale={locale as Locale} />
</>
```

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/page.tsx src/dictionaries/fr.json src/dictionaries/en.json
git commit -m "feat(homepage): restructure with PainPoints, ProcessPhases, UseCases — URLab flow"
```

---

## Task 9: Enrichir les dictionnaires — Catalogue complet des formations

**Files:**
- Modify: `src/dictionaries/fr.json` (section `formations`)
- Modify: `src/dictionaries/en.json` (section `formations`)

**Objectif:** Intégrer les 21 formations, 7 modules IA, et 4 offres d'accompagnement du document stratégie-offre dans les dictionnaires.

- [ ] **Step 1: Restructurer la section formations dans fr.json**

Remplacer la section `formations` par une structure enrichie :

```json
"formations": {
  "hero_title": "Formations IA par Métier",
  "hero_subtitle": "Maîtrisez Claude AI pour votre métier. Des formations pratiques, dispensées par des praticiens seniors, avec certification Bronze/Silver/Gold.",
  "tagline": "Maîtrisez Claude AI pour votre métier",

  "certifiantes_title": "Formations Certifiantes (3-6 jours)",
  "certifiantes": [
    { "title": "Actuaires Vie", "duration": "4-5 jours", "audience": "Actuaires vie, IFRS 17, Solvabilité 2, ORSA", "certification": "Bronze / Silver / Gold" },
    { "title": "Actuaires Non-Vie", "duration": "3-4 jours", "audience": "Actuaires IARD, tarification, provisionnement", "certification": "Bronze / Silver / Gold" },
    { "title": "Analystes Financiers (CFA)", "duration": "3-4 jours", "audience": "Equity research, M&A, credit analysts", "certification": "Bronze / Silver / Gold" },
    { "title": "Gestionnaires d'Actifs", "duration": "3-4 jours", "audience": "Portfolio managers, buy-side analysts", "certification": "Bronze / Silver / Gold" },
    { "title": "AI & Data Ingénieurs", "duration": "5-6 jours", "audience": "Data engineers, ML engineers, data scientists", "certification": "Bronze / Silver / Gold" },
    { "title": "Développeurs IT", "duration": "5-6 jours", "audience": "Développeurs, tech leads, architectes", "certification": "Bronze / Silver / Gold" }
  ],

  "metier_title": "Formations Métier (1-2 jours)",
  "metier": [
    { "title": "Souscripteurs Assurance", "duration": "1-2 jours", "audience": "Souscripteurs, analystes risques" },
    { "title": "Risk Managers / ORSA", "duration": "1-2 jours", "audience": "Directeurs des risques, responsables ORSA" },
    { "title": "Compliance / Contrôle Interne", "duration": "1-2 jours", "audience": "Responsables conformité, auditeurs" },
    { "title": "Commerciaux & Forces de Vente", "duration": "1-2 jours", "audience": "Commerciaux, courtiers" },
    { "title": "Gestionnaires Sinistres", "duration": "1-2 jours", "audience": "Gestionnaires, responsables indemnisation" },
    { "title": "Comptables Assurance (IFRS 17)", "duration": "1-2 jours", "audience": "Comptables, contrôleurs financiers" },
    { "title": "Contrôleurs de Gestion", "duration": "1-2 jours", "audience": "Contrôleurs, responsables reporting" },
    { "title": "Reporting Réglementaire (SFCR/QRT)", "duration": "2 jours", "audience": "Équipes reporting, actuaires réglementaires" },
    { "title": "ALM & Cash-Flow Projections", "duration": "2 jours", "audience": "Responsables ALM, actuaires financiers" },
    { "title": "Portfolio Management & IA", "duration": "1-2 jours", "audience": "Gestionnaires de portefeuille, analystes" },
    { "title": "Chatbots Métier & Dashboards", "duration": "1-2 jours", "audience": "Équipes data, responsables transformation" },
    { "title": "Conformité AI Act & DORA", "duration": "1 jour", "audience": "DPO, juridique, compliance, direction" },
    { "title": "Détection de Fraude par IA", "duration": "1-2 jours", "audience": "Équipes sinistres, compliance, audit" }
  ],

  "executive_title": "Formation Executive",
  "executive": { "title": "Dirigeants (Executive)", "duration": "1 jour", "audience": "COMEX, directeurs, chief actuaries" },

  "backoffice_title": "Formation Back-office",
  "backoffice": { "title": "Back-office / Gestion Contrats", "duration": "1 jour", "audience": "Gestionnaires de contrats, assistants techniques" },

  "custom_title": "Formation Sur-Mesure",
  "custom_text": "Votre métier n'est pas listé ? Nous concevons des formations IA adaptées à tout secteur et toute fonction.",
  "custom_cta": "Contactez-nous pour un programme sur-mesure",

  "differentiators_title": "Ce qui nous différencie",
  "differentiators": [
    { "title": "Formateurs-praticiens", "description": "Nos formateurs sont des actuaires seniors avec 15 ans d'expérience terrain. Pas des théoriciens." },
    { "title": "Expertise CFA", "description": "La certification CFA ouvre le monde de la gestion d'actifs et du portfolio management — une perspective unique." },
    { "title": "Cas d'usage concrets", "description": "Exercices pratiques sur vos propres données et processus. Du concret applicable dès le lundi suivant." },
    { "title": "Suivi post-formation", "description": "Un mois d'accompagnement inclus après la formation pour la mise en pratique." }
  ],

  "process_title": "Notre approche",
  "process_steps": [
    { "title": "Cadrage", "description": "Analyse de vos données, formats et contraintes. Définition du périmètre et des critères de succès." },
    { "title": "Construction", "description": "Développement et configuration adaptés à votre contexte. Tests itératifs avec votre équipe." },
    { "title": "Déploiement", "description": "Mise en production, formation de vos utilisateurs, documentation complète." },
    { "title": "Suivi", "description": "Support post-livraison, ajustements, accompagnement de la première campagne." }
  ],

  "target_profiles_title": "Pour qui ?",
  "target_profiles": [
    "Équipes actuarielles (vie, non-vie, santé)",
    "Départements finance et gestion d'actifs",
    "Directions des risques et conformité",
    "Cabinets de conseil en actuariat",
    "Directions générales et directions techniques",
    "Équipes IT et data"
  ],

  "cta": "Demander un devis"
}
```

- [ ] **Step 2: Traduire en anglais dans en.json**

Traduire toutes les nouvelles clés.

- [ ] **Step 3: Commit**

```bash
git add src/dictionaries/fr.json src/dictionaries/en.json
git commit -m "feat(content): add full formation catalog — 21 formations, executive, backoffice, custom"
```

---

## Task 10: Enrichir les dictionnaires — Modules IA & Accompagnement

**Files:**
- Modify: `src/dictionaries/fr.json` (sections `modules_ia`, `accompagnement`)
- Modify: `src/dictionaries/en.json` (idem)

**Objectif:** Ajouter les 7 modules IA sur mesure et les 4 offres d'accompagnement.

- [ ] **Step 1: Ajouter la section modules_ia dans fr.json**

```json
"modules_ia": {
  "title": "Modules IA Sur Mesure",
  "subtitle": "Des solutions déployées qui automatisent vos processus métier — du POC en 2 semaines au déploiement complet.",
  "items": [
    { "title": "Reporting Réglementaire", "description": "Automatisation SFCR, RSR, QRT, XBRL. Génération et validation assistées par IA.", "badge": "Offre phare" },
    { "title": "SCR & ORSA", "description": "Calculs SCR marché automatisés, stress testing, scénarios ORSA.", "badge": "" },
    { "title": "ALM & Projections Cash-Flow", "description": "Modélisation ALM flexible, projections de flux, optimisation bilan.", "badge": "" },
    { "title": "Portfolio Management Augmenté", "description": "Gestion de portefeuille assistée IA, screening, valorisation DCF, scoring ESG.", "badge": "" },
    { "title": "Chatbots Métier & Dashboards IA", "description": "Chatbots conversationnels pour data assurance, dashboards interactifs générés par IA.", "badge": "" },
    { "title": "Gestion de Sinistres", "description": "Triage automatique, estimation provisions, détection fraude, correspondances.", "badge": "" },
    { "title": "Développement d'Applications IA", "description": "Conception et développement d'applications métier avec Claude AI : outils internes, portails clients, automatisation de workflows.", "badge": "Nouveau" }
  ],
  "custom_text": "Besoin spécifique ? Nous développons des modules IA adaptés à vos processus métier. Du POC en 2 semaines au déploiement complet.",
  "custom_cta": "Décrivez-nous votre besoin"
},
"accompagnement": {
  "title": "Accompagnement",
  "subtitle": "De l'évaluation à la transformation complète.",
  "items": [
    { "title": "Audit IA", "description": "Évaluation de votre maturité IA, identification des cas d'usage prioritaires, feuille de route actionnable.", "duration": "1-2 semaines" },
    { "title": "POC rapide", "description": "Proof of concept sur un cas d'usage métier concret, livrable fonctionnel.", "duration": "2 semaines" },
    { "title": "Déploiement & Intégration", "description": "Développement complet, intégration SI, formation des équipes, mise en production.", "duration": "3-6 mois" },
    { "title": "Formation continue", "description": "Abonnement : veille IA, sessions de mise à jour, support technique continu.", "duration": "Annuel" }
  ]
}
```

- [ ] **Step 2: Traduire en anglais dans en.json**

- [ ] **Step 3: Commit**

```bash
git add src/dictionaries/fr.json src/dictionaries/en.json
git commit -m "feat(content): add 7 IA modules and 4 accompaniment offers"
```

---

## Task 11: Enrichir les dictionnaires — Navigation, Tarifs, Personas

**Files:**
- Modify: `src/dictionaries/fr.json` (sections `nav`, `pricing`, `personas`)
- Modify: `src/dictionaries/en.json` (idem)

**Objectif:** Mettre à jour la navigation, ajouter la section tarifs, et enrichir les personas avec les 6 secteurs cibles de la stratégie.

- [ ] **Step 1: Mettre à jour la navigation dans fr.json**

```json
"nav": {
  "home": "Accueil",
  "solutions": "Solutions",
  "formations": "Formations",
  "pricing": "Tarifs",
  "about": "À propos",
  "contact": "Contact",
  "cta": "Demander une démo"
}
```

- [ ] **Step 2: Ajouter la section pricing dans fr.json**

```json
"pricing": {
  "title": "Tarifs transparents",
  "subtitle": "Des prix clairs, sans surprises. Positionnés en premium justifié par notre double expertise métier + IA.",
  "formations_title": "Formations",
  "formations_grid": [
    { "label": "Formation 1 jour (Executive)", "price": "900 — 1 200 € / pers", "detail": "Initiation dirigeants, back-office" },
    { "label": "Formation 2 jours (métier)", "price": "1 800 — 2 500 € / pers", "detail": "Formations spécialisées par métier" },
    { "label": "Formation 3-5 jours (certifiante)", "price": "3 500 — 6 000 € / pers", "detail": "Certification Bronze/Silver/Gold" }
  ],
  "modules_title": "Modules IA",
  "modules_grid": [
    { "label": "POC (proof of concept)", "price": "30 000 — 80 000 €", "detail": "Résultat tangible en 2-8 semaines" },
    { "label": "Transformation complète", "price": "150 000 — 500 000 €", "detail": "Déploiement complet, 3-12 mois" }
  ],
  "note": "Tous les prix sont HT. Éligibilité CPF/OPCO en cours d'obtention (Qualiopi).",
  "cta_title": "Besoin d'un devis sur mesure ?",
  "cta_button": "Demander un devis"
}
```

- [ ] **Step 3: Mettre à jour les personas dans fr.json**

Adapter les 4 personas aux 6 secteurs cibles du document stratégie :

```json
"personas": {
  "title": "À qui s'adresse LeadMind AI",
  "subtitle": "6 secteurs cibles, une même promesse : l'IA qui comprend votre métier.",
  "items": [
    { "role": "Assurances", "pain": "Vos actuaires passent des semaines sur le reporting au lieu d'analyser les risques.", "solution": "Modules IA spécialisés (SFCR, SCR, ALM) + formations certifiantes pour vos équipes.", "cta": "Découvrir nos solutions assurance" },
    { "role": "Asset Management", "pain": "Les rapports de gestion et l'analyse de portefeuille sont chronophages et manuels.", "solution": "Agent Portfolio Management + formation CFA x IA — un positionnement unique sur le marché.", "cta": "Explorer l'offre finance" },
    { "role": "Cabinets de Conseil", "pain": "Vos clients demandent de l'IA mais vos consultants ne sont pas formés sur les cas d'usage métier.", "solution": "Formation intensive d'une journée. Vos consultants utilisent l'IA dès le lendemain sur leurs missions.", "cta": "Former mes équipes" },
    { "role": "Banque & Crédit", "pain": "Les directions des risques et l'ALM bancaire cherchent des solutions IA fiables et auditables.", "solution": "Modules ALM et conformité adaptés au contexte bancaire. Double compétence CFA + actuariat.", "cta": "Échanger sur vos enjeux" },
    { "role": "Grandes Entreprises", "pain": "La transformation digitale est lancée mais l'adoption IA stagne faute de formations adaptées.", "solution": "Programme de transformation 3-12 mois. Formation de masse + déploiement de modules IA.", "cta": "Planifier la transformation" },
    { "role": "Courtiers & Intermédiaires", "pain": "Besoin de productivité immédiate avec un ROI visible rapidement.", "solution": "Formations courtes (1-2 jours) + chatbots métier pour automatiser les tâches répétitives.", "cta": "Voir les formations courtes" }
  ]
}
```

- [ ] **Step 4: Traduire toutes les nouvelles clés en anglais**

- [ ] **Step 5: Commit**

```bash
git add src/dictionaries/fr.json src/dictionaries/en.json
git commit -m "feat(content): update nav, add pricing section, expand personas to 6 sectors"
```

---

## Task 12: Créer la page Solutions

**Files:**
- Create: `src/app/[locale]/solutions/page.tsx`
- Create: `src/components/sections/ModulesIA.tsx`
- Create: `src/components/sections/Accompagnement.tsx`

**Objectif:** Nouvelle page `/solutions` présentant les 7 modules IA + 4 offres d'accompagnement. Inspirée de la page Features d'URLab.

- [ ] **Step 1: Créer ModulesIA.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type ModulesIAProps = {
  modules: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      badge: string;
    }>;
    custom_text: string;
    custom_cta: string;
  };
  locale: string;
};

export default function ModulesIA({ modules, locale }: ModulesIAProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-2xl font-normal text-on-surface md:text-3xl">
            {modules.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted">
            {modules.subtitle}
          </p>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6">
                {item.badge && (
                  <Badge variant="accent" className="mb-3 w-fit text-xs">
                    {item.badge}
                  </Badge>
                )}
                <h3 className="text-base font-medium text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
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

- [ ] **Step 2: Créer Accompagnement.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type AccompagnementProps = {
  accompagnement: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      duration: string;
    }>;
  };
};

export default function Accompagnement({ accompagnement }: AccompagnementProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        <FadeIn>
          <h2 className="text-2xl font-normal text-on-surface md:text-3xl">
            {accompagnement.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted">
            {accompagnement.subtitle}
          </p>
        </FadeIn>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {accompagnement.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6">
                <span className="text-sm font-semibold text-accent">
                  {item.duration}
                </span>
                <h3 className="mt-3 text-base font-medium text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
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

- [ ] **Step 3: Créer la page solutions**

```tsx
// src/app/[locale]/solutions/page.tsx
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import ModulesIA from "@/components/sections/ModulesIA";
import Accompagnement from "@/components/sections/Accompagnement";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.modules_ia.title}`,
    description: dict.modules_ia.subtitle,
    locale: locale as Locale,
    path: "/solutions",
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <h1 className="gradient-hero-text text-3xl font-normal md:text-4xl lg:text-5xl">
            Solutions IA Sur Mesure
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.modules_ia.subtitle}
          </p>
        </div>
      </section>
      <ModulesIA modules={dict.modules_ia} locale={locale} />
      <Accompagnement accompagnement={dict.accompagnement} />
      <CTASection cta={dict.cta_section} locale={locale as Locale} />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/solutions/page.tsx src/components/sections/ModulesIA.tsx src/components/sections/Accompagnement.tsx
git commit -m "feat(solutions): create Solutions page with IA modules and accompaniment"
```

---

## Task 13: Créer la page Tarifs

**Files:**
- Create: `src/app/[locale]/tarifs/page.tsx`
- Create: `src/components/sections/PricingGrid.tsx`

**Objectif:** Page dédiée aux tarifs — transparente, inspirée de la page Pricing d'URLab.

- [ ] **Step 1: Créer PricingGrid.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/i18n";

type PricingGridProps = {
  pricing: {
    title: string;
    subtitle: string;
    formations_title: string;
    formations_grid: Array<{ label: string; price: string; detail: string }>;
    modules_title: string;
    modules_grid: Array<{ label: string; price: string; detail: string }>;
    note: string;
    cta_title: string;
    cta_button: string;
  };
  locale: Locale;
};

export default function PricingGrid({ pricing, locale }: PricingGridProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        {/* Formations pricing */}
        <FadeIn>
          <h2 className="text-xl font-medium text-on-surface">
            {pricing.formations_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-3">
          {pricing.formations_grid.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6 text-center">
                <p className="text-sm text-on-surface-muted">{item.label}</p>
                <p className="mt-4 text-2xl font-medium text-on-surface">
                  {item.price}
                </p>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {item.detail}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Modules pricing */}
        <FadeIn>
          <h2 className="mt-16 text-xl font-medium text-on-surface">
            {pricing.modules_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-6 md:grid-cols-2">
          {pricing.modules_grid.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="flex h-full flex-col p-6 text-center">
                <p className="text-sm text-on-surface-muted">{item.label}</p>
                <p className="mt-4 text-2xl font-medium text-on-surface">
                  {item.price}
                </p>
                <p className="mt-2 text-sm text-on-surface-muted">
                  {item.detail}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-on-surface-muted">
          {pricing.note}
        </p>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-normal text-on-surface">
            {pricing.cta_title}
          </h3>
          <div className="mt-6">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {pricing.cta_button}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Créer la page tarifs**

```tsx
// src/app/[locale]/tarifs/page.tsx
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import PricingGrid from "@/components/sections/PricingGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.pricing.title}`,
    description: dict.pricing.subtitle,
    locale: locale as Locale,
    path: "/tarifs",
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <h1 className="gradient-hero-text text-3xl font-normal md:text-4xl lg:text-5xl">
            {dict.pricing.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.pricing.subtitle}
          </p>
        </div>
      </section>
      <PricingGrid pricing={dict.pricing} locale={locale as Locale} />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/tarifs/page.tsx src/components/sections/PricingGrid.tsx
git commit -m "feat(pricing): create transparent pricing page with grid — URLab style"
```

---

## Task 14: Refonte de la page Formations — Catalogue complet

**Files:**
- Modify: `src/app/[locale]/formations/page.tsx:1-68`
- Create: `src/components/sections/FormationsCatalog.tsx`
- Delete: `src/components/sections/FormationsList.tsx`

**Objectif:** Refaire la page Formations pour présenter le catalogue complet des 21 formations (certifiantes + métier + executive + backoffice + sur-mesure).

- [ ] **Step 1: Créer FormationsCatalog.tsx**

```tsx
"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

type Formation = {
  title: string;
  duration: string;
  audience: string;
  certification?: string;
};

type FormationsCatalogProps = {
  formations: {
    certifiantes_title: string;
    certifiantes: Formation[];
    metier_title: string;
    metier: Formation[];
    executive_title: string;
    executive: Formation;
    backoffice_title: string;
    backoffice: Formation;
    custom_title: string;
    custom_text: string;
    custom_cta: string;
  };
  locale: string;
};

function FormationCard({ item }: { item: Formation }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-medium text-on-surface">{item.title}</h3>
        <span className="shrink-0 text-sm font-medium text-accent">
          {item.duration}
        </span>
      </div>
      <p className="mt-3 text-sm text-on-surface-muted">{item.audience}</p>
      {item.certification && (
        <Badge variant="accent" className="mt-3 w-fit text-xs">
          {item.certification}
        </Badge>
      )}
    </Card>
  );
}

export default function FormationsCatalog({ formations, locale }: FormationsCatalogProps) {
  return (
    <section className="py-16 md:py-[var(--spacing-section)]">
      <Container>
        {/* Certifiantes */}
        <FadeIn>
          <h2 className="text-xl font-medium text-on-surface">
            {formations.certifiantes_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {formations.certifiantes.map((item, i) => (
            <StaggerItem key={i}>
              <FormationCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Métier */}
        <FadeIn>
          <h2 className="mt-16 text-xl font-medium text-on-surface">
            {formations.metier_title}
          </h2>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {formations.metier.map((item, i) => (
            <StaggerItem key={i}>
              <FormationCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Executive + Backoffice */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="text-xl font-medium text-on-surface">
                {formations.executive_title}
              </h2>
              <div className="mt-4">
                <FormationCard item={formations.executive} />
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h2 className="text-xl font-medium text-on-surface">
                {formations.backoffice_title}
              </h2>
              <div className="mt-4">
                <FormationCard item={formations.backoffice} />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Sur-mesure */}
        <FadeIn>
          <Card className="mt-16 p-8 text-center">
            <h2 className="text-xl font-normal text-on-surface">
              {formations.custom_title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-muted">
              {formations.custom_text}
            </p>
          </Card>
        </FadeIn>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Mettre à jour la page formations**

```tsx
// src/app/[locale]/formations/page.tsx
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import FormationsCatalog from "@/components/sections/FormationsCatalog";
import Differentiators from "@/components/sections/Differentiators";
import TargetProfiles from "@/components/sections/TargetProfiles";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.formations.hero_title}`,
    description: dict.formations.hero_subtitle,
    locale: locale as Locale,
    path: "/formations",
  });
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <h1 className="gradient-hero-text text-3xl font-normal md:text-4xl lg:text-5xl">
            {dict.formations.hero_title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-muted md:text-lg">
            {dict.formations.hero_subtitle}
          </p>
        </div>
      </section>
      <FormationsCatalog formations={dict.formations} locale={locale} />
      <Differentiators
        title={dict.formations.differentiators_title}
        items={dict.formations.differentiators}
      />
      <TargetProfiles
        title={dict.formations.target_profiles_title}
        profiles={dict.formations.target_profiles}
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

- [ ] **Step 3: Supprimer FormationsList.tsx et FormationsHero.tsx**

```bash
rm src/components/sections/FormationsList.tsx
rm src/components/sections/FormationsHero.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FormationsCatalog.tsx src/app/[locale]/formations/page.tsx
git rm src/components/sections/FormationsList.tsx src/components/sections/FormationsHero.tsx
git commit -m "feat(formations): full catalog — 21 formations with certifications"
```

---

## Task 15: Refonte du Footer — Nouvelles pages + cleanup liens morts

**Files:**
- Modify: `src/components/layout/Footer.tsx:1-164`
- Modify: `src/dictionaries/fr.json` (section `footer`)
- Modify: `src/dictionaries/en.json` (section `footer`)

**Objectif:** Restructurer le footer pour pointer vers les nouvelles pages (Solutions, Formations, Tarifs) et supprimer les liens morts (Blog, Newsletter, Cas concrets).

- [ ] **Step 1: Mettre à jour la structure footer dans fr.json**

```json
"footer": {
  "brand_description": "L'IA qui parle couramment actuariat et finance. Formations certifiantes, modules IA sur mesure, accompagnement de bout en bout.",
  "columns": {
    "solutions": {
      "title": "Solutions",
      "links": [
        { "label": "Modules IA", "href": "/solutions" },
        { "label": "Formations", "href": "/formations" },
        { "label": "Tarifs", "href": "/tarifs" }
      ]
    },
    "company": {
      "title": "Entreprise",
      "links": [
        { "label": "À propos", "href": "/a-propos" },
        { "label": "Contact", "href": "/contact" },
        { "label": "FAQ", "href": "/#faq" }
      ]
    },
    "contact": {
      "title": "Contact",
      "email": "contact@leadmind-ai.com",
      "linkedin": "leadmind-ai",
      "location": "Paris, France"
    }
  },
  "copyright": "© 2026 LeadMind AI. Tous droits réservés.",
  "links": { "privacy": "Politique de confidentialité", "legal": "Mentions légales" }
}
```

- [ ] **Step 2: Refactorer Footer.tsx pour les liens structurés**

Modifier le type `FooterDict` pour accepter des liens `{ label, href }` au lieu de simples strings. Mettre à jour le rendu pour utiliser `<Link>` sur chaque lien.

- [ ] **Step 3: Traduire en anglais**

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/dictionaries/fr.json src/dictionaries/en.json
git commit -m "refactor(footer): structured links to new pages, remove dead links"
```

---

## Task 16: Mettre à jour PersonaSection pour 6 secteurs

**Files:**
- Modify: `src/components/sections/PersonaSection.tsx`

**Objectif:** Passer de 4 personas à 6 secteurs cibles (grille `md:grid-cols-2 lg:grid-cols-3`).

- [ ] **Step 1: Mettre à jour la grille**

Changer `md:grid-cols-2` en `md:grid-cols-2 lg:grid-cols-3` dans le composant.

- [ ] **Step 2: Remplacer les usages de `variant="cta"` et `variant="secondary"`**

Mettre à jour tous les boutons qui utilisaient les anciennes variantes :
- `variant="cta"` → `variant="primary"`
- `variant="secondary"` → `variant="outline"`

Rechercher dans tout le codebase :

```bash
grep -rn 'variant="cta"' src/
grep -rn 'variant="secondary"' src/
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(personas): expand to 6 sectors, fix button variant references"
```

---

## Task 17: Nettoyage et fixes audit — Code mort, a11y, SEO

**Files:**
- Delete: `src/components/sections/ContactHero.tsx` (code mort P2 #20)
- Modify: `src/components/sections/FAQ.tsx` (aria-expanded, aria-controls — P1 #3)
- Modify: `src/app/layout.tsx` (lang={locale} — P1 #2, skip to content — P1 #4)

**Objectif:** Corriger les problèmes P1 les plus critiques de l'audit.

- [ ] **Step 1: Supprimer ContactHero.tsx**

```bash
rm src/components/sections/ContactHero.tsx
```

- [ ] **Step 2: Ajouter lang={locale} au HTML en SSR**

Dans `src/app/layout.tsx`, passer la locale au `<html>` tag. Puisque le root layout ne connaît pas la locale (c'est dans `[locale]/layout.tsx`), ajouter un `data-locale` passé par le layout imbriqué ou déplacer le `<html lang>` dans le layout [locale].

L'approche recommandée : dans `src/app/[locale]/layout.tsx`, le `<html>` et `<body>` doivent être rendus ici avec `lang={locale}`, et le root `layout.tsx` ne doit plus wraper dans `<html>`.

- [ ] **Step 3: Ajouter "Skip to main content"**

Dans `src/app/[locale]/layout.tsx`, ajouter :

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
>
  Skip to main content
</a>
```

Et ajouter `id="main-content"` au `<main>`.

- [ ] **Step 4: Ajouter aria-expanded et aria-controls à la FAQ**

Dans `FAQ.tsx`, chaque item doit avoir :

```tsx
<button
  onClick={() => toggle(i)}
  aria-expanded={openIndex === i}
  aria-controls={`faq-answer-${i}`}
>
  {item.question}
</button>
<div id={`faq-answer-${i}`} role="region">
  {/* answer */}
</div>
```

- [ ] **Step 5: Commit**

```bash
git rm src/components/sections/ContactHero.tsx
git add src/app/layout.tsx src/app/[locale]/layout.tsx src/components/sections/FAQ.tsx
git commit -m "fix(a11y): lang attribute, skip-to-content, FAQ aria — P1 audit fixes"
```

---

## Task 18: Mettre à jour le sitemap et les metadata

**Files:**
- Modify: `next-sitemap.config.js` (ajouter nouvelles pages, corriger doublons hreflang — P1 #5)
- Modify: `src/lib/metadata.ts` (ajouter Twitter Cards — P1 #7)

**Objectif:** Corriger les URLs hreflang doublées dans le sitemap et ajouter les Twitter Cards.

- [ ] **Step 1: Corriger la config sitemap**

Vérifier que `siteUrl` n'inclut pas la locale dans la transformation, pour éviter `/fr/fr/a-propos`.

- [ ] **Step 2: Ajouter les Twitter Cards dans createMetadata**

```tsx
twitter: {
  card: "summary_large_image",
  title,
  description,
},
```

- [ ] **Step 3: Ajouter les nouvelles pages au generateStaticParams**

S'assurer que `/solutions` et `/tarifs` sont inclus dans le sitemap.

- [ ] **Step 4: Commit**

```bash
git add next-sitemap.config.js src/lib/metadata.ts
git commit -m "fix(seo): fix sitemap hreflang doubles, add Twitter Cards, new page routes"
```

---

## Task 19: Build final et vérification

**Files:** Aucun nouveau fichier.

**Objectif:** S'assurer que le build passe, que toutes les pages sont accessibles, et que le lint est propre.

- [ ] **Step 1: Lancer le lint**

Run: `npm run lint`

- [ ] **Step 2: Lancer le build**

Run: `npm run build`

Vérifier que toutes les pages sont générées sans erreur : `/`, `/solutions`, `/formations`, `/tarifs`, `/a-propos`, `/contact`, `/services/[slug]`, `/mentions-legales`, `/politique-confidentialite` — pour les 2 locales.

- [ ] **Step 3: Corriger les erreurs éventuelles**

Fixer tout TypeScript, import manquant, ou clé de dictionnaire absente.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "chore: fix build errors after URLab adaptation"
```

---

## Résumé des tâches

| # | Tâche | Fichiers principaux | Dépendances |
|---|-------|-------------------|-------------|
| 1 | Design System — Typo & Boutons | `globals.css`, `Button.tsx` | — |
| 2 | Header — Navigation 6 pages | `Header.tsx`, `[locale]/layout.tsx` | Task 1 |
| 3 | Hero — Centré, 1 CTA | `Hero.tsx` | Task 1 |
| 4 | PainPoints — 3 colonnes | `PainPoints.tsx` (create) | Task 1 |
| 5 | ProcessPhases — 3 phases | `ProcessPhases.tsx` (create) | Task 1 |
| 6 | UseCases — Grille | `UseCases.tsx` (create) | Task 1 |
| 7 | CTASection — Fond sombre | `CTASection.tsx` | Task 1 |
| 8 | Homepage — Restructuration | `page.tsx`, dictionnaires | Tasks 3-7 |
| 9 | Dictionnaires — Formations | `fr.json`, `en.json` | — |
| 10 | Dictionnaires — Modules & Accomp. | `fr.json`, `en.json` | — |
| 11 | Dictionnaires — Nav, Tarifs, Personas | `fr.json`, `en.json` | — |
| 12 | Page Solutions | `solutions/page.tsx`, composants | Tasks 1, 10 |
| 13 | Page Tarifs | `tarifs/page.tsx`, `PricingGrid.tsx` | Tasks 1, 11 |
| 14 | Page Formations — Catalogue | `formations/page.tsx`, `FormationsCatalog.tsx` | Tasks 1, 9 |
| 15 | Footer — Nouvelles pages | `Footer.tsx`, dictionnaires | Tasks 11, 12, 13 |
| 16 | PersonaSection — 6 secteurs | `PersonaSection.tsx` | Tasks 1, 11 |
| 17 | Nettoyage a11y & code mort | `FAQ.tsx`, layouts, suppression dead code | — |
| 18 | Sitemap & Metadata SEO | `next-sitemap.config.js`, `metadata.ts` | Tasks 12, 13 |
| 19 | Build final & vérification | — | Toutes |

## Graphe de dépendances

```
Task 1 (Design System) ──→ Tasks 2, 3, 4, 5, 6, 7
Tasks 3-7 ──→ Task 8 (Homepage)
Tasks 9, 10, 11 (Dictionnaires) ──→ Tasks 12, 13, 14, 15, 16
Tasks 12, 13, 14, 15, 16 ──→ Task 18 (SEO)
Task 17 (a11y) ──→ indépendant
Toutes ──→ Task 19 (Build final)
```

### Parallélisation possible

```
Fan-Out depuis Task 1:
  ├── Tasks 2, 3, 4, 5, 6, 7 (composants UI — parallèle)
  └── Tasks 9, 10, 11 (dictionnaires — parallèle)

Fan-In vers Task 8:
  Tasks 3+4+5+6+7 → Task 8

Fan-In vers Tasks 12, 13, 14:
  Tasks 9+10+11 → Tasks 12, 13, 14 (parallèle)

Fan-In finale:
  Tasks 8+12+13+14+15+16+17+18 → Task 19
```
