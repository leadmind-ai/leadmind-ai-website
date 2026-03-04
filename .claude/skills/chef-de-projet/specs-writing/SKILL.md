---
name: specs-writing
description: "Utiliser après le brainstorming pour transformer le design doc en spécifications formelles : PRD, user stories, features.json et critères d'acceptation. Fait le pont entre le brainstorming et le writing-plans."
---

# Rédaction des Spécifications

## Vue d'ensemble

Transformer le design doc approuvé (output du brainstorming) en spécifications formelles prêtes pour l'implémentation.

**Annoncer au démarrage :** "J'utilise le skill specs-writing pour transformer le design doc en spécifications formelles."

3 artefacts obligatoires :
1. **PRD** (`docs/PRD.md`) — Document d'exigences produit
2. **User Stories** (`user-stories/US-FXXX-*.md`) — Une story par fonctionnalité
3. **Features Tracker** (`docs/features.json`) — Suivi JSON de toutes les fonctionnalités

<HARD-GATE>
Ne PAS passer à l'architecture ou à l'implémentation tant que les 3 artefacts ne sont pas créés, validés par l'utilisateur via AskUserQuestion, et committés dans git.
</HARD-GATE>

## Templates de référence

Les templates se trouvent dans le dossier `references/` de ce skill :
- `references/template-prd.md` — Structure du PRD
- `references/template-user-story.md` — Structure d'une user story
- `references/template-features-json.md` — Schema et règles du features.json

Lire chaque template avant de générer l'artefact correspondant.

## Checklist

Créer une tâche pour chacun de ces éléments et les compléter dans l'ordre :

1. **Lire le design doc** — Charger le plus récent dans `docs/plans/`
2. **Générer le PRD** — Depuis `references/template-prd.md`
3. **Valider le PRD** — Via `AskUserQuestion`
4. **Générer features.json** — Depuis `references/template-features-json.md`
5. **Valider features.json** — Via `AskUserQuestion`
6. **Générer les user stories** — Depuis `references/template-user-story.md`, une par fonctionnalité
7. **Valider les user stories** — Via `AskUserQuestion` (par lot si peu, une par une si nombreuses)
8. **Committer** — Les 3 artefacts dans git
9. **Transition** — Invoquer le skill `writing-plans`

## Processus détaillé

### Étape 1 : Lecture du design doc

- Chercher le fichier le plus récent dans `docs/plans/`
- Extraire : objectifs, contraintes, fonctionnalités identifiées, décisions prises
- Identifier les personas utilisateurs
- Lister les fonctionnalités avec priorité MoSCoW si présente

### Étape 2 : Génération du PRD

Lire `references/template-prd.md` et remplir chaque section en s'appuyant exclusivement sur le design doc.

Sauvegarder dans `docs/PRD.md`.

### Étape 3 : Validation du PRD

Présenter le PRD à l'utilisateur via `AskUserQuestion` avec les options :
- "Approuvé" — Passer à l'étape suivante
- "À modifier" — Demander les modifications, ajuster, re-présenter

### Étape 4 : Génération du features.json

Lire `references/template-features-json.md` pour le schema et les règles.

Créer une entrée par fonctionnalité identifiée dans le PRD. Sauvegarder dans `docs/features.json`.

### Étape 5 : Validation du features.json

Présenter la liste des fonctionnalités via `AskUserQuestion` :
- "Approuvé" — Passer aux user stories
- "À modifier" — Ajuster et re-présenter

### Étape 6 : Génération des user stories

Lire `references/template-user-story.md`.

Pour CHAQUE fonctionnalité dans features.json, créer `user-stories/US-FXXX-nom-court.md` avec :
- User story au format "En tant que / je veux / afin de"
- Chemin optimal (4-6 étapes)
- 3-5 cas limites
- Critères d'acceptation testables (identiques à ceux de features.json)
- Notes de test

### Étape 7 : Validation des user stories

Présenter les stories via `AskUserQuestion` :
- Par lot si 5 ou moins
- Une par une si plus de 5
- Pour chaque refus, ajuster et re-présenter

### Étape 8 : Commit

Committer les 3 artefacts avec un message descriptif.

### Étape 9 : Transition

Invoquer le skill `writing-plans` pour créer le plan d'implémentation.

## Principes clés

- **Traçabilité** — Chaque user story référence un FR du PRD via l'ID feature
- **Testabilité** — Tout critère d'acceptation est vérifiable automatiquement
- **Exhaustivité** — Aucune fonctionnalité du design doc oubliée
- **YAGNI** — Ne PAS ajouter de fonctionnalités non mentionnées dans le design doc
- **Cohérence** — Priorités cohérentes entre PRD, stories et features.json
- **AskUserQuestion obligatoire** — Toute validation passe par le tool, jamais en texte libre
