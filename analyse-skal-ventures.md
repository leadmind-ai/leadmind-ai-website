# Analyse du site Skal Ventures (7JW5iBM9v0h)

> Analyse detaillee du front-end et des animations pour replication dans LeadMind AI Website.
> Source : `/7JW5iBM9v0h-1772631179318/` (genere via v0.app)

---

## 1. Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Framework | Next.js (App Router, TypeScript strict) | 15.2.4 |
| Styling | Tailwind CSS + CSS Variables (OKLCH) | 4.1.9 |
| UI Library | shadcn/ui (new-york) + Radix UI | - |
| 3D/WebGL | Three.js + React Three Fiber + @react-three/drei | latest |
| Animations CSS | tailwindcss-animate + tw-animate-css | 1.0.7 / 1.3.3 |
| Easing 3D | maath (damp) | latest |
| Icons | Lucide React | 0.454.0 |
| Theme | next-themes (dark/light) | latest |
| Fonts | Sentient (custom woff) + Geist Mono | - |
| Forms | React Hook Form + Zod | 7.60.0 / 3.25.67 |
| Charts | Recharts | 2.15.4 |
| Package manager | pnpm | - |
| Deploiement | Vercel | - |

---

## 2. Structure du projet

```
7JW5iBM9v0h-1772631179318/
├── app/
│   ├── favicon.ico
│   ├── globals.css            # Theme Tailwind v4, fonts, variables CSS
│   ├── layout.tsx             # Root layout (Geist Mono, Header, ThemeProvider)
│   └── page.tsx               # Page d'accueil (Hero + Leva debug)
├── components/
│   ├── gl/
│   │   ├── index.tsx          # Canvas Three.js (react-three-fiber)
│   │   ├── particles.tsx      # Systeme GPGPU de particules
│   │   └── shaders/
│   │       ├── pointMaterial.ts       # Shader rendu particules + sparkle
│   │       ├── simulationMaterial.ts  # Shader simulation positions (FBO)
│   │       ├── utils.ts               # Bruit periodique GLSL
│   │       └── vignetteShader.ts      # Post-processing vignette
│   ├── ui/
│   │   └── button.tsx         # Bouton CTA (CVA, clip-path, glow dore)
│   ├── header.tsx             # Navigation fixe responsive
│   ├── hero.tsx               # Section hero plein ecran
│   ├── logo.tsx               # Logo SVG "SKAL VENTURES"
│   ├── mobile-menu.tsx        # Menu mobile (Radix Dialog)
│   ├── pill.tsx               # Badge glassmorphism
│   ├── theme-provider.tsx     # Wrapper next-themes
│   └── utils.ts               # Helper px()
├── lib/
│   └── utils.ts               # cn() — clsx + tailwind-merge
├── public/
│   ├── Sentient-Extralight.woff
│   ├── Sentient-LightItalic.woff
│   ├── placeholder-logo.png / .svg
│   ├── placeholder-user.jpg
│   └── placeholder.jpg / .svg
├── styles/
│   └── globals.css            # Variables OKLCH completes, dark mode, base layer
├── components.json            # Config shadcn/ui
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

---

## 3. Composants UI

### 3.1 Header (`components/header.tsx`)

Navigation fixe en haut de page avec logo, menu desktop et declencheur mobile.

```tsx
// Structure
<header className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
  <div className="container flex items-center justify-between">
    <Logo />                              {/* Gauche */}
    <nav className="absolute left-1/2 -translate-x-1/2 max-lg:hidden">
      {["About", "Portfolio", "Insights", "Contact"].map(item => (
        <Link className="uppercase font-mono text-foreground/60 hover:text-foreground/100
                         duration-150 transition-colors ease-out" />
      ))}
    </nav>
    <Link className="text-primary hover:text-primary/80" />  {/* Sign In */}
    <MobileMenu />                        {/* Droite, lg:hidden */}
  </div>
</header>
```

### 3.2 Hero (`components/hero.tsx`)

Section plein ecran avec fond WebGL interactif.

```tsx
export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />
      <div className="mt-auto pb-16 text-center relative z-10">
        <Pill>[BETA RELEASE]</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient font-extralight">
          Unlock your <br /><em>future</em> growth
        </h1>
        <p className="text-sm sm:text-base font-mono text-foreground/60 mt-8 text-balance">
          Subtitle text
        </p>
        <Button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          [Contact Us]
        </Button>
      </div>
    </div>
  );
}
```

**Interaction UI/WebGL** : le hover sur le bouton CTA modifie l'etat `hovering` qui declenche la transition DOF (profondeur de champ) dans le shader 3D.

### 3.3 Button (`components/ui/button.tsx`)

Bouton CTA avec clip-path polygonal et glow dore. Utilise CVA (class-variance-authority).

```tsx
const buttonVariants = cva(
  "inline-flex relative uppercase border font-mono cursor-pointer items-center font-medium
   ease-out transition-all duration-300
   [clip-path:polygon(var(--poly-roundness)_0,...)]",
  {
    variants: {
      variant: {
        default: "bg-background border-primary text-primary-foreground
                  [&>[data-border]]:bg-primary
                  [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)]
                  shadow-[#EBB800] hover:shadow-[#EBB800]/80",
      },
      size: {
        default: "h-16 px-6 text-base [--poly-roundness:16px]",
        sm: "h-14 px-6 text-sm [--poly-roundness:12px]",
      },
    },
  }
);
```

**Particularites** :
- Coins coupes geometriques via `clip-path: polygon(...)`
- Shadow inset doree (#EBB800) qui s'attenue au hover
- 4 accents decoratifs aux coins (spans avec `data-border`)

### 3.4 Pill (`components/pill.tsx`)

Badge glassmorphism avec point lumineux.

```tsx
<div className="inline-flex items-center gap-3 px-5 py-2.5
                bg-[#262626]/50 backdrop-blur-xs border border-border
                [clip-path:polygon(var(--poly-roundness)_0,...)]"
     style={{ '--poly-roundness': '6px' }}>
  <span className="w-2 h-2 rounded-full bg-primary shadow-glow shadow-primary/50" />
  <span className="font-mono text-sm">{children}</span>
</div>
```

### 3.5 Mobile Menu (`components/mobile-menu.tsx`)

Overlay Radix Dialog avec backdrop blur.

```tsx
<Dialog.Overlay className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm" />
<Dialog.Content className="fixed top-0 left-0 w-full z-40 py-28 md:py-40">
  <nav className="flex flex-col space-y-6">
    {items.map(item => (
      <Link className="text-xl font-mono uppercase text-foreground/60
                       transition-colors ease-out duration-150
                       hover:text-foreground/100 py-2" />
    ))}
  </nav>
</Dialog.Content>
```

---

## 4. Animations — Inventaire complet

### 4.1 Systeme de particules WebGL (GPU-based)

Le coeur visuel du site. Systeme GPGPU utilisant des textures FBO 512x512 pour calculer les positions des particules sur le GPU.

#### A. Animation de revelation (chargement page)

**Fichier** : `components/gl/particles.tsx` (lignes 41-145)
**Duree** : 3.5 secondes
**Easing** : Cubic ease-out `1 - (1 - progress)^3`

Les particules se deployent du centre vers l'exterieur au chargement de la page.

```typescript
const revealDuration = 3.5;

useFrame((state, delta) => {
  if (revealStartTime.current === null) {
    revealStartTime.current = currentTime;
  }

  const revealElapsed = currentTime - revealStartTime.current;
  const revealProgress = Math.min(revealElapsed / revealDuration, 1.0);

  // Ease-out cubique
  const easedProgress = 1 - Math.pow(1 - revealProgress, 3);

  // Expansion radiale du centre vers l'exterieur
  const revealFactor = easedProgress * 4.0;

  dofPointsMaterial.uniforms.uRevealFactor.value = revealFactor;
  dofPointsMaterial.uniforms.uRevealProgress.value = easedProgress;
});
```

#### B. Effet sparkle / scintillement

**Fichier** : `components/gl/shaders/pointMaterial.ts` (lignes 43-85)
**Type** : Continu, shader GLSL

Scintillement subtil des particules via ondes sinusoidales multi-frequences.

```glsl
float sparkleNoise(vec3 seed, float time) {
  float hash = sin(seed.x * 127.1 + seed.y * 311.7 + seed.z * 74.7) * 43758.5453;
  hash = fract(hash);

  float slowTime = time * 1.0;

  // Multi-frequence pour complexite visuelle
  float sparkle = 0.0;
  sparkle += sin(slowTime + hash * 6.28318) * 0.5;
  sparkle += sin(slowTime * 1.7 + hash * 12.56636) * 0.3;
  sparkle += sin(slowTime * 0.8 + hash * 18.84954) * 0.2;

  // Masque spatial pour repartition eparses (~30% des particules scintillent)
  float hash2 = sin(seed.x * 113.5 + seed.y * 271.9 + seed.z * 97.3) * 37849.3241;
  hash2 = fract(hash2);
  float sparkleMask = sin(hash2 * 6.28318) * 0.7 + sin(hash2 * 12.56636) * 0.3;

  if (sparkleMask < 0.3) {
    sparkle *= 0.05; // Attenuation forte hors masque
  }

  // Courbe exponentielle pour pics dramatiques
  float normalizedSparkle = (sparkle + 1.0) * 0.5;
  float smoothCurve = pow(normalizedSparkle, 4.0);
  float blendFactor = normalizedSparkle * normalizedSparkle;
  float finalBrightness = mix(normalizedSparkle, smoothCurve, blendFactor);

  return 0.7 + finalBrightness * 1.3; // Range [0.7, 2.0]
}
```

#### C. Mouvement continu (bruit periodique)

**Fichier** : `components/gl/shaders/utils.ts` (lignes 3-24)
**Type** : Continu, boucle parfaite sans discontinuites

```glsl
float periodicNoise(vec3 p, float time) {
  float noise = 0.0;

  // Onde primaire — periode = 2pi
  noise += sin(p.x * 2.0 + time) * cos(p.z * 1.5 + time);

  // Onde secondaire — periode = pi
  noise += sin(p.x * 3.2 + time * 2.0) * cos(p.z * 2.1 + time) * 0.6;

  // Onde tertiaire — periode = 2pi/3
  noise += sin(p.x * 1.7 + time) * cos(p.z * 2.8 + time * 3.0) * 0.4;

  // Interaction cross-frequence
  noise += sin(p.x * p.z * 0.5 + time * 2.0) * 0.3;

  return noise * 0.3;
}
```

#### D. Simulation FBO des positions

**Fichier** : `components/gl/shaders/simulationMaterial.ts` (lignes 26-78)
**Type** : GPU compute via framebuffer

```glsl
void main() {
  vec3 originalPos = texture2D(positions, vUv).rgb;

  float continuousTime = uTime * uTimeScale * (6.28318530718 / uLoopPeriod);

  vec3 noiseInput = originalPos * uNoiseScale;

  // Deplacement periodique par axe avec offsets de phase
  float displacementX = periodicNoise(noiseInput, continuousTime);
  float displacementY = periodicNoise(noiseInput + vec3(50.0, 0.0, 0.0), continuousTime + 2.094);
  float displacementZ = periodicNoise(noiseInput + vec3(0.0, 50.0, 0.0), continuousTime + 4.188);

  vec3 distortion = vec3(displacementX, displacementY, displacementZ) * uNoiseIntensity;
  vec3 finalPos = originalPos + distortion;

  gl_FragColor = vec4(finalPos, 1.0);
}
```

**Uniforms controlables** (via Leva) :
- `uNoiseScale` : echelle du bruit (defaut: 1.0)
- `uNoiseIntensity` : intensite du deplacement (defaut: 0.5)
- `uTimeScale` : vitesse de l'animation (defaut: 1)
- `uLoopPeriod` : periode de boucle en secondes (defaut: 24.0)

#### E. Transition DOF (profondeur de champ) au hover

**Fichier** : `components/gl/particles.tsx` (lignes 127-133)
**Duree** : 0.2s (sortie) / 0.35s (entree)

```typescript
import { easing } from "maath";

easing.damp(
  dofPointsMaterial.uniforms.uTransition,
  "value",
  introspect ? 1.0 : 0.0,
  introspect ? 0.35 : 0.2,
  delta
);
```

#### F. Vignette post-processing

**Fichier** : `components/gl/shaders/vignetteShader.ts`
**Type** : Shader de post-processing cinematique

```glsl
void main() {
  vec4 texel = texture2D(tDiffuse, vUv);
  vec2 uv = (vUv - 0.5) * 2.0;
  float dist = dot(uv, uv);
  float vignette = 1.0 - smoothstep(offset, offset + darkness, dist);
  gl_FragColor = vec4(texel.rgb * vignette, texel.a);
}
```

### 4.2 Transitions CSS (Tailwind)

| Element | Classes Tailwind | Duree | Propriete |
|---------|-----------------|-------|-----------|
| Nav links | `transition-colors ease-out duration-150` | 150ms | color (60% → 100%) |
| Sign In link | `transition-colors ease-out duration-150` | 150ms | color (primary → primary/80) |
| Mobile menu links | `transition-colors ease-out duration-150` | 150ms | color |
| Button CTA | `transition-all ease-out duration-300` | 300ms | all (shadow, colors) |

### 4.3 Tableau recapitulatif

| Animation | Type | Fichier | Duree | Technique |
|-----------|------|---------|-------|-----------|
| Reveal particules | WebGL | particles.tsx | 3.5s | Three.js + easing cubique |
| Sparkle | Shader | pointMaterial.ts | Continu | GLSL multi-sine |
| Mouvement particules | Shader | simulationMaterial.ts | Continu (boucle 24s) | GLSL FBO |
| DOF transition | Damping | particles.tsx | 0.2-0.35s | maath easing.damp |
| Vignette | Post-process | vignetteShader.ts | Statique | GLSL smoothstep |
| Nav hover | CSS | header.tsx | 150ms | Tailwind transition-colors |
| Button hover | CSS | button.tsx | 300ms | Tailwind transition-all |
| Mobile overlay | CSS | mobile-menu.tsx | Natif | Radix Dialog + backdrop-blur |

---

## 5. Design System

### 5.1 Palette de couleurs

```css
--background: #000000;         /* Fond principal — noir */
--foreground: #ffffff;         /* Texte — blanc */
--primary: #FFC700;            /* Or/ambre — CTAs, bordures, accents */
--primary-foreground: #ffffff; /* Texte sur primary */
--border: #424242;             /* Bordures — gris fonce */
```

**Opacites utilisees** :
- `text-foreground/60` : texte secondaire (60% blanc)
- `text-foreground/100` : texte hover (100%)
- `bg-[#262626]/50` : fond pill (50%)
- `bg-black/50` : overlay mobile menu
- `shadow-[#EBB800]/80` : glow hover bouton

### 5.2 Typographie

| Usage | Font | Weight | Taille | Style |
|-------|------|--------|--------|-------|
| H1 hero | Sentient | 200 (extralight) | 5xl → 6xl → 7xl | "future" en italic (300) |
| Navigation | Geist Mono | normal | base | uppercase |
| Subtitle | Geist Mono | normal | sm → base | text-balance |
| Boutons | Geist Mono | medium | base / sm | uppercase |
| Pill badge | Geist Mono | normal | sm | - |

### 5.3 Ombres et effets

```css
/* Glow custom */
--shadow-glow: 0 0 8px 2px var(--tw-shadow-color);

/* Button inset shadow */
box-shadow: inset 0 0 54px 0px #EBB800;

/* Pill glow dot */
shadow-glow shadow-primary/50
```

### 5.4 Formes geometriques (clip-path)

Les boutons et pills utilisent un clip-path polygonal pour creer des coins coupes :

```css
/* Bouton — coins de 16px */
clip-path: polygon(
  16px 0,
  calc(100% - 16px) 0,
  100% 0,
  100% calc(100% - 16px),
  calc(100% - 16px) 100%,
  0 100%,
  0 calc(100% - 16px),
  0 16px
);

/* Pill — coins de 6px */
clip-path: polygon(/* meme pattern avec 6px */);
```

### 5.5 Glassmorphism

```tsx
// Pill
className="bg-[#262626]/50 backdrop-blur-xs border border-border"

// Mobile menu overlay
className="bg-black/50 backdrop-blur-sm"
```

### 5.6 Responsive

**Approche** : Mobile-first

| Breakpoint | Valeur | Usage principal |
|------------|--------|-----------------|
| `sm` | 640px | Taille texte, boutons |
| `md` | 768px | Padding, logo, typographie |
| `lg` | 1024px | Navigation desktop vs mobile |

**Container custom** :
```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
  @media (width >= 768px) { padding-inline: 2rem; }
  @media (width >= 1280px) { padding-inline: 3rem; }
}
```

---

## 6. Sections implementees vs prevues

| Section | Statut | Composant |
|---------|--------|-----------|
| Hero | Implemente | `components/hero.tsx` + `components/gl/` |
| About | Reference dans nav | Non implemente |
| Portfolio | Reference dans nav | Non implemente |
| Insights | Reference dans nav | Non implemente |
| Contact | Reference dans nav | Non implemente |
| Sign In | Reference dans nav | Non implemente |

---

## 7. Elements replicables pour LeadMind AI

### Directement adaptables (meme stack Tailwind + Next.js)

1. **Transitions hover sur navigation** : `transition-colors duration-150 ease-out` avec opacites
2. **Glassmorphism** : `bg-color/opacity backdrop-blur-xs` pour badges et overlays
3. **Clip-path polygonal** : coins coupes geometriques sur boutons/badges
4. **Container responsive** : utility custom avec padding progressif
5. **Shadow glow** : `box-shadow` custom pour effets lumineux

### Necessitant adaptation (stack differente)

1. **Particules 3D** : Three.js + react-three-fiber → a evaluer couts performance vs. valeur visuelle. Alternative : particules CSS ou Canvas 2D
2. **Shaders GLSL** : Complexes, necessitent Three.js. Alternative : Framer Motion pour animations similaires (fade, scale, parallax)
3. **Reveal animation** : Replicable en Framer Motion avec `whileInView` + `variants`
4. **DOF interactif** : Specifique WebGL, non applicable directement

### Recommandations pour LeadMind AI

| Effet Skal | Equivalent LeadMind (Framer Motion) |
|------------|-------------------------------------|
| Reveal particules | `FadeIn` + `motion.div` avec `whileInView` |
| Sparkle | Particules CSS ou composant Canvas leger |
| Vignette | CSS `radial-gradient` ou `box-shadow inset` |
| DOF hover | `motion.div` avec `whileHover` scale/blur |
| Nav transitions | Identique (Tailwind CSS) |
| Glassmorphism | Identique (Tailwind CSS) |
| Clip-path | Identique (CSS) |
