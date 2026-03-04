---
name: design-md
description: "Analyse un projet Stitch existant et synthétise un Design System sémantique dans un fichier DESIGN.md. Ce skill devrait être utilisé après une première génération Stitch pour extraire la palette, typographie et styles de composants, garantissant la cohérence visuelle sur toutes les pages suivantes."
---

# Design-MD — Extraction du Design System

## Vue d'ensemble

Analyser les assets techniques d'un projet Stitch (HTML, captures d'écran, métadonnées) et synthétiser un "Design System Sémantique" dans un fichier `DESIGN.md`. Ce fichier sert de source de vérité pour prompter Stitch à générer de nouveaux écrans cohérents avec le langage visuel existant.

**Annoncer au démarrage :** "J'utilise le skill design-md pour extraire le design system de votre projet Stitch."

## Prérequis

- Accès au serveur MCP Stitch (outils `mcp__stitch__*`)
- Un projet Stitch avec au moins un écran designé
- Guide Stitch Effective Prompting : https://stitch.withgoogle.com/docs/learn/prompting/

## Template de référence

Le template du DESIGN.md se trouve dans `references/template-design-system.md`. Le lire avant de rédiger. Ce template contient :
- Structure complète en 6 sections (thème, couleurs, typo, composants, layout, bloc prompt)
- Exemples de noms descriptifs et rôles fonctionnels
- Le bloc "Design System pour Prompts Stitch" à copier dans chaque génération

<HARD-GATE>
Ne PAS écrire le fichier DESIGN.md sans avoir d'abord présenté la synthèse complète à l'utilisateur ET obtenu sa validation via AskUserQuestion. Le design system doit toujours être approuvé avant écriture.
</HARD-GATE>

## Récupération des données via MCP Stitch

### 1. Recherche du projet

Si l'ID du projet n'est pas fourni :
- Appeler `mcp__stitch__list_projects` pour lister les projets
- Identifier le projet cible par son titre
- Extraire l'ID projet du champ `name` (ex: `projects/13534454087919359824`)

### 2. Recherche des écrans

Si l'ID de l'écran n'est pas fourni :
- Appeler `mcp__stitch__list_screens` avec le `projectId` (juste l'ID numérique)
- Identifier l'écran cible par son titre
- Extraire l'ID écran du champ `name`

### 3. Récupération des métadonnées écran

- Appeler `mcp__stitch__get_screen` avec `projectId` et `screenId`
- Données retournées :
  - `screenshot.downloadUrl` — Référence visuelle du design
  - `htmlCode.downloadUrl` — Code HTML/CSS source complet
  - `width`, `height`, `deviceType` — Dimensions et plateforme cible

### 4. Récupération du thème projet

- Appeler `mcp__stitch__get_project` avec le `name` complet (`projects/{id}`)
- Extraire l'objet `designTheme` : mode couleur, polices, arrondis, couleurs personnalisées

### 5. Téléchargement et analyse HTML

- Utiliser `WebFetch` pour télécharger le HTML depuis `htmlCode.downloadUrl`
- Parser le HTML pour extraire :
  - Classes Tailwind (couleurs, espacements, arrondis)
  - CSS personnalisé (variables, animations)
  - Patterns de composants (cartes, boutons, navigation)

## Instructions d'analyse et synthèse

### 1. Extraire l'identité du projet
- Titre du projet
- ID spécifique du projet

### 2. Définir l'atmosphère
Évaluer la capture d'écran et la structure HTML pour capturer l'ambiance globale. Utiliser des adjectifs évocateurs (ex: "Aérien", "Dense", "Minimaliste", "Utilitaire", "Rassurant").

### 3. Cartographier la palette de couleurs
Pour chaque couleur, fournir trois éléments obligatoires :
- **Nom descriptif** en langage naturel (ex: "Bleu-Marine Profond et Atténué")
- **Code hex exact** entre parenthèses (ex: "#294056")
- **Rôle fonctionnel** spécifique (ex: "Utilisé pour les actions principales")

### 4. Traduire la géométrie et les formes
Convertir les valeurs techniques en descriptions physiques :
- `rounded-full` → "En forme de pilule"
- `rounded-lg` → "Coins subtilement arrondis"
- `rounded-none` → "Bords nets et carrés"

### 5. Décrire la profondeur et l'élévation
Expliquer comment l'UI gère les couches. Décrire la présence et la qualité des ombres (ex: "Plat", "Ombres diffuses à peine perceptibles", "Ombres lourdes à fort contraste").

### 6. Assembler le DESIGN.md

Suivre exactement la structure du template `references/template-design-system.md` :
1. Thème Visuel & Atmosphère
2. Palette de Couleurs & Rôles
3. Règles Typographiques
4. Styles de Composants
5. Principes de Layout
6. **Bloc Design System pour Prompts Stitch** — section critique, condensé à copier-coller dans chaque prompt

## Validation utilisateur

Présenter la synthèse complète à l'utilisateur via `AskUserQuestion` avant d'écrire le fichier :

```
Question : "Voici le design system extrait. Voulez-vous que je crée le DESIGN.md ?"
Options :
- "Créer le DESIGN.md" — Écrire le fichier dans le projet
- "Ajuster la palette" — Modifier les couleurs ou rôles
- "Ajuster l'ambiance" — Modifier le ton, les descripteurs de style
- "Recommencer" — Ré-analyser un autre écran de référence
```

## Directives de sortie

- **Langage :** Terminologie design descriptive et langage naturel — jamais de jargon CSS brut
- **Format :** Markdown propre suivant le template de référence
- **Précision :** Codes hex exacts accompagnés de noms descriptifs
- **Contexte :** Expliquer le "pourquoi" des décisions design, pas seulement le "quoi"

## Pièges courants à éviter

- Utiliser du jargon technique sans traduction (ex: "rounded-xl" au lieu de "coins généreusement arrondis")
- Omettre les codes couleurs ou n'utiliser que les noms descriptifs
- Oublier d'expliquer les rôles fonctionnels des éléments design
- Être trop vague dans les descriptions d'atmosphère
- Ignorer les détails subtils comme les ombres ou les patterns d'espacement
- Oublier la Section 6 (bloc condensé) — c'est la section la plus utilisée au quotidien
