# Design Doc — Site Vitrine LeadMind AI

**Date** : 2026-02-15
**Statut** : Approuvé
**Approche** : SSG statique (Next.js App Router)

---

## Contexte

**LeadMind AI** est un cabinet spécialisé en formation et solutions IA pour les assureurs, mutuelles et institutions financières. Le site vitrine doit positionner LeadMind comme l'expert technique avec connaissance métier assurance — ni consultant IA généraliste, ni actuaire amateur en IA.

**Cible** : Directeurs Actuariat, CDO, DSI, Responsables Formation (B2B secteur financier).

---

## Architecture

### Tech Stack

| Composant | Choix |
|-----------|-------|
| Framework | Next.js 16 (App Router, SSG) |
| Langage | TypeScript strict |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Formulaire | Formspree (@formspree/react) |
| SEO | next-sitemap, JSON-LD |
| Analytics | Vercel Analytics (natif) |
| Calendrier | Calendly (embed iframe) |
| I18n | Middleware + dictionnaires JSON (FR/EN) |
| Hébergement | Vercel |

### Structure des routes

```
src/app/
├── [locale]/              # "fr" ou "en"
│   ├── layout.tsx         # Layout avec nav + footer + locale context
│   ├── page.tsx           # Accueil
│   ├── a-propos/page.tsx  # À propos
│   ├── formations/page.tsx # Formations & Services
│   └── contact/page.tsx   # Contact + Formspree + Calendly
├── layout.tsx             # Root layout (html, fonts, metadata)
└── page.tsx               # Redirect "/" → "/fr"
```

### Composants

```
src/components/
├── layout/
│   ├── Header.tsx         # Nav + logo + language switcher
│   └── Footer.tsx         # Liens, copyright, socials
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── WhyLeadMind.tsx
│   └── CTA.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   └── Badge.tsx
└── forms/
    └── ContactForm.tsx
```

### I18n

- Middleware Next.js détecte la locale du navigateur et redirige
- Dictionnaires JSON : `src/dictionaries/fr.json`, `src/dictionaries/en.json`
- Pas de librairie externe (4 pages, contenu limité)
- Hreflang alternate links sur chaque page

---

## Pages & Sections

### Accueil (`/[locale]`)

| # | Section | Contenu | Animation |
|---|---------|---------|-----------|
| 1 | Hero | Headline + sous-titre + CTA "Prendre rendez-vous" + CTA "Nos formations" | Fade-in au chargement |
| 2 | Clients/Logos | Barre de logos clients/partenaires | Défilement horizontal infini |
| 3 | Services overview | 3-4 cartes (Formation Claude Code, Agents IA, Automatisation Solva 2, Conseil) | Stagger fade-in scroll |
| 4 | Pourquoi LeadMind | 3 piliers : Expert technique + Métier assurance + Résultats mesurables | Counter animation chiffres |
| 5 | CTA final | "Prêt à transformer votre actuariat ?" + bouton Calendly | Parallax subtil |

### À propos (`/[locale]/a-propos`)

| # | Section | Contenu |
|---|---------|---------|
| 1 | Mission | Positionnement unique |
| 2 | Fondateur | Photo + bio + parcours |
| 3 | Valeurs | Expertise, Pragmatisme, Impact mesurable |
| 4 | Chiffres clés | Années exp., clients formés, projets livrés |

### Formations / Services (`/[locale]/formations`)

| # | Section | Contenu |
|---|---------|---------|
| 1 | Hero | Titre + intro catalogue |
| 2 | Formations | Cartes : titre, durée, public, programme, prix indicatif |
| 3 | Services | Cartes : agents IA, automatisation, conseil |
| 4 | Process | Timeline : Audit → Formation → Implémentation → Support |
| 5 | CTA | "Demander un devis" → Contact / Calendly |

### Contact (`/[locale]/contact`)

| # | Section | Contenu |
|---|---------|---------|
| 1 | Formulaire | Nom, email, entreprise, objet (select), message → Formspree |
| 2 | Calendly | Embed iframe réservation |
| 3 | Coordonnées | Email, LinkedIn, localisation |

---

## Design System

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| primary | #1a365d | Headers, nav, fonds sombres |
| primary-light | #2c5282 | Hover states |
| accent | #0d9488 | CTAs, liens, badges |
| accent-light | #14b8a6 | Hover CTAs |
| background | #ffffff | Fond principal |
| surface | #f8fafc | Cartes, sections alternées |
| text | #1e293b | Corps de texte |
| text-muted | #64748b | Texte secondaire |

### Typographie

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Inter | 48px (3rem) | 700 |
| H2 | Inter | 36px (2.25rem) | 600 |
| H3 | Inter | 24px (1.5rem) | 600 |
| Body | Inter | 18px (1.125rem) | 400 |
| Small | Inter | 14px (0.875rem) | 400 |

### Animations (Framer Motion)

- Page transitions : fade + slide up (200ms ease-out)
- Scroll reveal : fade-in + translate-y 20px, stagger 100ms
- Hover cards : scale 1.02 + shadow elevation
- Logo bar : CSS infinite horizontal scroll
- Counters : count-up animation on viewport entry

### Composants UI

- **Button** : Primary (teal bg, white text), Secondary (outline navy), Ghost
- **Card** : White bg, subtle border, rounded-xl, hover shadow
- **Container** : max-w-7xl centered, px-6 mobile / px-8 desktop
- **Badge** : Tag coloré pour catégoriser

---

## SEO & Performance

### SEO
- Metadata unique par page et par locale
- Open Graph image par défaut (1200x630)
- Sitemap automatique via next-sitemap
- robots.txt via next-sitemap
- JSON-LD : Organization + LocalBusiness
- Hreflang FR/EN sur chaque page

### Analytics
- Vercel Analytics (natif, inclus dans l'hébergement)

### Performance
- Images : next/image (WebP/AVIF auto)
- Fonts : next/font/google (Inter, auto-subset)
- SSG : HTML statique au build
- Bundle minimal : Framer Motion (~30kb gz) seule lib significative

---

## Dépendances additionnelles

| Package | Usage | Taille |
|---------|-------|--------|
| framer-motion | Animations | ~30kb gz |
| next-sitemap | Sitemap + robots.txt | Dev only |
| @formspree/react | Hook useForm | ~5kb |
| @vercel/analytics | Vercel Analytics | ~1kb |

---

## Hors scope (MVP)

- Blog / section ressources
- CMS headless
- Espace client / authentification
- E-commerce / paiement
- Dark mode (pourra être ajouté plus tard)
