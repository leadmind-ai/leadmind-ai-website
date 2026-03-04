# Portes de qualité

> Règle auto-chargée pour tous les teammates d'une équipe d'agents.

## Checklist avant complétion

Avant de marquer une tâche comme `completed`, vérifier TOUS les points suivants :

1. **Tests verts** : Exécuter la suite de tests du projet. Si des tests échouent, la tâche n'est pas terminée.
2. **Linter propre** : Aucune nouvelle erreur ou avertissement introduit par tes changements.
3. **Changements vérifiés** : Si aucune suite de tests n'existe, vérifier manuellement que les changements fonctionnent comme attendu.
4. **Critères d'acceptation satisfaits** : Relire la description de la tâche et confirmer que chaque critère est rempli.
5. **Pas d'implémentation partielle** : Tous les chemins de code sont complets. Aucun commentaire TODO dans le nouveau code.

Si un point échoue, garder la tâche en `in_progress` et corriger le problème avant de compléter.

## Approche TDD obligatoire

Chaque teammate doit suivre le cycle **Red-Green-Refactor** :

1. **RED** : Écrire un test qui échoue pour le comportement souhaité
2. **Vérifier RED** : Exécuter le test et confirmer qu'il échoue pour la bonne raison
3. **GREEN** : Écrire le code minimal pour faire passer le test
4. **Vérifier GREEN** : Exécuter le test et confirmer qu'il passe
5. **REFACTOR** : Nettoyer le code en gardant les tests verts

**Pas de code de production sans un test qui échoue d'abord.**

## Vérification avant toute déclaration de complétion

Avant de déclarer une tâche terminée :

- Exécuter la commande de vérification **dans ce message** (pas une exécution précédente)
- Lire la sortie complète et vérifier le code de retour
- Si la sortie confirme le succès : déclarer avec les preuves
- Si la sortie montre un échec : corriger et revérifier

**Pas de raccourcis. Exécuter la commande. Lire la sortie. PUIS déclarer le résultat.**

## Quand utiliser le mode plan

Spawner un teammate avec `mode: "plan"` quand sa tâche implique :

- Changements d'**authentification ou d'autorisation**
- **Migrations** de modèle de données ou de schéma
- Changements de **contrat API** (endpoints, formes de requête/réponse)
- Modifications d'**infrastructure** (CI/CD, déploiement, ressources cloud)
- **Suppression** de fonctionnalités existantes

Le teammate écrira un plan d'abord. Le lead valide avant que l'implémentation commence.

## Fix → Re-test obligatoire

Apres chaque correction de bug (commit `fix:`), le lead DOIT :
1. Relancer les tests QA du slice concerne (`/testeur-qa`)
2. Verifier que le fix corrige effectivement le probleme
3. Verifier qu'aucune regression n'est introduite

Ne jamais considerer un fix comme termine sans re-test.
Raison : Pattern observe — les fix-apres-fix en cascade montrent que les corrections ne sont pas revalidees (feedback-loop 2026-02-20, P3/P9).

## Revue croisée entre agents (optionnel)

Pour les changements critiques, le lead peut assigner une tâche de revue :

1. L'agent d'implémentation termine sa tâche et envoie un message au lead
2. Le lead crée une tâche de revue assignée à un agent différent
3. Le reviewer lit les fichiers de l'agent d'implémentation (lecture seule — il ne possède pas ces fichiers)
4. Le reviewer envoie ses observations au lead
5. Le lead crée des tâches de correction si nécessaire, assignées à l'implémenteur d'origine
