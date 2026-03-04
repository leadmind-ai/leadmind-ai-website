---
model: claude-sonnet-4-5-20250929
description: Crée un plan d'implémentation d'ingénierie concis basé sur les exigences utilisateur et le sauvegarde dans le répertoire specs
argument-hint: [prompt utilisateur]
---

# Plan Rapide

Crée un plan d'implémentation détaillé basé sur les exigences de l'utilisateur fournies via la variable `PROMPT_UTILISATEUR`. Analyse la demande, réfléchis à l'approche d'implémentation, et sauvegarde un document de spécification complet dans `REPERTOIRE_SORTIE_PLAN/<nom-du-plan>.md` qui peut être utilisé comme blueprint pour le travail de développement réel. Suis les `Instructions` et parcours le `Workflow` pour créer le plan.

## Variables

PROMPT_UTILISATEUR: $1
REPERTOIRE_SORTIE_PLAN: `specs/`

## Instructions

- IMPORTANT : Si aucun `PROMPT_UTILISATEUR` n'est fourni, s'arrêter et demander à l'utilisateur de le fournir.
- Analyser soigneusement les exigences de l'utilisateur fournies dans la variable PROMPT_UTILISATEUR
- Déterminer le type de tâche (tache|fonctionnalite|refactoring|correction|amelioration) et la complexité (simple|moyenne|complexe)
- Réfléchir profondément (ultrathink) à la meilleure approche pour implémenter la fonctionnalité demandée ou résoudre le problème
- Explorer le codebase pour comprendre les patterns existants et l'architecture
- Suivre le Format du Plan ci-dessous pour créer un plan d'implémentation complet
- Inclure toutes les sections requises et les sections conditionnelles selon le type de tâche et la complexité
- Générer un nom de fichier descriptif en kebab-case basé sur le sujet principal du plan
- Sauvegarder le plan d'implémentation complet dans `REPERTOIRE_SORTIE_PLAN/<nom-descriptif>.md`
- S'assurer que le plan est suffisamment détaillé pour qu'un autre développeur puisse le suivre pour implémenter la solution
- Inclure des exemples de code ou du pseudo-code où approprié pour clarifier les concepts complexes
- Considérer les cas limites, la gestion des erreurs et les préoccupations de scalabilité

## Workflow

1. Analyser les Exigences - RÉFLÉCHIR PROFONDÉMENT et parser le PROMPT_UTILISATEUR pour comprendre le problème central et le résultat souhaité
2. Explorer le Codebase - Comprendre les patterns existants, l'architecture et les fichiers pertinents
3. Concevoir la Solution - Développer l'approche technique incluant les décisions d'architecture et la stratégie d'implémentation
4. Documenter le Plan - Structurer un document markdown complet avec l'énoncé du problème, les étapes d'implémentation et l'approche de test
5. Générer le Nom de Fichier - Créer un nom de fichier descriptif en kebab-case basé sur le sujet principal du plan
6. Sauvegarder & Rapporter - Suivre la section `Rapport` pour écrire le plan dans `REPERTOIRE_SORTIE_PLAN/<nom-fichier>.md` et fournir un résumé des composants clés

## Format du Plan

Suivre ce format lors de la création des plans d'implémentation :

```md
# Plan : <nom de la tâche>

## Description de la Tâche
<décrire la tâche en détail selon le prompt>

## Objectif
<énoncer clairement ce qui sera accompli quand ce plan sera terminé>

<si type_tache est fonctionnalite ou complexite est moyenne/complexe, inclure ces sections :>
## Énoncé du Problème
<définir clairement le problème spécifique ou l'opportunité que cette tâche adresse>

## Approche de Solution
<décrire l'approche de solution proposée et comment elle adresse l'objectif>
</si>

## Fichiers Pertinents
Utiliser ces fichiers pour compléter la tâche :

<lister les fichiers pertinents avec des puces expliquant pourquoi. Inclure les nouveaux fichiers à créer sous une section h3 'Nouveaux Fichiers' si nécessaire>

<si complexite est moyenne/complexe, inclure cette section :>
## Phases d'Implémentation
### Phase 1 : Fondation
<décrire tout travail de fondation nécessaire>

### Phase 2 : Implémentation Principale
<décrire le travail d'implémentation principal>

### Phase 3 : Intégration & Finition
<décrire l'intégration, les tests et les touches finales>
</si>

## Tâches Étape par Étape
IMPORTANT : Exécuter chaque étape dans l'ordre, de haut en bas.

<lister les tâches étape par étape comme en-têtes h3 avec des puces. Commencer par les changements de fondation puis passer aux changements spécifiques. La dernière étape doit valider le travail>

### 1. <Nom de la Première Tâche>
- <action spécifique>
- <action spécifique>

### 2. <Nom de la Deuxième Tâche>
- <action spécifique>
- <action spécifique>

<continuer avec des tâches supplémentaires selon besoin>

<si type_tache est fonctionnalite ou complexite est moyenne/complexe, inclure cette section :>
## Stratégie de Test
<décrire l'approche de test, incluant les tests unitaires et les cas limites si applicable>
</si>

## Critères d'Acceptation
<lister des critères spécifiques et mesurables qui doivent être remplis pour que la tâche soit considérée terminée>

## Commandes de Validation
Exécuter ces commandes pour valider que la tâche est terminée :

<lister des commandes spécifiques pour valider le travail. Être précis sur ce qu'il faut exécuter>
- Exemple : `uv run python -m py_compile apps/*.py` - Test pour s'assurer que le code compile

## Notes
<contexte additionnel optionnel, considérations ou dépendances. Si de nouvelles bibliothèques sont nécessaires, spécifier en utilisant `uv add`>
```

## Rapport

Après avoir créé et sauvegardé le plan d'implémentation, fournir un rapport concis avec le format suivant :

```
Plan d'Implémentation Créé

Fichier : REPERTOIRE_SORTIE_PLAN/<nom-fichier>.md
Sujet : <description brève de ce que couvre le plan>
Composants Clés :
- <composant principal 1>
- <composant principal 2>
- <composant principal 3>
```
