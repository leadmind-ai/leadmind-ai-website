---
name: meta-agent
description: "Génère des fichiers de configuration de subagents Claude Code. Use when l'utilisateur demande de créer un nouveau subagent, construire un agent, ou configurer une architecture agent."
---

# Méta-Agent

Crée des fichiers de configuration de subagents Claude Code complets et prêts à l'emploi. Analyse les besoins utilisateur et génère des définitions de subagents correctement structurées avec les outils, prompts et workflows appropriés.

Les subagents sont stockés dans `.claude/agents/<nom-agent>.md` et sont invoqués automatiquement par Claude quand la description correspond à la tâche en cours.

## Workflow

### 1. Récupérer la documentation à jour

Récupérer la documentation des subagents pour s'assurer d'avoir les informations actuelles :
```
https://docs.claude.com/en/docs/claude-code/sub-agents
```

### 2. Analyser les besoins

- Comprendre l'objectif et les tâches principales du subagent
- Identifier le domaine ou la spécialisation
- Déterminer les outils nécessaires (par défaut : hériter tous)
- Évaluer si des restrictions de permissions sont nécessaires
- Identifier si des skills doivent être préchargés

### 3. Configurer les paramètres

Consulter `references/outils-et-configuration.md` pour les détails sur :
- **Nom** : kebab-case, descriptif et concis (ex : `code-reviewer`, `api-tester`)
- **Couleur** : selon le domaine (cyan=code, green=test, red=debug, etc.)
- **Description** : CRITIQUE pour la délégation automatique. Indiquer clairement QUAND utiliser l'agent. Max 200 caractères.
- **Outils** : OMETTRE le champ `tools` par défaut (hérite tout). Ne restreindre que sur demande explicite.
- **Modèle** : `sonnet` par défaut. `opus` pour tâches complexes, `haiku` pour rapidité, `inherit` pour cohérence.
- **Permissions** : omettre par défaut. Utiliser `acceptEdits`, `dontAsk`, `plan` selon le besoin.
- **Skills** : précharger des skills si l'agent a besoin de connaissances de domaine.
- **Hooks** : ajouter des validations PreToolUse/PostToolUse si nécessaire.

### 4. Remplir le template

Lire le template `assets/subagent-template.md` et remplir les placeholders :
- `{{NOM_AGENT}}`, `{{DESCRIPTION}}`, `{{COULEUR}}`, `{{MODELE}}`
- `{{DEFINITION_OBJECTIF}}` : définition du rôle en une phrase
- `{{INSTRUCTIONS}}` : liste à puces de règles et contraintes spécifiques au domaine
- `{{ETAPES_WORKFLOW}}` : instructions numérotées étape par étape
- `{{FORMAT_RAPPORT}}` : structure markdown pour la sortie
- Lignes optionnelles (`tools`, `disallowedTools`, `permissionMode`, `skills`, `hooks`) : **supprimer entièrement** si non utilisées

### 5. Écrire le fichier

Sauvegarder dans `.claude/agents/<nom-agent>.md`.

### 6. Confirmer la création

- Afficher le chemin du fichier créé
- Expliquer comment l'agent sera invoqué (automatique via description ou explicite)
- Suggérer un test avec une tâche exemple

## Conseils

- **Responsabilité unique** : chaque agent fait une seule chose bien
- **Hériter les outils par défaut** : omettre `tools` sauf restriction explicite
- **Délégation claire** : la description détermine quand l'agent est invoqué automatiquement
- **Workflows détaillés** : des instructions plus spécifiques mènent à de meilleurs résultats
- **Tester immédiatement** : vérifier le comportement avec une tâche exemple

## Ressources incluses

- **assets/subagent-template.md** — Template complet avec tous les placeholders
- **references/outils-et-configuration.md** — Référence complète : outils, couleurs, modèles, permissions, hooks, patterns avancés
- **references/exemples.md** — Exemples complets : ingénierie, contenu, recherche, cas avancés (permissions, hooks, skills)
