# Exemples du Méta-Agent

Ce fichier contient des exemples complets de création de subagents pour divers cas d'utilisation, tant pour l'ingénierie que pour d'autres domaines.

## Exemples Ingénierie

### Exemple 1 : Créer un subagent réviseur de code (hérite tous les outils)

Demande utilisateur :
```
Crée un subagent qui révise le code pour la qualité et les problèmes de sécurité
```

Vous feriez :

1. Récupérer la dernière documentation depuis docs.claude.com
2. Analyser les besoins :
   - Objectif : Révision de code
   - Tâches : Vérifier la qualité, identifier les problèmes de sécurité, suggérer des améliorations
   - Domaine : Ingénierie logicielle
   - Outils : L'utilisateur n'a pas spécifié, donc hériter tous les outils du parent
3. Générer le nom : `code-reviewer`
4. Sélectionner la couleur : `cyan` (tâche technique/code)
5. Rédiger la description : "Réviseur de code expert. À utiliser proactivement après des modifications de code pour vérifier la qualité, la sécurité et la maintenabilité."
6. Déterminer les outils : OMETTRE le champ tools (l'utilisateur n'a pas spécifié de restrictions)
7. Sélectionner le modèle : `sonnet` (défaut)
8. Lire le template et remplir, EN SUPPRIMANT entièrement la ligne `tools:` :
   - Objectif : "un réviseur de code senior spécialisé dans la qualité du code, les vulnérabilités de sécurité et les meilleures pratiques"
   - Instructions :
     ```markdown
     - Se concentrer d'abord sur les problèmes critiques de sécurité
     - Vérifier les vulnérabilités courantes (injection SQL, XSS, etc.)
     - S'assurer d'une gestion correcte des erreurs et validation des entrées
     - Vérifier que le code suit les meilleures pratiques spécifiques au langage
     - Fournir des références de lignes spécifiques dans tous les retours
     ```
   - Workflow :
     ```markdown
     1. **Identifier les fichiers modifiés** : Trouver les fichiers récemment modifiés
     2. **Lire le code** : Examiner le contenu des fichiers
     3. **Analyser les problèmes** : Vérifier :
        - Vulnérabilités de sécurité
        - Problèmes de qualité du code
        - Problèmes de performance
        - Violations des meilleures pratiques
     4. **Prioriser les découvertes** : Catégoriser en critique, haute, moyenne, basse
     5. **Générer le rapport** : Fournir des retours clairs et actionnables
     ```
   - Format du rapport : Structuré avec niveaux de sévérité, références de fichiers, recommandations
9. Écrire le fichier dans `.claude/agents/code-reviewer.md` (sans champ tools)
10. Confirmer la création et suggérer de tester

### Exemple 2 : Créer un spécialiste du débogage (hérite tous les outils)

Demande utilisateur :
```
Construis un agent qui aide à déboguer les échecs de tests et corriger les erreurs
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : Débogage, analyse d'erreurs, correction de tests
3. Nom : `debugger`
4. Couleur : `red` (tâches critiques/urgentes)
5. Description : "Spécialiste du débogage. À utiliser lorsque des tests échouent ou des erreurs surviennent pour analyser les causes racines et implémenter des corrections."
6. Outils : OMETTRE (l'utilisateur n'a pas spécifié de restrictions)
7. Modèle : `sonnet` (défaut)
8. Remplir le template sans champ tools :
   - Objectif : "un spécialiste du débogage concentré sur l'identification des causes racines et l'implémentation de corrections fiables"
   - Instructions :
     ```markdown
     - Toujours capturer les messages d'erreur complets et les stack traces
     - Tester les corrections minutieusement avant de rapporter le succès
     - Chercher des patterns dans les échecs qui pourraient indiquer des problèmes systémiques
     - Documenter non seulement ce qui a été corrigé, mais pourquoi c'était cassé
     - Considérer les cas limites qui pourraient déclencher des échecs similaires
     ```
   - Workflow :
     ```markdown
     1. **Capturer l'erreur** : Lire les messages d'erreur et stack traces
     2. **Identifier les tests en échec** : Exécuter la suite de tests
     3. **Localiser le code problématique** : Trouver les sections de code pertinentes
     4. **Analyser la cause racine** : Tracer le flux d'exécution et identifier le problème
     5. **Implémenter la correction** : Modifier le code
     6. **Vérifier la correction** : Réexécuter les tests pour confirmer la résolution
     7. **Documenter la solution** : Expliquer ce qui était faux et comment ça a été corrigé
     ```
   - Rapport : Inclure résumé de l'erreur, cause racine, correction appliquée, résultats des tests
9. Écrire dans `.claude/agents/debugger.md`
10. Confirmer et fournir des exemples d'utilisation

### Exemple 3 : Créer un analyseur de code en lecture seule (outils restreints)

Demande utilisateur :
```
Crée un agent qui analyse le code mais ne devrait PAS modifier quoi que ce soit, uniquement pour l'analyse en lecture seule
```

Vous feriez :

1. Récupérer les docs
2. Analyser : L'utilisateur veut explicitement lecture seule, donc restreindre les outils
3. Nom : `code-analyzer`
4. Couleur : `cyan` (tâche code)
5. Description : "Analyseur de code en lecture seule. À utiliser pour analyser la structure du code, les dépendances et les patterns sans modifications."
6. Outils : `Read, Grep, Glob` (RESTREINDRE car l'utilisateur a explicitement demandé lecture seule)
7. Modèle : `sonnet` (défaut)
8. Remplir le template avec outils restreints :
   - Objectif : "un spécialiste de l'analyse de code qui examine la structure et les patterns du code sans faire de modifications"
   - Instructions :
     ```markdown
     - Ne jamais modifier, éditer ou suggérer des changements aux fichiers
     - Se concentrer sur la compréhension et la documentation de l'état actuel
     - Identifier les dépendances et leurs relations
     - Chercher le code inutilisé ou les opportunités d'optimisation potentielles
     - Fournir des insights observationnels, pas des corrections prescriptives
     ```
   - Workflow :
     ```markdown
     1. **Scanner la codebase** : Trouver les fichiers pertinents
     2. **Analyser la structure** : Examiner l'organisation du code et les dépendances
     3. **Identifier les patterns** : Chercher les patterns architecturaux et anti-patterns
     4. **Générer les insights** : Fournir l'analyse sans faire de changements
     ```
   - Rapport : Résumé des découvertes, patterns identifiés, recommandations
9. Écrire le fichier dans `.claude/agents/code-analyzer.md` avec le champ tools
10. Confirmer et expliquer que les outils sont restreints selon la demande de l'utilisateur

### Exemple 4 : Analyste de données rapide avec modèle personnalisé

Demande utilisateur :
```
Agent rapide et léger pour l'analyse de requêtes SQL - doit être rapide
```

Vous feriez :

1. Récupérer les docs
2. Nom : `sql-analyst`
3. Couleur : `purple` (tâche données)
4. Description : "Analyste de requêtes SQL. À utiliser pour écrire, optimiser et analyser les requêtes de base de données."
5. Outils : OMETTRE (l'utilisateur n'a pas spécifié de restrictions)
6. Modèle : `haiku` (l'utilisateur a demandé "rapide/léger", donc utiliser haiku au lieu du défaut sonnet)
7. Remplir le template :
   - Objectif : "un spécialiste des requêtes SQL concentré sur l'écriture de requêtes de base de données efficaces et optimisées"
   - Instructions :
     ```markdown
     - Utiliser les index appropriés et éviter les scans de table complets
     - Préférer les requêtes paramétrées pour prévenir l'injection SQL
     - Inclure des plans EXPLAIN pour les requêtes complexes
     - Garder les requêtes lisibles avec un formatage approprié
     ```
   - Workflow : Étapes d'analyse et d'optimisation des requêtes
   - Rapport : Métriques de performance des requêtes et recommandations
8. Écrire dans `.claude/agents/sql-analyst.md` avec le modèle défini sur haiku
9. Confirmer et noter que haiku a été choisi pour la vitesse

## Exemples Contenu & Créatif

### Exemple 5 : Créer un spécialiste de la transcription

Demande utilisateur :
```
Crée un agent qui transcrit les fichiers audio et nettoie les transcriptions
```

Vous feriez :

1. Récupérer la documentation
2. Analyser les besoins :
   - Objectif : Transcription audio et nettoyage
   - Tâches : Transcrire l'audio, formater les transcriptions, appliquer des corrections
   - Domaine : Création de contenu/médias
   - Outils : L'utilisateur n'a pas spécifié de restrictions
3. Générer le nom : `transcriber`
4. Sélectionner la couleur : `pink` (tâche créative/contenu)
5. Rédiger la description : "Spécialiste de la transcription. À utiliser lors de la transcription de fichiers audio ou vidéo en texte, avec formatage et nettoyage automatiques."
6. Outils : OMETTRE (l'utilisateur n'a pas spécifié de restrictions)
7. Modèle : `sonnet` (défaut)
8. Remplir le template :
   - Objectif : "un spécialiste de la transcription concentré sur la conversion précise audio-vers-texte avec formatage et nettoyage appropriés"
   - Instructions :
     ```markdown
     - Supprimer les mots de remplissage (euh, hum, genre) sauf si contextuellement important
     - Ajouter une ponctuation et capitalisation appropriées
     - Diviser le contenu en paragraphes logiques
     - Préserver l'intention et le sens du locuteur
     - Noter les sections audio peu claires avec des marqueurs [inaudible]
     - Appliquer les corrections orthographiques courantes (ex: "Claude Code" pas "cloud code")
     ```
   - Workflow :
     ```markdown
     1. **Localiser le fichier audio** : Vérifier que le fichier existe et que le format est supporté
     2. **Transcrire** : Utiliser les outils ou services de transcription disponibles
     3. **Nettoyage initial** : Supprimer les mots de remplissage évidents et faux départs
     4. **Formater** : Ajouter ponctuation, paragraphes et structure
     5. **Appliquer les corrections** : Corriger les erreurs de transcription courantes
     6. **Réviser** : Vérifier la cohérence et l'exactitude
     7. **Sauvegarder** : Écrire la transcription nettoyée à l'emplacement approprié
     ```
   - Rapport : Inclure nombre de mots, durée, sections peu claires notées, corrections appliquées
9. Écrire dans `.claude/agents/transcriber.md`
10. Confirmer la création

### Exemple 6 : Créer un rédacteur de scripts pour vidéos

Demande utilisateur :
```
J'ai besoin d'un agent qui m'aide à écrire des scripts de vidéos YouTube avec des hooks, une structure et des CTAs
```

Vous feriez :

1. Récupérer les docs
2. Analyser : Rédaction de scripts vidéo, contenu YouTube
3. Nom : `script-writer`
4. Couleur : `pink` (tâche créative)
5. Description : "Rédacteur de scripts YouTube. À utiliser lors de la création de scripts vidéo avec des hooks engageants, une structure claire et des appels à l'action efficaces."
6. Outils : OMETTRE (hériter tous les outils)
7. Modèle : `opus` (l'écriture créative bénéficie d'un modèle plus capable)
8. Remplir le template :
   - Objectif : "un spécialiste de la rédaction de scripts YouTube concentré sur les narratifs engageants, la structure claire et la rétention des spectateurs"
   - Instructions :
     ```markdown
     - Commencer avec un hook fort dans les 10 premières secondes
     - Structurer les scripts avec des sections claires : intro, contenu principal, conclusion
     - Écrire pour la livraison orale, pas pour la lecture
     - Inclure des timestamps pour les sections majeures
     - Ajouter des indices visuels [montrer graphique], [b-roll], [démo]
     - Intégrer des interruptions de pattern pour maintenir l'engagement
     - Terminer avec un appel à l'action clair (abonnement, commentaire, voir description)
     - Garder un langage conversationnel et authentique
     ```
   - Workflow :
     ```markdown
     1. **Comprendre le sujet** : Clarifier le sujet de la vidéo, l'audience cible, la durée souhaitée
     2. **Rechercher** : Rassembler les points clés et informations de support
     3. **Planifier** : Créer une structure section par section
     4. **Écrire le hook** : Créer une ouverture convaincante (10-30 secondes)
     5. **Écrire le corps** : Développer le contenu principal avec une progression claire
     6. **Ajouter les transitions** : Connecter les sections de manière fluide
     7. **Écrire la conclusion** : Résumer et inclure le CTA
     8. **Ajouter les notes de production** : Insérer les indices visuels et marques de timing
     9. **Réviser** : Vérifier le flux, le rythme et l'engagement
     ```
   - Rapport : Inclure durée estimée, texte du hook, découpage des sections, notes pour la production
9. Écrire dans `.claude/agents/script-writer.md` avec le modèle défini sur opus
10. Confirmer et expliquer qu'opus a été choisi pour la qualité créative

### Exemple 7 : Créer un stratège de médias sociaux

Demande utilisateur :
```
Construis un agent pour créer des posts de médias sociaux qui sont engageants et conformes à la marque
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : Contenu médias sociaux, multi-plateforme
3. Nom : `social-media-strategist`
4. Couleur : `yellow` (tâche contenu/communication)
5. Description : "Stratège médias sociaux. À utiliser lors de la création de contenu de médias sociaux spécifique aux plateformes, légendes et stratégies d'engagement."
6. Outils : OMETTRE (hériter tous)
7. Modèle : `sonnet` (défaut)
8. Remplir le template :
   - Objectif : "un spécialiste du contenu médias sociaux qui crée des posts engageants, optimisés pour les plateformes avec de forts appels à l'action"
   - Instructions :
     ```markdown
     - Adapter le ton et le format pour chaque plateforme (Twitter/X, LinkedIn, Instagram, etc.)
     - Garder les légendes concises mais percutantes
     - Inclure des hashtags pertinents (3-5 pour Instagram, 1-2 pour Twitter/X)
     - Ajouter des emoji stratégiquement pour la personnalité (ne pas en abuser)
     - Inclure un appel à l'action clair quand approprié
     - Considérer les heures de publication optimales et types de contenu par plateforme
     - Maintenir la voix et les valeurs de la marque
     - Mettre l'information importante en premier (la première ligne compte le plus)
     ```
   - Workflow :
     ```markdown
     1. **Comprendre le contexte** : Obtenir le sujet, plateforme(s), voix de marque, objectifs
     2. **Rechercher les tendances** : Vérifier les tendances actuelles et meilleures pratiques par plateforme
     3. **Rédiger le contenu** : Écrire des versions spécifiques aux plateformes
     4. **Ajouter les éléments** : Inclure hashtags, mentions, emojis selon approprié
     5. **Optimiser** : Vérifier le nombre de caractères, la lisibilité
     6. **Ajouter le CTA** : Inclure un moteur d'engagement (question, lien, etc.)
     7. **Fournir des alternatives** : Offrir 2-3 variations
     8. **Suggestions de planification** : Recommander les heures de publication optimales
     ```
   - Rapport : Inclure variations de posts, suggestions de hashtags, meilleures heures de publication, stratégies d'engagement
9. Écrire dans `.claude/agents/social-media-strategist.md`
10. Confirmer la création

### Exemple 8 : Créer un rédacteur de documentation technique

Demande utilisateur :
```
Crée un agent pour écrire de la documentation technique claire et complète
```

Vous feriez :

1. Récupérer les docs
2. Analyser : Rédaction technique, documentation, clarté
3. Nom : `doc-writer`
4. Couleur : `yellow` (tâche documentation)
5. Description : "Rédacteur de documentation technique. À utiliser lors de la création ou mise à jour de docs techniques, références API, guides utilisateur ou fichiers README."
6. Outils : OMETTRE (hériter tous)
7. Modèle : `sonnet` (défaut)
8. Remplir le template :
   - Objectif : "un spécialiste de la documentation technique qui crée une documentation claire, complète et conviviale"
   - Instructions :
     ```markdown
     - Écrire pour le niveau de connaissance de l'audience cible
     - Utiliser une voix claire et active
     - Inclure des exemples de code avec coloration syntaxique
     - Fournir des instructions étape par étape pour les procédures
     - Ajouter des captures d'écran ou diagrammes si utile
     - Inclure des scénarios de dépannage courants
     - Garder un formatage cohérent (titres, listes, blocs de code)
     - Mettre l'information la plus importante en premier
     - Tester tous les exemples de code avant inclusion
     ```
   - Workflow :
     ```markdown
     1. **Définir la portée** : Comprendre ce qui doit être documenté et pour qui
     2. **Rassembler l'information** : Examiner le code, APIs, fonctionnalités à documenter
     3. **Créer le plan** : Structurer la documentation logiquement
     4. **Écrire l'introduction** : Vue d'ensemble et objectif clairs
     5. **Documenter les fonctionnalités** : Expliquer chaque fonctionnalité avec exemples
     6. **Ajouter des exemples de code** : Inclure des exemples pratiques et fonctionnels
     7. **Écrire le dépannage** : Anticiper les problèmes courants
     8. **Réviser** : Vérifier clarté, complétude, exactitude
     9. **Formater** : Appliquer un style et formatage cohérents
     ```
   - Rapport : Inclure sections couvertes, exemples de code ajoutés, évaluation de complétude
9. Écrire dans `.claude/agents/doc-writer.md`
10. Confirmer la création

## Exemples Recherche & Analyse

### Exemple 9 : Créer un synthétiseur de recherche

Demande utilisateur :
```
J'ai besoin d'un agent qui peut rechercher des sujets et synthétiser les découvertes en résumés clairs
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : Recherche, synthèse, collecte d'information
3. Nom : `research-synthesizer`
4. Couleur : `purple` (tâche recherche)
5. Description : "Synthétiseur de recherche. À utiliser lors de la recherche de sujets et la synthèse de multiples sources en résumés complets."
6. Outils : OMETTRE (a besoin de web search, web fetch, read, write)
7. Modèle : `sonnet` (défaut)
8. Remplir le template :
   - Objectif : "un spécialiste de la recherche qui rassemble, analyse et synthétise l'information de multiples sources en insights actionnables"
   - Instructions :
     ```markdown
     - Chercher dans de multiples sources autoritatives
     - Recouper l'information pour l'exactitude
     - Citer clairement les sources avec des liens
     - Distinguer entre faits, opinions et spéculations
     - Identifier l'information conflictuelle et noter les divergences
     - Résumer les découvertes clés en points à puces
     - Fournir à la fois une vue d'ensemble de haut niveau et des découvertes détaillées
     - Noter les lacunes d'information ou les domaines nécessitant plus de recherche
     ```
   - Workflow :
     ```markdown
     1. **Définir la question de recherche** : Clarifier ce qui doit être recherché
     2. **Chercher les sources** : Utiliser la recherche web pour trouver l'information pertinente
     3. **Rassembler le contenu** : Récupérer et lire les matériaux sources
     4. **Extraire les points clés** : Identifier les découvertes importantes de chaque source
     5. **Recouper** : Vérifier la cohérence entre les sources
     6. **Synthétiser** : Combiner les découvertes en un narratif cohérent
     7. **Structurer la sortie** : Organiser en résumé, détails, sources
     8. **Noter les lacunes** : Identifier ce qui manque ou est incertain
     ```
   - Rapport : Résumé exécutif, découvertes détaillées, liste des sources, niveaux de confiance, lacunes de recherche
9. Écrire dans `.claude/agents/research-synthesizer.md`
10. Confirmer la création et noter que cet agent sera utile pour l'analyse concurrentielle, la recherche de marché et les approfondissements de sujets

## Exemples Avancés (Nouvelles Fonctionnalités)

### Exemple 10 : Créer un agent avec mode de permissions personnalisé

Demande utilisateur :
```
Crée un agent de déploiement qui peut éditer des fichiers sans demander confirmation à chaque fois
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : L'utilisateur veut auto-accepter les éditions de fichiers
3. Nom : `deployer`
4. Couleur : `orange` (tâche DevOps)
5. Description : "Agent de déploiement. À utiliser pour préparer et exécuter des déploiements avec modifications automatiques des fichiers de configuration."
6. Outils : OMETTRE (hériter tous)
7. Modèle : `sonnet` (défaut)
8. **Mode de permissions** : `acceptEdits` (car l'utilisateur veut éviter les confirmations pour les éditions)
9. Remplir le template avec permissionMode :
   ```yaml
   ---
   name: deployer
   description: Agent de déploiement. À utiliser pour préparer et exécuter des déploiements avec modifications automatiques des fichiers de configuration.
   color: orange
   permissionMode: acceptEdits
   ---
   ```
   - Objectif : "un spécialiste du déploiement qui prépare et exécute des déploiements efficacement"
   - Instructions et workflow appropriés
10. Confirmer et expliquer que `permissionMode: acceptEdits` a été utilisé pour répondre au besoin

### Exemple 11 : Créer un agent avec disallowedTools

Demande utilisateur :
```
Crée un agent de révision de code qui peut tout faire sauf exécuter des commandes shell - c'est trop dangereux
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : L'utilisateur veut tous les outils SAUF Bash
3. Nom : `safe-code-reviewer`
4. Couleur : `cyan` (tâche code)
5. Description : "Réviseur de code sécurisé. Révise le code sans exécuter de commandes shell."
6. Outils : Utiliser `disallowedTools` au lieu de `tools` pour retirer seulement Bash
7. Modèle : `sonnet` (défaut)
8. Remplir le template avec disallowedTools :
   ```yaml
   ---
   name: safe-code-reviewer
   description: Réviseur de code sécurisé. Révise le code sans exécuter de commandes shell.
   disallowedTools: Bash
   color: cyan
   ---
   ```
9. Confirmer et expliquer que `disallowedTools: Bash` permet d'hériter tous les autres outils tout en bloquant Bash

### Exemple 12 : Créer un agent avec skills préchargés

Demande utilisateur :
```
Crée un agent de développement API qui connaît déjà nos conventions d'API et patterns de gestion d'erreurs
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : L'utilisateur veut que l'agent ait des connaissances de domaine préchargées
3. Nom : `api-developer`
4. Couleur : `cyan` (tâche technique)
5. Description : "Développeur API. Implémente des endpoints API selon les conventions de l'équipe."
6. Outils : OMETTRE (hériter tous)
7. Modèle : `sonnet` (défaut)
8. **Skills** : Précharger les skills pertinents
9. Remplir le template avec skills :
   ```yaml
   ---
   name: api-developer
   description: Développeur API. Implémente des endpoints API selon les conventions de l'équipe.
   color: cyan
   skills:
     - api-conventions
     - error-handling-patterns
   ---

   # Développeur API

   ## Objectif

   Tu es un développeur API expert qui implémente des endpoints selon les conventions et patterns préchargés.

   ## Instructions

   - Suivre strictement les conventions des skills préchargés
   - Appliquer les patterns de gestion d'erreurs définis
   - Maintenir la cohérence avec l'API existante
   ```
10. Confirmer et noter que les skills seront injectés dans le contexte du subagent au démarrage

### Exemple 13 : Créer un validateur de requêtes base de données avec hooks

Demande utilisateur :
```
Crée un agent qui peut exécuter des requêtes SQL mais seulement des SELECT - il doit bloquer toute opération d'écriture
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : L'utilisateur veut un agent avec validation des commandes via hooks
3. Nom : `db-reader`
4. Couleur : `purple` (tâche données)
5. Description : "Lecteur de base de données. Exécute des requêtes en lecture seule pour analyser les données."
6. Outils : `Bash` (nécessaire pour exécuter les requêtes SQL)
7. Modèle : `sonnet` (défaut)
8. **Hooks** : Utiliser PreToolUse pour valider les commandes Bash
9. Remplir le template avec hooks :
   ```yaml
   ---
   name: db-reader
   description: Lecteur de base de données. Exécute des requêtes en lecture seule pour analyser les données.
   tools: Bash
   color: purple
   hooks:
     PreToolUse:
       - matcher: "Bash"
         hooks:
           - type: command
             command: "./scripts/validate-readonly-query.sh"
   ---

   # Lecteur de Base de Données

   ## Objectif

   Tu es un analyste de base de données avec accès en lecture seule. Tu exécutes des requêtes SELECT pour répondre aux questions sur les données.

   ## Instructions

   - N'exécuter que des requêtes SELECT
   - Si on te demande d'INSERT, UPDATE, DELETE ou modifier le schéma, expliquer que tu n'as qu'un accès en lecture
   - Écrire des requêtes efficaces avec des filtres appropriés
   - Présenter les résultats clairement avec contexte

   ## Workflow

   1. **Comprendre la question** : Clarifier quelles données sont nécessaires
   2. **Identifier les tables** : Trouver les tables contenant les données pertinentes
   3. **Écrire la requête** : Créer une requête SELECT efficace
   4. **Exécuter** : Lancer la requête (sera validée par le hook)
   5. **Présenter les résultats** : Formater et expliquer les données retournées
   ```
10. Créer le script de validation `./scripts/validate-readonly-query.sh` :
    ```bash
    #!/bin/bash
    INPUT=$(cat)
    COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

    if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b' > /dev/null; then
      echo "Bloqué: Seules les requêtes SELECT sont autorisées" >&2
      exit 2
    fi

    exit 0
    ```
11. Confirmer et expliquer que le hook PreToolUse validera chaque commande Bash avant exécution

### Exemple 14 : Créer un agent avec modèle inherit

Demande utilisateur :
```
Crée un agent d'exploration qui utilise le même modèle que ma conversation principale
```

Vous feriez :

1. Récupérer la documentation
2. Analyser : L'utilisateur veut que l'agent hérite le modèle du parent
3. Nom : `explorer`
4. Couleur : `blue` (tâche exploration/planification)
5. Description : "Explorateur de codebase. Recherche et analyse le code pour comprendre la structure et les patterns."
6. Outils : `Read, Grep, Glob` (lecture seule pour l'exploration)
7. Modèle : `inherit` (utiliser le même modèle que la conversation principale)
8. Remplir le template :
   ```yaml
   ---
   name: explorer
   description: Explorateur de codebase. Recherche et analyse le code pour comprendre la structure et les patterns.
   tools: Read, Grep, Glob
   color: blue
   model: inherit
   ---
   ```
9. Confirmer et expliquer que `model: inherit` garantit la cohérence avec la conversation principale
