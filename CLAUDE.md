# LeadMind AI — Instructions Projet

> Ce fichier est charge automatiquement a chaque session Claude Code.
> **Prerequis :** Executer `scripts/env-setup.sh` une fois par machine.

---

## 1. Vue d'ensemble du projet

- **Nom** : LeadMind AI Website (site-internet)
- **Description** : Site vitrine positionant LeadMind AI comme expert conseil & formation IA pour l'assurance et la finance
- **Type** : Web App Frontend (SSG statique)
- **Domaine metier** : Conseil IA pour assurance/finance (B2B)
- **Cible** : Directeurs Actuariat, CDO, DSI, Responsables Formation
- **URL** : https://leadmind-ai.com
- **Hebergement** : Vercel

---

## 2. Stack technique

| Composant | Choix | Version |
|-----------|-------|---------|
| Framework | Next.js (App Router, SSG) | 16.x |
| Langage | TypeScript strict | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Formulaire | Formspree (`@formspree/react`) | 3.x |
| SEO | next-sitemap + JSON-LD | - |
| Analytics | Vercel Analytics | - |
| I18n | Middleware custom + dictionnaires JSON | FR/EN |
| Tests | Jest + React Testing Library | 30.x |
| Linting | ESLint 9 (flat config, next/core-web-vitals + next/typescript) | 9.x |
| Font | Inter (next/font/google) | - |

---

## 3. Architecture

### Structure du projet

```
src/
├── app/
│   ├── [locale]/              # Routes i18n — "fr" (defaut) ou "en"
│   │   ├── layout.tsx         # Layout : Header + main + Footer
│   │   ├── page.tsx           # Accueil (Hero, LogoBar, Services, WhyLeadMind, CTA)
│   │   ├── a-propos/page.tsx  # A propos (Founder, Mission, Values, Stats, Process)
│   │   ├── formations/page.tsx # Formations & Services
│   │   └── contact/page.tsx   # Contact (Formspree + Calendly)
│   ├── layout.tsx             # Root layout (html, font Inter, Vercel Analytics)
│   ├── globals.css            # Theme Tailwind (couleurs, font)
│   └── page.tsx               # Redirect "/" → "/fr"
├── components/
│   ├── layout/                # Header.tsx, Footer.tsx
│   ├── sections/              # Hero, LogoBar, ServicesOverview, WhyLeadMind, CTASection, etc.
│   ├── ui/                    # Button, Card, Container, Badge, Counter, FadeIn
│   └── forms/                 # ContactForm.tsx
├── dictionaries/              # fr.json, en.json — tout le contenu textuel
├── lib/
│   ├── i18n.ts                # locales, defaultLocale, getDictionary()
│   └── metadata.ts            # createMetadata(), organizationJsonLd()
└── middleware.ts               # Detection locale Accept-Language → redirect
```

### Patterns cles

- **Server Components par defaut** — seuls les composants interactifs ont `"use client"` (animations Framer Motion, formulaire, menu mobile)
- **Props typees inline** — chaque composant definit son type en `type XxxProps = {...}` au-dessus de la fonction
- **Dictionnaires comme props** — les pages fetcher le dictionnaire via `getDictionary()` et passent les sections aux composants
- **Design tokens CSS** — couleurs et font definies dans `globals.css` via `@theme inline` de Tailwind 4

### Theme de couleurs

```css
--color-primary: #1a365d       /* Bleu marine — headers, nav, backgrounds fonces */
--color-primary-light: #2c5282  /* Bleu clair — hover states */
--color-accent: #0d9488         /* Teal — CTAs, boutons, liens actifs */
--color-accent-light: #14b8a6   /* Teal clair — hover CTAs */
--color-background: #ffffff     /* Fond principal */
--color-surface: #f8fafc        /* Fond alternatif (sections) */
--color-text: #1e293b           /* Texte principal */
--color-text-muted: #64748b     /* Texte secondaire */
```

---

## 4. Conventions de code

### Nommage

- Fichiers composants : `PascalCase.tsx` (ex: `Hero.tsx`, `ContactForm.tsx`)
- Fichiers utilitaires : `camelCase.ts` (ex: `i18n.ts`, `metadata.ts`)
- Composants React : `PascalCase` — export default pour les sections, export nomme pour les ui/layout
- Types : `PascalCase` definis avec `type` (pas `interface`)
- Constantes : `camelCase` (ex: `locales`, `defaultLocale`)

### Style de code

```tsx
// Pattern composant section (Server Component sauf si interactif)
type HeroProps = {
  hero: { title: string; subtitle: string };
  locale: Locale;
};

export default function Hero({ hero, locale }: HeroProps) {
  return <section>...</section>;
}
```

```tsx
// Pattern composant UI reutilisable (export nomme)
export function Button({ children, variant = "primary", href }: ButtonProps) { ... }
```

```tsx
// Pattern animation (use client + Framer Motion)
"use client";
import { motion } from "framer-motion";
```

### Imports

- Alias `@/*` → `./src/*` — toujours utiliser `@/` pour les imports internes
- Ordre : types Next/React → libs externes → composants → lib internes

---

## 5. Commandes de developpement

| Commande | Action |
|----------|--------|
| `npm run dev` | Serveur de dev local (http://localhost:3000) |
| `npm run build` | Build production SSG |
| `npm run start` | Serveur production local |
| `npm run lint` | ESLint (core-web-vitals + typescript) |
| `npm test` | Jest + React Testing Library |

---

## 6. Regles de production

### Integrite des tests
- JAMAIS modifier les fichiers de test (`tests/`, `*.test.*`, `*.spec.*`)
- Si un test echoue → corriger l'implementation, PAS le test

### I18n
- **Tout texte visible dans les dictionnaires JSON** (`src/dictionaries/fr.json` et `en.json`), jamais hardcode dans les composants
- **Cles identiques** entre `fr.json` et `en.json` — pas de cle manquante d'un cote
- **Locale par defaut** : `fr` — le middleware redirige `/` vers `/fr`

### SSG & Performance
- **Server Components par defaut.** `"use client"` uniquement pour : animations Framer Motion, formulaires, etats interactifs (menu mobile)
- **`next/image`** avec `width`/`height` explicites pour toutes les images
- **Metadata sur chaque page** via `generateMetadata()` + `createMetadata()` helper

### SEO
- **JSON-LD** sur la page d'accueil (`organizationJsonLd()`)
- **Hreflang** genere automatiquement par `createMetadata()` (alternates fr/en)
- **Sitemap** genere au build via `next-sitemap` (config dans `next-sitemap.config.js`)

### TypeScript strict
- `strict: true` dans `tsconfig.json`
- Jamais de `any` sauf approbation explicite

### Git
- Tout travail suivi en controle de version
- Git worktrees pour agents paralleles

### Variables d'environnement
- `NEXT_PUBLIC_SITE_URL` — URL du site (defaut: `https://leadmind-ai.com`)
- `NEXT_PUBLIC_FORMSPREE_ID` — ID du formulaire Formspree

---

## 7. Configuration MCP

| MCP | Role | Usage |
|-----|------|-------|
| **Context7** | Documentation librairies a jour | Toujours verifier via Context7 avant d'utiliser une API de librairie externe. Ne PAS se fier uniquement aux donnees d'entrainement. |
| **Perplexity** | Recherche web avancee | Pour les best practices et documentation non couverte par Context7 |

### MCP Tool Search

MCP Tool Search empeche la surcharge de contexte liee aux MCP connectes.
- Configure via `ENABLE_TOOL_SEARCH=true` dans `.claude/settings.json`
- Les schemas d'outils ne sont PAS charges au demarrage — decouverte et appel on-demand

---

## 8. Hooks

| Hook | Fichier | Action |
|------|---------|--------|
| **Protection tests** | `.claude/hooks/protect-tests.sh` | Bloque les modifications de fichiers de test |
| **Protection env** | `.claude/hooks/protect-env.sh` | Bloque les modifications de `.env`, secrets, cles |
| **Task completed** | `.claude/hooks/task-completed.sh` | Verification a la completion de taches |

Codes de sortie : 0 = succes | 2 = erreur bloquante | autre = avertissement

---

## 9. Protocole de verification

Avant de marquer une feature comme terminee :
1. Executer `npm run lint` et lire le resultat
2. Executer `npm test` et verifier que tous les tests passent
3. Executer `npm run build` pour verifier le SSG
4. Si UI : verifier visuellement avec le navigateur

---

## 10. Patterns courants

### Pattern page i18n

```tsx
// src/app/[locale]/page.tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({ title: dict.hero.title, description: dict.hero.subtitle, locale: locale as Locale, path: "" });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <Section data={dict.section} locale={locale as Locale} />;
}
```

### Pattern composant avec animation

```tsx
"use client";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Section({ data }: SectionProps) {
  return (
    <section className="py-20 bg-surface">
      <Container>
        <FadeIn>
          <h2>{data.title}</h2>
        </FadeIn>
      </Container>
    </section>
  );
}
```

---

## 11. Architecture des modeles (Claude Code)

| Couche | Modele | Role |
|--------|--------|------|
| Slash commands (orchestrateurs) | `claude-opus-4-6` | Orchestration, checkpoints, decisions |
| prime_planner (lecture codebase) | `sonnet[1m]` | Compression contexte 1M tokens → plan compact |
| Agents `.claude/agents/` | `sonnet` | Execution autonome (workers) |
| Builders dev | `sonnet` | Implementation par feature slice |

---

## 12. Commandes slash disponibles

| Commande | Role |
|----------|------|
| `/chef-de-projet` | Pipeline complet : brainstorming → rules → specs → plan |
| `/brainstorm` | Idee → design doc valide |
| `/specs-writing` | Design doc → PRD + user stories + features.json |
| `/write-plan` | Specs → plan d'implementation TDD |
| `/architecte` | Architecture technique |
| `/designer` | Pipeline UI/UX |
| `/developpeur` | Implementation par feature slices |
| `/testeur-qa` | Tests QA paralleles |
| `/devops` | Docker, CI/CD, audit securite, release |
| `/bug-fix` | Diagnostic → correction ciblee → re-test QA |
| `/feedback-loop` | Analyse frictions → regles actionnables |
| `/env-setup` | Installation et configuration de l'environnement |

---

## 13. Conventions d'equipe

### Cycle de developpement
```
/chef-de-projet → /architecte → /designer → /developpeur (N slices) → /testeur-qa → /devops
```

### Regles auto-chargees (`.claude/rules/`)
- **file-ownership** : Un fichier = un agent
- **quality-gates** : Tests verts avant completion, TDD obligatoire
- **team-coordination** : Claiming lowest-ID first, message au lead apres completion
- **builder-discipline** : Comparaison maquettes, nettoyage cross-fichier

### Commits semantiques
| Role | Prefixe |
|------|---------|
| Chef de Projet, Architecte | `docs:` |
| Designer | `design:` |
| Developpeur | `feat:` |
| Testeur QA | `test:` |
| DevOps | `ci:` |

### Principes
- **Design before code** : brainstorming et specs obligatoires avant implementation
- **TDD** : Red-Green-Refactor strict
- **EXTEND not RECREATE** : etendre le code existant, jamais le reecrire
- **Evidence before claims** : verification systematique avant toute affirmation de succes

---

## 14. Documents de reference

| Fichier | Contenu |
|---------|---------|
| `docs/plans/2026-02-15-site-vitrine-design.md` | Design doc valide — architecture, pages, composants |
| `docs/plans/2026-02-15-site-vitrine-implementation.md` | Plan d'implementation |
| `docs/design/stitch-screens.md` | Maquettes UI Stitch |
| `docs/PRD.md` | Product Requirements Document |
| `docs/features.json` | Feature tracker |
| `docs/architecture.md` | Architecture technique |
