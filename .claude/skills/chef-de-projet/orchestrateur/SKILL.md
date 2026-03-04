---
name: chef-de-projet
description: "Ce skill orchestre le pipeline complet Chef de Projet en 4 phases : brainstorming interactif → création CLAUDE.md → spécifications autonomes → plan d'implémentation autonome. Chaque phase se termine par un checkpoint de validation humaine via AskUserQuestion. À utiliser quand l'utilisateur lance un nouveau projet ou demande de piloter un projet de bout en bout."
---

# Chef de Projet — Pipeline Orchestré

## Vue d'ensemble

Orchestrer un pipeline complet de gestion de projet en 4 phases séquentielles. L'humain valide à chaque checkpoint — rien n'avance sans son feu vert. Les phases autonomes sont déléguées à des sous-agents via le tool `Task` avec `subagent_type: chef-de-projet-worker`.

**Annoncer au démarrage :**

> Je lance le pipeline **Chef de Projet** en 4 phases :
>
> | Phase | Mode | Livrable |
> |-------|------|----------|
> | 1. Brainstorming | Dialogue collaboratif | Design doc |
> | 2. Global Rules | Interactif | CLAUDE.md + reference/ |
> | 3. Spécifications | Génération autonome | PRD, user stories, features.json |
> | 4. Plan d'implémentation | Génération autonome | Plan TDD bite-sized |
>
> Vous validez à chaque étape. Rien n'avance sans votre feu vert.

## References

- `references/prompt-worker-specs.md` — Prompt complet pour le sous-agent de la Phase 3
- `references/prompt-worker-plan.md` — Prompt complet pour le sous-agent de la Phase 4

Lire le fichier reference correspondant avant de lancer chaque sous-agent.

---

## Phase 1 : Brainstorming (Interactif)

Invoquer le skill `brainstorming` via le tool Skill avec l'idée du projet comme argument.

<HARD-GATE>
**OVERRIDE de transition** : quand le brainstorming atteint son Étape 6 (Transition), NE PAS suivre la transition proposée par le skill brainstorming. Revenir ici au Checkpoint 1.
</HARD-GATE>

### Checkpoint 1 — Validation du design doc

Après création et commit du design doc, valider via `AskUserQuestion` :

- **"Design doc approuvé — créer les global rules"** — Passer à la Phase 2
- **"À modifier"** — Ajuster le design doc et re-présenter
- **"Arrêter ici"** — Terminer le pipeline (le design doc reste sauvegardé)

Ne pas passer à la Phase 2 sans approbation explicite.

---

## Phase 2 : Global Rules (Interactif)

Annoncer : *"Phase 2 — Je crée le CLAUDE.md et les guides de référence à partir du design doc."*

Invoquer le skill `creer-global-rules-greenfield` via le tool Skill.

Ce skill va :
1. Lire le design doc pour extraire le tech stack et les contraintes
2. Générer le fichier `CLAUDE.md` avec les conventions du projet
3. Générer les guides de référence dans `reference/`

### Checkpoint 2 — Validation du CLAUDE.md

Après création, valider via `AskUserQuestion` :

- **"CLAUDE.md approuvé — lancer les specs"** — Passer à la Phase 3
- **"À modifier"** — Ajuster le CLAUDE.md et re-présenter
- **"Arrêter ici"** — Terminer le pipeline (design doc + CLAUDE.md sauvegardés)

Ne pas passer à la Phase 3 sans approbation explicite.

---

## Phase 3 : Spécifications (Autonome via sous-agent)

Annoncer : *"Phase 3 lancée — un sous-agent génère les spécifications en autonomie à partir du design doc."*

1. Lire `references/prompt-worker-specs.md`
2. Lancer le tool `Task` avec :
   - `subagent_type` : `chef-de-projet-worker`
   - `description` : `Génération des spécifications`
   - `prompt` : contenu du fichier reference lu à l'étape 1

### Checkpoint 3 — Validation des spécifications

Après retour du sous-agent :

1. Lire les artefacts générés (PRD, features.json, user stories)
2. Présenter un résumé : titre du PRD, nombre de fonctionnalités, liste des features, nombre de user stories
3. Valider via `AskUserQuestion` :
   - **"Specs approuvées — lancer le plan"** — Committer et passer à la Phase 4
   - **"À modifier"** — Demander les modifications, ajuster ou relancer
   - **"Arrêter ici"** — Committer les specs, terminer le pipeline
4. Après approbation : committer les artefacts avec un message descriptif

---

## Phase 4 : Plan d'Implémentation (Autonome via sous-agent)

Annoncer : *"Phase 4 lancée — un sous-agent génère le plan d'implémentation TDD à partir des spécifications."*

1. Lire `references/prompt-worker-plan.md`
2. Lancer le tool `Task` avec :
   - `subagent_type` : `chef-de-projet-worker`
   - `description` : `Génération du plan d'implémentation`
   - `prompt` : contenu du fichier reference lu à l'étape 1

### Checkpoint 4 — Validation du plan

Après retour du sous-agent :

1. Lire le plan généré
2. Présenter un résumé : nombre de tâches, ordre d'exécution, dépendances, tech stack
3. Valider via `AskUserQuestion` :
   - **"Plan approuvé"** — Committer le plan
   - **"À modifier"** — Ajuster et re-présenter
4. Après approbation et commit, proposer le mode d'exécution via `AskUserQuestion` :
   - **"Subagent-Driven (session courante)"** — Invoquer le skill `subagent-driven-development`
   - **"Session parallèle (worktree)"** — Invoquer le skill `using-git-worktrees`
   - **"Exécution manuelle"** — L'utilisateur exécute le plan lui-même

---

## Checkpoint Git — Push sur GitHub

Après validation de toutes les phases (ou arrêt anticipé), proposer via `AskUserQuestion` :

- **"Committer et pousser sur GitHub" (Recommandé)** — Committer tous les livrables et pousser
- **"Committer localement"** — Committer sans pousser
- **"Ne pas committer"** — Continuer sans versioning

Si commit accepté :

1. Lister les artefacts produits : design doc, CLAUDE.md, reference/, PRD, user stories, features.json, plan
2. `git add` de chaque fichier spécifiquement — **jamais** `git add .`
3. `git commit -m "docs: cadrage projet — design doc, PRD, user stories, plan d'implémentation"`
4. `git push` si option choisie

<IMPORTANT>
Si le dépôt distant n'existe pas encore (Phase 2 creer-global-rules-greenfield n'a pas été exécutée dans ce pipeline), le signaler à l'utilisateur et proposer `gh repo create` avant de pousser.
</IMPORTANT>

---

## Rapport final

Après le pipeline complet ou un arrêt anticipé, afficher :

```
## Pipeline Chef de Projet — Terminé

**Projet** : [nom du projet]
**Phases complétées** : [X/4]

### Artefacts produits
| Phase | Artefact | Fichier | Statut |
|-------|----------|---------|--------|
| Brainstorming | Design doc | docs/plans/... | |
| Global Rules | CLAUDE.md | CLAUDE.md | |
| Global Rules | Guides reference | reference/ | |
| Spécifications | PRD | docs/PRD.md | |
| Spécifications | Features tracker | docs/features.json | |
| Spécifications | User stories | user-stories/US-* | |
| Plan | Plan d'implémentation | docs/plans/... | |

### Prochaine étape
[Mode d'exécution choisi ou "Pipeline arrêté à la Phase X"]
```

---

## Principes clés

- **Validation humaine obligatoire** — Rien n'avance sans le feu vert explicite
- **AskUserQuestion systématique** — Toute validation passe par le tool, jamais en texte libre
- **Autonomie des sous-agents** — Les phases 3 et 4 tournent sans interaction utilisateur
- **Worker dédié** — Utiliser `subagent_type: chef-de-projet-worker` (pas `general-purpose`)
- **Traçabilité** — Tous les artefacts sont committés après approbation
- **Arrêt possible** — L'utilisateur peut arrêter le pipeline à tout checkpoint
- **Pas de raccourci** — Ne jamais sauter une phase ou un checkpoint
