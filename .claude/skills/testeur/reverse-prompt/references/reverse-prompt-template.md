# Template d'Audit Pré-Déploiement — Reverse Prompt

## Quand utiliser

- Après que toutes les features passent leurs critères d'acceptation
- Après que toutes les user stories sont implémentées et testées
- Avant de merger sur main / déployer en production
- Comme partie d'un processus de revue de PR

## Les 6 angles d'attaque

Analyser l'implémentation complète et identifier les zones de défaillance. Ne PAS se limiter à ce que les tests couvrent déjà.

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
- Feedback d'erreur insuffisant pour l'utilisateur
- Problèmes d'accessibilité
- Cas limites mobile/responsive

## Format de sortie attendu

Pour chaque problème trouvé :

```markdown
### [SEVERITE] Titre du problème
**Fichier** : `chemin/vers/fichier.ts:ligne`
**Angle** : [nom de l'angle]
**Scénario** : Description de comment l'application peut échouer
**Correction** : Action ou code recommandé
```

## Niveaux de sévérité

| Niveau | Critères |
|--------|----------|
| **Critique** | Perte de données, faille de sécurité exploitable, crash systématique |
| **Haute** | Fonctionnalité principale cassée, données incorrectes silencieuses |
| **Moyenne** | Dégradation de l'expérience utilisateur, edge case non géré |
| **Basse** | Amélioration recommandée, code défensif manquant |

## Rapport final

```markdown
# Audit Pré-Déploiement — Reverse Prompt

**Projet** : [nom]
**Date** : [date]
**Fichiers audités** : [nombre]

## Résumé

| Sévérité | Nombre |
|----------|--------|
| Critique | X |
| Haute    | X |
| Moyenne  | X |
| Basse    | X |

## Findings

(Triés par sévérité — critique en premier)

### [CRITIQUE] Titre
...

### [HAUTE] Titre
...
```
