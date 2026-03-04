# Template — Structure d'une tâche

Chaque tâche suit le cycle TDD : test → échec → implémentation → succès → commit.

````markdown
### Tâche N : [Nom du composant]

**Fichiers :**
- Créer : `chemin/exact/vers/fichier.ext`
- Modifier : `chemin/exact/vers/existant.ext:lignes`
- Test : `tests/chemin/exact/vers/test.ext`

**Étape 1 : Écrire le test qui échoue**

```language
// Code complet du test — pas de pseudo-code
```

**Étape 2 : Exécuter le test pour vérifier l'échec**

Commande : `[commande exacte de test]`
Attendu : ÉCHEC avec "[message d'erreur attendu]"

**Étape 3 : Écrire l'implémentation minimale**

```language
// Code complet — pas de "ajouter la validation ici"
```

**Étape 4 : Exécuter le test pour vérifier le succès**

Commande : `[commande exacte de test]`
Attendu : SUCCÈS

**Étape 5 : Committer**

```bash
git add [fichiers exacts]
git commit -m "feat: [description courte]"
```
````

## Règles impératives

- **Chemins exacts** — Toujours donner le chemin complet du fichier, jamais "dans le dossier src"
- **Code complet** — Inclure le code final, jamais "ajouter la validation" ou "implémenter la logique"
- **Commandes exactes** — Inclure la commande de test avec la sortie attendue
- **Une action par étape** — Chaque étape = 2-5 minutes de travail
- **Commits fréquents** — Un commit par tâche complétée, pas de gros commits groupés

## Granularité bite-sized

Chaque étape est UNE SEULE action :
- "Écrire le test qui échoue" — une étape
- "Exécuter le test pour vérifier l'échec" — une étape
- "Écrire l'implémentation minimale" — une étape
- "Exécuter le test pour vérifier le succès" — une étape
- "Committer" — une étape

Ne PAS regrouper plusieurs actions dans une même étape.
