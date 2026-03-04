---
model: claude-opus-4-6
description: Analyse les frictions du projet et génère des règles actionnables pour CLAUDE.md et .claude/rules/
---

Lance le pipeline Feedback Loop pour : **$ARGUMENTS**

Lis le fichier `.claude/skills/feedback-loop/SKILL.md` et toutes ses references, puis suis les instructions du skill pas à pas pour analyser les frictions et générer des règles.

IMPORTANT : Ne PAS utiliser le tool Skill pour invoquer ce skill — lire directement les fichiers SKILL.md et references avec le tool Read.
