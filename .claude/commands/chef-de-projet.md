---
model: claude-opus-4-6
description: Lance le pipeline complet Chef de Projet — brainstorming → global rules → specs → plan d'implémentation avec validation humaine à chaque checkpoint
argument-hint: [description du projet à construire]
---

# Objectif

Lance le pipeline orchestré Chef de Projet pour transformer une idée en plan d'implémentation prêt à exécuter, en 4 phases avec validation humaine à chaque checkpoint.

## Variables

IDEE_PROJET: $ARGUMENTS

## Instructions

- Le pipeline comporte 4 phases séquentielles avec checkpoint de validation entre chaque
- Utiliser OBLIGATOIREMENT le tool `AskUserQuestion` pour chaque validation — ne jamais poser de question en texte libre
- L'utilisateur peut arrêter le pipeline à tout checkpoint
- Les phases 3 et 4 sont autonomes (sous-agents via Task tool avec subagent_type chef-de-projet-worker) — seuls les checkpoints sont interactifs

## Workflow

1. Lire le fichier `.claude/skills/chef-de-projet/orchestrateur/SKILL.md` avec le tool Read, puis suivre ses instructions avec IDEE_PROJET comme argument. Ne PAS utiliser le tool Skill.
2. Suivre intégralement le processus du skill chef-de-projet (les 4 phases + checkpoints)
3. Maintenant suivre la section `Rapport` pour rapporter le travail accompli

## Rapport

## Pipeline Chef de Projet — Terminé

**Projet** : [nom du projet]
**Phases complétées** : [X/4]

### Artefacts produits
| Artefact | Fichier |
|----------|---------|
| Design doc | `docs/plans/[...]` |
| CLAUDE.md | `CLAUDE.md` |
| Guides reference | `reference/` |
| PRD | `docs/PRD.md` |
| Features | `docs/features.json` |
| User stories | `user-stories/US-*` |
| Plan | `docs/plans/[...]` |

### Prochaine étape
[Mode d'exécution choisi par l'utilisateur]
