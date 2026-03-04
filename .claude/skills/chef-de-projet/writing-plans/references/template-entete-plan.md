# Template — En-tête du plan d'implémentation

Chaque plan DOIT commencer avec cet en-tête. Remplir les placeholders entre crochets.

```markdown
# [Nom de la fonctionnalité] — Plan d'implémentation

> **Pour Claude :** SKILL REQUIS : Utiliser superpowers:executing-plans pour implémenter ce plan tâche par tâche.

**Objectif :** [Une phrase décrivant ce que ce plan construit]

**Architecture :** [2-3 phrases sur l'approche technique retenue]

**Tech Stack :** [Technologies et librairies clés]

**Source :** [Chemin vers le design doc ou les specs d'origine]

---
```

## Notes

- Le lien vers `superpowers:executing-plans` dans l'en-tête permet à une future session Claude de savoir comment exécuter le plan
- Le champ **Source** assure la traçabilité vers le design doc ou le PRD
- Le séparateur `---` marque la fin de l'en-tête et le début des tâches
