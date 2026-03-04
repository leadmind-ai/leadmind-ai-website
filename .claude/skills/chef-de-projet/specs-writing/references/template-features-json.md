# Structure de features.json

Fichier de suivi JSON de toutes les fonctionnalités du projet. Sauvegarder dans `docs/features.json`.

## Schema

```json
{
  "project": "Nom du projet",
  "version": "1.0",
  "generated_from": "docs/plans/YYYY-MM-DD-<sujet>-design.md",
  "features": [
    {
      "id": "F001",
      "name": "Nom de la fonctionnalité",
      "description": "Description en une phrase",
      "priority": "critical|high|medium|low",
      "prd_ref": "FR-01",
      "dependencies": [],
      "acceptance_criteria": [
        "Critère testable 1",
        "Critère testable 2"
      ],
      "passes": false,
      "notes": ""
    }
  ]
}
```

## Règles

- Les IDs suivent le format `F001`, `F002`, etc. (incrémental)
- `prd_ref` doit correspondre à un ID du PRD (FR-XX)
- `dependencies` ne référence que des IDs existants dans le même fichier
- `passes` est toujours `false` à la création — mis à `true` quand TOUS les critères d'acceptation passent
- `acceptance_criteria` DOIT être identique à ceux de la user story correspondante (source unique de vérité)
- `priority` DOIT être cohérente avec le PRD et la user story
