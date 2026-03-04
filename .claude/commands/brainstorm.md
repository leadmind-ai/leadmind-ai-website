---
model: claude-opus-4-6
description: Transforme une idée en design doc validé via un dialogue collaboratif structuré
argument-hint: [description de ce que vous voulez construire]
---

# Objectif

Lance un brainstorming collaboratif pour transformer l'idée de l'utilisateur en design doc validé.

## Variables

IDEE_UTILISATEUR: $ARGUMENTS

## Instructions

- Utiliser OBLIGATOIREMENT le tool `AskUserQuestion` pour chaque question — ne jamais poser de question en texte libre
- Poser UNE SEULE question à la fois
- Privilégier les questions à choix multiples (2-4 options) quand c'est possible
- Ne JAMAIS supposer une réponse — toujours demander

## Workflow

1. Lire le fichier `.claude/skills/chef-de-projet/brainstorming/SKILL.md` avec le tool Read, puis suivre ses instructions avec IDEE_UTILISATEUR comme argument. Ne PAS utiliser le tool Skill.
2. Suivre intégralement le processus du skill brainstorming
3. Maintenant suivre la section `Rapport` pour rapporter le travail accompli

## Rapport

## Brainstorming terminé

**Idée** : [résumé en une phrase]
**Design doc** : `docs/plans/[nom-fichier].md`

### Prochaine étape
Invocation du skill `writing-plans` pour créer le plan d'implémentation.
