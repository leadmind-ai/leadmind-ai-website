# Guide de création des documents de référence

Instructions pour générer les guides de référence on-demand dans `reference/`.

---

## Quand créer des guides de référence

Créer un guide de référence pour chaque type de tâche récurrent dans le projet :
- Construction d'endpoints API
- Création de composants React
- Ajout de modèles de base de données
- Écriture de tests d'intégration
- Implémentation d'authentification
- Création de pages/écrans

---

## Structure d'un guide de référence

Chaque guide doit suivre cette structure :

```markdown
# Guide : [Type de tâche]

> Utiliser ce guide quand [condition de déclenchement].

## Pattern général

[Vue d'ensemble de l'approche — 2-3 phrases]
[Diagramme ASCII ou arborescence si applicable]

## Étapes

### Étape 1 : [Action]

[Bloc de code montrant comment faire]

Règles :
- [Règle 1]
- [Règle 2]
- [Règle 3]

### Étape 2 : [Action]

[Bloc de code]

Règles :
- [Règle 1]
- [Règle 2]

[... 3-6 étapes au total]

## Checklist rapide

- [ ] [Étape 1 résumée]
- [ ] [Étape 2 résumée]
- [ ] [Validation / test]
```

---

## Contraintes

- **Longueur** : 50-200 lignes MAXIMUM par guide
- **Style** : Plus de code, moins d'explications
- **Spécificité** : Spécifique au projet, pas de conseils génériques
- **Exemples** : Basés sur les best practices et les patterns du projet
- **Actionnable** : Un développeur (ou agent) doit pouvoir suivre étape par étape

---

## Emplacement

Sauvegarder dans `reference/` à la racine du projet :

```
mon-projet/
├── reference/
│   ├── api-endpoints.md
│   ├── react-components.md
│   ├── database-models.md
│   ├── testing-integration.md
│   └── authentication.md
├── CLAUDE.md
└── ...
```

---

## Processus de création

1. **Analyser le codebase** : Identifier les patterns existants pour ce type de tâche
2. **Rechercher les best practices** : Utiliser Context7 MCP pour le tech stack, si nécessaire, recherche web.
3. **Rédiger le guide** : Suivre la structure ci-dessus
4. **Vérifier la cohérence** : S'assurer que le guide est cohérent avec CLAUDE.md
5. **Garder concis** : Si un guide dépasse 200 lignes, découper en sous-guides
