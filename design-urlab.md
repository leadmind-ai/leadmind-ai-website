# Design Document : Replication Animation "3 Steps" de urlab.ai

> Analyse technique extraite via Firecrawl (HTML brut, branding) et Playwright (CSS computed, Webflow IX2 interactions, screenshots).
> Objectif : reproduire l'animation sur le site leadmind-ai avec Next.js + Framer Motion + Tailwind CSS.

---

## 1. Vue d'ensemble de l'animation

Le site urlab.ai utilise un pattern **"Sticky Stacking Cards"** pour sa section "3 Steps to Actuarial Industrialization". En scrollant, chaque carte de phase se superpose a la precedente avec un effet de scale progressif (0.9 -> 1.0), creant un effet d'empilement visuel fluide.

### Sections animees identifiees

| Section | Pattern d'animation | Trigger |
|---------|---------------------|---------|
| Hero (3 panneaux) | Parallax sticky + resize | Scroll continu |
| Pain Points (3 cards) | Fade-in echelonne | Scroll into view |
| **3 Steps (Phases)** | **Sticky stacking + scale** | **Scroll continu** |
| Use Cases (6 cards) | Fade-in echelonne | Scroll into view |
| Banner CTA | Fade-in | Scroll into view |

---

## 2. Architecture HTML de la section "3 Steps"

```
section.section-4 (fond sombre)
  └── .steps-wrapper (flex-column, gap: 96px, margin-top: 128px)
      ├── .header
      │   ├── tag badge ("Features | Explore now ->")
      │   ├── heading ("The 3 Steps to...")
      │   └── sous-titre (opacity: 0.6)
      │
      └── .steps-stack-component (flex-column, gap: 18px)
          │
          ├── .steps-item [position: sticky, top: ~69px]  -- Phase 01
          │   └── .steps-card [display: grid, 2 colonnes 50/50]
          │       ├── .left-content [padding: 96px 80px]
          │       │   └── .steps-content [flex-column, gap: 16px]
          │       │       ├── .steps-tag [pill: "Phase | 01"]
          │       │       ├── .heading [titre de la phase]
          │       │       └── .steps-description [opacity: 0.7]
          │       └── .right-content
          │           └── .steps-image [position: absolute, cover]
          │               └── img
          │
          ├── .steps-item  -- Phase 02
          │   └── (meme structure)
          │
          └── .steps-item  -- Phase 03
              └── (meme structure)
```

---

## 3. Animations detaillees (Webflow IX2)

### 3.1. Sticky Stacking (animation principale)

**Type** : `SCROLLING_IN_VIEW` (animation continue liee au scroll)

**Configuration** :
- `smoothing: 90` (lissage eleve pour fluidite)
- `startsEntering: true`
- `addStartOffset: 10%`
- `will-change: transform`

**Comportement** :
1. Chaque `.steps-item` a `position: sticky` et `top: ~69px`
2. En scrollant, l'element se **scale de `0.9` a `1.0`** proportionnellement a la progression du scroll
3. Les cartes s'empilent : la carte suivante "pousse" visuellement la precedente
4. Le `gap: 18px` entre les items cree un espace de scroll entre chaque carte

**Transform initial** : `transform: matrix(0.9, 0, 0, 0.9, 0, 0)` (scale 0.9)
**Transform final** : `transform: matrix(1, 0, 0, 1, 0, 0)` (scale 1.0)

### 3.2. Fade-in initial

**Type** : `SCROLL_INTO_VIEW` (animation declenchee une fois)

- `.steps-stack-component` : `opacity: 0 -> 1`, delay 150ms
- `.header` : fade-in depuis le bas, delay 250ms, offset 15%

### 3.3. Pain Points Cards (section precedente)

**Type** : `SCROLL_INTO_VIEW`

- Card 01 : delay 250ms, direction BOTTOM, offset 15%
- Card 02 : delay 350ms, direction BOTTOM, offset 15%
- Card 03 : delay 450ms, direction BOTTOM, offset 15%
- Background passe de `rgb(255, 255, 255)` a `rgb(4, 15, 37)` (dark)

---

## 4. Specifications CSS exactes

### 4.1. Steps Wrapper

```css
.steps-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  margin-top: 128px;
  width: 100%;
  max-width: 1200px;
}
```

### 4.2. Steps Stack Component

```css
.steps-stack-component {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}
```

### 4.3. Steps Item (carte sticky)

```css
.steps-item {
  position: sticky;
  top: 69px; /* sous la navbar */
  will-change: transform;
  transform: scale(0.9); /* etat initial, anime vers 1.0 au scroll */
}
```

### 4.4. Steps Card (contenu)

```css
.steps-card {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 50/50 */
  background-color: #040F25;
  border: 1px solid #393939;
  overflow: hidden;
  height: ~423px;
}
```

### 4.5. Left Content

```css
.left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 32px;
  padding: 96px 80px;
}
```

### 4.6. Steps Tag (badge "Phase | 01")

```css
.steps-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #FFBF56;
  border-radius: 37px;
}

.steps-tag .label {
  font-weight: 700;
  color: #040F25; /* ou blanc selon theme */
}

.steps-tag .number {
  opacity: 0.7;
  font-weight: 500;
}

/* Separateur vertical */
.steps-tag .divider {
  width: 1px;
  height: 16px;
  background-color: #FFBF56;
}
```

### 4.7. Right Content (image)

```css
.right-content {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.steps-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.steps-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 5. Palette de couleurs

| Role | Couleur | CSS |
|------|---------|-----|
| Background principal | Bleu tres sombre | `#040F25` / `rgb(4, 15, 37)` |
| Accent primaire (CTA) | Or/ambre | `#EBBA28` |
| Accent secondaire (borders tags) | Or clair | `#FFBF56` / `rgb(255, 191, 86)` |
| Texte principal | Blanc casse | `#FBFBFB` / `rgb(251, 251, 251)` |
| Texte secondaire | Blanc @ 70% | `rgba(251, 251, 251, 0.7)` |
| Numeros decoratifs | Blanc @ 20% | `rgba(251, 251, 251, 0.2)` |
| Borders cards | Gris sombre | `#393939` / `rgb(57, 57, 57)` |
| Background section claire | Gris clair | `#F0F0F0` (approx) |
| Texte sombre (sur fond clair) | Bleu sombre | `#040F25` |

---

## 6. Typographies

| Usage | Font | Poids | Taille |
|-------|------|-------|--------|
| Headings / Interface | Satoshi | 400-700 | Variable |
| Heading phase (titre) | Satoshi | 500 (medium) | ~36-48px |
| Body / Descriptions | Source Sans 3 | 200-900 | 16px / line-height 24px |
| Tag "Phase" | Satoshi | 700 (bold) | 14px (small) |
| Tag numero | Satoshi | 500 (medium) | 14px (small) |
| Numero decoratif (01, 02...) | Satoshi | 400 | ~120px+ |
| Alternative/fallback | Open Sans | 300-800 | - |

---

## 7. Plan d'implementation pour leadmind-ai

### 7.1. Librairies necessaires

| Librairie | Usage | Deja presente ? |
|-----------|-------|-----------------|
| `framer-motion` | Animations scroll-linked | A verifier |
| `tailwindcss` | Styling | Oui |
| `next/image` | Images optimisees | Oui |

### 7.2. Composants a creer

```
src/components/sections/
  └── StepsSection/
      ├── StepsSection.tsx       -- Section wrapper + header
      ├── StepCard.tsx           -- Carte individuelle sticky
      ├── StepTag.tsx            -- Badge "Phase | 01"
      └── types.ts               -- Types TypeScript
```

### 7.3. Implementation technique (Framer Motion)

```tsx
// Principe de l'animation avec Framer Motion
import { useScroll, useTransform, motion } from 'framer-motion'

function StepCard({ index, phase, title, description, image }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  })

  // Scale de 0.9 a 1.0 proportionnellement au scroll
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        position: 'sticky',
        top: '69px', // ajuster selon navbar
      }}
    >
      <div className="grid grid-cols-2 bg-[#040F25] border border-[#393939] overflow-hidden">
        {/* Left: texte */}
        <div className="flex flex-col justify-center gap-8 p-24 pl-20">
          <StepTag phase={phase} />
          <h3 className="text-4xl font-medium text-[#FBFBFB]">{title}</h3>
          <p className="text-[#FBFBFB]/70">{description}</p>
        </div>
        {/* Right: image */}
        <div className="relative">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>
    </motion.div>
  )
}
```

### 7.4. Fade-in echelonne (pour les sections cards)

```tsx
// Pattern de fade-in avec delay echelonne
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-15%" }}
  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
>
  {/* Card content */}
</motion.div>
```

---

## 8. Section Hero "Sticky Images" (3 panneaux)

### Architecture

```
section.overflow-hidden
  └── .about-hero-interaction (SCROLLING_IN_VIEW trigger)
      └── .hero-sticky-component (position: sticky, top: ~43px)
          ├── .sticky-images.left  [z-index: 2] -- texte gauche
          ├── .sticky-images.middle [z-index: 3] -- video centrale
          └── .sticky-images.right [z-index: 1] -- texte droite
```

### Animation

- **Type** : `SCROLLING_IN_VIEW` continu, smoothing 95
- Les 3 panneaux passent de `30vw x 50vh` (petit, cote a cote) a `100vw x 100vh` (plein ecran)
- Animation de `translate3d`, `width`, `height` en unites `vw`/`vh`
- Le panneau central contient une **video autoplay/loop/muted**

### Video

```html
<video autoplay loop muted playsinline data-object-fit="cover">
  <source src="promo_video-transcode.mp4" type="video/mp4">
  <source src="promo_video-transcode.webm" type="video/webm">
</video>
```

---

## 9. Section "Pain Points" (3 cards problemes)

### Layout

```css
.phase-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.phase-cards {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 640px;
  padding: 64px 48px 69px;
  background: #040F25;
}
```

### Animation

- Fade-in depuis le bas, echelonne : 250ms / 350ms / 450ms
- `scrollOffsetValue: 15%`
- Direction: `BOTTOM`
- Background-color transite de blanc a dark

### Contenu de chaque card

- Titre (texte blanc, medium weight)
- Description (texte blanc)
- Numero en bas (01, 02, 03) en tres grande taille, opacity 0.2

---

## 10. Interactions supplementaires

### Bouton CTA (hover)

```css
.primary-button {
  background: #EBBA28;
  color: #0F172A;
  border-radius: 800px; /* full pill */
  padding: ~12px 24px;
}

/* Effet hover : ellipse qui se expand */
.button-elipse {
  transform: translate3d(0, 0%, 0) scale3d(1, 1, 1);
  /* anime en scale sur hover */
}
```

### Banner CTA (section pre-footer)

- Fond sombre avec overlay
- Bouton avec barre de progression animee au hover (`.line-fill` width 0% -> 100%)
- Fleches qui se deplacent au hover (double arrow pattern)

### Fade-in generique

Tous les elements `.header`, `.read-more-tag`, `.banner-wrapper`, etc. utilisent le meme pattern :
- `SCROLL_INTO_VIEW`
- Direction: `BOTTOM`
- Delay: 250ms
- Offset: 15%
- Effet: slide-up + fade-in

---

## 11. Points d'attention pour la replication

1. **Navbar height** : le `top` du sticky doit etre ajuste selon la navbar du site leadmind-ai
2. **Performance** : `will-change: transform` sur les elements animes, `transform` pour GPU compositing
3. **Responsive** : urlab.ai masque certaines animations sous 767px (`opacity: 0` via media query)
4. **Smoothing** : Webflow utilise un smoothing de 90-95 ; en Framer Motion, utiliser des `spring` ou `tween` avec easing adapte
5. **Images** : les images sont en `object-fit: cover` et couvrent tout le panneau droit
6. **Accessibilite** : `prefers-reduced-motion` devrait desactiver les animations scroll-linked

---

## 12. Resume des fichiers source urlab.ai

| Type | URL/Info |
|------|----------|
| CMS | Webflow |
| Animations | Webflow Interactions IX2 (GSAP-powered) |
| Fonts | Google Fonts (Satoshi via Webflow, Source Sans 3, Open Sans) |
| CDN images | `cdn.prod.website-files.com/68bf285dc77dec91d253f845/` |
| Analytics | Google Analytics `G-8NLZ62QHVF` |
| Cookies | Axeptio |
| JS | jQuery 3.5.1 + Webflow chunks |
