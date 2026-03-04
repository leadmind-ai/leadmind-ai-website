---
name: meta-prompt
description: "Génère des commandes slash personnalisées pour Claude Code. Use when l'utilisateur demande de créer une nouvelle commande slash, générer un prompt de commande, ou construire une commande pour .claude/commands/"
---

# Meta-Prompt

Génère des commandes slash personnalisées bien structurées pour Claude Code. Les commandes sont stockées dans `.claude/commands/*.md` et invoquées avec `/nom-commande`. Ce skill se concentre exclusivement sur la création de commandes slash, pas sur les prompts système ou utilisateur.

## Qu'est-ce qu'une commande slash ?

Les commandes slash personnalisées sont des fichiers Markdown qui :
- Résident dans `.claude/commands/` (projet) ou `~/.claude/commands/` (personnel)
- S'invoquent avec `/nom-commande`
- Supportent les arguments via `$1`, `$2`, `$ARGUMENTS`
- Peuvent référencer des fichiers avec `@nom-fichier`
- Peuvent exécuter du bash avec la syntaxe exclamation+backtick (ex: `!\x60commande\x60`) (nécessite `allowed-tools` dans le frontmatter)
- Incluent une configuration frontmatter YAML

## Anatomie d'une commande (7 sections)

1. **Frontmatter** — Configuration YAML (model, description, allowed-tools, hooks)
2. **Objectif** — Aperçu en 1-3 phrases de ce que fait la commande
3. **Variables** — Valeurs dynamiques (`$1`, `$ARGUMENTS`) et statiques
4. **Structure du Code** — (Optionnel) Organisation pertinente du projet
5. **Instructions** — Règles, contraintes, standards de qualité en puces
6. **Workflow** — Actions numérotées étape par étape
7. **Rapport** — Spécification exacte du format de sortie avec placeholders

Pour le guide détaillé de chaque section, lire `references/guide-sections.md`.
Pour le frontmatter, les modèles, hooks, syntaxe des variables et patterns allowed-tools, lire `references/frontmatter-et-syntaxe.md`.

## Workflow

### 1. Lire le template

Lire `assets/MODELE_COMMANDE.md` pour comprendre la structure établie.

### 2. Rassembler les exigences

Demander à l'utilisateur :
- Que doit faire la commande ?
- Quels arguments a-t-elle besoin ?
- Doit-elle modifier des fichiers ou juste rapporter ?
- Quels outils doit-elle utiliser ?
- Quel format doit avoir la sortie ?

### 3. Concevoir la structure

Créer le frontmatter. Consulter `references/frontmatter-et-syntaxe.md` pour tous les champs, identifiants de modèles et patterns disponibles.

Frontmatter minimal :
```yaml
---
model: claude-sonnet-4-5-20250929
description: Description brève pour le menu /help
---
```

### 4. Écrire chaque section

Suivre les directives de `references/guide-sections.md` pour :
1. Objectif (1-3 phrases, verbe d'action)
2. Variables (dynamiques d'abord, puis statiques)
3. Structure du Code (uniquement si nécessaire)
4. Instructions (puces, spécifiques et actionnables)
5. Workflow (étapes numérotées avec références aux outils)
6. Rapport (format markdown exact avec placeholders)

Utiliser les exemples dans `exemples/` comme références concrètes :
- `agent_tache_simple.md` — Workflow simple de cycle de vie d'agent
- `analyse_puis_construction.md` — Agents séquentiels multi-phases
- `plan.md` — Génération de documents complexes avec formatage détaillé
- `question.md` — Analyse lecture seule avec restrictions d'outils

### 5. Sauvegarder le fichier

Sauvegarder dans `.claude/commands/[nom-commande].md` en minuscules avec des tirets pour les noms multi-mots.

### 6. Tester la commande

Invoquer avec `/[nom-commande] [arguments]` et vérifier le comportement. Itérer si nécessaire.

## Principes clés

**Toujours :**
- Inclure `model:` dans le frontmatter (défaut : `claude-sonnet-4-5-20250929`)
- Inclure une `description` claire
- Écrire des étapes de workflow claires et actionnables
- Définir le format exact du rapport
- Utiliser des noms de variables descriptifs
- Numéroter les étapes du workflow

**Jamais :**
- Omettre le champ `model`
- Utiliser `disable-model-invocation`
- Sauter la section Rapport
- Faire des suppositions sur ce qui est "évident" pour Claude

## Ressources incluses

- **assets/MODELE_COMMANDE.md** — Template complet de commande (lire en premier)
- **references/guide-sections.md** — Guide d'écriture détaillé pour chacune des 7 sections
- **references/frontmatter-et-syntaxe.md** — Champs frontmatter, identifiants de modèles, hooks, syntaxe des variables, patterns allowed-tools
- **exemples/** — Exemples fonctionnels de différents patterns de commandes (voir `exemples/README.md`)
