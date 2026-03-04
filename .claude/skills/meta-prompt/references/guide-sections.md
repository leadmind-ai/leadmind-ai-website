# Guide des Sections d'une Commande Slash

Référence détaillée pour rédiger chacune des 7 sections d'une commande slash personnalisée.

---

## Section 1 : Objectif

### Description

Aperçu en 1-3 phrases répondant à : "Quel problème cette commande résout-elle ?"

### Bonnes pratiques

**À faire :**
- Commencer par un verbe d'action (Génère, Analyse, Crée, Examine)
- Être spécifique sur ce que la commande accomplit
- Mentionner le résultat attendu

**À éviter :**
- Écrire de longs paragraphes
- Inclure des détails d'implémentation
- Dupliquer la description du frontmatter

### Bons exemples

```markdown
# Objectif

Génère un plan d'implémentation concis basé sur les exigences utilisateur et la documentation pertinente, puis le sauvegarde dans le répertoire specs pour référence future.
```

```markdown
# Objectif

Analyse les fichiers de code pour les vulnérabilités de sécurité courantes incluant l'injection SQL, XSS, les dépendances non sécurisées et les problèmes d'authentification. Fournit des résultats détaillés avec des suggestions de remédiation.
```

### Mauvais exemples

```markdown
# Objectif

Cette commande fait des trucs avec les fichiers. C'est utile quand on a besoin de travailler sur des choses.
```
*Trop vague — n'explique pas ce qu'elle fait réellement*

---

## Section 2 : Variables

### Description

Définit toutes les valeurs dynamiques et statiques utilisées dans la commande.

### Types

**Variables dynamiques (arguments) :**
- `$1` — Premier argument
- `$2`, `$3`... — Arguments suivants
- `$ARGUMENTS` — Tous les arguments en une seule chaîne

**Variables statiques (constantes) :**
- Valeurs de configuration (ex : `MAX_RESULTATS: 50`)
- Chemins par défaut (ex : `REPERTOIRE_SORTIE: "specs"`)
- Intervalles de temps (ex : `INTERVALLE_ATTENTE: 10 secondes`)

### Bonnes pratiques

- Utiliser MAJUSCULES_AVEC_TIRETS_BAS pour les noms
- Fournir des noms descriptifs (pas `VAR1`, `VAR2`)
- Mettre les variables dynamiques en premier, les statiques en second
- Ne pas définir des variables jamais utilisées dans le Workflow

### Exemples

**Variable dynamique unique :**
```markdown
## Variables

CHEMIN_FICHIER: $1
```

**Multiples avec statiques :**
```markdown
## Variables

# Variables dynamiques (entrée utilisateur)
URL_DEPOT: $1
NOM_BRANCHE: $2

# Configuration statique
TAILLE_FICHIER_MAX: 1000000
BRANCHE_DEFAUT: "main"
```

---

## Section 3 : Structure du Code

### Description

Organisation pertinente du projet. **OPTIONNELLE** — inclure uniquement quand la commande travaille avec des structures de répertoires spécifiques.

### Quand inclure

**Inclure quand :**
- La commande crée des fichiers dans des répertoires spécifiques
- La commande attend une certaine structure de projet
- Comprendre l'organisation est critique pour la tâche

**Omettre quand :**
- La commande travaille sur des fichiers uniques
- La structure n'importe pas
- La commande est agnostique au projet

### Exemple

```markdown
## Structure du Code

```
projet/
├── specs/          # Plans et spécifications
├── src/            # Code source
└── tests/          # Fichiers de test
```
```

---

## Section 4 : Instructions

### Description

Règles, contraintes et directives détaillées sous forme de puces. Définit les "garde-fous" de la tâche.

### Contenu à inclure

1. **Critères de succès** — Comment savoir quand c'est terminé
2. **Contraintes** — Ce qu'il ne faut PAS faire
3. **Standards de qualité** — Qualité du code, formatage
4. **Cas limites** — Scénarios spéciaux à gérer
5. **Utilisation des outils** — Quels outils et comment
6. **Gestion des erreurs** — Comment gérer les échecs

### Bonnes pratiques

- Utiliser des puces pour la clarté
- Être spécifique et actionnable
- Inclure des exemples quand utile
- Ordonner du plus important au moins important
- Garder sous 15 puces

### Exemples

**Simples :**
```markdown
## Instructions

- Se concentrer uniquement sur les problèmes critiques de sécurité
- Identifier les numéros de ligne spécifiques pour chaque problème
- Catégoriser par sévérité : Critique, Haute, Moyenne, Basse
- Fournir des suggestions de remédiation avec exemples de code
- NE PAS modifier le code, uniquement analyser et rapporter
```

**Orientées outils :**
```markdown
## Instructions

- Utiliser UNIQUEMENT les commandes git — pas de modifications de fichiers
- Afficher maximum 20 commits
- NE PAS exécuter de commandes git qui modifient l'historique (rebase, reset, etc.)
- Gérer gracieusement les fichiers manquants
```

---

## Section 5 : Workflow

### Description

Actions numérotées étape par étape que Claude exécute. La "recette" pour l'accomplissement de la tâche.

### Structure

Chaque workflow doit :
1. Être numéroté séquentiellement (1, 2, 3...)
2. Avoir des étapes claires et actionnables
3. Inclure l'utilisation des outils si nécessaire
4. S'écouler logiquement du début à la fin
5. Se terminer par une référence à la section Rapport

### Bonnes pratiques

**À faire :**
- Numéroter chaque étape
- Utiliser des verbes d'action (Lire, Analyser, Créer, Exécuter)
- Inclure des blocs de code pour les commandes
- Spécifier quels outils utiliser
- Décomposer les étapes complexes en sous-puces
- Référencer les variables par nom
- Terminer par : "Maintenant suivre la section `Rapport` pour rapporter le travail accompli"

**À éviter :**
- Langage vague ("faire des trucs", "vérifier des choses")
- Sauter des étapes importantes
- Supposer que Claude sait quoi faire
- Étapes trop longues ou complexes

### Exemples

**Linéaire simple :**
```markdown
## Workflow

1. Lire le fichier à CHEMIN_FICHIER en utilisant l'outil Read
2. Analyser pour les vulnérabilités de sécurité
3. Catégoriser les découvertes par sévérité
4. Générer des suggestions de remédiation
5. Maintenant suivre la section `Rapport` pour rapporter le travail accompli
```

**Multi-phases :**
```markdown
## Workflow

### Phase 1 : Scout (Analyse)

1. **(Créer Scout)** Exécuter `create_agent` pour l'analyse
2. **(Commander Scout)** Exécuter `command_agent` pour investiguer
3. **(Vérifier Scout)** Surveiller avec sleep + check_agent_status
4. **(Rapporter Scout)** Extraire et analyser les découvertes

### Phase 2 : Build (Implémentation)

5. **(Créer Build)** Exécuter `create_agent` pour l'implémentation
6. **(Commander Build)** Fournir les découvertes du scout comme contexte
7. **(Vérifier Build)** Surveiller avec la boucle sleep + vérification
8. **(Rapporter Build)** Rapporter les résultats d'implémentation
9. Maintenant suivre la section `Rapport` pour rapporter le travail accompli
```

---

## Section 6 : Rapport

### Description

Définit le format exact de sortie présenté à l'utilisateur. Assure des résultats cohérents et bien structurés.

### Bonnes pratiques

**À faire :**
- Utiliser des exemples de formatage markdown
- Montrer la structure exacte avec des placeholders (ex : `[nom-fichier]`, `[compte]`)
- Inclure les en-têtes de section
- Spécifier listes, tableaux, blocs de code
- Utiliser des noms de placeholder clairs

**À éviter :**
- Laisser le format ambigu
- Utiliser un générique "rapporter les résultats"
- Rendre trop rigide

### Exemples

**Rapport résumé :**
```markdown
## Rapport

Présenter les découvertes dans ce format :

## Revue de Sécurité : [nom-fichier]

**Total problèmes trouvés** : [compte]
**Répartition par sévérité** : Critique : [compte], Haute : [compte], Moyenne : [compte], Basse : [compte]
```

**Rapport de progression (multi-phases) :**
```markdown
## Rapport

Communiquer à l'utilisateur où vous en êtes à chaque étape :

1. **Phase Scout Démarrage** : "Création de l'agent scout pour analyser {DESCRIPTION_PROBLEME}..."
2. **Scout en Cours** : "L'agent scout analyse... (vérification toutes les {INTERVALLE_ATTENTE} secondes)"
3. **Scout Terminé** : "Analyse terminée. Découvertes clés : [résumé]"
4. **Résumé Final** : "Workflow terminé. Les deux agents disponibles pour inspection."
```

---

## Extended Thinking

Les commandes peuvent déclencher le mode de réflexion étendue en incluant des mots-clés comme `ultrathink` dans les instructions ou le workflow.

```markdown
## Instructions

- Réfléchir profondément (ultrathink) à la meilleure approche
```
