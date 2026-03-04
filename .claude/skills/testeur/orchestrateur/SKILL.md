---
name: testeur-qa
description: "Ce skill orchestre la phase Testeur QA en 5 phases : analyse des user stories existantes, transformation en tests YAML exécutables, audit pré-déploiement via reverse-prompt (6 angles d'attaque), exécution parallèle avec Agent Teams (1 browser-qa-agent par story), et rapport agrégé avec screenshots. Le lead coordonne les agents QA, ne teste jamais directement. Use when l'utilisateur veut tester l'application, lancer les tests QA, exécuter les user stories, ou auditer le code avant déploiement."
---

# Testeur QA — Pipeline Orchestré avec Agent Teams

## Vue d'ensemble

Orchestrer la phase de test QA en créant une **équipe d'agents browser-qa-agent** qui exécutent les user stories en parallèle via Playwright CLI. Le lead coordonne les agents, transforme les stories en tests exécutables, et ne teste jamais directement.

**Annoncer au démarrage :**

> Je lance le pipeline **Testeur QA** en 5 phases :
>
> | Phase | Action | Livrable |
> |-------|--------|----------|
> | 1 | Analyse | Inventaire des flux testables |
> | 2 | Transformation | Tests YAML exécutables |
> | 3 | Reverse Prompt | Audit 6 angles d'attaque |
> | 4 | Exécution | 1 agent QA par story (parallèle) |
> | 5 | Rapport | Synthèse pass/fail + screenshots |
>
> **Protocole :** Agent Teams avec browser-qa-agent
> **Pattern :** Fan-Out (stories parallèles → rapport agrégé)

## Prérequis

Vérifier qu'au moins ces documents existent :
- User stories dans `docs/` (générées par le Chef de Projet)
- `docs/features.json` (tracker de features avec critères d'acceptation)
- Architecture API dans `docs/architecture-api.md`

Si des documents manquent, proposer via `AskUserQuestion` :
- **"Lancer le pipeline Chef de Projet d'abord"** — Générer les specs manquantes
- **"Continuer avec ce qui existe"** — Tester sur la base des documents disponibles
- **"Arrêter"** — Terminer

## References

- `references/template-test-story.yaml` — Format YAML cible pour les tests exécutables (structure stories, exemples de workflows)

Lire le template **avant** de transformer les user stories.

---

## Phase 1 : Analyse

1. **Localiser les documents sources** :
   - Chercher les user stories dans `docs/` (format markdown)
   - Lire `docs/features.json` pour les critères d'acceptation
   - Lire `docs/architecture-api.md` pour les endpoints testables
   - Lire `DESIGN.md` si présent (flux UI à valider)

2. **Inventorier les flux testables** :
   - Lister chaque user story avec son flux principal (happy path)
   - Identifier les edge cases mentionnés dans les stories
   - Mapper les endpoints API concernés par chaque flux
   - Déterminer les URLs de test (localhost, staging, etc.)

3. **Estimer le périmètre** :
   - Nombre de stories à transformer
   - Nombre d'agents QA nécessaires (1 par story)
   - Stories prioritaires (critiques d'abord)

### Checkpoint — Validation du périmètre

<HARD-GATE>
Ne pas transformer les stories sans validation explicite du périmètre.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Périmètre approuvé — transformer les stories"** — Passer à la Phase 2
- **"Réduire le périmètre"** — Sélectionner un sous-ensemble de stories
- **"Modifier les URLs de test"** — Changer les URLs cibles
- **"Arrêter"** — Terminer

---

## Phase 2 : Transformation des stories en tests YAML

1. **Lire** `references/template-test-story.yaml` pour le format cible

2. **Pour chaque user story**, générer un fichier YAML :
   - `name` : nom descriptif de la story
   - `url` : URL de test dérivée de l'architecture API
   - `workflow` : étapes séquentielles en format impératif

   Format des étapes :
   ```
   Navigate to <url>
   Verify <assertion visible>
   Fill in <field> with "<value>"
   Click <element>
   Verify <résultat attendu>
   ```

3. **Sauvegarder** les fichiers YAML dans `ai_review/user_stories/`
   - Un fichier par groupe logique de stories (ex : `auth.yaml`, `contrat.yaml`, `remboursements.yaml`)

4. **Ajouter les edge cases** depuis les user stories originales comme stories supplémentaires dans les fichiers YAML

### Checkpoint — Validation des tests YAML

<HARD-GATE>
Ne pas lancer l'exécution sans validation des tests YAML générés.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Tests approuvés — lancer le reverse prompt"** — Passer à la Phase 3
- **"Modifier des tests"** — Ajuster les stories YAML
- **"Passer directement à l'exécution"** — Sauter la Phase 3
- **"Arrêter"** — Terminer

---

## Phase 3 : Reverse Prompt (audit pré-déploiement)

1. **Invoquer** le skill `reverse-prompt` via le tool Skill :
   ```
   Skill("reverse-prompt")
   ```

2. Le skill reverse-prompt analyse le code sous 6 angles :
   - Sécurité, concurrence, error handling, data integrity, performance, UX

3. **Collecter** le rapport d'audit

### Checkpoint — Validation de l'audit

Valider via `AskUserQuestion` :

- **"Audit noté — lancer l'exécution des tests"** — Passer à la Phase 4
- **"Créer des tâches de correction d'abord"** — Générer des TaskCreate pour les findings critiques
- **"Arrêter"** — Terminer

---

## Phase 4 : Exécution parallèle (Agent Teams)

### Choix du mode d'affichage Playwright

Proposer via `AskUserQuestion` :

- **"Headless (Recommandé)"** — Exécution invisible, plus rapide. Les screenshots capturent chaque étape.
- **"Headed (navigateur visible)"** — Le navigateur s'affiche en temps réel. Idéal pour une démo live où l'audience veut voir les tests s'exécuter visuellement.

Si **headed** est choisi, ajouter `--headed` aux instructions Playwright de chaque agent QA dans leur prompt (étape 5 ci-dessous).

### Exécution

1. **Générer le RUN_DIR** :
   ```bash
   RUN_DIR="screenshots/browser-qa/$(date +%Y%m%d_%H%M%S)_$(uuidgen | tr '[:upper:]' '[:lower:]' | head -c 6)"
   mkdir -p "$RUN_DIR"
   ```

2. **Découvrir les stories** :
   - Glob `ai_review/user_stories/*.yaml`
   - Parser chaque fichier YAML pour extraire le tableau `stories`
   - Construire la liste plate de toutes les stories avec leur fichier source

3. **Créer l'équipe** :
   ```
   Teammate.spawnTeam("qa-team", description="Équipe QA — validation parallèle des user stories")
   ```

4. **Créer les tâches** :
   - Un `TaskCreate` par story YAML
   - Subject : nom de la story
   - Description : workflow complet + SCREENSHOTS_DIR

5. **Spawner les agents** — lancer TOUS les agents dans un seul message pour parallélisme maximal :

   Pour chaque story :
   ```
   Task(
     subagent_type="browser-qa-agent",
     team_name="qa-team",
     name="qa-<story-slug>",
     prompt="""
   Exécuter cette user story et rapporter les résultats :

   **Story:** {story.name}
   **URL:** {story.url}
   **Vision:** false

   **Workflow:**
   {story.workflow}

   Instructions:
   - Suivre chaque step du workflow séquentiellement
   - Prendre un screenshot après chaque step significatif
   - Sauvegarder TOUS les screenshots dans : {SCREENSHOT_PATH}
   - Rapporter chaque step comme PASS ou FAIL
   - Format final obligatoire :
     RESULT: {PASS|FAIL} | Steps: {passed}/{total}
   """
   )
   ```

6. **Collecter les résultats** :
   - Attendre les messages des agents (livraison automatique)
   - Parser chaque rapport pour extraire : RESULT (PASS/FAIL), Steps (X/Y)
   - Marquer les tâches correspondantes comme complétées

7. **Shutdown** :
   ```
   SendMessage(type="shutdown_request", recipient="qa-<story-slug>")
   # Pour chaque agent
   Teammate.cleanup()
   ```

---

## Phase 5 : Rapport agrégé

Compiler et présenter le rapport final :

```markdown
# Rapport QA — Testeur

**Projet** : [nom du projet]
**Date** : [date et heure]
**Équipe** : qa-team ({N} agents parallèles)

## Résumé

**Stories:** {total} total | {passed} passed | {failed} failed
**Status:** ALL PASSED | PARTIAL FAILURE | ALL FAILED

## Résultats

| #   | Story        | Source File | Status | Steps            |
| --- | ------------ | ----------- | ------ | ---------------- |
| 1   | {story name} | {filename}  | PASS   | {passed}/{total} |
| 2   | {story name} | {filename}  | FAIL   | {passed}/{total} |

## Échecs

(Section incluse uniquement en cas d'échecs)

### Story : {nom de la story échouée}
**Source :** {filename}
**Rapport de l'agent :**
{rapport complet de l'agent pour cette story}

## Audit Reverse Prompt

**Findings critiques :** {nombre}
**Findings hauts :** {nombre}
(Résumé des findings les plus importants)

## Screenshots

Tous les screenshots sauvegardés dans : `{RUN_DIR}/`

## Prochaine étape

[Action choisie par l'utilisateur]
```

### Checkpoint — Validation du rapport

Valider via `AskUserQuestion` :

- **"Rapport accepté"** — Terminer le pipeline
- **"Relancer les tests échoués"** — Respawner les agents pour les stories en échec
- **"Créer des tâches de correction"** — Générer des TaskCreate pour les bugs trouvés
- **"Arrêter"** — Terminer

<HARD-GATE>
Ne pas terminer sans validation explicite du rapport final.
</HARD-GATE>

---

## Checkpoint Git — Push sur GitHub

Après validation du rapport, proposer via `AskUserQuestion` :

- **"Committer et pousser sur GitHub" (Recommandé)** — Committer les rapports QA et pousser
- **"Committer localement"** — Committer sans pousser
- **"Ne pas committer"** — Continuer sans versioning

Si commit accepté :

1. `git add` des fichiers produits : `ai_review/`, `screenshots/`, `docs/` (si reverse-prompt)
2. `git commit -m "test: rapports QA, audit reverse-prompt, tests E2E"`
3. `git push` si option choisie

---

## Principes clés

- **Le lead ne teste JAMAIS directement** — Il orchestre, transforme les stories, collecte les résultats
- **Agent Teams** — `Teammate.spawnTeam` + `Task` avec `team_name` pour la coordination
- **Fan-Out pattern** — Stories en parallèle → rapport agrégé
- **HARD-GATES** — Pas d'exécution sans validation du périmètre et des tests YAML
- **AskUserQuestion** — Toute validation passe par le tool, jamais en texte libre
- **Playwright CLI** — Token-efficient, headless par défaut, sessions parallèles
- **Screenshots systématiques** — Preuve visuelle à chaque step pour le rapport
