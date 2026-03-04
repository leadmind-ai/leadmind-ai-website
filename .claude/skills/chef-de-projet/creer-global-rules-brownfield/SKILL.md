---
name: creer-global-rules-brownfield
description: >-
  Crée le fichier CLAUDE.md (global rules) et les guides de référence pour un projet existant (brownfield)
  en analysant le codebase. Se déclenche quand l'utilisateur demande de "créer les global rules",
  "créer le CLAUDE.md", "analyser le projet pour créer les règles", ou quand on travaille sur un
  projet existant qui n'a pas encore de CLAUDE.md.
  Ne PAS utiliser pour un nouveau projet sans code — utiliser creer-global-rules-greenfield à la place.
---

# Créer Global Rules — Projet Brownfield

Génère le fichier `CLAUDE.md` et les guides de référence `reference/` pour un projet existant en analysant le codebase.

## Prérequis

- Un projet existant avec du code source
- Context7 MCP doit être configuré pour la recherche de documentation

## Workflow

### Phase 1 : DÉCOUVRIR le projet

1. Identifier le type de projet :

   | Type | Indicateurs |
   |------|-------------|
   | Web App (Full-stack) | Répertoires client/server séparés, routes API |
   | Web App (Frontend) | React/Vue/Svelte, pas de code serveur |
   | API/Backend | Express/Fastify/etc, pas de frontend |
   | Librairie/Package | `main`/`exports` dans package.json, publiable |
   | CLI | `bin` dans package.json, interface en ligne de commande |
   | Monorepo | Packages multiples, configuration workspaces |
   | Script/Automation | Scripts autonomes, orientés tâche |

2. Analyser les fichiers de configuration à la racine :

   ```
   package.json       → dépendances, scripts, type
   tsconfig.json      → configuration TypeScript
   vite.config.*      → outil de build
   *.config.js/ts     → configurations d'outils divers
   .eslintrc*         → configuration linting
   .prettierrc*       → configuration formatage
   docker*            → containerisation
   ```

3. Cartographier la structure des répertoires :
   - Où vit le code source ?
   - Où sont les tests ?
   - Code partagé ?
   - Emplacements de configuration ?

### Phase 2 : ANALYSER le codebase

4. Extraire le stack technique depuis package.json et les fichiers de config :
   - Runtime/Langage (Node, Bun, Deno, navigateur)
   - Framework(s)
   - Base de données (si applicable)
   - Outils de test
   - Outils de build
   - Linting/formatage

5. Identifier les patterns en étudiant le code existant :
   - **Nommage** : Comment sont nommés les fichiers, fonctions, classes ?
   - **Structure** : Comment le code est organisé dans les fichiers ?
   - **Erreurs** : Comment les erreurs sont créées et gérées ?
   - **Types** : Comment les types/interfaces sont définis ?
   - **Tests** : Comment les tests sont structurés ?

   Lire 3-5 fichiers représentatifs de différentes zones (modèles, services, composants, tests).

6. Identifier les fichiers clés :
   - Points d'entrée
   - Configuration
   - Logique métier centrale
   - Utilitaires partagés
   - Définitions de types

7. Si des ambiguïtés persistent, poser des questions complémentaires :

   | Information | Question si ambiguë |
   |-------------|---------------------|
   | Conventions non évidentes | "Je vois deux patterns de nommage — lequel est le standard ?" |
   | Architecture pas claire | "Le projet semble utiliser [pattern] — est-ce intentionnel ?" |
   | Tests incohérents | "Les tests utilisent [framework] — y a-t-il des standards à suivre ?" |
   | MCP spécifiques | "Des MCP spécifiques nécessaires au-delà de Context7 ?" |

### Phase 3 : RECHERCHER les best practices

8. Pour chaque technologie détectée, rechercher la documentation à jour :
   - **D'abord** : utiliser Context7 MCP pour récupérer la doc officielle
   - **Si indisponible** : effectuer une recherche web pour les best practices 2026
   - Cibler : conventions actuelles, patterns recommandés, anti-patterns à éviter

9. Comparer les practices détectées dans le code avec les best practices actuelles
   - Documenter les conventions du projet existant (même si elles divergent des best practices)
   - Les conventions du projet priment sur les best practices génériques

### Phase 4 : GÉNÉRER le CLAUDE.md

10. Consulter le template de référence : [references/template-claude-md.md](references/template-claude-md.md)

11. Générer le fichier `CLAUDE.md` à la racine du projet en respectant :
    - **100-500 lignes maximum** — concis et pratique
    - **Spécifique au projet** — utiliser des exemples réels tirés du codebase analysé
    - **Fidèle aux conventions existantes** — documenter ce qui EST, pas ce qui devrait être
    - **Exemples tirés du code** — montrer les patterns réels trouvés dans le projet

12. Intégrer obligatoirement les sections MCP : consulter [references/sections-mcp.md](references/sections-mcp.md)
    - **Context7** : toujours inclus
    - **MCP Tool Search** : toujours inclus
    - Autres MCP : selon les besoins du projet

13. Intégrer les règles de production :
    - Intégrité des tests (jamais modifier les tests)
    - Git discipline (worktrees pour parallélisme)
    - TypeScript strict (si applicable et déjà en place)
    - Protocole de vérification (evidence before claims)
    - Hooks (protection tests + protection env)

### Phase 5 : GÉNÉRER les guides de référence

14. Consulter le guide de création : [references/guide-reference-creation.md](references/guide-reference-creation.md)

15. Créer les guides de référence en se basant sur les patterns **réels** du projet :
    - Identifier les types de tâches récurrentes à partir du code existant
    - Créer un guide par type de tâche (50-200 lignes chacun)
    - Utiliser les exemples de code réels du projet comme base
    - Compléter avec les best practices recherchées en Phase 3

### Phase 6 : VALIDER

16. Vérifier que le CLAUDE.md :
    - Reflète fidèlement les conventions du projet existant
    - Fait moins de 500 lignes
    - Contient des exemples de code tirés du projet réel
    - Intègre les sections MCP (Context7 + MCP Tool Search minimum)
    - Intègre les hooks et le protocole de vérification

17. Vérifier que les guides de référence :
    - Font chacun entre 50 et 200 lignes
    - Utilisent les patterns réels du projet
    - Contiennent des exemples de code et une checklist

18. Présenter un résumé à l'utilisateur :

```markdown
## Global Rules créées

**Fichier** : `CLAUDE.md`

### Type de projet détecté
{type détecté avec indicateurs}

### Stack technique détectée
{technologies principales avec versions}

### Structure du projet
{arborescence simplifiée}

### Patterns identifiés
- {Pattern 1 avec fichier source}
- {Pattern 2 avec fichier source}

### Guides de référence créés
- `reference/{guide1}.md` — {description}
- `reference/{guide2}.md` — {description}

### MCP configurés
- Context7 (documentation librairies)
- MCP Tool Search (chargement on-demand)
- {autres MCP si applicable}

### Prochaines étapes
1. Relire le `CLAUDE.md` généré
2. Valider que les conventions documentées sont correctes
3. Ajouter des notes spécifiques au projet si nécessaire
```

## Ressources

- [references/template-claude-md.md](references/template-claude-md.md) — Template structuré du CLAUDE.md
- [references/sections-mcp.md](references/sections-mcp.md) — Blocs MCP à intégrer
- [references/guide-reference-creation.md](references/guide-reference-creation.md) — Guide pour créer les documents de référence
