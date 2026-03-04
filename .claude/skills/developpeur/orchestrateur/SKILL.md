---
name: developpeur
description: "Ce skill orchestre la phase Développeur par feature slices itératifs. Chaque invocation traite UN slice (ex: Auth, Dashboard, Remboursements) avec un prime_planner qui compresse le contexte codebase en plan actionnable, puis 3 builders (database, backend, frontend) exécutent en parallèle ou séquentiel selon la maturité de l'architecture. Le registry.md sur disque assure la continuité entre slices. Use when l'utilisateur veut implémenter un slice fonctionnel, lance /developpeur, ou demande de builder avec Agent Teams."
---

# Développeur — Pipeline par Feature Slices

## Vue d'ensemble

Orchestrer la phase de développement **un slice fonctionnel à la fois**. Chaque invocation de `/developpeur` traite un seul slice (Auth, Dashboard, Remboursements...) avec un contexte frais. Le fichier `docs/contracts/registry.md` sur disque assure la continuité entre les slices.

**Annoncer au démarrage :**

> Je lance le pipeline **Développeur** pour le slice **[nom du slice]**.
>
> | Phase | Action |
> |-------|--------|
> | Contexte | Lecture du registry des slices précédents |
> | Prime & Plan | Agent prime_planner lit la codebase et produit un plan |
> | Build | 3 builders (database, backend, frontend) exécutent le plan |
> | Intégration | Vérification de cohérence et tests |
>
> **Architecture** : 1 invocation = 1 slice = 1 contexte frais

## Prérequis

Vérifier qu'au moins ces documents existent :
- Plan d'implémentation dans `docs/plans/`
- Architecture API dans `docs/architecture-api.md`
- Architecture data dans `docs/architecture-data.md`

Si des documents manquent, proposer via `AskUserQuestion` :
- **"Lancer le pipeline Architecte d'abord"** — Invoquer le skill `architecte`
- **"Continuer sans architecture"** — Demander une description du projet en texte libre

## References

- `references/contract-first-protocol.md` — Protocole contract-first, modes parallèle et séquentiel, contract diff
- `references/spawn-prompt-prime-planner.md` — Prompt complet pour l'agent prime_planner
- `references/spawn-prompt-database.md` — Prompt complet pour l'agent database
- `references/spawn-prompt-backend.md` — Prompt complet pour l'agent backend
- `references/spawn-prompt-frontend.md` — Prompt complet pour l'agent frontend
- `references/registry-template.md` — Template pour le registry des slices

Lire `references/contract-first-protocol.md` **avant** de démarrer le pipeline.

---

## Phase 0 : Contexte et continuité

1. **Lire le registry** :
   - Chercher `docs/contracts/registry.md`
   - S'il existe : lire les slices précédents, les contrats publiés, les conventions établies
   - S'il n'existe pas : c'est le premier slice (greenfield)

2. **Identifier le slice** :
   - L'utilisateur spécifie le slice dans son invocation (ex: `/developpeur "Slice Auth"`)
   - Si non spécifié : proposer les slices disponibles via `AskUserQuestion` en se basant sur le plan d'implémentation

3. **Évaluer la maturité** :
   - **Greenfield** (pas de codebase, premier slice) → pas de prime_planner, mode séquentiel
   - **Codebase existante** (slices précédents complétés) → prime_planner nécessaire
   - **Architecture détaillée** (docs/architecture-api.md + architecture-data.md complets) → mode parallèle possible

4. **Verbaliser** :
   > **Contexte du slice :**
   > - Slices précédents : [liste ou "aucun (greenfield)"]
   > - Maturité : [greenfield / codebase existante]
   > - Mode recommandé : [séquentiel / parallèle]

---

## Phase 1 : Prime & Plan (conditionnel)

**Si greenfield (premier slice sans codebase) → passer directement à la Phase 2.**

Si codebase existante :

1. **Lire** `references/spawn-prompt-prime-planner.md`

2. **Spawner le prime_planner** :
   ```
   Task(
     subagent_type="general-purpose",
     name="prime-planner",
     model="sonnet[1m]",
     prompt=[contenu de spawn-prompt-prime-planner.md
             + nom du slice
             + contenu de docs/contracts/registry.md
             + chemins vers architecture-api.md et architecture-data.md
             + tech stack depuis CLAUDE.md]
   )
   ```

3. **Fallback si le prime_planner échoue** (timeout, erreur API, résultat vide) :
   - Annoncer : "Le prime_planner n'a pas pu produire de plan. Activation du fallback multi-agents."
   - Spawner **2-3 agents Explore** en parallèle pour scanner la codebase :
     ```
     Task(subagent_type="Explore", prompt="Analyser la structure backend : routes, services, middleware, schéma DB. Résumer en 30 lignes max.")
     Task(subagent_type="Explore", prompt="Analyser la structure frontend : pages, composants, lib, types. Résumer en 30 lignes max.")
     Task(subagent_type="Explore", prompt="Lire docs/contracts/registry.md + docs/architecture-*.md. Résumer les contrats existants en 20 lignes max.")
     ```
   - Combiner les résumés des agents Explore pour construire le plan manuellement (l'orchestrateur le rédige)
   - Écrire le plan dans `docs/plans/slice-[nom].plan.md` comme d'habitude
   - Reprendre le flux normal au Checkpoint de validation du plan

4. **Attendre le plan** : le prime_planner envoie un plan structuré contenant :
   - Résultat du health check (lint + tsc)
   - Section Database : tables à créer/étendre, CRUD, contrat attendu
   - Section Backend : endpoints, validation, types, contrat attendu
   - Section Frontend : composants, pages, hooks
   - Déclaration de propriété des fichiers par builder
   - Mode d'exécution recommandé (parallèle / séquentiel) avec justification

5. **Écrire le plan** dans `docs/plans/slice-[nom].plan.md` pour traçabilité

### Checkpoint — Validation du plan

<HARD-GATE>
Ne pas spawner de builders sans validation explicite du plan et du mode d'exécution.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Plan approuvé — mode parallèle"** — Les 3 builders démarrent simultanément
- **"Plan approuvé — mode séquentiel"** — Chaîne DB → Backend → Frontend
- **"Modifier le plan"** — Ajuster le scope, les fichiers ou le mode
- **"Arrêter ici"** — Terminer le pipeline

Ne pas passer à la suite sans approbation explicite.

---

## Phase 2 : Création de l'équipe

1. **Créer l'équipe** :
   ```
   Teammate.spawnTeam("dev-[nom-slice]", description="Slice [nom] — build")
   ```

2. **Créer les tâches** :

   **Mode séquentiel (Diamond)** :
   ```
   TaskCreate: "Database — schéma et CRUD pour [slice]"
     → Pas de blockedBy (tâche racine)

   TaskCreate: "Backend — endpoints API pour [slice]"
     → blockedBy: [tâche database]

   TaskCreate: "Frontend — composants et pages pour [slice]"
     → blockedBy: [tâche backend]

   TaskCreate: "Intégration — vérifier la cohérence du slice"
     → blockedBy: [tâches database, backend, frontend]
   ```

   **Mode parallèle (Fan-out → Fan-in)** :
   ```
   TaskCreate: "Database — schéma et CRUD pour [slice]"
     → Pas de blockedBy

   TaskCreate: "Backend — endpoints API pour [slice]"
     → Pas de blockedBy (travaille depuis le plan)

   TaskCreate: "Frontend — composants et pages pour [slice]"
     → Pas de blockedBy (travaille depuis le contrat API du plan)

   TaskCreate: "Intégration — contract diff et vérification"
     → blockedBy: [tâches database, backend, frontend]
   ```

---

## Phase 3 : Build

Lire les spawn prompts dans `references/` **avant** chaque spawn.

### Mode Parallèle

Spawner les 3 builders **simultanément** dans un seul message :

1. **Lire** les 3 spawn prompts
2. **Spawner en parallèle** :
   ```
   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="database",
        model="sonnet",
        prompt=[spawn-prompt-database.md + section DB du plan + registry context])

   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="backend",
        model="sonnet",
        prompt=[spawn-prompt-backend.md + section Backend du plan + registry context])

   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="frontend",
        model="sonnet",
        prompt=[spawn-prompt-frontend.md + section Frontend du plan + contrat API du plan + registry context])
   ```
3. **Attendre** que les 3 builders terminent
4. Passer à la Phase 4 (Intégration)

### Mode Séquentiel

Suivre la chaîne contract-first avec vérification du lead :

#### Phase 3a : Agent Database

1. **Lire** `references/spawn-prompt-database.md`
2. **Spawner** :
   ```
   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="database",
        model="sonnet",
        prompt=[spawn-prompt-database.md + contexte projet + registry])
   ```
3. **Attendre le contrat** : l'agent publie son schéma via SendMessage
4. **Vérifier le contrat** selon `references/contract-first-protocol.md`

<HARD-GATE>
Ne pas forward le contrat database au backend sans l'avoir vérifié.
</HARD-GATE>

5. **Forward** le contrat vérifié au backend via SendMessage

#### Phase 3b : Agent Backend (après contrat DB vérifié)

1. **Lire** `references/spawn-prompt-backend.md`
2. **Spawner** :
   ```
   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="backend",
        model="sonnet",
        prompt=[spawn-prompt-backend.md + contrat DB vérifié + contexte projet + registry])
   ```
3. **Attendre le contrat API** via SendMessage
4. **Vérifier le contrat API** selon la checklist

<HARD-GATE>
Ne pas forward le contrat API au frontend sans l'avoir vérifié.
</HARD-GATE>

5. **Forward** le contrat API vérifié au frontend via SendMessage

#### Phase 3c : Agent Frontend (après contrat API vérifié)

1. **Lire** `references/spawn-prompt-frontend.md`
2. **Spawner** :
   ```
   Task(subagent_type="general-purpose", team_name="dev-[slice]", name="frontend",
        model="sonnet",
        prompt=[spawn-prompt-frontend.md + contrat API vérifié + DESIGN.md + contexte projet + registry])
   ```
3. L'agent implémente en respectant exactement le contrat API vérifié

**Pendant le build** : surveiller les messages des agents. Si un agent signale un blocage :
- Lire le message
- Si problème de contrat : ajuster et re-forward
- Si problème technique : guider l'agent sans coder à sa place

---

## Phase 4 : Intégration + Validation

### Mode Parallèle — Contract Diff

Après que les 3 builders ont terminé, vérifier la cohérence :

1. **Contract diff DB** :
   - Lire `prisma/schema.prisma` (ou équivalent) — comparer avec le contrat attendu du plan
   - Vérifier : noms de tables, colonnes, types, contraintes
   - Delta acceptable ? Si non → noter les corrections nécessaires

2. **Contract diff API** :
   - Lire les routes API créées — comparer avec le contrat attendu du plan
   - Vérifier : URLs, méthodes HTTP, JSON shapes, status codes
   - Delta acceptable ? Si non → noter les corrections nécessaires

3. **Contract diff Frontend → API** :
   - Comparer les fetch calls du frontend avec les endpoints réels du backend
   - Vérifier la cohérence des types partagés (`src/types/`)

4. **Si deltas détectés** : relancer uniquement le(s) builder(s) concerné(s) avec les corrections ciblées

### Mode Séquentiel

Les contrats ont déjà été vérifiés en live. Vérifier seulement la cohérence globale.

### Vérifications communes (les deux modes)

1. **Build** :
   - `tsc --noEmit` — pas d'erreurs TypeScript
   - `npm run build` — build réussi
   - `npm test` — tests verts

2. **Tests d'intégration** (si possible) :
   - Lancer le serveur de dev
   - Tester les endpoints avec curl
   - Vérifier que le frontend appelle les bons endpoints

### Checkpoint — Validation intégration

Valider via `AskUserQuestion` :

- **"Intégration validée"** — Passer au shutdown
- **"Corriger les incohérences"** — Lister les corrections et assigner aux builders
- **"Lancer les tests QA"** — Suggérer `/testeur-qa "Slice [nom]"` après le commit
- **"Arrêter ici"** — Passer au shutdown avec les résultats actuels

Ne pas passer à la suite sans approbation explicite.

---

## Phase 5 : Registry + Shutdown + Commit

### 5a. Mettre à jour le registry

Lire `references/registry-template.md` pour le format.

Ajouter une entrée au fichier `docs/contracts/registry.md` pour ce slice :

```markdown
## Slice [N] : [Nom] (complété le [date])

### Contrat DB
[Tables créées/étendues avec colonnes et types]

### Contrat API
[Endpoints avec méthodes, URLs, JSON shapes, status codes]

### Conventions établies
[Patterns, middleware, structure de fichiers, choix techniques]

### Fichiers clés
[Liste des fichiers importants créés/modifiés dans ce slice]
```

### 5b. Shutdown des agents

```
SendMessage(type="shutdown_request", recipient="database")
SendMessage(type="shutdown_request", recipient="backend")
SendMessage(type="shutdown_request", recipient="frontend")
```

Cleanup de l'équipe :
```
Teammate.cleanup()
```

### 5c. Checkpoint Git — Branche + PR

**Workflow : branche dédiée par slice → PR → merge**

1. **Créer la branche du slice** (si pas déjà fait) :
   ```bash
   git checkout -b feat/slice-[nom]
   ```

2. **Committer sur la branche** :
   - `git add` des fichiers produits par les agents + `docs/contracts/registry.md` — **jamais** `git add .`
   - `git commit -m "feat([slice]): implémentation [nom du slice] — database, backend, frontend"`

3. **Pousser et créer la PR** :

   Proposer via `AskUserQuestion` :

   - **"Créer une Pull Request (Recommandé)"** — Push + PR via `gh pr create` avec résumé automatique
   - **"Pousser sans PR"** — Push de la branche sans créer de PR
   - **"Committer localement"** — Committer sans pousser
   - **"Ne pas committer"** — Continuer sans versioning

   Si PR choisie :
   ```bash
   git push -u origin feat/slice-[nom]
   gh pr create --title "feat([slice]): [nom du slice]" --body "## Summary\n- [résumé des changements]\n\n## Slice\n- Database: [tables créées/modifiées]\n- Backend: [endpoints ajoutés]\n- Frontend: [pages/composants ajoutés]\n\n## Test plan\n- [ ] `/testeur-qa \"Slice [nom]\"`\n\n🤖 Generated with Claude Code"
   ```

4. **Revenir sur master** (pour le prochain slice) :
   ```bash
   git checkout master
   ```

   Le merge sera fait après validation QA, soit manuellement, soit via la PR sur GitHub.

### 5d. Rapport final

```
## Pipeline Développeur — Slice [Nom] Terminé

**Projet** : [nom du projet]
**Slice** : [nom et numéro du slice]
**Mode** : [parallèle / séquentiel]
**Équipe** : dev-[slice] (prime_planner + 3 builders)

### Agents et tâches
| Agent | Tâches | Fichiers créés/modifiés | Tests |
|-------|--------|------------------------|-------|
| prime_planner | Plan produit | docs/plans/slice-[nom].plan.md | N/A |
| database | X/Y | [liste] | X pass |
| backend | X/Y | [liste] | X pass |
| frontend | X/Y | [liste] | X pass |

### Contract diff (mode parallèle)
| Couche | Plan vs Réel | Statut |
|--------|-------------|--------|
| DB | [match / delta corrigé] | OK |
| API | [match / delta corrigé] | OK |
| FE→API | [match / delta corrigé] | OK |

### Build
- TypeScript : [pass/fail]
- Build : [pass/fail]
- Tests : [X/Y pass]

### Registry
- docs/contracts/registry.md mis à jour avec le Slice [Nom]

### Slices restants
[Liste des slices non encore implémentés]

### Prochaine étape recommandée
- `/testeur-qa "Slice [Nom]"` pour valider le slice
- `/developpeur "Slice [prochain]"` pour le prochain slice
```

---

## Principes clés

- **1 invocation = 1 slice** — Le lead ne survit pas entre les slices. Contexte frais à chaque fois.
- **Le registry est la mémoire** — `docs/contracts/registry.md` persiste sur disque entre les invocations.
- **Le lead ne code JAMAIS** — Il orchestre, vérifie les contrats/diffs, relaie les interfaces.
- **Prime_planner = compression de contexte** — Lit toute la codebase, produit un plan compact pour les builders.
- **Mode parallèle si architecture détaillée** — Les 3 builders démarrent simultanément depuis le plan.
- **Mode séquentiel si greenfield** — Chaîne contract-first DB → Backend → Frontend.
- **HARD-GATES** — Pas de build sans validation du plan, pas de forward sans vérification.
- **AskUserQuestion** — Toute validation passe par le tool, jamais en texte libre.
- **TDD** — Les builders suivent Red-Green-Refactor (enforced par les rules quality-gates).
- **File ownership** — Un fichier = un agent (enforced par les rules file-ownership).
- **EXTEND, pas RECREATE** — Les builders étendent le code existant, ne le réécrivent jamais.
