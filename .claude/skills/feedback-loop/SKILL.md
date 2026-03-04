---
name: feedback-loop
description: "Ce skill analyse les frictions rencontrées pendant le développement (friction logs, historique git, rapports QA/sécurité, TODO/FIXME dans le code) et les transforme en règles actionnables pour CLAUDE.md ou .claude/rules/. Boucle d'amélioration continue du système. Use when l'utilisateur veut analyser les frictions du projet, lancer /feedback-loop, ou améliorer les règles du système après un cycle de développement."
---

# Feedback Loop — Frictions → Règles actionnables

## Vue d'ensemble

Analyser toutes les sources de friction du projet (logs, git, rapports, code) pour en extraire des patterns récurrents et les transformer en **règles concrètes** qui préviennent les mêmes problèmes à l'avenir.

**Annoncer au démarrage :**

> Je lance le pipeline **Feedback Loop** — analyse des frictions du projet :
>
> | Phase | Action |
> |-------|--------|
> | Collecte | Scanner friction logs, git, rapports QA/sécurité, TODO/FIXME |
> | Extraction | Identifier les patterns récurrents |
> | Génération | Proposer des règles actionnables |
> | Application | Ajouter les règles approuvées au système |

## References

- `references/template-friction-log.md` — Template pour logger les frictions pendant le développement

---

## Phase 1 : Collecte des sources

Scanner les sources suivantes dans le projet courant :

### 1. Friction logs

Chercher dans `docs/` :
- `docs/friction-log.md` (log principal)
- `docs/*friction*`, `docs/*log*` (variantes)
- `docs/feedback-loop-*.md` (rapports précédents — pour la déduplication)

Si `docs/friction-log.md` n'existe pas, proposer via `AskUserQuestion` :
- **"Créer le friction log"** — Initialiser depuis `references/template-friction-log.md`
- **"Continuer sans friction log"** — Analyser uniquement les autres sources

### 2. Historique git

```bash
git log --oneline -50
```

Chercher les patterns problématiques :
- Reverts (`revert:`, `Revert "..."`)
- Fix-après-fix (`fix:` suivi d'un autre `fix:` sur le même scope)
- Commits d'urgence (`hotfix:`, `patch:`)
- Amends fréquents

### 3. Rapports QA et sécurité

- `docs/security-audit.md` (rapport du security-reviewer)
- `ai_review/` (rapports du testeur QA)
- `docs/code-review.md` (si présent)

### 4. Issues dans le code

Utiliser le tool Grep pour chercher les marqueurs de friction dans le code source :
- Pattern : `TODO|FIXME|HACK|WORKAROUND|XXX`
- Scope : `src/` (fichiers `.ts` et `.tsx`)

### 5. Registry des slices

- `docs/contracts/registry.md` — vérifier les deltas entre contrats attendus et réels, les corrections post-build

### 6. Résumé de collecte

Verbaliser :
> **Sources analysées :**
> - Friction log : [X entrées trouvées / non trouvé]
> - Git history : [X commits analysés, Y patterns suspects]
> - Rapports QA : [X trouvé / non trouvé]
> - Rapport sécurité : [X trouvé / non trouvé]
> - TODO/FIXME : [X trouvés dans le code]
> - Registry : [X slices analysés]

---

## Phase 2 : Extraction des patterns

Pour chaque friction ou erreur identifiée, extraire :

| Champ | Description |
|-------|-------------|
| **Pattern** | Description concise du problème récurrent |
| **Fréquence** | 1x, 2-3x, récurrent |
| **Cause racine** | Config, méconnaissance, outil, workflow, convention manquante |
| **Impact** | Temps perdu, bugs introduits, qualité dégradée, rework |
| **Sévérité** | Low / Medium / High |
| **Règle proposée** | Instruction spécifique pour prévenir le problème |

### Déduplication

Si des rapports `docs/feedback-loop-*.md` précédents existent, comparer chaque friction identifiée avec les patterns déjà traités. Exclure toute friction qui correspond à une règle déjà appliquée, sauf si la règle s'est avérée inefficace (le même problème continue de se produire malgré la règle).

### Regrouper par catégorie

- **TypeScript / Build** — erreurs de types, config, imports
- **Git / Workflow** — patterns de commits, branches, conflits
- **Tests** — échecs récurrents, config Jest/Vitest, flaky tests
- **Agents / Teams** — frictions de coordination, contexte, file ownership
- **Infrastructure** — Docker, CI/CD, env variables, paths
- **Design / UX** — incohérences design system, Stitch MCP
- **Sécurité** — vulnérabilités détectées par le security-reviewer

### Checkpoint — Validation des patterns

<HARD-GATE>
Ne pas générer de règles sans validation des patterns identifiés.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Patterns validés — générer les règles"** — Passer à la Phase 3
- **"Ajouter des frictions manuellement"** — L'utilisateur complète avec ses observations
- **"Filtrer les patterns"** — Retirer certains patterns non pertinents
- **"Arrêter ici"** — Terminer l'analyse

Ne pas passer à la suite sans approbation explicite.

---

## Phase 3 : Génération des règles

Pour chaque pattern validé, générer une règle qui respecte ces critères :

1. **Spécifique** — pas de règle générique ("sois prudent"), une instruction précise
2. **Actionnable** — l'agent sait exactement quoi faire ou ne pas faire
3. **Contextualisée** — référence au pattern observé (pourquoi cette règle existe)
4. **Vérifiable** — on peut constater si la règle est suivie ou non

### Format des règles

```markdown
### [Catégorie]
- [Instruction spécifique]
  - Raison : [référence au pattern observé]
  - Exemple : [ce qu'il faut faire / ne pas faire]
```

### Destination des règles

| Type de règle | Destination | Portée |
|---------------|-------------|--------|
| Convention de code | `CLAUDE.md` section "Règles de production" | Tout le projet |
| Coordination agents | `.claude/rules/[nom].md` | Tous les teammates |
| Config spécifique | Documentation inline ou `CLAUDE.md` | Référence |

### Présentation des règles proposées

Présenter à l'utilisateur :

1. **Tableau récapitulatif** des patterns → règles
2. **Règles groupées par catégorie** avec le format exact qui sera ajouté
3. **Destination de chaque règle** (CLAUDE.md vs .claude/rules/)

### Checkpoint — Approbation des règles

<HARD-GATE>
Ne jamais modifier CLAUDE.md ou les rules sans approbation explicite.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Appliquer toutes les règles"** — Ajouter toutes les règles proposées
- **"Sélectionner les règles"** — L'utilisateur choisit lesquelles appliquer
- **"Modifier avant d'appliquer"** — L'utilisateur ajuste une ou plusieurs règles
- **"Rejeter tout"** — Ne rien modifier

Ne pas passer à la suite sans approbation explicite.

---

## Phase 4 : Application

Si approuvé :

1. **Ajouter les règles CLAUDE.md** :
   - Ouvrir `CLAUDE.md` du projet cible
   - Ajouter les règles dans la section `## Règles de production` (créer la section si elle n'existe pas)
   - Chaque règle avec sa catégorie, instruction et raison

2. **Ajouter les rules d'équipe** (si applicable) :
   - Créer ou éditer les fichiers dans `.claude/rules/`
   - Respecter le format existant des rules (file-ownership, quality-gates, team-coordination)

3. **Marquer les frictions comme traitées** :
   - Si `docs/friction-log.md` existe : ajouter le statut "→ Rule ajoutée" aux entrées traitées

---

## Phase 5 : Rapport + Commit

### Rapport

Générer `docs/feedback-loop-[date].md` :

```markdown
# Feedback Loop — [Date]

## Sources analysées
| Source | Entrées | Pertinentes |
|--------|---------|-------------|
| Friction log | X | Y |
| Git history | X commits | Y patterns |
| Rapports QA | X | Y findings |
| TODO/FIXME | X | Y |
| Registry | X slices | Y deltas |

## Patterns identifiés
| # | Pattern | Sévérité | Fréquence | Règle proposée | Statut |
|---|---------|----------|-----------|----------------|--------|
| 1 | [desc] | [sev] | [freq] | [règle] | Appliquée / Rejetée |

## Règles ajoutées
### Dans CLAUDE.md
[liste des règles ajoutées]

### Dans .claude/rules/
[liste des rules ajoutées/modifiées]

## Règles rejetées
[liste avec raison si fournie]

## Recommandations
[actions futures suggérées]
```

### Checkpoint Git

Proposer via `AskUserQuestion` :

- **"Committer et pousser" (Recommandé)** — Commit sémantique + push
- **"Committer localement"** — Commit sans push
- **"Ne pas committer"** — Garder en local

Si commit accepté :
- `git add` des fichiers modifiés (CLAUDE.md, .claude/rules/, docs/feedback-loop-*.md)
- `git commit -m "docs(rules): feedback-loop — [N] règles ajoutées depuis [sources]"`
- `git push` si option choisie

---

## Quand utiliser ce skill

| Moment | Déclencheur |
|--------|-------------|
| Après un slice de développement | Frictions notées pendant le build |
| Après les tests QA | Échecs récurrents, patterns de bugs |
| Après un audit sécurité | Vulnérabilités détectées |
| Après un cycle complet | Amélioration continue du système |
| Sur demande | L'utilisateur veut nettoyer les frictions accumulées |

## Principes

- **Le feedback-loop ne modifie jamais le code** — il modifie les règles qui guident le code
- **Chaque règle est traçable** — référence au pattern qui l'a motivée
- **L'utilisateur approuve tout** — HARD-GATE sur les patterns ET sur les règles
- **Cumulatif** — chaque exécution enrichit le système, les rapports précédents sont lus pour éviter les doublons
