---
name: writing-plans
description: "Utiliser quand un design doc ou des specs existent pour créer un plan d'implémentation détaillé avec des tâches bite-sized en TDD. Ce skill fait le pont entre les spécifications et le développement."
---

# Rédaction de Plans d'Implémentation

## Vue d'ensemble

Transformer des specs ou un design doc en plan d'implémentation complet et actionnable. Rédiger chaque tâche comme si l'ingénieur n'avait aucun contexte sur le codebase : chemins exacts, code complet, commandes de test, sortie attendue. Tâches bite-sized. DRY. YAGNI. TDD. Commits fréquents.

**Annoncer au démarrage :** "J'utilise le skill writing-plans pour créer le plan d'implémentation."

**Sauvegarder dans :** `docs/plans/YYYY-MM-DD-<nom-fonctionnalite>.md`

## Templates de référence

Les templates se trouvent dans le dossier `references/` de ce skill :
- `references/template-entete-plan.md` — En-tête obligatoire de chaque plan
- `references/template-structure-tache.md` — Structure d'une tâche avec cycle TDD et règles de granularité

Lire les deux templates avant de commencer la rédaction.

## Checklist

1. **Lire les specs** — Charger le design doc, PRD, features.json, user stories
2. **Analyser le codebase** — Explorer la structure existante, conventions, dépendances
3. **Rédiger l'en-tête** — Depuis `references/template-entete-plan.md`
4. **Décomposer en tâches** — Depuis `references/template-structure-tache.md`, une tâche par composant
5. **Valider le plan** — Présenter via `AskUserQuestion`
6. **Committer** — Sauvegarder le plan dans git
7. **Proposer l'exécution** — Choix du mode via `AskUserQuestion`

## Processus détaillé

### Étape 1 : Lecture des specs

- Chercher les fichiers dans `docs/plans/`, `docs/PRD.md`, `docs/features.json`, `user-stories/`
- Extraire : fonctionnalités à implémenter, critères d'acceptation, dépendances entre features
- Identifier le tech stack et les contraintes d'architecture

### Étape 2 : Analyse du codebase

- Explorer la structure de répertoires existante
- Identifier les conventions de nommage, patterns utilisés, fichiers de config
- Repérer les points d'intégration pour les nouvelles fonctionnalités

### Étape 3 : Rédaction de l'en-tête

Lire `references/template-entete-plan.md` et remplir chaque champ.

### Étape 4 : Décomposition en tâches

Lire `references/template-structure-tache.md` pour la structure et les règles.

Pour chaque fonctionnalité :
- Créer une tâche avec le cycle TDD complet (test → échec → implémentation → succès → commit)
- Inclure les chemins de fichiers exacts
- Inclure le code complet (jamais de pseudo-code ou "ajouter la logique ici")
- Inclure les commandes exactes avec la sortie attendue
- Ordonner les tâches par dépendance (les fondations d'abord)

### Étape 5 : Validation du plan

Présenter le plan à l'utilisateur via `AskUserQuestion` :
- "Approuvé" — Passer au commit
- "À modifier" — Ajuster et re-présenter

### Étape 6 : Commit

Committer le plan avec un message descriptif.

### Étape 7 : Choix du mode d'exécution

Proposer le choix via `AskUserQuestion` avec les options :

- **Subagent-Driven (session courante)** — Dispatch d'un sous-agent par tâche, revue de code entre chaque tâche, itération rapide. SKILL REQUIS : `subagent-driven-development`
- **Session parallèle (séparée)** — Ouvrir une nouvelle session dans un worktree dédié, exécution par lots avec checkpoints. SKILL REQUIS : `executing-plans`

Si Subagent-Driven : rester dans la session, invoquer `subagent-driven-development`.
Si Session parallèle : guider l'utilisateur pour ouvrir une nouvelle session dans le worktree.

## Principes clés

- **Zéro contexte** — Rédiger comme si l'ingénieur découvre le projet
- **Code complet** — Jamais de "ajouter la validation" ou "implémenter la logique"
- **Chemins exacts** — Toujours le chemin complet, jamais "dans le dossier src"
- **TDD systématique** — Test d'abord, implémentation ensuite, pour chaque tâche
- **Bite-sized** — Une action par étape (2-5 minutes)
- **Commits fréquents** — Un commit par tâche complétée
- **AskUserQuestion obligatoire** — Validation du plan et choix d'exécution via le tool
