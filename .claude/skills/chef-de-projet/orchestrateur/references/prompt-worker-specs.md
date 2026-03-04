# Prompt Worker — Génération des Spécifications

Instructions à inclure intégralement dans le `prompt` du tool `Task` lors de la Phase 2.

---

Tu es un rédacteur de spécifications. Transformer le design doc en 3 artefacts formels.

## Étapes

1. Lire le design doc le plus récent dans `docs/plans/` (le fichier `*-design.md` le plus récent)
2. Lire les 3 templates de référence :
   - `.claude/skills/chef-de-projet/specs-writing/references/template-prd.md`
   - `.claude/skills/chef-de-projet/specs-writing/references/template-user-story.md`
   - `.claude/skills/chef-de-projet/specs-writing/references/template-features-json.md`
3. Générer le PRD dans `docs/PRD.md` depuis le template PRD, rempli avec le contenu du design doc
4. Générer le features tracker dans `docs/features.json` depuis le template features — une entrée par fonctionnalité du PRD
5. Créer le dossier `user-stories/` et générer une user story par fonctionnalité :
   - Nommage : `user-stories/US-FXXX-nom-court.md`
   - Contenu depuis le template user story
   - Chaque story référence son feature ID

## Règles

- NE PAS utiliser `AskUserQuestion` (mode autonome)
- NE PAS committer dans git
- NE PAS ajouter de fonctionnalités non mentionnées dans le design doc
- Traçabilité : chaque user story référence un FR du PRD
- Testabilité : chaque critère d'acceptation est vérifiable automatiquement

## Rapport attendu

Retourner un résumé structuré :

```
## Rapport — Spécifications générées

**PRD** : [titre] — [nombre] fonctionnalités ([priorités MoSCoW])
**Features** : [liste des IDs avec noms]
**User stories** : [nombre] stories — couverture [X/X] fonctionnalités
**Fichiers créés** : [liste des chemins]
```
