---
model: claude-opus-4-6
description: Transforme un design doc ou des specs en plan d'implémentation détaillé avec tâches bite-sized
argument-hint: [chemin vers le design doc ou description des specs]
---

# Objectif

Crée un plan d'implémentation détaillé et actionnable à partir d'un design doc ou de specs existantes.

## Variables

SPECS_UTILISATEUR: $ARGUMENTS

## Instructions

- Chaque tâche doit être bite-sized (2-5 minutes, une seule action)
- Inclure les chemins de fichiers exacts
- Inclure le code complet dans le plan (pas de "ajouter la validation")
- Inclure les commandes exactes avec la sortie attendue
- Appliquer DRY, YAGNI, TDD, commits fréquents

## Workflow

1. Lire le fichier `.claude/skills/chef-de-projet/writing-plans/SKILL.md` avec le tool Read, puis suivre ses instructions avec SPECS_UTILISATEUR comme argument. Ne PAS utiliser le tool Skill.
2. Suivre intégralement le processus du skill writing-plans
3. Maintenant suivre la section `Rapport` pour rapporter le travail accompli

## Rapport

## Plan d'implémentation créé

**Fonctionnalité** : [résumé en une phrase]
**Plan sauvegardé** : `docs/plans/[nom-fichier].md`
**Nombre de tâches** : [N]

### Prochaine étape
Choisir le mode d'exécution : subagent-driven (session courante) ou session parallèle.
