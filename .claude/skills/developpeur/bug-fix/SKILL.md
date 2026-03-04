---
name: bug-fix
description: "Ce skill orchestre la correction d'un bug identifie via un mini-pipeline : prime_planner analyse le bug + codebase, produit un plan de correction cible, un builder applique le fix, puis le testeur QA revalide. Use when l'utilisateur signale un bug, un rapport QA contient des FAIL, ou un finding de securite doit etre corrige."
---

# Bug Fix — Pipeline de correction ciblee

## Vue d'ensemble

Corriger un bug identifie avec un pipeline structure : diagnostic → plan → fix → re-test. Chaque correction est tracable et revalidee.

**Annoncer au demarrage :**

> Je lance le pipeline **Bug Fix** :
>
> | Phase | Action |
> |-------|--------|
> | Diagnostic | prime_planner analyse le bug + codebase |
> | Plan | Plan de correction cible |
> | Fix | Builder applique la correction |
> | Re-test | QA revalide le slice concerne |

## References

Ce skill ne necessite pas de fichiers reference externes. Il s'appuie sur les rapports QA (`ai_review/`), l'audit securite (`docs/security-audit.md`) et le registry (`docs/contracts/registry.md`) deja presents dans le projet.

---

## Phase 1 : Identification du bug

1. **Localiser la source du bug** :
   - Si l'utilisateur fournit un ID de bug (ex: `BUG-001`) : chercher dans `ai_review/rapport-qa-*.md`
   - Si l'utilisateur fournit un finding de securite (ex: `C-01`) : chercher dans `docs/security-audit.md`
   - Si l'utilisateur decrit le bug en texte libre : noter la description

2. **Collecter le contexte** :
   - Lire `docs/contracts/registry.md` pour identifier le slice concerne
   - Lire les fichiers mentionnes dans le rapport de bug
   - Identifier les fichiers a modifier

3. **Verbaliser** :
   > **Bug identifie :**
   > - Source : [rapport QA / audit securite / signalement utilisateur]
   > - Severite : [BLOQUANT / HIGH / MEDIUM / LOW]
   > - Fichiers concernes : [liste]
   > - Slice impacte : [nom du slice]

---

## Phase 2 : Diagnostic (prime_planner)

**Si le bug est simple et le fichier concerne est clair → passer directement a la Phase 3.**

Si le bug est complexe ou touche plusieurs fichiers :

1. **Spawner le prime_planner** :
   ```
   Task(
     subagent_type="general-purpose",
     name="bug-diagnostician",
     model="sonnet[1m]",
     prompt="""
   Tu es un diagnosticien de bugs. Analyse ce bug et produis un plan de correction.

   **Bug :** [description complete]
   **Fichiers concernes :** [liste]
   **Rapport source :** [contenu du rapport]

   Instructions :
   1. Lire les fichiers concernes
   2. Identifier la cause racine exacte (ligne, fonction, condition)
   3. Proposer un plan de correction MINIMAL (changer le moins de code possible)
   4. Lister les fichiers a modifier avec les changements exacts
   5. Identifier les tests existants qui couvrent ce code
   6. Proposer un test de regression si aucun test ne couvre le bug
   """
   )
   ```

2. **Attendre le diagnostic** : le prime_planner retourne :
   - Cause racine identifiee
   - Plan de correction (fichiers + changements)
   - Tests existants / test de regression propose

### Checkpoint — Validation du plan de correction

<HARD-GATE>
Ne pas corriger sans validation explicite du plan.
</HARD-GATE>

Valider via `AskUserQuestion` :

- **"Plan approuve — corriger"** — Spawner le builder
- **"Modifier le plan"** — Ajuster la correction proposee
- **"Corriger manuellement"** — L'utilisateur corrige lui-meme
- **"Arreter"** — Terminer

---

## Phase 3 : Correction (builder)

1. **Spawner le builder** :
   ```
   Task(
     subagent_type="general-purpose",
     name="bug-fixer",
     model="sonnet",
     prompt="""
   Tu es un builder charge de corriger un bug specifique.

   **Bug :** [description]
   **Cause racine :** [diagnostic du prime_planner]
   **Plan de correction :** [changements exacts]

   Fichiers que tu possedes : [liste des fichiers a modifier]
   Fichiers en lecture seule : [tout le reste]

   Instructions :
   1. Appliquer EXACTEMENT les changements du plan — rien de plus
   2. EXTEND, pas RECREATE — ne modifie que ce qui est necessaire
   3. Executer les tests existants pour verifier la non-regression
   4. Si un test de regression est demande dans le plan, l'ecrire (TDD : test RED d'abord)
   5. Verifier que tous les tests passent AVANT de declarer la tache terminee
   """
   )
   ```

2. **Attendre la completion** : le builder confirme :
   - Fichiers modifies
   - Tests executes (resultat)
   - Changements effectues

---

## Phase 4 : Re-test QA

Proposer via `AskUserQuestion` :

- **"Lancer le re-test QA (Recommande)"** — Invoquer `/testeur-qa` sur le slice concerne
- **"Tester manuellement"** — L'utilisateur valide lui-meme
- **"Passer le re-test"** — Continuer sans revalidation (non recommande)

Si re-test QA choisi :
- Invoquer le skill `testeur-qa` avec le scope du slice concerne
- Verifier que le bug est corrige dans le rapport
- Verifier qu'aucune regression n'est introduite

---

## Phase 5 : Commit + Rapport

### Checkpoint Git

Proposer via `AskUserQuestion` :

- **"Committer et pousser (Recommande)"** — Commit semantique + push
- **"Committer localement"** — Commit sans push
- **"Ne pas committer"** — Garder en local

Si commit accepte :
- `git add` des fichiers modifies
- `git commit -m "fix([scope]): [description courte du bug corrige]"`
- `git push` si option choisie

### Rapport

```
## Bug Fix — Termine

**Bug** : [ID et description]
**Severite** : [niveau]
**Cause racine** : [explication]
**Correction** : [fichiers modifies et changements]
**Tests** : [X pass / Y total]
**Re-test QA** : [PASS / FAIL / non execute]
**Commit** : [hash si committe]
```

---

## Principes

- **MINIMAL** — Corriger le bug, rien de plus. Pas de refactoring opportuniste.
- **EXTEND, pas RECREATE** — Ne modifier que les lignes necessaires.
- **Re-test obligatoire** — Un fix sans re-test n'est pas termine (quality-gates).
- **Tracabilite** — Chaque correction reference le bug source et le rapport QA.
- **AskUserQuestion** — Validation avant correction et avant commit.
