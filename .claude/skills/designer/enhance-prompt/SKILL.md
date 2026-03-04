---
name: enhance-prompt
description: "Transforme une idée ou description fonctionnelle vague en prompt Stitch optimisé. Ce skill devrait être utilisé quand l'utilisateur veut créer un design UI, améliorer un prompt Stitch, ou structurer un concept visuel avant génération. Ajoute des mots-clés UI/UX, injecte le design system, et structure la page en sections numérotées."
---

# Enhance Prompt — Optimisation de Prompts Stitch

## Vue d'ensemble

Transformer une description fonctionnelle brute en prompt optimisé pour Stitch (le moteur de design IA de Google). Enrichir la spécificité, ajouter des mots-clés UI/UX, injecter le contexte du design system, et structurer la sortie pour de meilleurs résultats de génération.

**Annoncer au démarrage :** "J'utilise le skill enhance-prompt pour optimiser votre description en prompt Stitch."

## Référence mots-clés

Le fichier `references/keywords-ui.md` contient le vocabulaire UI/UX complet de référence :
- Mots-clés composants (navigation, formulaires, layout...)
- Palettes d'adjectifs par ambiance (minimal, corporate, luxe, santé...)
- Terminologie rôles couleurs
- Descriptions de formes (arrondi → langage naturel)
- Patterns visuels tendance (glassmorphism, bento grid...)

Consulter ce fichier au début de chaque enrichissement pour disposer du vocabulaire adapté.

<HARD-GATE>
Ne PAS envoyer un prompt à Stitch (generate_screen_from_text) sans avoir d'abord présenté le prompt enrichi à l'utilisateur ET obtenu sa validation via AskUserQuestion. Le prompt doit toujours être approuvé avant génération.
</HARD-GATE>

## Pipeline d'enrichissement

### Étape 1 : Évaluer l'input

Évaluer ce qui manque dans le prompt de l'utilisateur :

| Élément | Vérifier | Si absent |
|---------|----------|-----------|
| **Plateforme** | "web", "mobile", "desktop" | Ajouter selon contexte ou demander via AskUserQuestion |
| **Type de page** | "landing page", "dashboard", "formulaire" | Déduire de la description |
| **Structure** | Sections numérotées / composants | Créer une structure logique |
| **Style visuel** | Adjectifs, ambiance, ton | Enrichir avec les palettes de `references/keywords-ui.md` |
| **Couleurs** | Valeurs hex ou rôles fonctionnels | Extraire de DESIGN.md ou proposer |
| **Composants** | Termes UI spécifiques | Traduire en mots-clés précis via `references/keywords-ui.md` |
| **Device type** | DESKTOP, MOBILE, TABLET | Déterminer pour le paramètre `deviceType` Stitch |

### Étape 2 : Vérifier DESIGN.md

Chercher un fichier `DESIGN.md` dans le projet actuel :

**Si DESIGN.md existe :**
1. Lire le fichier pour extraire le bloc design system (Section 6)
2. Inclure la palette de couleurs, typographie et styles de composants
3. Injecter comme section "DESIGN SYSTEM (REQUIRED)" dans la sortie

**Si DESIGN.md n'existe pas :**
1. Informer l'utilisateur via AskUserQuestion : proposer de créer un DESIGN.md (skill `design-md`) ou de continuer avec un design system ad hoc
2. Si continuation sans DESIGN.md, proposer un design system basé sur le contexte du projet

### Étape 3 : Appliquer les enrichissements

Appliquer les quatre techniques d'enrichissement. Consulter `references/keywords-ui.md` pour le vocabulaire précis.

#### A. Remplacer le langage vague par des mots-clés UI

Exemples :
- "menu en haut" → "barre de navigation avec logo à gauche et éléments de menu à droite"
- "des boutons" → "bouton d'action principal (CTA) avec coins arrondis et état hover"
- "un formulaire" → "carte formulaire centrée avec champs labellisés, états de validation et bouton de soumission"

#### B. Amplifier l'ambiance avec des descripteurs

Exemples :
- "moderne" → "épuré, minimal, avec des espaces blancs généreux et des ombres subtiles"
- "professionnel" → "sophistiqué, structuré en grille, palette de couleurs atténuées"

#### C. Structurer la page en sections numérotées

Organiser le contenu en hiérarchie claire — Stitch produit de meilleurs résultats avec des sections explicites :

```
**Page Structure:**
1. **Header:** Barre de navigation avec logo et éléments de menu
2. **Hero Section:** Titre accrocheur, sous-texte et CTA principal
3. **Contenu Principal:** [Description détaillée avec composants UI spécifiques]
4. **Footer:** Liens, icônes sociales, copyright
```

**Règle critique :** Toujours demander UNE SEULE PAGE LONGUE, pas section par section. Stitch produit de meilleurs résultats en générant la page complète.

#### D. Formater les couleurs correctement

Pattern obligatoire : `Nom Descriptif (#hexcode) pour rôle fonctionnel`

Exemples :
- "Bleu Océan Profond (#1a365d) pour les boutons principaux et liens"
- "Crème Chaleureux (#faf5f0) pour l'arrière-plan de page"

### Étape 4 : Formater la sortie

Assembler le prompt enrichi dans ce format exact :

```markdown
[Description en une ligne du but de la page et de l'ambiance]

**DESIGN SYSTEM (REQUIRED):**
- Platform: [Web/Mobile], [Desktop/Mobile]-first
- Theme: [Light/Dark], [descripteurs de style]
- Background: [Nom Couleur] (#hex)
- Surface: [Nom Couleur] (#hex) for cards/elevated elements
- Primary: [Nom Couleur] (#hex) for [rôle]
- Secondary: [Nom Couleur] (#hex) for [rôle]
- Text: [Primary] (#hex), [Secondary] (#hex)
- Font: [Famille], weights [liste]
- Corners: [Style en langage naturel]
- Shadows: [Style en langage naturel]

**Page Structure:**
1. **[Section]:** [Description détaillée avec éléments UI spécifiques]
2. **[Section]:** [Description détaillée]
...
```

### Étape 5 : Choix du modèle Stitch

Proposer le choix du modèle via `AskUserQuestion` :

```
Question : "Quel modèle Stitch utiliser pour la génération ?"
Options :
- "Gemini 3 Pro (haute qualité, plus lent)" — GEMINI_3_PRO
- "Gemini 3 Flash (rapide, bonne qualité)" — GEMINI_3_FLASH
```

### Étape 6 : Validation utilisateur

Présenter le prompt enrichi complet à l'utilisateur via `AskUserQuestion` :

```
Question : "Voici le prompt Stitch optimisé. Voulez-vous l'utiliser tel quel ?"
Options :
- "Valider et générer" — Le prompt est prêt
- "Modifier le prompt" — Demander les ajustements souhaités
- "Recommencer" — Repartir de zéro avec une autre approche
```

## Sortie

**Par défaut :** Retourner le prompt enrichi pour utilisation directe avec Stitch (`mcp__stitch__generate_screen_from_text`).

**Option fichier :** Si demandé, écrire dans :
- `next-prompt.md` — pour utilisation avec le skill `stitch-loop`
- Nom de fichier personnalisé spécifié par l'utilisateur

## Bonnes pratiques

1. **Être spécifique tôt** — Les inputs vagues nécessitent plus d'enrichissement
2. **Respecter l'intention** — Ne pas sur-designer si l'utilisateur veut simple
3. **Une seule page longue** — Ne jamais générer section par section
4. **Inclure le design system** — La cohérence est clé pour les projets multi-pages
5. **Un changement à la fois pour les éditions** — Ne pas mélanger des changements non liés
