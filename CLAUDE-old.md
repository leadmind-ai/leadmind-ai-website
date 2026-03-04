# LeadMind AI — Site Vitrine

> Cabinet specialise en formation et solutions IA pour l'assurance et la finance

## Projet

- **Nom** : LeadMind AI Website (site-internet)
- **Objectif** : Site vitrine professionnel positionnant LeadMind AI comme expert technique IA avec connaissance metier assurance/finance
- **Cible** : Directeurs Actuariat, CDO, DSI, Responsables Formation (B2B secteur financier)
- **Branche** : `develop`
- **Hebergement** : Vercel

## Stack technique

| Composant | Choix |
|-----------|-------|
| Framework | Next.js 16 (App Router, SSG) |
| Langage | TypeScript strict |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Formulaire | Formspree (`@formspree/react`) |
| SEO | next-sitemap, JSON-LD |
| Analytics | Vercel Analytics |
| I18n | Middleware + dictionnaires JSON (FR/EN) |
| Tests | Jest + Testing Library |
| Linting | ESLint 9 (flat config) |

## Structure du projet

```
src/
├── app/
│   ├── [locale]/              # "fr" ou "en"
│   │   ├── layout.tsx         # Layout avec nav + footer + locale context
│   │   ├── page.tsx           # Accueil
│   │   ├── a-propos/page.tsx  # A propos
│   │   ├── formations/page.tsx # Formations & Services
│   │   └── contact/page.tsx   # Contact + Formspree + Calendly
│   ├── layout.tsx             # Root layout (html, fonts, metadata)
│   ├── globals.css            # Styles globaux Tailwind
│   └── page.tsx               # Redirect "/" → "/fr"
├── components/
│   ├── layout/                # Header, Footer
│   ├── sections/              # Hero, Services, About, Testimonials, etc.
│   ├── ui/                    # Button, Card, Container, Badge
│   └── forms/                 # ContactForm
├── dictionaries/              # fr.json, en.json
├── lib/
│   ├── i18n.ts                # Locales, getDictionary()
│   └── metadata.ts            # SEO metadata helpers
└── middleware.ts               # Detection locale + redirect
```

## Commandes

| Commande | Usage |
|----------|-------|
| `npm run dev` | Serveur de dev local |
| `npm run build` | Build production (SSG) |
| `npm run start` | Serveur production local |
| `npm run lint` | ESLint |
| `npm test` | Jest |

## I18n

- Locales supportees : `fr` (defaut), `en`
- Middleware detecte la locale via `Accept-Language` et redirige
- Dictionnaires : `src/dictionaries/fr.json` et `src/dictionaries/en.json`
- Helper : `getDictionary(locale)` dans `src/lib/i18n.ts`
- Pas de librairie externe (contenu limite a 4 pages)

## Architecture des modeles

| Couche | Modele | Role |
|--------|--------|------|
| Slash commands (orchestrateurs) | `claude-opus-4-6` | Orchestration, checkpoints, decisions |
| prime_planner (lecture codebase) | `sonnet[1m]` | Compression contexte 1M tokens → plan compact |
| Agents `.claude/agents/` | `sonnet` | Execution autonome (workers) |
| Builders dev (database, backend, frontend) | `sonnet` | Implementation par feature slice |

## Commandes slash disponibles

| Commande | Role | Skill invoque |
|----------|------|---------------|
| `/chef-de-projet` | Pipeline complet : brainstorming → rules → specs → plan | `chef-de-projet` |
| `/brainstorm` | Idee → design doc valide | `brainstorm` |
| `/specs-writing` | Design doc → PRD + user stories + features.json | `specs-writing` |
| `/write-plan` | Specs → plan d'implementation TDD | `write-plan` |
| `/architecte` | Architecture technique (2 agents paralleles : API + Data) | `architecte` |
| `/designer` | Pipeline UI/UX : Stitch MCP (maquettes) + design specialist | `designer` |
| `/developpeur` | Implementation par feature slices (Agent Teams) | `developpeur` |
| `/testeur-qa` | Tests QA paralleles (Agent Teams + Playwright) | `testeur-qa` |
| `/devops` | Docker, CI/CD, audit securite, release | `devops` |
| `/bug-fix` | Diagnostic → correction ciblee → re-test QA | `bug-fix` |
| `/feedback-loop` | Analyse frictions → regles actionnables | `feedback-loop` |
| `/env-setup` | Installation et configuration de l'environnement | `env-setup` |

## Agents disponibles

| Agent | Role | Modele |
|-------|------|--------|
| `chef-de-projet-worker` | Generation autonome specs/plan | sonnet |
| `api-architect` | Design API REST, auth, OpenAPI | sonnet |
| `database-specialist` | Schema BDD, migrations, ORM | sonnet |
| `browser-qa-agent` | Tests user stories via Playwright | sonnet |
| `devops-engineer` | Dockerfile, CI/CD, infrastructure | sonnet |
| `security-reviewer` | Audit OWASP, rapport severite | sonnet |
| `frontend-design-specialist` | Design frontend anti-slop, esthetique editoriale | sonnet |

## MCP configures

| MCP | Usage |
|-----|-------|
| Context7 | Documentation librairies a jour |
| MCP Tool Search | Chargement on-demand des outils (`ENABLE_TOOL_SEARCH=true`) |
| Perplexity | Recherche web avancee |

## Conventions

### Structure des fichiers

- Skills regroupes par role : `.claude/skills/{role}/`
- Rules auto-chargees dans `.claude/rules/`
- Hooks quality gates dans `.claude/hooks/`

### Cycle de developpement

```
/chef-de-projet → /architecte → /designer → /developpeur (N slices) → /testeur-qa → /devops
```

Le developpeur fonctionne par **feature slices** iteratifs :
```
/developpeur "Slice Hero"       → commit → v1
/testeur-qa  "Slice Hero"       → rapport QA
/developpeur "Slice Contact"    → commit → v2
/testeur-qa  "Slice Contact"    → rapport QA (+ regression)
...
/devops                          → CI/CD, securite
```

### Regles d'equipe (auto-chargees)

- **file-ownership** : Un fichier = un agent. Propriete declaree dans chaque tache.
- **quality-gates** : Tests verts avant completion. TDD obligatoire. Verification avant declaration. Fix → re-test obligatoire.
- **team-coordination** : Claiming lowest-ID first. Message au lead apres completion.
- **builder-discipline** : Comparaison Stitch, nettoyage cross-fichier.

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
- **TDD** : Red-Green-Refactor strict (enforce par quality-gates)
- **Contract-first** : le lead verifie chaque contrat avant forward (HARD-GATE)
- **EXTEND not RECREATE** : les builders etendent le code existant, ne le recrivent jamais
- **Evidence before claims** : verification systematique avant toute affirmation de succes
- **AskUserQuestion** : toute validation passe par le tool, jamais en texte libre

## Regles de production

### Code propre
- **Nettoyer les TODO et les mocks quand la feature referencee est implementee.**
- **Alias `@/*`** pointe vers `./src/*` — toujours utiliser `@/` pour les imports internes.

### SEO & Performance
- **SSG par defaut.** Pas de `use client` sauf pour les composants interactifs (formulaires, animations).
- **Images optimisees.** Utiliser `next/image` avec `width`/`height` explicites.
- **Metadata sur chaque page.** Titre, description, Open Graph pour chaque route.

### I18n
- **Tout texte visible dans les dictionnaires JSON**, jamais hardcode dans les composants.
- **Cles de dictionnaire identiques** entre `fr.json` et `en.json` — pas de cle manquante.

## Documents de reference

| Fichier | Contenu |
|---------|---------|
| `docs/plans/2026-02-15-site-vitrine-design.md` | Design doc valide — architecture, pages, composants |
| `docs/plans/2026-02-15-site-vitrine-implementation.md` | Plan d'implementation |
| `docs/PRD.md` | Product Requirements Document |
| `docs/features.json` | Feature tracker |
| `docs/architecture.md` | Architecture technique |
| `docs/design/stitch-screens.md` | Maquettes UI Stitch |
