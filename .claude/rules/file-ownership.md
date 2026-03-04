# Propriété des fichiers

> Règle auto-chargée pour tous les teammates d'une équipe d'agents.

## La règle

**Un fichier source = un seul agent à la fois. Sans exception.**

Quand deux agents éditent le même fichier, les changements de l'un écrasent silencieusement ceux de l'autre. Il n'y a pas de mécanisme de merge — juste une perte de données.

## Exigences

### Chaque tâche doit déclarer la propriété

Chaque description de tâche doit inclure :

```
Fichiers que tu possèdes : [liste explicite des fichiers que cet agent peut éditer]
Fichiers en lecture seule : [liste des fichiers lisibles mais non éditables]
```

Si une tâche ne liste pas la propriété des fichiers, **demander au lead avant d'éditer quoi que ce soit**.

### Fichiers de configuration partagés

Les fichiers comme `package.json`, `tsconfig.json`, `.env`, `Cargo.toml` et configurations globales similaires sont édités **uniquement par le lead** ou par **un seul agent désigné**.

Ne jamais éditer un fichier de configuration partagé sans assignation explicite de propriété.

### Quand tu as besoin d'un fichier d'un autre agent

1. **Envoyer un message au propriétaire par son nom** en décrivant le changement nécessaire
2. Attendre qu'il fasse le changement, ou que le lead réassigne la propriété
3. **Ne jamais éditer un fichier que tu ne possèdes pas**, même pour un correctif d'une ligne

### Résolution de conflits

Si deux agents ont édité le même fichier :

1. Arrêter les deux agents sur ce fichier
2. Vérifier `git diff` pour voir quels changements garder
3. Le lead réassigne la propriété explicitement
4. L'agent propriétaire réconcilie les changements

## Exemple de déclaration de propriété

```
Fichiers que tu possèdes : src/auth/login.ts, src/auth/login.test.ts
Fichiers en lecture seule : src/types/user.ts, src/api/client.ts
```
