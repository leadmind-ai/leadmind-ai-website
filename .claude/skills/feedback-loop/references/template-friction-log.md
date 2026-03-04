# Template — Friction Log

> Ce template est utilisé pour créer `docs/friction-log.md` dans le projet cible.
> Les agents et l'utilisateur y loggent les frictions rencontrées pendant le développement.
> Le skill `/feedback-loop` consomme ce fichier pour en extraire des règles.

## Structure du fichier `docs/friction-log.md`

```markdown
# Friction Log — [Nom du Projet]

> Journal des frictions rencontrées pendant le développement.
> Consommé par `/feedback-loop` pour générer des règles d'amélioration.

## Comment logger une friction

Ajouter une ligne au tableau ci-dessous avec :
- **#** : numéro incrémental
- **Slice/Phase** : dans quel slice ou quelle phase la friction est apparue
- **Description** : ce qui s'est passé
- **Sévérité** : Low / Medium / High
- **Solution** : comment le problème a été résolu ou contourné
- **Statut** : Resolved / Workaround / Open / → Rule ajoutée

## Frictions

| # | Slice/Phase | Description | Sévérité | Solution | Statut |
|---|-------------|-------------|----------|----------|--------|
| 1 | [ex: Auth] | [description concise] | [Low/Med/High] | [solution appliquée] | [statut] |

## Résumé

- **Total frictions :** [N]
- **High :** [N]
- **Medium :** [N]
- **Low :** [N]
- **Open :** [N]

## Notes

[Observations générales, patterns récurrents pressentis, suggestions]
```

## Quand logger

| Moment | Qui | Quoi logger |
|--------|-----|-------------|
| Pendant un slice | Agents builders | Erreurs de config, incompatibilités, workarounds |
| Pendant les tests QA | Agent QA / Utilisateur | Échecs récurrents, tests flaky, problèmes UI |
| Pendant le devops | Agents infra/sécurité | Problèmes Docker, CI/CD, vulnérabilités |
| À tout moment | Utilisateur | Toute friction observée pendant l'utilisation |
