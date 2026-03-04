---
name: stitch-loop
description: "Boucle de construction autonome de sites multi-pages avec Stitch. Ce skill devrait être utilisé quand l'utilisateur veut construire un site complet page par page, avec un système de relais (baton) assurant la cohérence visuelle et la continuité entre chaque itération."
---

# Stitch Loop — Construction Multi-Pages

## Vue d'ensemble

Constructeur frontend autonome participant à une boucle itérative de construction de site. Chaque itération : lire la tâche courante depuis le fichier baton (`next-prompt.md`), générer une page via Stitch MCP, l'intégrer dans le site, et préparer les instructions pour l'itération suivante.

**Annoncer au démarrage :** "J'utilise le skill stitch-loop pour construire la prochaine page du site."

## Prérequis

**Obligatoires :**
- Accès au serveur MCP Stitch (outils `mcp__stitch__*`)
- Un projet Stitch (existant ou à créer)
- Un fichier `DESIGN.md` (le générer avec le skill `design-md` si nécessaire)
- Un fichier `SITE.md` documentant la vision et la roadmap du site

<HARD-GATE>
Ne PAS lancer une génération Stitch sans que DESIGN.md et SITE.md existent dans le projet. Si l'un des deux est manquant, informer l'utilisateur via AskUserQuestion et proposer de les créer d'abord (design-md pour DESIGN.md, ou écrire SITE.md manuellement).
</HARD-GATE>

## Le Système de Relais (Baton)

Le fichier `next-prompt.md` agit comme un relais entre les itérations :

```markdown
---
page: about
---
Page décrivant le fonctionnement du suivi adhérent.

**DESIGN SYSTEM (REQUIRED):**
[Copier depuis DESIGN.md Section 6]

**Page Structure:**
1. Header avec navigation
2. Explication du fonctionnement
3. Footer avec liens
```

**Règles critiques :**
- Le champ `page` dans le frontmatter YAML détermine le nom du fichier de sortie
- Le contenu du prompt DOIT inclure le bloc design system copié depuis DESIGN.md Section 6
- Mettre à jour ce fichier avant de terminer pour maintenir la boucle

## Protocole d'exécution

### Étape 1 : Lire le relais

Parser `next-prompt.md` pour extraire :
- **Nom de la page** depuis le champ frontmatter `page`
- **Contenu du prompt** depuis le corps markdown

### Étape 2 : Consulter les fichiers contexte

Avant de générer, lire ces fichiers :

| Fichier | But |
|---------|-----|
| `SITE.md` | Vision du site, **ID Projet Stitch**, pages existantes (sitemap), roadmap |
| `DESIGN.md` | Style visuel requis — copier la Section 6 dans chaque prompt |

**Vérifications obligatoires :**
- Sitemap — Ne PAS recréer une page qui existe déjà (vérifier les `[x]`)
- Roadmap — Prendre les tâches depuis ici si le backlog existe
- Liberté créative — Idées pour de nouvelles pages si la roadmap est vide

### Étape 3 : Générer avec Stitch

1. **Récupérer ou créer le projet** :
   - Si `stitch.json` existe, utiliser le `projectId` qu'il contient
   - Sinon, appeler `mcp__stitch__create_project` et sauvegarder l'ID dans `stitch.json`
2. **Générer l'écran** : Appeler `mcp__stitch__generate_screen_from_text` avec :
   - `projectId` : L'ID du projet
   - `prompt` : Le prompt complet du relais (incluant le bloc design system)
   - `deviceType` : `DESKTOP` (ou selon spécification dans SITE.md)
   - `modelId` : `GEMINI_3_PRO` pour la qualité, `GEMINI_3_FLASH` pour la vitesse
3. **Récupérer les assets** : Appeler `mcp__stitch__get_screen` pour obtenir :
   - `htmlCode.downloadUrl` — Télécharger et sauvegarder dans `queue/{page}.html`
   - `screenshot.downloadUrl` — Télécharger et sauvegarder dans `queue/{page}.png`

**Note :** La génération peut prendre 1-2 minutes. Ne PAS relancer si timeout — vérifier avec `get_screen` plus tard.

### Étape 4 : Intégrer dans le site

1. Déplacer le HTML de `queue/{page}.html` vers `site/public/{page}.html`
2. Corriger les chemins d'assets pour être relatifs au dossier public
3. Mettre à jour la navigation :
   - Trouver les liens placeholder (`href="#"`) et les câbler vers la nouvelle page
   - Ajouter la nouvelle page à la navigation globale si approprié
4. Assurer la cohérence headers/footers sur toutes les pages

### Étape 5 : Validation utilisateur

Présenter le résultat à l'utilisateur via `AskUserQuestion` :

```
Question : "La page {page} a été générée et intégrée. Que souhaitez-vous faire ?"
Options :
- "Continuer avec la page suivante" — Préparer le relais et boucler
- "Modifier cette page" — Régénérer ou ajuster via edit_screens
- "Arrêter la boucle" — Terminer la construction
```

### Étape 6 : Mettre à jour la documentation du site

Modifier `SITE.md` :
- Marquer la nouvelle page dans le Sitemap avec `[x]`
- Retirer l'idée consommée de la section Liberté Créative
- Mettre à jour la Roadmap si un élément du backlog a été complété

### Étape 7 : Préparer le relais suivant

Mettre à jour `next-prompt.md` avant de terminer — c'est ce qui maintient la boucle vivante.

1. **Décider la prochaine page** depuis la roadmap ou la liberté créative
2. **Écrire le relais** avec le frontmatter YAML correct et le bloc design system complet copié depuis DESIGN.md

## Structure de fichiers

```
projet/
├── next-prompt.md      # Le relais — tâche courante
├── stitch.json         # ID projet Stitch (à persister !)
├── DESIGN.md           # Design system visuel (depuis design-md)
├── SITE.md             # Vision du site, sitemap, roadmap
├── queue/              # Zone de staging pour la sortie Stitch
│   ├── {page}.html
│   └── {page}.png
└── site/public/        # Pages de production
    ├── index.html
    └── {page}.html
```

## Pièges courants à éviter

- Oublier de mettre à jour `next-prompt.md` (casse la boucle)
- Recréer une page qui existe déjà dans le sitemap
- Ne pas inclure le bloc design system (Section 6 de DESIGN.md) dans le prompt
- Laisser des liens placeholder (`href="#"`) au lieu de câbler la vraie navigation
- Oublier de persister `stitch.json` après la création d'un nouveau projet
- Relancer une génération en timeout — vérifier avec `get_screen` d'abord
