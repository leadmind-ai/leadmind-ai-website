---
model: claude-opus-4-6
description: Transforme le design doc en spécifications formelles (PRD, user stories, features.json)
argument-hint: [chemin vers le design doc ou laisser vide pour le plus récent]
---

# Objectif

Génère les spécifications formelles à partir du design doc approuvé lors du brainstorming.

## Variables

DESIGN_DOC: $ARGUMENTS

## Instructions

- Utiliser OBLIGATOIREMENT le tool `AskUserQuestion` pour chaque validation — ne jamais valider en texte libre
- Ne JAMAIS faire d'hypothèse — toujours demander

## Workflow

1. Lire le fichier `.claude/skills/chef-de-projet/specs-writing/SKILL.md` avec le tool Read, puis suivre ses instructions avec DESIGN_DOC comme argument. Ne PAS utiliser le tool Skill.
2. Suivre intégralement le processus du skill specs-writing
3. Maintenant suivre la section `Rapport` pour rapporter le travail accompli

## Rapport

## Spécifications créées

**PRD** : `docs/PRD.md`
**Features** : `docs/features.json` — [N] fonctionnalités
**User Stories** : `user-stories/` — [N] stories

### Prochaine étape
Invocation du skill `writing-plans` pour créer le plan d'implémentation.
