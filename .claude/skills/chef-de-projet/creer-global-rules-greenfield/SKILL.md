---
name: creer-global-rules-greenfield
description: >-
  Crée le fichier CLAUDE.md (global rules) et les guides de référence pour un nouveau projet (greenfield).
  Se déclenche après le brainstorming quand le design doc existe avec le tech stack et les contraintes.
  Utiliser quand l'utilisateur demande de "créer les global rules", "créer le CLAUDE.md",
  "initialiser les règles du projet", ou après un brainstorming pour un nouveau projet.
  Ne PAS utiliser pour un projet existant avec du code — utiliser creer-global-rules-brownfield à la place.
---

# Créer Global Rules — Projet Greenfield

Génère le fichier `CLAUDE.md` et les guides de référence `reference/` pour un nouveau projet à partir du design doc produit lors du brainstorming.

## Prérequis

- Un design doc doit exister (output du brainstorming) contenant au minimum :
  - Description du projet et de son domaine métier
  - Tech stack choisi (ou à choisir)
  - Contraintes techniques et fonctionnelles
- Context7 MCP doit être configuré pour la recherche de documentation

## Workflow

### Phase 1 : COLLECTER les informations

1. Lire le design doc du projet (chercher dans `docs/plans/` ou demander le chemin)
2. Extraire les informations déjà disponibles :
   - Type de projet (Web App, API, CLI, etc.)
   - Tech stack (backend, frontend, BDD, tests)
   - Architecture prévue
   - Domaine métier
   - Contraintes spécifiques

3. Identifier les informations manquantes et poser des questions complémentaires :

   | Information | Question si manquante |
   |-------------|----------------------|
   | Type de projet | "Quel type de projet ? (Web App full-stack, Frontend seul, API/Backend, CLI, Librairie)" |
   | Scale/complexité | "Quelle échelle ? (simple, moyenne, enterprise)" |
   | Hébergement | "Quel hébergement prévu ? (Vercel, AWS, Docker self-hosted, autre)" |
   | Authentification | "Quel système d'auth ? (JWT, OAuth, session, aucun)" |
   | Base de données | "Quelle BDD ? (PostgreSQL, MongoDB, SQLite, aucune)" |
   | Tests | "Quelle stratégie de test ? (unitaires + intégration, E2E, les deux)" |
   | MCP spécifiques | "Des MCP spécifiques nécessaires au-delà de Context7 ?" |

   Ne poser que les questions dont la réponse n'est pas dans le design doc.

### Phase 2 : RECHERCHER les best practices

4. Pour chaque technologie du stack, rechercher la documentation à jour :
   - **D'abord** : utiliser Context7 MCP pour récupérer la doc officielle
   - **Si indisponible** : effectuer une recherche web pour les best practices 2026
   - Cibler : structure de projet recommandée, conventions de nommage, patterns de test

5. Synthétiser les findings en conventions concrètes pour le projet

### Phase 3 : GÉNÉRER le CLAUDE.md

6. Consulter le template de référence : [references/template-claude-md.md](references/template-claude-md.md)

7. Générer le fichier `CLAUDE.md` à la racine du projet en respectant :
   - **100-500 lignes maximum** — concis et pratique
   - **Spécifique, pas générique** — exemples de code réels, pas de placeholders
   - **Actionnable** — chaque règle assez claire pour être suivie immédiatement
   - **Exemples concrets** — montrer, pas juste décrire

8. Intégrer obligatoirement les sections MCP : consulter [references/sections-mcp.md](references/sections-mcp.md)
   - **Context7** : toujours inclus
   - **MCP Tool Search** : toujours inclus
   - Autres MCP : selon les besoins du projet

9. Intégrer les règles de production :
   - Intégrité des tests (jamais modifier les tests)
   - Git discipline (worktrees pour parallélisme)
   - TypeScript strict (si applicable)
   - Protocole de vérification (evidence before claims)
   - Hooks (protection tests + protection env)

### Phase 4 : GÉNÉRER les guides de référence

10. Consulter le guide de création : [references/guide-reference-creation.md](references/guide-reference-creation.md)

11. Créer les guides de référence pertinents dans `reference/` à la racine du projet :
    - Identifier les types de tâches récurrentes du projet
    - Créer un guide par type de tâche (50-200 lignes chacun)
    - Basé sur les best practices recherchées en Phase 2

    Guides typiques selon le type de projet :

    | Type de projet | Guides recommandés |
    |----------------|-------------------|
    | Web App Full-stack | `api-endpoints.md`, `react-components.md`, `database-models.md`, `testing.md` |
    | Frontend seul | `react-components.md`, `state-management.md`, `testing.md` |
    | API/Backend | `api-endpoints.md`, `database-models.md`, `authentication.md`, `testing.md` |
    | CLI | `commands.md`, `testing.md` |

### Phase 5 : VALIDER

12. Vérifier que le CLAUDE.md :
    - Contient toutes les sections obligatoires du template
    - Fait moins de 500 lignes
    - Contient des exemples de code concrets
    - Intègre les sections MCP (Context7 + MCP Tool Search minimum)
    - Intègre les hooks et le protocole de vérification

13. Vérifier que les guides de référence :
    - Font chacun entre 50 et 200 lignes
    - Sont cohérents avec le CLAUDE.md
    - Contiennent des exemples de code et une checklist

14. Présenter un résumé à l'utilisateur :

```markdown
## Global Rules créées

**Fichier** : `CLAUDE.md`

### Type de projet
{type détecté}

### Stack technique
{technologies principales}

### Guides de référence créés
- `reference/{guide1}.md` — {description}
- `reference/{guide2}.md` — {description}

### MCP configurés
- Context7 (documentation librairies)
- MCP Tool Search (chargement on-demand)
- {autres MCP si applicable}

### Prochaines étapes
1. Relire le `CLAUDE.md` généré
2. Ajuster les sections spécifiques au projet
3. Créer les documents de contexte dans `docs/` (PRD, architecture, decisions)
```

### Phase 6 : INITIALISER le dépôt Git

<IMPORTANT>
Cette phase n'est exécutée que si le projet n'est PAS déjà un dépôt git.
Vérifier avec `git rev-parse --is-inside-work-tree` avant de procéder.
</IMPORTANT>

15. Si le projet n'est pas encore un dépôt git :

    a. Initialiser le dépôt :
    ```bash
    git init
    git branch -M main
    ```

    b. Créer le `.gitignore` adapté au tech stack (Node.js, Python, etc.)

    c. Premier commit :
    ```bash
    git add CLAUDE.md reference/ .gitignore
    git commit -m "chore: initialisation projet — CLAUDE.md et guides de référence"
    ```

    d. Proposer la création du dépôt distant via `AskUserQuestion` :
    - **"Créer le dépôt GitHub et pousser" (Recommandé)** — `gh repo create` public + push
    - **"Créer le dépôt GitHub (privé)"** — `gh repo create --private` + push
    - **"Pas de dépôt distant pour l'instant"** — Rester en local

    e. Si l'utilisateur accepte :
    ```bash
    gh repo create [nom-du-projet] --source=. --push
    ```

16. Si le projet est déjà un dépôt git, committer les artefacts créés :
    ```bash
    git add CLAUDE.md reference/
    git commit -m "chore: ajout CLAUDE.md et guides de référence"
    git push
    ```

---

## Ressources

- [references/template-claude-md.md](references/template-claude-md.md) — Template structuré du CLAUDE.md
- [references/sections-mcp.md](references/sections-mcp.md) — Blocs MCP à intégrer
- [references/guide-reference-creation.md](references/guide-reference-creation.md) — Guide pour créer les documents de référence
