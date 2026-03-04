---
name: {{NOM_AGENT}}
description: {{DESCRIPTION}}
tools: {{OUTILS}}  # OPTIONNEL: Omettre cette ligne entièrement pour hériter tous les outils du parent (défaut recommandé)
disallowedTools: {{OUTILS_REFUSES}}  # OPTIONNEL: Outils à retirer de la liste héritée ou spécifiée
color: {{COULEUR}}
model: {{MODELE}}  # OPTIONNEL: sonnet par défaut. Options: sonnet, opus, haiku, inherit
permissionMode: {{MODE_PERMISSIONS}}  # OPTIONNEL: default, acceptEdits, dontAsk, bypassPermissions, plan
skills: {{SKILLS}}  # OPTIONNEL: Liste de skills à précharger dans le contexte [skill1, skill2]
hooks: {{HOOKS}}  # OPTIONNEL: Hooks de cycle de vie (PreToolUse, PostToolUse, Stop)
---

# {{TITRE_AGENT}}

## Objectif

Tu es {{DEFINITION_OBJECTIF}}.

## Instructions

{{INSTRUCTIONS}}

## Workflow

Lorsque tu es invoqué, tu dois suivre ces étapes :

{{ETAPES_WORKFLOW}}

## Rapport

{{FORMAT_RAPPORT}}
