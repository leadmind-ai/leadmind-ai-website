---
model: claude-sonnet-4-5-20250929
name: agent_tache_simple
description: Crée et commande un agent pour accomplir une petite tâche puis supprime l'agent une fois la tâche terminée.
argument-hint: [tache]
---

# Objectif

Crée et commande un agent pour accomplir une petite tâche puis supprime l'agent une fois la tâche terminée.

## Variables

TACHE: $1
INTERVALLE_ATTENTE: 10 secondes

## Instructions

- Une tâche est considérée terminée quand vous voyez un `agent_logs` de `check_agent_status` avec une `response` event_category suivie d'un `hook` avec un `Stop` event_type.
- Exécuter ce workflow pour CET agent UNIQUEMENT. Ce n'est pas un pattern que nous voulons utiliser pour d'autres agents sauf si demandé explicitement.

## Workflow

- (Créer) D'abord exécuter `create_agent` pour créer l'agent basé sur la `TACHE`
- (Commander) Puis exécuter `command_agent` pour commander à l'agent d'accomplir la `TACHE`
- (Vérifier) L'agent travaillera ensuite en arrière-plan. Pendant qu'il travaille, utiliser `Bash(sleep ${INTERVALLE_ATTENTE})` et toutes les `INTERVALLE_ATTENTE` secondes exécuter `check_agent_status` pour vérifier la progression de l'agent.
  - Si vous êtes interrompu avec une tâche supplémentaire, assurez-vous de retourner à votre boucle sleep + vérification après avoir terminé la tâche supplémentaire.
- (Supprimer) Une fois que l'agent a complètement terminé sa tâche ET qu'elle est suivie d'un `hook` avec un `Stop` event_type (très important), exécuter `interrupt_agent` puis `delete_agent` pour supprimer l'agent.
- (Rapporter) Quand vous avez terminé, rapporter le travail effectué par l'agent à l'utilisateur.

## Rapport

Communiquer à l'utilisateur où vous en êtes à chaque étape du workflow.
