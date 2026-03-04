# site-internet

## Description
Site vitrine entreprise — Next.js, Tailwind CSS, déployé sur Vercel.

## Tech Stack
- **Framework** : Next.js (App Router, TypeScript)
- **Styling** : Tailwind CSS
- **Base de données** : Aucune
- **Auth** : Aucune
- **Hébergement** : Vercel

## Règles de développement

### Code
- TypeScript strict (`strict: true` dans tsconfig.json)
- JAMAIS modifier les fichiers de test directement
- Conventions de nommage : kebab-case fichiers, PascalCase composants, camelCase fonctions
- JAMAIS de `any` sauf approbation explicite

### Git
- Format commits : `type(scope): description`
- Types : feat, fix, refactor, test, docs, chore, style, perf
- Git worktrees pour le travail parallèle

### Tests
- TDD : tests d'abord, puis implémentation
- Couverture minimum : 80%
- Framework : Jest + React Testing Library

### Agents disponibles
- **orchestrator** — Pilote le cycle de dev
- **code-reviewer** — Revue qualité + conformité
- **testing-engineer** — Tests unitaires, intégration, E2E
- **frontend-designer** — Design éditorial, animations
- **performance-optimizer** — Core Web Vitals, bundle size
- **security-reviewer** — OWASP, vulnérabilités

### Skills à utiliser
- `brainstorming` — Avant toute nouvelle feature
- `specs-writing` — Design doc vers PRD + user stories
- `writing-plans` — Pour planifier l'implémentation
- `test-driven-development` — Pour coder
- `stitch-designer` — Pour le design UI/UX
- `verification-before-completion` — Avant de déclarer terminé
- `auto-documentation` — Pour la documentation

### Commandes utiles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run lint         # Linter ESLint
npm run test         # Tests (à configurer)
```
