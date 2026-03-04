# Exemples de Commandes Slash

Ce répertoire contient des exemples concrets de commandes slash personnalisées. Utilisez-les comme références lors de la création de nouvelles commandes.

## Exemples Disponibles

### 1. agent_tache_simple.md
**Type** : Workflow simple de cycle de vie d'agent
**Arguments** : `[tache]`
**Caractéristiques Clés** :
- Variable dynamique unique
- Configuration statique (INTERVALLE_ATTENTE)
- Workflow clair : créer → commander → vérifier → supprimer
- Rapport de progression simple

**Utiliser comme référence pour** :
- Commandes basiques de gestion d'agents
- Patterns de polling sleep/vérification
- Surveillance du statut d'agent

---

### 2. analyse_puis_construction.md
**Type** : Workflow multi-phases
**Arguments** : `[description-probleme]`
**Caractéristiques Clés** :
- Deux phases d'agents séquentielles (Scout → Build)
- Passage de contexte entre phases
- Rapport de progression détaillé à chaque phase
- Préservation des agents (pas de suppression)

**Utiliser comme référence pour** :
- Workflows complexes multi-phases
- Patterns de coordination d'agents
- Passage d'informations contextuelles
- Rapport de statut tout au long de l'exécution

---

### 3. plan.md
**Type** : Planification et documentation
**Arguments** : `[prompt utilisateur]`
**Caractéristiques Clés** :
- Spécification détaillée du format de sortie
- Sections conditionnelles selon la complexité de la tâche
- Template markdown structuré
- Génération de fichiers avec nommage dynamique

**Utiliser comme référence pour** :
- Commandes qui génèrent des documents structurés
- Formatage de sortie complexe
- Étapes de workflow conditionnelles
- Création de fichiers basée sur templates

---

### 4. question.md
**Type** : Analyse lecture seule
**Arguments** : `$ARGUMENTS` (question flexible)
**Caractéristiques Clés** :
- Restrictions d'outils (`allowed-tools: Bash(git ls-files:*), Read`)
- Opérations lecture seule (pas de modifications de fichiers)
- Workflow simple avec exécution bash
- Gestion flexible des arguments

**Utiliser comme référence pour** :
- Commandes avec outils restreints
- Tâches d'analyse lecture seule
- Commandes d'intégration git
- Patterns d'arguments flexibles

---

## Résumé des Patterns

| Pattern | Exemple | Caractéristiques Clés |
|---------|---------|----------------------|
| **Cycle de vie Agent** | agent_tache_simple.md | Créer → Commander → Surveiller → Nettoyer |
| **Multi-Phases** | analyse_puis_construction.md | Phases séquentielles avec passage de contexte |
| **Génération de Documents** | plan.md | Sortie structurée avec templates |
| **Analyse Lecture Seule** | question.md | Restrictions d'outils, pas de modifications |

---

## Comment Utiliser Ces Exemples

1. **Trouver un pattern similaire** à ce que vous voulez créer
2. **Lire l'exemple complet** pour comprendre la structure
3. **Adapter les sections** à votre cas d'usage spécifique :
   - Frontmatter (description, arguments, outils)
   - Variables (dynamiques et statiques)
   - Instructions (règles et contraintes)
   - Workflow (étapes numérotées)
   - Rapport (format de sortie)
4. **Tester votre commande** avec des entrées réelles
5. **Itérer** selon les résultats

---

## Comparaison Rapide

**Choisir agent_tache_simple.md quand** :
- Vous avez besoin d'une exécution de tâche d'agent simple
- Un workflow mono-phase suffit
- Le nettoyage de l'agent est requis

**Choisir analyse_puis_construction.md quand** :
- Vous avez besoin d'une analyse avant l'implémentation
- Plusieurs phases sont requises
- Le contexte doit passer entre les phases

**Choisir plan.md quand** :
- Vous générez de la documentation structurée
- La sortie a des exigences de formatage complexes
- Des sections conditionnelles sont nécessaires

**Choisir question.md quand** :
- Vous avez besoin d'une analyse lecture seule
- Les restrictions d'outils sont importantes
- Aucune modification de fichier ne doit survenir

---

## Glossaire Français/Anglais

| Anglais | Français |
|---------|----------|
| Slash command | Commande slash |
| Frontmatter | Frontmatter (conservé) |
| Purpose | Objectif |
| Variables | Variables |
| Codebase Structure | Structure du code |
| Instructions | Instructions |
| Workflow | Workflow / Flux de travail |
| Report | Rapport |
| Allowed tools | Outils autorisés |
| Argument hint | Indication d'arguments |
| Dynamic variables | Variables dynamiques |
| Static variables | Variables statiques |
| Read-only | Lecture seule |
| Scout | Scout / Éclaireur |
| Build | Build / Construction |
