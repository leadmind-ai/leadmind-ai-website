---
name: brainstorming
description: "Utiliser OBLIGATOIREMENT avant tout travail créatif — création de fonctionnalités, composants, ou modification de comportement. Explore l'intention utilisateur, les exigences et le design via un dialogue collaboratif avant toute implémentation."
---

# Brainstorming — De l'Idée au Design

## Vue d'ensemble

Transformer une idée en design doc validé via un dialogue collaboratif structuré. Comprendre le contexte projet, poser des questions une par une via `AskUserQuestion`, puis présenter le design pour approbation.

**Annoncer au démarrage :** "J'utilise le skill brainstorming pour transformer votre idée en design doc."

<HARD-GATE>
Ne PAS invoquer de skill d'implémentation, écrire de code, ou scaffolder de projet tant que le design n'est pas présenté ET approuvé par l'utilisateur. Ceci s'applique à TOUT projet, même les plus simples.
</HARD-GATE>

## Anti-Pattern : "C'est trop simple pour un design"

Tout projet passe par ce processus. Une todo list, un utilitaire, un changement de config — tous. Les projets "simples" sont ceux où les hypothèses non examinées causent le plus de travail perdu. Le design peut être court (quelques phrases), mais il DOIT être présenté et approuvé.

## Template de référence

Le template du design doc se trouve dans `references/template-design-doc.md`. Le lire avant de rédiger le design doc.

## Checklist

1. **Explorer le contexte projet** — fichiers, docs, commits récents
2. **Poser des questions clarificatrices** — via `AskUserQuestion`, une par une
3. **Proposer 2-3 approches** — avec trade-offs et recommandation via `AskUserQuestion`
4. **Présenter le design** — section par section, validation via `AskUserQuestion` après chaque section
5. **Écrire le design doc** — depuis `references/template-design-doc.md`, sauvegarder et committer
6. **Transitionner** — invoquer le skill `specs-writing` ou `writing-plans`

## Processus détaillé

### Étape 1 : Exploration du contexte

- Lire les fichiers clés : CLAUDE.md, README.md, docs/, structure de répertoires
- Consulter les commits récents pour comprendre l'état actuel
- Identifier le tech stack et les conventions existantes

### Étape 2 : Questions clarificatrices

Poser des questions via `AskUserQuestion` pour comprendre :
- Objectif principal et problème résolu
- Utilisateurs cibles
- Contraintes techniques connues
- Critères de succès

**Règles :**
- UNE SEULE question par appel à `AskUserQuestion`
- Privilégier les choix multiples (2-4 options) quand c'est possible
- Les questions ouvertes sont acceptables quand les options ne sont pas prévisibles
- Ne JAMAIS supposer une réponse — toujours demander

### Étape 3 : Exploration des approches

Proposer 2-3 approches différentes via `AskUserQuestion` :
- Description de chaque approche
- Avantages / inconvénients
- Recommandation argumentée (en premier)

### Étape 4 : Présentation du design

Présenter section par section, valider chaque section via `AskUserQuestion` :
- Architecture générale
- Composants et responsabilités
- Flux de données
- Gestion des erreurs
- Stratégie de tests

Chaque section est dimensionnée à sa complexité (quelques phrases si simple, 200-300 mots si nuancé). Pour chaque refus, ajuster et re-présenter.

### Étape 5 : Écriture du design doc

- Lire `references/template-design-doc.md`
- Remplir chaque section avec les décisions validées
- Sauvegarder dans `docs/plans/YYYY-MM-DD-<sujet>-design.md`
- Committer avec un message descriptif

### Étape 6 : Transition

Proposer la suite via `AskUserQuestion` :
- **Spécifications formelles** — Invoquer le skill `specs-writing` (PRD, user stories, features.json)
- **Plan d'implémentation direct** — Invoquer le skill `writing-plans` (si les specs ne sont pas nécessaires)

Ne PAS invoquer d'autre skill. Seuls `specs-writing` ou `writing-plans` sont des transitions valides.

## Principes clés

- **Une question à la fois** — Ne pas submerger l'utilisateur
- **Choix multiples privilégiés** — Plus facile à répondre que les questions ouvertes
- **YAGNI impitoyable** — Retirer les fonctionnalités non nécessaires
- **Explorer les alternatives** — Toujours 2-3 approches avant de trancher
- **Validation incrémentale** — Design section par section, approbation avant de continuer
- **AskUserQuestion obligatoire** — Toute question et validation passe par le tool, jamais en texte libre
