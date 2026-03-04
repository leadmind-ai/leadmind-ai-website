# Référence Frontmatter et Syntaxe

Référence complète pour la configuration frontmatter, les modèles disponibles, les hooks, la syntaxe des variables et les patterns de restriction d'outils.

---

## Configuration Frontmatter

Le frontmatter est la métadonnée YAML en haut du fichier de commande, entre les marqueurs `---`.

### Champs obligatoires

| Champ | Objectif | Exemple |
|-------|----------|---------|
| `model` | Version du modèle Claude | `claude-sonnet-4-5-20250929` |
| `description` | Description brève pour le menu `/help` | `Analyse le code pour les bonnes pratiques` |

### Modèles disponibles

| Modèle | Identifiant | Cas d'usage |
|--------|-------------|-------------|
| **Sonnet** (recommandé) | `claude-sonnet-4-5-20250929` | Usage général, bon équilibre performance/coût |
| **Opus** | `claude-opus-4-6` | Tâches complexes nécessitant raisonnement approfondi |
| **Haiku** | `claude-haiku-4-5-20251001` | Tâches rapides et légères, faible latence |

**Note :** Sonnet par défaut. Opus pour planification complexe ou réflexion approfondie. Haiku pour analyses rapides et simples.

### Champs optionnels

| Champ | Objectif | Quand l'utiliser |
|-------|----------|------------------|
| `argument-hint` | Affiche les arguments attendus dans l'autocomplétion | Pour les commandes avec paramètres : `[fichier] [options]` |
| `allowed-tools` | Restreint les outils disponibles | Pour limiter l'accès : `Bash(git:*)` pour git uniquement |
| `disable-model-invocation` | Empêche le Skill tool d'appeler cette commande | `true` (déconseillé) |
| `hooks` | Hooks scopés à l'exécution de la commande | Voir section Hooks ci-dessous |

### Exemples de frontmatter

**Basique (le plus courant) :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Analyse le code pour les bonnes pratiques
---
```

**Avec arguments :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Crée un plan d'implémentation
argument-hint: [prompt-utilisateur] [urls-docs]
---
```

**Avec Opus (tâches complexes) :**
```yaml
---
model: claude-opus-4-6
description: Planifie une architecture système complexe
argument-hint: [exigences]
---
```

**Avec Haiku (tâches rapides) :**
```yaml
---
model: claude-haiku-4-5-20251001
description: Analyse rapide et légère du code
argument-hint: [fichier]
---
```

**Avec outils restreints :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Affiche l'historique des commits git
argument-hint: [chemin-fichier]
allowed-tools: Bash(git:*)
---
```

**Lecture seule :**
```yaml
---
model: claude-sonnet-4-5-20250929
description: Répond aux questions sur le projet sans modifier le code
allowed-tools: Bash(git ls-files:*), Read, Grep, Glob
---
```

---

## Hooks dans les Commandes

Les hooks permettent d'exécuter des scripts shell avant ou après certaines actions.

```yaml
---
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

### Types de hooks

| Hook | Moment d'exécution |
|------|-------------------|
| `PreToolUse` | Avant l'utilisation d'un outil |
| `PostToolUse` | Après l'utilisation d'un outil |
| `Stop` | À l'arrêt de la commande |

### Options

- `matcher` : Nom de l'outil à intercepter (ex : `"Bash"`, `"Write"`, `"Edit|Write"`)
- `type: command` : Exécute une commande shell
- `command` : La commande à exécuter
- `once: true` : Exécute le hook une seule fois par session

---

## Syntaxe des Variables

### Variables dynamiques (arguments)

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| `$1` | Premier argument | `/commande arg1` → `$1 = arg1` |
| `$2`, `$3`... | Arguments suivants | `/commande arg1 arg2` → `$2 = arg2` |
| `$ARGUMENTS` | Tous les arguments en chaîne | `/commande tout ceci` → `$ARGUMENTS = "tout ceci"` |

### Références de fichiers

| Syntaxe | Description |
|---------|-------------|
| `@fichier` | Inclut le contenu d'un fichier dans le contexte |

### Exécution bash inline

| Syntaxe | Description |
|---------|-------------|
| Syntaxe : exclamation + backtick + commande + backtick | Exécute une commande bash **avant** l'exécution de la commande slash |

**Important :** L'exécution bash inline nécessite `allowed-tools: Bash(...)` dans le frontmatter.

**Exemple d'utilisation :**
```markdown
## Contexte

- Statut git actuel : !`git status`
- Diff git actuel : !`git diff HEAD`
- Branche actuelle : !`git branch --show-current`
```

---

## Syntaxe `allowed-tools`

### Syntaxes supportées

```yaml
# Outils multiples
allowed-tools: Read, Grep, Glob

# Toutes les commandes git
allowed-tools: Bash(git:*)

# Commande bash spécifique
allowed-tools: Bash(git ls-files:*)

# Plusieurs commandes bash
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)

# Lecture + Python
allowed-tools: Read, Grep, Glob, Bash(python:*)

# Lecture seule stricte
allowed-tools: Read, Grep, Glob, Bash(git ls-files:*)
```

### Outils disponibles

| Outil | Description |
|-------|-------------|
| `Read` | Lecture de fichiers |
| `Write` | Écriture de nouveaux fichiers |
| `Edit` | Modification de fichiers existants |
| `Grep` | Recherche dans le contenu des fichiers |
| `Glob` | Recherche de fichiers par pattern |
| `Bash(commande:*)` | Exécution de commandes bash spécifiques |
| `WebFetch` | Récupération de contenu web |
| `Task` | Lancement de sous-agents |

### Patterns courants

| Cas d'usage | Configuration |
|-------------|---------------|
| Lecture seule | `allowed-tools: Read, Grep, Glob` |
| Git uniquement | `allowed-tools: Bash(git:*)` |
| Analyse de code | `allowed-tools: Read, Grep, Glob, Bash(python:*)` |
| Modification de fichiers | `allowed-tools: Read, Write, Edit` |
| Commits git | `allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)` |

---

## Namespacing et Types

### Namespacing

Les sous-répertoires permettent de grouper les commandes :
- `.claude/commands/frontend/component.md` → `/component` avec description "(project:frontend)"
- `.claude/commands/backend/test.md` → `/test` avec description "(project:backend)"

**Priorité** : Les commandes projet ont priorité sur les commandes utilisateur.

### Types de commandes

| Type | Emplacement | Affichage dans /help |
|------|-------------|---------------------|
| Projet | `.claude/commands/` | (project) |
| Personnel | `~/.claude/commands/` | (user) |
| Plugin | `commands/` dans plugin | (plugin-name) |
| MCP | Serveur MCP | `/mcp__<serveur>__<prompt>` |
