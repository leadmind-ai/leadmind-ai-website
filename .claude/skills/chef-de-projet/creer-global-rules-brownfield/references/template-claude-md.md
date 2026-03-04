# Template CLAUDE.md — Structure de référence

Ce template définit les sections obligatoires et optionnelles du fichier CLAUDE.md.
Adapter chaque section au projet concret. Supprimer les sections non pertinentes.

---

## Structure obligatoire

```markdown
# [Nom du Projet] — Instructions Projet

> Ce fichier est chargé automatiquement à chaque session Claude Code.
> **Prérequis :** Exécuter `env-setup.sh` une fois par machine.

---

## 1. Vue d'ensemble du projet

- **Nom** : [nom]
- **Description** : [1-2 phrases sur ce que fait le projet]
- **Type** : [Web App Full-stack | Frontend | API/Backend | CLI | Librairie | Monorepo]
- **Domaine métier** : [ex: assurance santé, e-commerce, fintech]

---

## 2. Stack technique

### Backend
- **Langage** : [ex: TypeScript 5.x]
- **Framework** : [ex: Next.js 15, Express, Fastify]
- **Base de données** : [ex: PostgreSQL 16 + Prisma ORM]
- **Tests** : [ex: Jest + Supertest]
- **Linting** : [ex: ESLint + Prettier]

### Frontend
- **Framework** : [ex: React 19, Vue 3]
- **UI** : [ex: shadcn/ui + Tailwind CSS 4]
- **State** : [ex: Zustand, Redux Toolkit]
- **Tests** : [ex: React Testing Library + Playwright]

---

## 3. Architecture

### Structure du projet
[Arborescence des dossiers principaux avec explications]

### Patterns clés
- [Pattern 1 : ex: Service Layer pour le backend]
- [Pattern 2 : ex: Composants atomiques pour le frontend]
- [Pattern 3 : ex: Repository pattern pour la BDD]

---

## 4. Conventions de code

### Nommage
- Fichiers : `kebab-case`
- Composants React : `PascalCase`
- Variables/fonctions : `camelCase`
- Constantes : `SCREAMING_SNAKE_CASE`
- Types/Interfaces : `PascalCase`

### Style de code
[Exemples concrets tirés du projet, pas des règles génériques]

### Docstrings/Commentaires
[Format attendu avec exemple]

---

## 5. Commandes de développement

| Commande | Action |
|----------|--------|
| `npm install` | Installer les dépendances |
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Build de production |
| `npm test` | Lancer les tests |
| `npm run lint` | Vérifier le linting |

---

## 6. Règles de production

### Intégrité des tests
- JAMAIS modifier les fichiers de test (`tests/`, `__tests__/`, `*.test.*`, `*.spec.*`)
- Si un test échoue → corriger l'implémentation, PAS le test

### Git
- Tout travail suivi en contrôle de version
- Git worktrees pour agents parallèles (pas de branches dans le même répertoire)
- Merge uniquement après que tous les critères passent

### TypeScript strict
- `strict: true` dans `tsconfig.json`
- Jamais de `any` sauf approbation explicite

---

## 7. Configuration MCP

| MCP | Rôle | Usage |
|-----|------|-------|
| **Context7** | Documentation librairies à jour | Toujours vérifier via Context7 avant d'utiliser une API de librairie externe. Ne PAS se fier uniquement aux données d'entraînement. |
| [Autres MCP selon le projet] | | |

### MCP Tool Search
- Activé via `ENABLE_TOOL_SEARCH=true` dans `.claude/settings.json`
- Les schemas d'outils MCP ne sont PAS chargés au démarrage — découverte on-demand
- Réduit la consommation de la fenêtre de contexte

---

## 8. Hooks

| Hook | Fichier | Action |
|------|---------|--------|
| **Protection tests** | `.claude/hooks/protect-tests.sh` | Bloque les modifications de fichiers de test |
| **Protection env** | `.claude/hooks/protect-env.sh` | Bloque les modifications de `.env`, secrets, clés |

Codes de sortie : 0 = succès | 2 = erreur bloquante | autre = avertissement

---

## 9. Protocole de vérification

Avant de marquer une feature comme terminée :
1. Exécuter les tests et lire le résultat
2. Vérifier le linting
3. Si UI : vérifier visuellement (Agent Browser > Puppeteer > terminal)

---

## 10. Patterns courants

### Pattern backend : [Exemple concret]
[Bloc de code]

### Pattern frontend : [Exemple concret]
[Bloc de code]
```

---

## Sections optionnelles (ajouter si pertinent)

- **Contrats API** : Comment les types backend/frontend doivent matcher
- **Logging** : Format structuré, quoi loguer, exemples
- **Authentification** : Pattern auth du projet
- **Base de données** : Migrations, seeding, conventions de schéma
- **CI/CD** : Pipeline, déploiement
- **Documents de contexte** : Liens vers PRD, architecture.md, decisions.md
