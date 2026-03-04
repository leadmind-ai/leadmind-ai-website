# Template DESIGN.md

Utiliser ce template pour créer un fichier `DESIGN.md` pour tout projet. Ce document sert de source de vérité pour une génération design cohérente sur toutes les pages.

## Comment créer

### Option A : Depuis un écran Stitch existant (recommandé)

1. Utiliser `mcp__stitch__list_projects` pour trouver le projet
2. Utiliser `mcp__stitch__list_screens` pour trouver un écran de référence
3. Utiliser `mcp__stitch__get_screen` pour récupérer capture et HTML
4. Télécharger le HTML et l'analyser
5. Utiliser `mcp__stitch__get_project` pour extraire le `designTheme`
6. Remplir le template ci-dessous

### Option B : Depuis zéro

Remplir le template ci-dessous selon la vision et préférences de l'utilisateur.

---

## Template

```markdown
# Design System : [Titre du Projet]
**Project ID :** [ID Projet Stitch]

## 1. Thème Visuel & Atmosphère

**Ambiance :** [2-4 adjectifs évocateurs, ex: "Aérien, minimaliste, avec une touche tech-forward"]
**Mood :** [Décrire le ressenti : professionnel, ludique, luxueux, technique, etc.]
**Inspiration :** [Référencer des styles : "Esthétique terminal", "Glassmorphism", "Bento grid", etc.]

## 2. Palette de Couleurs & Rôles

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Background | [ex: Toile de Minuit] | #0a0a0a | Arrière-plan de page, couche de base |
| Surface | [ex: Ardoise Carte] | #1a1a2e | Arrière-plans de cartes, éléments en élévation |
| Primary | [ex: Indigo Électrique] | #6366f1 | CTAs, boutons principaux, liens clés |
| Secondary | [ex: Lavande Douce] | #a78bfa | Actions secondaires, mises en avant |
| Accent | [ex: Menthe Néon] | #34d399 | États succès, highlights spéciaux |
| Text Primary | [ex: Blanc Pur] | #ffffff | Titres, texte important |
| Text Secondary | [ex: Gris Brumeux] | #9ca3af | Corps de texte, descriptions |
| Border | [ex: Ligne Murmure] | #374151 | Séparateurs, bordures de cartes |

## 3. Règles Typographiques

| Élément | Police | Graisse | Taille | Style |
|---------|--------|---------|--------|-------|
| H1 | [ex: Inter] | Bold (700) | 3rem | Tracking serré |
| H2 | [ex: Inter] | Semibold (600) | 2rem | - |
| H3 | [ex: Inter] | Medium (500) | 1.5rem | - |
| Body | [ex: Inter] | Regular (400) | 1rem | Interligne aéré |
| Caption | [ex: JetBrains Mono] | Regular (400) | 0.875rem | Monospace pour code/données |

## 4. Styles de Composants

### Boutons
- **Principal :** [Couleur fond primary], [couleur texte], [rayon coins], [padding]
- **Secondaire :** [Style outline/ghost], [couleur bordure], [couleur texte]
- **Hover :** [Décrire l'effet : glow, assombrissement, scale, etc.]

### Cartes
- **Fond :** [Couleur surface]
- **Bordure :** [Style : 1px solid border-color, none, gradient]
- **Ombre :** [Décrire : none, subtile diffuse, drop shadow prononcée]
- **Coins :** [rounded-lg, rounded-xl, sharp, pill]

### Inputs
- **Fond :** [Couleur]
- **Bordure :** [Couleur, style au focus]
- **Placeholder :** [Couleur, style]

### Navigation
- **Style :** [Sticky/fixed, transparent, solid]
- **Layout :** [Logo à gauche, liens centre/droite, CTA à droite]

## 5. Principes de Layout

- **Largeur max :** [ex: 1280px]
- **Grille :** [ex: 12 colonnes, flexible]
- **Échelle d'espacement :** [ex: base 4px : 4, 8, 16, 24, 32, 48, 64]
- **Sections :** [Fonds alternés pleine largeur / contenu centré / bord à bord]

## 6. Bloc Design System pour Prompts Stitch

Copier ce bloc dans CHAQUE prompt de génération Stitch :

> **DESIGN SYSTEM (REQUIRED):**
> - Platform: Web, desktop-first
> - Theme: [Light/Dark], [adjectifs atmosphère]
> - Background: [Nom] (#hex)
> - Surface: [Nom] (#hex)
> - Primary: [Nom] (#hex) for [rôle]
> - Secondary: [Nom] (#hex) for [rôle]
> - Accent: [Nom] (#hex) for [rôle]
> - Text: [Primary nom] (#hex), [Secondary nom] (#hex)
> - Font: [Famille], weights [liste]
> - Corners: [Style]
> - Shadows: [Style]
> - Max Width: [valeur]
```

## Conseils pour un DESIGN.md de qualité

1. **Utiliser un langage évocateur** — "Ombres diffuses à peine perceptibles" pas juste "ombres subtiles"
2. **Toujours inclure les codes hex** à côté des noms descriptifs
3. **Expliquer les rôles fonctionnels** pour chaque couleur
4. **Décrire la géométrie en termes physiques** — "En forme de pilule" pas `rounded-full`
5. **Garder le Bloc Design System concis** — Il doit rentrer dans chaque prompt Stitch
