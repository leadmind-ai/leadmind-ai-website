# Référence Outils et Configuration des Subagents

Guide complet pour configurer les paramètres d'un subagent Claude Code.

---

## Outils disponibles

### Opérations sur fichiers

| Outil | Description |
|-------|-------------|
| `Read` | Lire le contenu des fichiers |
| `Write` | Créer de nouveaux fichiers |
| `Edit` | Modifier des fichiers existants |
| `Glob` | Trouver des fichiers par pattern |
| `Grep` | Rechercher dans le contenu des fichiers |

### Exécution

| Outil | Description |
|-------|-------------|
| `Bash` | Exécuter des commandes shell |

### Web

| Outil | Description |
|-------|-------------|
| `WebFetch` | Récupérer du contenu d'URL |
| `WebSearch` | Rechercher sur le web |

### Spécialisés

| Outil | Description |
|-------|-------------|
| `NotebookEdit` | Éditer des notebooks Jupyter |
| `TodoWrite` | Gérer des listes de tâches |
| `Task` | Invoquer d'autres subagents |
| `Skill` | Exécuter d'autres skills |

### Interaction utilisateur

| Outil | Description |
|-------|-------------|
| `AskUserQuestion` | Poser des questions à choix multiples |

### Gestion des tâches

| Outil | Description |
|-------|-------------|
| `TaskOutput` | Récupérer la sortie d'une tâche en arrière-plan |
| `KillShell` | Arrêter un shell bash en arrière-plan |
| `ExitPlanMode` | Quitter le mode plan et commencer à coder |

### Intégrations

| Outil | Description |
|-------|-------------|
| `MCPSearch` | Rechercher et charger des outils MCP |
| `LSP` | Interagir avec les serveurs Language Server Protocol |

### Règle par défaut

**OMETTRE le champ `tools`** pour hériter de tous les outils du parent. Ne restreindre les outils que si l'utilisateur demande explicitement des limitations.

### Combinaisons courantes (si restriction demandée)

| Cas d'usage | Outils |
|-------------|--------|
| Lecture seule | `Read, Grep, Glob` |
| Débogueur | `Read, Edit, Bash, Grep, Glob` |
| Créateur de fichiers | `Write, Read, Glob` |
| Analyste de données | `Bash, Read, Write` |

### `disallowedTools`

Pour retirer des outils spécifiques tout en gardant l'héritage :
```yaml
disallowedTools: Bash  # Hérite tout sauf Bash
```

---

## Guide des couleurs

| Couleur | Domaine |
|---------|---------|
| **cyan** | Technique, orienté code |
| **blue** | Architecture, conception, planification |
| **green** | Test, validation, vérification |
| **yellow** | Documentation, analyse |
| **red** | Débogage, corrections critiques, tâches urgentes |
| **purple** | Science des données, recherche |
| **orange** | Build, déploiement, DevOps |
| **pink** | UI/UX, design, tâches créatives |

---

## Modèles

| Modèle | Cas d'usage |
|--------|-------------|
| `sonnet` | **Défaut recommandé.** Performance équilibrée |
| `opus` | Capacité maximale pour tâches complexes, raisonnement approfondi |
| `haiku` | Rapide, léger pour tâches simples |
| `inherit` | Utilise le même modèle que la conversation principale |

---

## Modes de permissions

| Mode | Comportement |
|------|-------------|
| `default` | Vérification standard des permissions avec prompts |
| `acceptEdits` | Auto-accepter les modifications de fichiers |
| `dontAsk` | Auto-refuser les prompts de permission |
| `bypassPermissions` | Ignorer toutes les vérifications (**ATTENTION**) |
| `plan` | Mode plan (exploration en lecture seule) |

**Note :** Si le parent utilise `bypassPermissions`, cela prend la priorité et ne peut pas être remplacé.

---

## Hooks

Les hooks permettent d'exécuter des commandes personnalisées à des moments clés du cycle de vie du subagent.

### Événements disponibles

| Événement | Moment |
|-----------|--------|
| `PreToolUse` | Avant que le subagent utilise un outil |
| `PostToolUse` | Après que le subagent utilise un outil |
| `Stop` | Quand le subagent termine |

### Exemples

**Valider les commandes Bash :**
```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh"
```

**Linter après édition :**
```yaml
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
```

---

## Skills préchargés

Utiliser le champ `skills` pour injecter du contenu de skill dans le contexte du subagent au démarrage :

```yaml
skills:
  - api-conventions
  - error-handling-patterns
```

**Important :** Les subagents n'héritent PAS des skills de la conversation parente. Les skills doivent être explicitement listés.

---

## Patterns avancés

### Premier plan vs arrière-plan

- **Premier plan** : bloque la conversation principale jusqu'à complétion
- **Arrière-plan** : s'exécute en concurrence. Hérite les permissions du parent et auto-refuse tout ce qui n'est pas pré-approuvé.

### Reprise de subagents

- Chaque invocation crée une nouvelle instance avec un contexte frais
- Pour continuer le travail d'un subagent existant, demander à Claude de le reprendre
- Les subagents repris conservent leur historique complet

### Auto-compaction

- Support de la compaction automatique à ~95% de capacité
- Variable `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` pour déclencher plus tôt si nécessaire
