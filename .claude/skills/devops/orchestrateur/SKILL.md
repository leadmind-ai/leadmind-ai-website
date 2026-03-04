---
name: devops
description: "Ce skill orchestre la phase DevOps en lançant DEUX agents en parallèle : devops-engineer (infrastructure + CI/CD) et security-reviewer (audit sécurité OWASP). Après la synthèse, il génère la documentation projet (README, changelog) et propose la finalisation (versioning, merge/PR). À utiliser après les phases développement et test quand le code est prêt pour le déploiement."
---

# DevOps — Pipeline Orchestré avec Agents Parallèles

## Vue d'ensemble

Orchestrer la phase DevOps en lançant deux agents spécialisés **en parallèle** : un ingénieur infrastructure et un auditeur sécurité. Puis générer la documentation et finaliser le projet.

**Annoncer au démarrage :**

> Je lance le pipeline **DevOps** avec deux agents en parallèle :
>
> | Agent | Mission | Livrable |
> |-------|---------|----------|
> | `devops-engineer` | Infrastructure (Docker, CI/CD, scripts) | Dockerfile, docker-compose, .github/workflows/ci.yml |
> | `security-reviewer` | Audit sécurité OWASP pré-déploiement | `docs/security-audit.md` |
>
> Les deux agents travaillent **simultanément**. Ensuite : documentation, versioning et finalisation.

## Prérequis

Avant de lancer ce skill, vérifier qu'au moins un de ces éléments existe :
- Code source dans `src/` (ou répertoire principal)
- `package.json` (ou équivalent) à la racine
- `docs/architecture-api.md` et/ou `docs/architecture-data.md`

Si aucun code ni architecture n'existe, proposer via `AskUserQuestion` :
- **"Lancer le pipeline Développeur d'abord"** — Invoquer le skill `developpeur`
- **"Continuer sans code"** — Générer l'infrastructure à partir de l'architecture seule (mode scaffold)

## References

- `references/prompt-agent-devops.md` — Prompt complet pour l'agent devops-engineer
- `references/prompt-agent-security.md` — Prompt complet pour l'agent security-reviewer

Lire les deux fichiers reference avant de lancer les agents.

---

## Phase 1 : Analyse du projet

1. **Identifier le tech stack** :
   - Lire `CLAUDE.md` → tech stack, conventions
   - Lire `package.json` (ou équivalent) → runtime, framework, dépendances
   - Lire `docs/architecture-api.md` → endpoints, ports, auth
   - Lire `docs/architecture-data.md` → base de données, type

2. **Lire les prompts agents** :
   - Lire `references/prompt-agent-devops.md`
   - Lire `references/prompt-agent-security.md`

3. **Préparer le contexte** : résumer le stack technique (runtime, framework, BDD, port) qui sera injecté dans les prompts agents.

4. **Présenter le périmètre** via `AskUserQuestion` :

- **"Lancer la génération complète"** — Infrastructure + sécurité + documentation + finalisation
- **"Infrastructure seule"** — Dockerfile, docker-compose, CI/CD uniquement
- **"Audit sécurité seul"** — Scan OWASP uniquement
- **"Ajuster le périmètre"** — Préciser ce qui est inclus/exclu

Ne pas lancer les agents sans validation du périmètre.

---

## Phase 2 : Lancement parallèle des agents

<CRITICAL>
Lancer les DEUX agents dans le MÊME appel — c'est-à-dire deux invocations du tool `Task` dans un seul message. C'est ce qui produit l'exécution parallèle.
</CRITICAL>

### Agent 1 : devops-engineer
- **Tool** : `Task`
- **subagent_type** : `devops-engineer`
- **description** : `Génération infrastructure et CI/CD`
- **prompt** : contenu de `references/prompt-agent-devops.md` avec le contexte du projet injecté (tech stack, ports, services, chemins des fichiers)

### Agent 2 : security-reviewer
- **Tool** : `Task`
- **subagent_type** : `security-reviewer`
- **description** : `Audit sécurité OWASP pré-déploiement`
- **prompt** : contenu de `references/prompt-agent-security.md` avec le contexte du projet injecté (chemins des fichiers source, architecture)

**Verbaliser pendant l'attente** :
> Deux agents travaillent en parallèle :
> - L'ingénieur DevOps génère le Dockerfile, docker-compose et le pipeline CI/CD GitHub Actions
> - L'auditeur sécurité scanne le code pour les vulnérabilités OWASP et les failles de configuration
>
> Un DevOps humain ferait ces tâches séquentiellement. Ici, infrastructure et sécurité avancent en même temps.

---

## Phase 3 : Documentation automatique

Après le retour des agents, générer la documentation du projet.

### README.md
Créer ou mettre à jour `README.md` à la racine avec :
- Nom et description du projet (depuis le design doc ou PRD)
- Tech stack (depuis l'analyse Phase 1)
- Prérequis (Node.js, Docker, etc.)
- Installation rapide (`npm install`, `docker-compose up`)
- Variables d'environnement (référencer `.env.example`)
- Scripts disponibles (`npm run dev`, `npm test`, etc.)
- Architecture (résumé avec liens vers docs/)
- Contribution (linting, tests, PR process)

### CHANGELOG.md
Créer `CHANGELOG.md` avec :
- Format [Keep a Changelog](https://keepachangelog.com/)
- Version actuelle basée sur le contenu du projet
- Catégories : Added, Changed, Fixed, Security

### Documentation API
Si `docs/architecture-api.md` existe, vérifier qu'il est à jour. Sinon, noter l'absence.

---

## Phase 4 : Synthèse et validation

Présenter une synthèse complète :

```
## Synthèse DevOps

### Infrastructure (devops-engineer)
- **Dockerfile** : [Multi-stage / Simple] — Image [nom:version]
- **docker-compose** : [N] services ([liste])
- **CI/CD** : GitHub Actions — [N] étapes
- **Variables d'env** : [N] dans .env.example

### Sécurité (security-reviewer)
- **Score global** : [A-F]
- **CRITICAL** : [N] findings
- **HIGH** : [N] findings
- **MEDIUM** : [N] findings
- **LOW** : [N] findings

### Documentation
- **README.md** : [Créé / Mis à jour]
- **CHANGELOG.md** : [Créé / Mis à jour]
```

Valider via `AskUserQuestion` :

- **"Tout approuver et finaliser"** — Passer à la Phase 5
- **"Corriger la sécurité d'abord"** — Demander les corrections prioritaires et relancer
- **"Modifier l'infrastructure"** — Ajuster le Dockerfile/CI/CD avant finalisation
- **"Arrêter ici"** — Committer les artefacts, terminer le pipeline

Ne pas passer à la Phase 5 sans approbation explicite.

---

## Checkpoint Git — Push sur GitHub

Après validation de la synthèse, proposer via `AskUserQuestion` :

- **"Committer et pousser sur GitHub" (Recommandé)** — Committer les artefacts DevOps et pousser
- **"Committer localement"** — Committer sans pousser
- **"Ne pas committer"** — Continuer sans versioning

Si commit accepté :

1. `git add` des fichiers produits : `Dockerfile`, `docker-compose.yml`, `.github/workflows/`, `.env.example`, `.dockerignore`, `docs/security-audit.md`, `README.md`, `CHANGELOG.md`
2. `git commit -m "ci: infrastructure Docker, CI/CD GitHub Actions, audit sécurité"`
3. `git push` si option choisie

<IMPORTANT>
Ce commit DOIT être fait AVANT la Phase 5 (Release) pour que les artefacts soient versionnés avant le merge/PR/tag.
</IMPORTANT>

---

## Phase 5 : Release et finalisation

### Versioning sémantique

1. Détecter la version actuelle :
   - Lire `package.json` → champ `version`
   - Ou lire le dernier tag git : `git describe --tags --abbrev=0`

2. Proposer la version via `AskUserQuestion` :
   - **"v1.0.0 — Release initiale"** (si premier déploiement)
   - **"Incrémenter patch (vX.Y.Z+1)"** (bugfix)
   - **"Incrémenter minor (vX.Y+1.0)"** (nouvelle fonctionnalité)
   - **"Version personnalisée"** (saisie libre)

### Finishing a development branch

Proposer les 4 options de finalisation via `AskUserQuestion` :

- **"Merge vers la branche principale"** — Merge local vers main/master
- **"Créer une Pull Request"** — Push + `gh pr create` avec résumé des changements
- **"Garder la branche telle quelle"** — Ne rien merger, conserver pour review
- **"Supprimer le travail"** — Demander confirmation avant toute suppression

<IMPORTANT>
Pour les options merge et PR :
1. Vérifier que les tests passent AVANT de proposer le merge
2. Pour la PR, inclure le résumé de sécurité dans le corps de la PR
3. Ne JAMAIS force-push sans demande explicite de l'utilisateur
</IMPORTANT>

---

## Rapport final

```
## Pipeline DevOps — Terminé

**Projet** : [nom du projet]
**Agents lancés** : 2 (parallèle)

### Artefacts produits
| Agent/Phase | Artefact | Fichier | Statut |
|-------------|----------|---------|--------|
| devops-engineer | Dockerfile | Dockerfile | |
| devops-engineer | Docker Compose | docker-compose.yml | |
| devops-engineer | CI/CD Pipeline | .github/workflows/ci.yml | |
| devops-engineer | Env example | .env.example | |
| devops-engineer | Docker ignore | .dockerignore | |
| security-reviewer | Audit sécurité | docs/security-audit.md | |
| orchestrateur | README | README.md | |
| orchestrateur | Changelog | CHANGELOG.md | |

### Sécurité
- Score : [A-F]
- Findings critiques : [nombre] — [corrigés / à corriger]

### Versioning
- Version : [vX.Y.Z]
- Tag créé : [Oui / Non]

### Finalisation
- [Mergé / PR créée / Branche conservée / Supprimé]

### Prochaine étape
[Action choisie par l'utilisateur]
```

---

## Principes clés

- **Parallélisation native** — Les deux agents sont lancés dans le même message (pas l'un après l'autre)
- **Validation humaine obligatoire** — Rien n'est committé, mergé ou déployé sans le feu vert explicite
- **AskUserQuestion systématique** — Toute validation passe par le tool, jamais en texte libre
- **Autonomie des agents** — Ils ne posent pas de questions, ils produisent des artefacts
- **Agents dédiés** — Utiliser `subagent_type: devops-engineer` et `subagent_type: security-reviewer` (pas `general-purpose`)
- **Sécurité d'abord** — Les findings CRITICAL du security-reviewer bloquent le merge/déploiement
- **Traçabilité** — Tous les artefacts sont committés après approbation
