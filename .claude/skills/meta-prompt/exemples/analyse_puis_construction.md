---
model: claude-sonnet-4-5-20250929
name: analyse_puis_construction
description: Analyse un problème de codebase avec un analyseur rapide, puis construit la solution avec un agent d'implémentation spécialisé.
argument-hint: [description-probleme]
---

# Objectif

Analyse un problème de codebase ou une demande de recherche avec un agent analyseur rapide, capture ses découvertes détaillées, puis délègue l'implémentation à un agent build spécialisé. Cette approche en deux phases assure une analyse approfondie avant l'implémentation.

## Variables

DESCRIPTION_PROBLEME: $1
INTERVALLE_ATTENTE: 15 secondes
NOM_AGENT_SCOUT: (sera généré selon le problème)
NOM_AGENT_BUILD: (sera généré selon le problème)

## Instructions

- Une tâche est considérée terminée quand vous voyez un `agent_logs` de `check_agent_status` avec une `response` event_category suivie d'un `hook` avec un `Stop` event_type.
- Exécuter ce workflow pour les DEUX agents en séquence. Terminer complètement la phase scout avant de démarrer la phase build.
- L'agent scout fournit une analyse EN LECTURE SEULE. L'agent build effectue l'implémentation réelle.
- NE PAS supprimer les agents après complétion - les laisser pour inspection, débogage et continuations de prompt.
- Passer les découvertes du scout à l'agent build comme contexte pour l'implémentation.
- Utiliser le même `mot-cle-probleme` pour les deux agents afin de savoir qu'ils sont liés.
- Quand vous commandez chaque agent, leur instruire d'utiliser le mode réflexion avec le mot-clé 'ultrathink' dans votre prompt.

## Workflow

### Phase 1 : Scout (Analyse)

- **(Créer Scout)** D'abord exécuter `create_agent` pour créer un agent scout utilisant le template `scout-report-suggest-fast` basé sur la `DESCRIPTION_PROBLEME`
  - Nommer l'agent de manière descriptive comme "scout-{mot-cle-probleme}"
  - L'agent doit être configuré pour l'analyse lecture seule
- **(Commander Scout)** Puis exécuter `command_agent` pour commander à l'agent scout d'investiguer et analyser la `DESCRIPTION_PROBLEME`
  - Instruire l'agent de fournir un rapport scout détaillé avec les découvertes et les résolutions suggérées
- **(Vérifier Scout)** L'agent scout travaillera en arrière-plan. Pendant qu'il travaille, utiliser `Bash(sleep ${INTERVALLE_ATTENTE})` et toutes les `INTERVALLE_ATTENTE` secondes exécuter `check_agent_status` pour vérifier la progression du scout.
  - Si vous êtes interrompu avec une tâche supplémentaire, assurez-vous de retourner à votre boucle sleep + vérification après avoir terminé la tâche supplémentaire.
  - Continuer à vérifier jusqu'à voir une `response` event_category suivie d'un `hook` avec un `Stop` event_type
- **(Rapporter Scout)** Une fois que le scout a terminé, récupérer et analyser ses découvertes depuis les logs de l'agent.
  - Extraire les informations clés : fichiers affectés, causes racines, résolutions suggérées
  - Communiquer les découvertes du scout à l'utilisateur

### Phase 2 : Build (Implémentation)

- **(Créer Agent Build)** Exécuter `create_agent` pour créer un agent build utilisant le template `build-agent`
  - Nommer l'agent de manière descriptive comme "build-{mot-cle-probleme}"
  - L'agent doit être configuré pour le travail d'implémentation
- **(Commander Agent Build)** Puis exécuter `command_agent` pour commander à l'agent build d'implémenter la solution
  - Fournir à l'agent build :
    - La `DESCRIPTION_PROBLEME` originale
    - Les découvertes détaillées et recommandations de l'agent scout
    - Les fichiers spécifiques à modifier selon l'analyse du scout
  - Instruire l'agent build d'implémenter la résolution en suivant les suggestions du scout
- **(Vérifier Agent Build)** L'agent build travaillera en arrière-plan. Pendant qu'il travaille, utiliser `Bash(sleep ${INTERVALLE_ATTENTE})` et toutes les `INTERVALLE_ATTENTE` secondes exécuter `check_agent_status` pour vérifier la progression de l'agent build.
  - Si vous êtes interrompu avec une tâche supplémentaire, assurez-vous de retourner à votre boucle sleep + vérification après avoir terminé la tâche supplémentaire.
  - Continuer à vérifier jusqu'à voir une `response` event_category suivie d'un `hook` avec un `Stop` event_type
- **(Rapporter Build)** Une fois que l'agent build a terminé, rapporter les résultats de l'implémentation à l'utilisateur.

### Rapport Final

- **(Résumé)** Fournir un résumé complet à l'utilisateur :
  - Résultats de la phase scout : ce qui a été analysé et découvert
  - Résultats de la phase build : ce qui a été implémenté et comment
  - Les deux agents sont disponibles pour inspection (pas supprimés)
  - Toute recommandation de suivi ou prochaines étapes

## Rapport

Communiquer à l'utilisateur où vous en êtes à chaque étape du workflow :

1. **Phase Scout Démarrage** : "Création de l'agent scout pour analyser {DESCRIPTION_PROBLEME}..."
2. **Scout en Cours** : "L'agent scout analyse le codebase... (vérification toutes les {INTERVALLE_ATTENTE} secondes)"
3. **Scout Terminé** : "Analyse scout terminée. Découvertes clés : [résumé du rapport scout]"
4. **Phase Build Démarrage** : "Création de l'agent build pour implémenter la solution..."
5. **Build en Cours** : "L'agent build implémente les changements... (vérification toutes les {INTERVALLE_ATTENTE} secondes)"
6. **Build Terminé** : "Implémentation terminée. Changements effectués : [résumé du travail de l'agent build]"
7. **Résumé Final** : "Workflow analyse-puis-construction terminé. L'agent scout '{NOM_AGENT_SCOUT}' et l'agent build '{NOM_AGENT_BUILD}' sont tous deux disponibles pour inspection."
