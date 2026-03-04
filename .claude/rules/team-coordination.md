# Coordination d'équipe

> Règle auto-chargée pour tous les teammates d'une équipe d'agents.

## Protocole de claiming de tâches

1. Vérifier `TaskList` pour le travail disponible (status: `pending`, pas de owner, `blockedBy` vide)
2. Préférer la tâche avec le **plus petit ID** — les tâches précédentes posent le contexte pour les suivantes
3. Claimer avec `TaskUpdate` : mettre `status: "in_progress"` et `owner: ton-nom`
4. Lire la description complète avec `TaskGet` avant de commencer

## Rapports de statut

- **Début de travail** : mettre la tâche en `in_progress` AVANT d'écrire du code
- **Terminé** : mettre la tâche en `completed` APRÈS avoir vérifié tous les critères d'acceptation
- **Après complétion** : envoyer un message au lead avec un résumé des changements et problèmes trouvés
- **Après complétion** : appeler `TaskList` pour trouver la prochaine tâche disponible
- **Travail supplémentaire découvert** : créer une nouvelle tâche avec `TaskCreate` — ne pas étendre le scope actuel

## Discipline de communication

- **Message direct par nom** : toute communication normale (résultats, questions, rapports de complétion, blocages)
- **Broadcast** : UNIQUEMENT pour les problèmes critiques affectant toute l'équipe (ex : "l'API partagée est en panne, tout le monde stop")
- **Quand bloqué** : envoyer un message au lead immédiatement avec le blocage spécifique — ne pas attendre silencieusement

## Comportement idle

- Être idle entre les tours est **normal et attendu** — ce n'est pas une erreur
- Les teammates idle **peuvent recevoir des messages** — un message les réveille
- Le système envoie les notifications idle automatiquement ; aucune action nécessaire des teammates
- Leads : ne pas traiter les notifications idle comme "l'agent a terminé". Vérifier `TaskList` à la place
- Leads : attendre au moins 60 secondes entre les vérifications de statut

## Dimensionnement des tâches

### La règle d'or

**Une tâche = un agent, un livrable, un ensemble de fichiers.**

Une tâche bien dimensionnée peut être complétée en une seule session sans que la fenêtre de contexte de l'agent se remplisse.

### Guide de dimensionnement

**Trop petit** (overhead de coordination > bénéfice) :
- "Ajouter un import au fichier X"
- "Renommer une variable dans un fichier"

**Bonne taille** (un livrable clair) :
- "Implémenter le formulaire de connexion avec validation"
- "Écrire les tests unitaires pour le module UserService"
- "Ajouter le error handling à toutes les routes API"

**Trop grand** (le contexte se remplit, la qualité diminue) :
- "Construire tout le système d'authentification"
- "Refactorer tout le codebase en TypeScript"

### Viser 5-6 tâches par teammate

Assez granulaire pour suivre la progression sans se noyer dans la coordination.

## Patterns de dépendances

### Pipeline (séquentiel)
```
Tâche A → Tâche B → Tâche C
```

### Fan-Out (parallèle depuis une racine)
```
Setup → Tâche A
      → Tâche B
      → Tâche C
```

### Fan-In (parallèle convergeant)
```
Tâche A →
Tâche B → Tâche d'intégration
Tâche C →
```

### Diamond (fan-out + fan-in)
```
Setup → Tâche A →
      → Tâche B → Intégration
      → Tâche C →
```
Pattern le plus courant pour les builds de features : setup → travail parallèle → intégration.
