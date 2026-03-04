---
model: claude-sonnet-4-5-20250929
allowed-tools: Bash(git ls-files:*), Read, Grep, Glob
description: Répond aux questions sur la structure du projet et la documentation sans coder
---

# Question

Répond à la question de l'utilisateur en analysant la structure du projet et la documentation. Ce prompt est conçu pour fournir des informations et répondre aux questions sans effectuer de changements de code.

## Instructions

- **IMPORTANT : Ceci est une tâche de réponse aux questions uniquement - NE PAS écrire, éditer ou créer de fichiers**
- **IMPORTANT : Se concentrer sur la compréhension et l'explication du code existant et de la structure du projet**
- **IMPORTANT : Fournir des réponses claires et informatives basées sur l'analyse du projet**
- **IMPORTANT : Si la question nécessite des changements de code, expliquer conceptuellement ce qui devrait être fait sans implémenter**

## Exécuter

- `git ls-files` pour comprendre la structure du projet

## Lire

- README.md pour l'aperçu du projet et la documentation

## Approche d'Analyse

- Examiner la structure du projet depuis git ls-files
- Comprendre l'objectif du projet depuis README
- Connecter la question aux parties pertinentes du projet
- Fournir des réponses complètes basées sur l'analyse

## Format de Réponse

- Réponse directe à la question
- Preuves de support depuis la structure du projet
- Références à la documentation pertinente
- Explications conceptuelles si applicable

## Question

$ARGUMENTS
