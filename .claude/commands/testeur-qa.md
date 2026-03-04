---
model: claude-opus-4-6
description: Lance le pipeline Testeur QA — analyse des user stories, reverse prompt, exécution parallèle via Agent Teams, rapport agrégé
---

Lance le pipeline Testeur QA pour : **$ARGUMENTS**

Lis le fichier `.claude/skills/testeur/orchestrateur/SKILL.md` et toutes ses references (`references/*.md`), puis suis les instructions du skill pas à pas pour exécuter les tests QA.

IMPORTANT : Ne PAS utiliser le tool Skill pour invoquer ce skill — lire directement les fichiers SKILL.md et references avec le tool Read.
