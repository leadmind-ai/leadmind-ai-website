# Template — Design Doc

Sauvegarder dans `docs/plans/YYYY-MM-DD-<sujet>-design.md`. Remplir les placeholders entre crochets.

```markdown
# [Nom du projet / fonctionnalité] — Design Doc

> **Date** : YYYY-MM-DD
> **Statut** : Approuvé

---

## 1. Contexte et problème

[2-3 phrases décrivant le contexte et le problème à résoudre]

## 2. Objectifs

- [Objectif principal]
- [Objectif secondaire]
- [Objectif tertiaire]

## 3. Utilisateurs cibles

| Persona | Description | Besoin principal |
|---------|-------------|-----------------|
| [Persona 1] | [Description] | [Besoin] |
| [Persona 2] | [Description] | [Besoin] |

## 4. Approche retenue

**[Nom de l'approche]** — [Justification en 2-3 phrases]

### Approches considérées

| Approche | Avantages | Inconvénients | Verdict |
|----------|-----------|---------------|---------|
| [Approche 1] | [+] | [-] | Retenue |
| [Approche 2] | [+] | [-] | Écartée |
| [Approche 3] | [+] | [-] | Écartée |

## 5. Architecture

[Description de l'architecture : composants, responsabilités, interactions]

## 6. Fonctionnalités

| ID | Fonctionnalité | Priorité | Description |
|----|----------------|----------|-------------|
| F001 | [Nom] | Critical/High/Medium/Low | [Description] |
| F002 | [Nom] | Critical/High/Medium/Low | [Description] |

## 7. Flux de données

[Description des flux principaux entre composants]

## 8. Contraintes et décisions

- [Contrainte technique 1]
- [Décision de design 1 — justification]

## 9. Hors périmètre (YAGNI)

- [Fonctionnalité explicitement exclue 1]
- [Fonctionnalité explicitement exclue 2]

## 10. Critères de succès

- [Critère mesurable 1]
- [Critère mesurable 2]

## 11. Tech Stack

- **Frontend** : [technologies]
- **Backend** : [technologies]
- **Base de données** : [technologies]
- **Infra** : [technologies]
```

## Notes

- Les sections sont dimensionnées à leur complexité : quelques phrases si simple, 200-300 mots si nuancé
- La section "Hors périmètre" est obligatoire — YAGNI appliqué impitoyablement
- La section "Approches considérées" assure la traçabilité des décisions
- Le Tech Stack est nécessaire pour le skill `creer-global-rules-greenfield` qui en dépend
