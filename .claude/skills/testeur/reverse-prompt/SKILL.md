---
name: reverse-prompt
description: "Ce skill exécute un audit pré-déploiement en analysant l'implémentation complète du projet sous 6 angles d'attaque : sécurité, concurrence, gestion d'erreurs, intégrité des données, performance sous charge, et lacunes UX. Produit un rapport structuré trié par sévérité avec corrections suggérées. Use when l'utilisateur veut auditer le code avant déploiement, chercher des vulnérabilités, vérifier la robustesse, ou exécuter un reverse prompt sur l'implémentation. Keywords — audit, sécurité, vulnérabilité, reverse prompt, pré-déploiement, QA."
---

# Reverse Prompt — Audit Pré-Déploiement

## Objectif

Analyser l'implémentation complète du projet sous **6 angles d'attaque** pour identifier les points de défaillance que les tests standard ne couvrent pas. Produire un rapport structuré avec recommandations de correction triées par sévérité.

## Prérequis

Vérifier avant de démarrer :
- L'implémentation est terminée (features codées)
- Les tests unitaires passent
- Le build est fonctionnel

Si un prérequis manque, signaler via `AskUserQuestion` :
- **"Continuer malgré tout"** — Lancer l'audit en l'état
- **"Arrêter"** — Terminer et corriger d'abord

## References

- `references/reverse-prompt-template.md` — Template complet des 6 angles d'audit avec format de rapport, niveaux de sévérité, et structure de sortie attendue

Lire le template **avant** de démarrer l'audit.

---

## Phase 1 : Analyse du périmètre

1. **Identifier les fichiers à auditer** :
   - Lire `docs/architecture-api.md` pour les endpoints
   - Lire `docs/architecture-data.md` pour le schéma
   - Lister les fichiers source principaux (`src/`)
   - Compter le nombre total de fichiers à analyser

2. **Présenter le périmètre** via `AskUserQuestion` :
   - **"Auditer tout le projet"** — Analyse complète de tous les fichiers source
   - **"Auditer un module spécifique"** — Sélectionner les fichiers cibles
   - **"Arrêter"** — Terminer

<HARD-GATE>
Ne pas démarrer l'audit sans validation explicite du périmètre.
</HARD-GATE>

---

## Phase 2 : Audit sous 6 angles

Lire `references/reverse-prompt-template.md` puis analyser le code sous chaque angle :

### Angle 1 : Vulnérabilités de sécurité
- Lacunes de validation des entrées
- Cas limites d'authentification/autorisation
- Risques d'exposition de données
- Vecteurs d'injection (SQL, XSS, injection de commandes)

### Angle 2 : Race conditions et concurrence
- Actions utilisateur simultanées
- Hypothèses sur l'ordre des appels API
- Conflits de gestion d'état

### Angle 3 : Lacunes de gestion d'erreurs
- Promesses rejetées non gérées
- Scénarios de panne réseau
- Gestion des timeouts
- Dégradation gracieuse quand les dépendances sont indisponibles

### Angle 4 : Intégrité des données
- Cas limites dans les transformations de données
- Valeurs aux bornes (chaîne vide, zéro, null, max int)
- Gestion Unicode et caractères spéciaux
- Problèmes de fuseau horaire et de locale

### Angle 5 : Performance sous charge
- Gestion de grands ensembles de données
- Fuites mémoire dans les processus longs
- Patterns de requêtes N+1
- Pagination ou rate limiting manquants

### Angle 6 : Lacunes UX
- États de chargement manquants
- Feedback d'erreur insuffisant
- Problèmes d'accessibilité
- Cas limites mobile/responsive

Pour chaque problème trouvé, documenter :
- **Description** du scénario de défaillance
- **Sévérité** : critique / haute / moyenne / basse
- **Correction suggérée** avec code ou action spécifique
- **Fichier(s) affecté(s)** avec numéro de ligne

---

## Phase 3 : Rapport

Compiler les findings et présenter le rapport :

```markdown
# Audit Pré-Déploiement — Reverse Prompt

**Projet** : [nom]
**Date** : [date]
**Fichiers audités** : [nombre]

## Résumé

| Sévérité | Nombre |
|----------|--------|
| Critique | X      |
| Haute    | X      |
| Moyenne  | X      |
| Basse    | X      |

## Findings

(Triés par sévérité — critique en premier)

### [CRITIQUE] Titre du problème
**Fichier** : `chemin/vers/fichier.ts:42`
**Angle** : Sécurité
**Scénario** : Description du mode de défaillance
**Correction** : Action ou code recommandé
```

---

## Phase 4 : Actions

Valider via `AskUserQuestion` :

- **"Créer des tâches de correction"** — Générer des `TaskCreate` pour les findings critiques et hauts
- **"Rapport information seulement"** — Sauvegarder le rapport sans action corrective
- **"Approfondir un angle"** — Relancer l'analyse sur un angle spécifique
- **"Arrêter"** — Terminer

<HARD-GATE>
Ne pas terminer sans validation explicite du rapport.
</HARD-GATE>
