# Template de Commande Slash Personnalisée

Ce template est destiné à la création de **commandes slash personnalisées** stockées dans `.claude/commands/*.md` et invoquées avec `/nom-commande`.

## Aperçu de la Structure

Chaque commande slash personnalisée se compose de :
1. **Frontmatter** (configuration YAML)
2. **Objectif** (ce que fait la commande)
3. **Variables** (valeurs dynamiques et statiques)
4. **Structure du Code** (optionnel - uniquement si pertinent)
5. **Instructions** (règles, contraintes, directives)
6. **Workflow** (exécution étape par étape)
7. **Rapport** (spécification du format de sortie)

---

## Détail des Sections

**Objectif** : Description en 1-3 phrases de ce que fait la commande et pourquoi elle existe.

**Variables** : Variables dynamiques des arguments de commande (`$1`, `$2`, `$ARGUMENTS`) et valeurs de configuration statiques.

**Structure du Code** : (Optionnel) Organisation pertinente du projet - inclure uniquement quand la commande doit travailler avec des structures de répertoires spécifiques.

**Instructions** : Règles et contraintes détaillées sous forme de puces que Claude doit suivre lors de l'exécution de la commande.

**Workflow** : Actions numérotées étape par étape nécessaires pour accomplir la tâche. Se termine toujours par "Maintenant suivre la section `Rapport` pour rapporter le travail accompli".

**Rapport** : Spécification exacte du format de sortie avec structure markdown, placeholders, et quelles informations inclure.

---

## Configuration Frontmatter

Le frontmatter est la métadonnée YAML en haut de votre fichier de commande qui contrôle le comportement de Claude. Placez-le entre les marqueurs `---` avant le contenu de votre commande.

### Champs Obligatoires

| Champ | Objectif | Exemple |
|-------|----------|---------|
| `model` | Version du modèle Claude | `claude-sonnet-4-5-20250929` |
| `description` | Description brève pour le menu `/help` | `Analyse le code pour les bonnes pratiques` |

### Modèles Disponibles

| Modèle | Identifiant | Cas d'usage |
|--------|-------------|-------------|
| **Sonnet** (recommandé) | `claude-sonnet-4-5-20250929` | Usage général, bon équilibre performance/coût |
| **Opus** | `claude-opus-4-6` | Tâches complexes nécessitant raisonnement approfondi |
| **Haiku** | `claude-haiku-4-5-20251001` | Tâches rapides et légères, faible latence |

### Champs Optionnels

| Champ | Objectif | Quand l'Utiliser |
|-------|----------|------------------|
| `argument-hint` | Affiche les arguments attendus dans l'autocomplétion | Pour les commandes avec paramètres : `[numero-pr] [priorite]` |
| `allowed-tools` | Restreint les outils utilisables | Pour limiter l'accès aux outils : `Bash(git:*)` pour git uniquement |
| `disable-model-invocation` | Empêche le Skill tool d'appeler cette commande | `true` si la commande ne doit pas être invoquée par d'autres agents |
| `hooks` | Hooks scopés à l'exécution de la commande | Pour exécuter des scripts avant/après certaines actions |

### Notes Importantes

- **Toujours inclure** `model: claude-sonnet-4-5-20250929` pour la cohérence et performance optimale
- **Toujours inclure** un champ `description` clair pour le menu `/help`
- **N'inclure** `allowed-tools` que si vous devez restreindre l'accès aux outils
- **NE PAS utiliser** `disable-model-invocation` - nous voulons que les agents puissent invoquer les commandes

### Exemples de Configuration Frontmatter

**Commande slash basique (la plus courante) :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Analyse le code pour les bonnes pratiques
---
```

**Commande avec arguments :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Crée un plan d'implémentation à partir des exigences utilisateur et de la documentation
argument-hint: [prompt-utilisateur] [urls-docs]
---
```

**Commande avec outils restreints :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Affiche l'historique des commits git pour un fichier spécifique
argument-hint: [chemin-fichier]
allowed-tools: Bash(git:*)
---
```

**Commande avec Opus (tâches complexes) :**
```yaml
---
model: claude-opus-4-6
description: Planifie une architecture système avec réflexion approfondie
argument-hint: [exigences]
---
```

**Commande avec Haiku (tâches rapides) :**
```yaml
---
model: claude-haiku-4-5-20251001
description: Analyse rapide et légère du code
argument-hint: [fichier]
---
```

**Commande avec hooks :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Déploie sur staging avec validation
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-deploy.sh"
          once: true
---
```

---

## Template Complet

Utilisez ce template lors de la création de nouvelles commandes slash. Remplacez tous les `[placeholders]` par le contenu réel :

```markdown
---
model: claude-sonnet-4-5-20250929
description: [Description brève pour le menu /help]
argument-hint: [arg1] [arg2] (uniquement si la commande prend des arguments)
allowed-tools: [Spécifier uniquement si restriction des outils]
---

# Objectif

[Description en 1-3 phrases de ce que fait cette commande et du problème qu'elle résout]

## Variables

[Définir les variables dynamiques et statiques]

```exemple
NOM_VARIABLE_DYNAMIQUE: $1
NOM_VARIABLE_DYNAMIQUE_2: $2
NOM_VARIABLE_STATIQUE: "valeur statique"
```

## Structure du Code

[Optionnel - Inclure uniquement si la commande doit travailler avec des structures de répertoires spécifiques]

```
projet/
├── repertoire-pertinent/    # Description brève
└── autre-repertoire/        # Description brève
```

## Instructions

[Règles et contraintes détaillées sous forme de puces]

- [Règle ou exigence spécifique]
- [Ce qu'il faut faire]
- [Ce qu'il ne faut PAS faire]
- [Cas limites à gérer]
- [Directives d'utilisation des outils]

## Workflow

[Actions numérotées étape par étape]

1. [Première action avec détails et quels outils utiliser]
2. [Deuxième action avec spécificités]
   - [Sous-étape si nécessaire]
   - [Sous-étape si nécessaire]
3. [Continuer jusqu'à complétion]
4. Maintenant suivre la section `Rapport` pour rapporter le travail accompli

## Rapport

[Spécification exacte du format de sortie]

Présenter [découvertes/résultats/complétion] dans ce format :

## [Titre du Rapport]

**[Métrique Clé 1]** : [valeur]
**[Métrique Clé 2]** : [valeur]

### [Nom de Section]
- [Détail 1]
- [Détail 2]

[Inclure des blocs de code, tableaux, listes selon besoin pour montrer la structure exacte]
```

---

## Référence Rapide

### Nommage des Fichiers
- Sauvegarder dans `.claude/commands/[nom-commande].md`
- Utiliser des minuscules avec des tirets pour les noms multi-mots
- Exemple : `.claude/commands/revue-pr.md` pour `/revue-pr`

### Syntaxe des Variables
- `$1`, `$2`, `$3` - Arguments positionnels individuels
- `$ARGUMENTS` - Tous les arguments en une seule chaîne
- `NOM_VAR_STATIQUE: "valeur"` - Constantes utilisées dans la commande

### Références de Fichiers
- `@fichier` - Inclut le contenu d'un fichier dans le contexte
- Exemple : `/ma-commande @README.md` inclut le contenu de README.md

### Exécution Bash Inline
- `![commande]` - Exécute une commande bash avant l'exécution de la commande slash (syntaxe réelle : exclamation + backtick + commande + backtick)
- Nécessite `allowed-tools: Bash(...)` dans le frontmatter
- La sortie est incluse dans le contexte

### Bonnes Pratiques du Workflow
- Numéroter chaque étape clairement (1, 2, 3...)
- Utiliser des verbes d'action (Lire, Analyser, Créer, Exécuter, etc.)
- Spécifier quels outils utiliser
- Décomposer les étapes complexes en sous-puces
- Toujours terminer par une référence à la section Rapport

### Format du Rapport
- Montrer la structure exacte avec des placeholders
- Utiliser le formatage markdown (en-têtes, listes, blocs de code, tableaux)
- Clarifier quelles données vont où
- Fournir des exemples quand utile

---

## Restriction d'Outils Avancée

### Syntaxes Supportées

```yaml
# Outils multiples
allowed-tools: Read, Grep, Glob

# Toutes les commandes git
allowed-tools: Bash(git:*)

# Commande bash spécifique
allowed-tools: Bash(git ls-files:*)

# Plusieurs commandes bash
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)

# Outils d'écriture uniquement
allowed-tools: Write, Edit

# Lecture + exécution Python
allowed-tools: Read, Grep, Glob, Bash(python:*)

# Lecture seule stricte
allowed-tools: Read, Grep, Glob, Bash(git ls-files:*)
```

### Patterns Communs

| Cas d'Usage | Configuration |
|-------------|---------------|
| Lecture seule | `allowed-tools: Read, Grep, Glob` |
| Git uniquement | `allowed-tools: Bash(git:*)` |
| Analyse de code | `allowed-tools: Read, Grep, Glob, Bash(python:*)` |
| Modification de fichiers | `allowed-tools: Read, Write, Edit` |
| Commits git | `allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)` |

---

## Exemples de Commandes

Voir le répertoire `exemples/` pour des exemples complets fonctionnels :

- **agent_tache_simple.md** - Workflow simple avec gestion du cycle de vie d'agent
- **analyse_puis_construction.md** - Workflow multi-phases avec deux agents séquentiels
- **plan.md** - Commande complexe avec spécification de format de sortie détaillée
- **question.md** - Commande lecture seule simple avec restrictions d'outils

---

## Tester Votre Commande

Après avoir créé votre commande slash :

1. **Tester l'invocation** : `/[nom-commande] [arguments-test]`
2. **Vérifier le comportement** : S'assurer qu'elle suit le workflow correctement
3. **Vérifier la sortie** : Confirmer que le format du rapport correspond à la spécification
4. **Itérer** : Affiner selon les résultats

---

## Erreurs Courantes à Éviter

1. **Oublier le model** - Toujours inclure `model: claude-sonnet-4-5-20250929` (ou opus/haiku)
2. **Oublier la description** - Toujours inclure une `description` claire
3. **Variables non définies** - Définir toutes les variables utilisées dans le Workflow
4. **Workflow vague** - Être précis sur les outils et actions
5. **Rapport manquant** - Toujours spécifier le format de sortie exact
6. **Outils non restreints** - Utiliser `allowed-tools` pour les commandes lecture seule
7. **Étapes non numérotées** - Toujours numéroter les étapes du Workflow

---

Rappel : Les commandes slash personnalisées sont des outils puissants pour créer des workflows cohérents et reproductibles. Prenez le temps de concevoir des workflows clairs et des rapports bien structurés pour les meilleurs résultats.
