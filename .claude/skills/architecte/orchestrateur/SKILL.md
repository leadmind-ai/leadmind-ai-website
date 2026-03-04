---
name: architecte
description: "Ce skill orchestre la phase Architecture en lançant DEUX agents en parallèle : api-architect (design API) et database-specialist (schéma data). C'est la première démonstration de parallélisation du workflow. Chaque agent produit ses artefacts de manière autonome, puis l'orchestrateur présente une synthèse pour validation humaine. À utiliser après le pipeline Chef de Projet quand le design doc et les specs existent."
---

# Architecte — Pipeline Orchestré avec Agents Parallèles

## Vue d'ensemble

Orchestrer la phase d'architecture en lançant deux agents spécialisés **en parallèle**. L'humain valide à la fin — les agents travaillent en autonomie totale.

**Annoncer au démarrage :**

> Je lance le pipeline **Architecte** avec deux agents en parallèle :
>
> | Agent | Mission | Livrable |
> |-------|---------|----------|
> | `api-architect` | Design API REST, auth, OpenAPI | `docs/architecture-api.md` |
> | `database-specialist` | Schéma BDD, migrations, ORM | `docs/architecture-data.md` |
>
> Les deux agents travaillent **simultanément**. Vous validez à la fin.

## Prérequis

Avant de lancer ce skill, vérifier qu'au moins un de ces documents existe :
- Design doc dans `docs/plans/`
- PRD dans `docs/PRD.md`
- User stories dans `user-stories/`

Si aucun document n'existe, proposer via `AskUserQuestion` :
- **"Lancer le pipeline Chef de Projet d'abord"** — Invoquer le skill `chef-de-projet`
- **"Continuer sans specs"** — Demander une description du projet en texte libre

## References

- `references/prompt-agent-api.md` — Prompt complet pour l'agent api-architect
- `references/prompt-agent-data.md` — Prompt complet pour l'agent database-specialist

Lire les deux fichiers reference avant de lancer les agents.

---

## Phase 1 : Préparation du contexte

1. **Localiser les documents sources** :
   - Chercher le design doc le plus récent dans `docs/plans/`
   - Chercher le PRD dans `docs/PRD.md`
   - Chercher les user stories dans `user-stories/`
   - Chercher le CLAUDE.md pour le tech stack

2. **Choix de la base de données** :

   Proposer via `AskUserQuestion` :

   - **"SQLite" (Recommandé pour démo/prototype)** — Léger, sans serveur, fichier local. Idéal pour démo et développement rapide.
   - **"PostgreSQL"** — Base relationnelle robuste, standard industrie. Nécessite un serveur (local ou Docker).
   - **"Supabase (PostgreSQL managé)"** — PostgreSQL hébergé avec API REST auto-générée, auth intégrée, MCP disponible.
   - **"MySQL / MariaDB"** — Base relationnelle populaire. Alternative à PostgreSQL.

   L'option "Autre" permet de spécifier : MongoDB, Neon (PostgreSQL serverless), PlanetScale (MySQL serverless), Turso (SQLite distribué), CockroachDB, etc.

   **Injecter le choix** dans le prompt du database-specialist (Phase 2) et dans le CLAUDE.md du projet si pas déjà défini.

3. **Lire les prompts agents** :
   - Lire `references/prompt-agent-api.md`
   - Lire `references/prompt-agent-data.md`

4. **Construire le contexte partagé** : préparer un résumé des sources qui sera injecté dans chaque prompt agent (chemins des fichiers à lire, tech stack identifié, **base de données choisie**).

---

## Phase 2 : Lancement parallèle des agents

<CRITICAL>
Lancer les DEUX agents dans le MÊME appel — c'est-à-dire deux invocations du tool `Task` dans un seul message. C'est ce qui produit l'exécution parallèle.
</CRITICAL>

Lancer simultanément :

### Agent 1 : api-architect
- **Tool** : `Task`
- **subagent_type** : `api-architect`
- **description** : `Design de l'architecture API`
- **prompt** : contenu de `references/prompt-agent-api.md` avec le contexte du projet injecté (chemins des fichiers sources, tech stack)

### Agent 2 : database-specialist
- **Tool** : `Task`
- **subagent_type** : `database-specialist`
- **description** : `Design du schéma de base de données`
- **prompt** : contenu de `references/prompt-agent-data.md` avec le contexte du projet injecté (chemins des fichiers sources, tech stack)

**Verbaliser pendant l'attente** :
> Deux agents travaillent en parallèle :
> - L'architecte API conçoit les endpoints, l'authentification et la spécification OpenAPI
> - Le spécialiste data modélise le schéma relationnel, les migrations et les modèles ORM
>
> Un architecte humain ferait ces deux tâches séquentiellement. Ici, elles avancent en même temps.

---

## Phase 3 : Collecte et synthèse

Après le retour des deux agents :

1. **Lire les artefacts produits** :
   - `docs/architecture-api.md` (produit par api-architect)
   - `docs/architecture-data.md` (produit par database-specialist)

2. **Présenter une synthèse** :

```
## Synthèse Architecture

### API (api-architect)
- **Nombre d'endpoints** : X
- **Ressources** : [liste]
- **Auth** : [méthode]
- **Spec OpenAPI** : [Oui/Non]

### Base de données (database-specialist)
- **Nombre de tables** : X
- **Relations** : X (dont X 1:N, X N:N)
- **Indexes** : X
- **Migrations** : [Oui/Non]
- **ORM** : [type]

### Cohérence
- Chaque entité API a une table correspondante : [Oui/Non]
- Endpoints couvrant toutes les fonctionnalités du design doc : [Oui/Non]
```

---

## Checkpoint — Validation de l'architecture

Valider via `AskUserQuestion` :

- **"Architecture approuvée"** — Committer les artefacts et passer à la suite
- **"À modifier"** — Demander les modifications souhaitées et relancer l'agent concerné
- **"Lancer le plan d'implémentation"** — Approuver ET enchaîner avec le skill `writing-plans`
- **"Arrêter ici"** — Committer les artefacts, terminer le pipeline

Ne pas passer à la suite sans approbation explicite.

---

## Phase 4 : Configuration MCP Database

Après validation de l'architecture, identifier la base de données choisie dans `docs/architecture-data.md` (PostgreSQL, Supabase, MySQL, MongoDB, etc.) et proposer la configuration du MCP correspondant.

Proposer via `AskUserQuestion` :

- **"Configurer le MCP [nom de la BDD]"** — Rechercher et configurer le MCP correspondant (via MCP Tool Search si disponible)
- **"Pas de MCP database"** — Passer, les tables seront créées par scripts lors de la phase développeur

Si l'utilisateur choisit de configurer le MCP :
1. Utiliser `WebSearch` ou `MCPSearch` pour trouver le MCP adapté à la BDD choisie (ex : Supabase MCP, PostgreSQL MCP, PlanetScale MCP)
2. Guider l'utilisateur sur l'installation et la configuration (clés API, URL de connexion, etc.)
3. Tester la connexion si possible
4. Documenter la configuration MCP dans le CLAUDE.md du projet

<IMPORTANT>
L'architecte **conçoit** le schéma, il ne crée PAS les tables. La création des tables est la responsabilité du **développeur** (Segment 4) qui :
- Utilisera le **MCP database** pour créer les tables directement si le MCP a été configuré ici
- OU exécutera les **scripts de migration** produits par le database-specialist si aucun MCP n'est disponible
</IMPORTANT>

---

## Phase 5 (optionnelle) : Architecture Decision Records

Si l'utilisateur le souhaite, proposer de générer les ADR via `AskUserQuestion` :

- **"Générer les ADR"** — Créer `docs/decisions/` avec les décisions d'architecture identifiées (tech stack, auth, BDD, MCP, etc.)
- **"Pas d'ADR"** — Passer

Format ADR :
```markdown
## D001: [Titre de la décision]

**Contexte :** [Pourquoi cette décision était nécessaire]

**Options considérées :**
1. **[Option A]** — [Description]
2. **[Option B]** — [Description]

**Décision :** [Option choisie]

**Justification :** [Pourquoi]

**Compromis :** [Ce qu'on perd, risques acceptés]
```

---

## Checkpoint Git — Push sur GitHub

Après validation de l'architecture, proposer via `AskUserQuestion` :

- **"Committer et pousser sur GitHub" (Recommandé)** — Committer l'architecture et pousser
- **"Committer localement"** — Committer sans pousser
- **"Ne pas committer"** — Continuer sans versioning

Si commit accepté :

1. `git add` des fichiers produits : `docs/architecture-api.md`, `docs/architecture-data.md`, `docs/decisions/` (si ADR)
2. `git commit -m "docs: architecture API et base de données"`
3. `git push` si option choisie

---

## Rapport final

Après le pipeline complet ou un arrêt anticipé, afficher :

```
## Pipeline Architecte — Terminé

**Projet** : [nom du projet]
**Agents lancés** : 2 (parallèle)
**Durée estimée** : [temps observé]

### Artefacts produits
| Agent | Artefact | Fichier | Statut |
|-------|----------|---------|--------|
| api-architect | Architecture API | docs/architecture-api.md | |
| database-specialist | Schéma data | docs/architecture-data.md | |
| orchestrateur | ADR | docs/decisions/*.md | |
| orchestrateur | MCP Database | CLAUDE.md (section MCP) | |

### Stratégie de création des tables
[MCP database configuré → le développeur utilisera le MCP / Pas de MCP → le développeur exécutera les scripts de migration]

### Prochaine étape
[Action choisie par l'utilisateur]
```

---

## Principes clés

- **Parallélisation native** — Les deux agents sont lancés dans le même message (pas l'un après l'autre)
- **Validation humaine obligatoire** — Rien n'est committé sans le feu vert explicite
- **AskUserQuestion systématique** — Toute validation passe par le tool, jamais en texte libre
- **Autonomie des agents** — Ils ne posent pas de questions, ils produisent des artefacts
- **Agents dédiés** — Utiliser `subagent_type: api-architect` et `subagent_type: database-specialist` (pas `general-purpose`)
- **Traçabilité** — Tous les artefacts sont committés après approbation
