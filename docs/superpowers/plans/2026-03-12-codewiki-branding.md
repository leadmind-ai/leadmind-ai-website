# CodeWiki Branding Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the LeadMind AI website with the CodeWiki-inspired design system defined in DESIGN.md — dark-first, immersive, premium aesthetic with shine animations, blue accent glow, and refined typography.

**Architecture:** Update the existing Tailwind CSS theme tokens in globals.css, add shine animation and glow utilities, then propagate new tokens through all components (Header, Footer, Hero, Cards, CTAs, sections). No structural changes to page routing or i18n — purely visual/CSS layer.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4 (@theme inline), Framer Motion, CSS offset-path animations.

---

## File Structure

| File | Role | Action |
|------|------|--------|
| `src/app/globals.css` | Design tokens, animations, utilities | **Major rewrite** — new color tokens, shine keyframes, gradient utilities, shadow utilities, typography scale, light/dark toggle |
| `src/app/layout.tsx` | Root layout | **Minor edit** — add JetBrains Mono font import |
| `src/components/ui/Button.tsx` | Button primitive | **Edit** — new color tokens, gradient CTA variant |
| `src/components/ui/Card.tsx` | Card primitive | **Edit** — new background, shine class support, glow shadow |
| `src/components/ui/Badge.tsx` | Badge primitive | **Edit** — gradient tag variant, new color tokens |
| `src/components/ui/Container.tsx` | Layout wrapper | **Edit** — max-w-[1200px], padding 24px |
| `src/components/layout/Header.tsx` | Navigation | **Edit** — fixed, transparent bg, gradient fade, 104px height |
| `src/components/layout/Footer.tsx` | Footer | **Edit** — new color tokens, neutral text |
| `src/components/sections/Hero.tsx` | Hero section | **Edit** — radial glow, display-large typography, gradient subtitle |
| `src/components/sections/ServicesOverview.tsx` | Service cards | **Edit** — shine cards, new shadows |
| `src/components/sections/Testimonials.tsx` | Testimonials | **Edit** — shine cards, glow shadow |
| `src/components/sections/CTASection.tsx` | CTA block | **Edit** — gradient CTA button, invert-theme variant |
| `src/components/sections/CredibilityStats.tsx` | Stats grid | **Edit** — new tokens |
| `src/components/sections/ProblemSolution.tsx` | Problem/Solution | **Edit** — new tokens, card styling |
| `src/components/sections/FAQ.tsx` | FAQ accordion | **Edit** — new tokens |
| `src/components/sections/LogoBar.tsx` | Logo scroller | **Edit** — new tokens |
| `src/components/sections/Stats.tsx` | Stats section | **Edit** — new tokens |
| `src/components/sections/Values.tsx` | Values grid | **Edit** — new tokens |
| `src/components/sections/Founder.tsx` | Founder profile | **Edit** — new tokens |
| `src/components/sections/Mission.tsx` | Mission section | **Edit** — new tokens |
| `src/components/sections/ProcessTimeline.tsx` | Timeline | **Edit** — new tokens |
| `src/components/sections/FormationsList.tsx` | Formations cards | **Edit** — new tokens, shine |
| `src/components/sections/FormationsHero.tsx` | Formations hero | **Edit** — new tokens |
| `src/components/sections/ContactHero.tsx` | Contact hero | **Edit** — new tokens |
| `src/components/forms/ContactForm.tsx` | Contact form | **Edit** — new input styling, surface-input token |
| `src/components/sections/WhyLeadMind.tsx` | Why section | **Edit** — new tokens |
| `src/components/sections/CalendlyEmbed.tsx` | Calendly | **Edit** — new tokens |

---

## Chunk 1: Design Foundation (globals.css + layout)

### Task 1: Update CSS Design Tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the @theme inline block with DESIGN.md tokens**

Replace the entire `@theme inline` block in globals.css with:

```css
@theme inline {
  /* Surfaces */
  --color-surface: #000000;
  --color-surface-container: #1a2230;
  --color-surface-elevated: #253145;
  --color-surface-input: #070a0e;

  /* Text */
  --color-on-surface: #ffffff;
  --color-on-surface-muted: #818181;

  /* Accents */
  --color-accent: #007af4;
  --color-accent-soft: #253145;
  --color-accent-glow: rgba(0, 122, 244, 0.25);
  --color-teal: #0d9488;
  --color-teal-light: #14b8a6;
  --color-purple: #9e9eff;

  /* Fonts */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono), monospace;

  /* Typography Scale */
  --text-display-large: 3.5rem;
  --text-display-medium: 2.75rem;
  --text-display-small: 2.25rem;
  --text-headline: 1.5rem;
  --text-body-large: 1rem;
  --text-body-medium: 0.875rem;
  --text-body-small: 0.75rem;

  --leading-display-large: 4rem;
  --leading-display-medium: 3.25rem;
  --leading-display-small: 2.75rem;
  --leading-headline: 2rem;
  --leading-body-large: 1.5rem;
  --leading-body-medium: 1.25rem;
  --leading-body-small: 1rem;

  /* Layout */
  --spacing-section: 120px;
  --radius-card: 16px;
  --radius-input: 12px;
  --radius-button: 8px;
}
```

- [ ] **Step 2: Update body styles**

Replace the body rule with:

```css
body {
  background: var(--color-surface);
  color: var(--color-on-surface);
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

- [ ] **Step 3: Run build to verify no CSS errors**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds (warnings OK, no errors)

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): update CSS tokens to CodeWiki palette"
```

---

### Task 2: Add Shine Animation CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add shine keyframes and utility class after the @theme block**

Append to globals.css (after body rule):

```css
/* === Shine Animation (CodeWiki border trail) === */
.shine {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card);
}

.shine::before,
.shine::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(
    100% 100% at right,
    var(--color-surface),
    var(--color-on-surface) 5%,
    var(--color-accent) 40%,
    transparent 80%
  );
  offset-path: border-box;
  offset-anchor: 100% 50%;
  animation: trail 15s infinite linear;
  z-index: 1;
  transition: opacity 0.2s ease;
  filter: blur(12px);
  pointer-events: none;
  will-change: offset-distance;
}

.shine::before {
  opacity: 0.5;
}

.shine::after {
  animation: trail-offset 15s infinite linear;
  offset-distance: 50%;
  opacity: 0.3;
}

@keyframes trail {
  to { offset-distance: 100%; }
}

@keyframes trail-offset {
  0% { offset-distance: 50%; }
  100% { offset-distance: 150%; }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .shine::before,
  .shine::after {
    animation: none;
    opacity: 0;
  }
}
```

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): add shine border-trail animation from CodeWiki"
```

---

### Task 3: Add Gradient, Shadow, and Transition Utilities

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add gradient utilities after shine section**

```css
/* === Gradients (DESIGN.md Section 5) === */
.gradient-hero-text {
  background: radial-gradient(circle, #fff, #547faa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-header-fade {
  background: linear-gradient(var(--color-surface), transparent 90%);
}

.gradient-card-diagonal {
  background: linear-gradient(135deg, var(--color-surface-elevated), var(--color-surface));
}

.gradient-icon-glow {
  background: linear-gradient(135deg, rgba(0, 122, 244, 0.2), transparent 50%);
}

.gradient-blue-radial {
  background: radial-gradient(circle, rgba(0, 122, 244, 0.3), transparent 90%);
}

.gradient-cta-premium {
  background: linear-gradient(to right, #c797ff, #007af4);
}

.gradient-tag {
  background: linear-gradient(135deg, #213856, var(--color-surface));
}

/* === Shadows & Glow (DESIGN.md Section 6) === */
.shadow-subtle {
  box-shadow: rgba(0, 0, 0, 0.05) 0 4px 20px;
}

.shadow-card {
  box-shadow: rgba(0, 122, 244, 0.25) 0 34px 84px -30px;
}

.shadow-card-inner {
  box-shadow: rgba(66, 133, 244, 0.09) 0 34px 84px -30px;
}

.shadow-hero {
  box-shadow: rgba(0, 122, 244, 0.2) 0 -80px 100px 60px;
}

.shadow-purple {
  box-shadow: rgba(68, 162, 255, 0.3) 0 34px 84px -30px;
}

/* === Transitions (DESIGN.md Section 7) === */
a, button, [class*="card"] {
  transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}
```

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): add gradient, shadow, and transition utilities"
```

---

### Task 4: Add JetBrains Mono Font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Import JetBrains Mono from next/font/google alongside Inter**

Add to the imports section of layout.tsx:

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
```

- [ ] **Step 2: Add the font variable to the html/body className**

Update the className to include `${jetbrainsMono.variable}` alongside the existing Inter variable.

- [ ] **Step 3: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(design): add JetBrains Mono font for code/data elements"
```

---

## Chunk 2: UI Primitives

### Task 5: Update Container Component

**Files:**
- Modify: `src/components/ui/Container.tsx`

- [ ] **Step 1: Update max-width and padding to match DESIGN.md layout specs**

Change `max-w-7xl` to `max-w-[1200px]` and ensure padding is `px-6` (24px).

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Container.tsx
git commit -m "feat(design): update Container to 1200px max-width per DESIGN.md"
```

---

### Task 6: Update Button Component

**Files:**
- Modify: `src/components/ui/Button.tsx`

- [ ] **Step 1: Update Button variants to use new tokens**

Update the variant styles:
- **primary**: `bg-teal hover:bg-teal-light text-white` (keep teal for primary CTAs per DESIGN.md section 14)
- **secondary**: `border-2 border-accent text-accent hover:bg-accent hover:text-white`
- **ghost**: `text-on-surface-muted hover:text-on-surface hover:bg-surface-elevated`
- **Add new variant "cta"**: `gradient-cta-premium text-white shadow-purple hover:opacity-90`

Update border-radius from `rounded-full` to `rounded-[--radius-button]`.

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat(design): update Button tokens and add cta gradient variant"
```

---

### Task 7: Update Card Component

**Files:**
- Modify: `src/components/ui/Card.tsx`

- [ ] **Step 1: Update Card to use new design tokens**

Replace current styling with:
- Background: `bg-surface-container` (replaces `bg-white/5`)
- Border: remove `border border-white/10` (shine replaces border)
- Border radius: `rounded-[--radius-card]`
- Shadow: add `shadow-card` class
- Hover: `hover:shadow-card` with increased opacity
- Accept optional `shine` prop that adds `shine` class
- Accept optional `diagonal` prop that adds `gradient-card-diagonal` background

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat(design): update Card with shine support and glow shadow"
```

---

### Task 8: Update Badge Component

**Files:**
- Modify: `src/components/ui/Badge.tsx`

- [ ] **Step 1: Update Badge variants to new tokens**

Update variants:
- **accent**: `bg-accent-soft text-accent`
- **primary**: `bg-accent-soft text-on-surface`
- **muted**: `bg-surface-elevated text-on-surface-muted`
- **Add new variant "gradient"**: `gradient-tag text-on-surface`

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat(design): update Badge tokens and add gradient variant"
```

---

## Chunk 3: Layout Components

### Task 9: Update Header Component

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Restyle Header per DESIGN.md section 9 (Navigation)**

Apply:
- Position: `fixed top-0 left-0 right-0 z-50`
- Background: `gradient-header-fade` (linear-gradient from #000 to transparent)
- Height: `h-[104px]`
- Remove any existing opaque background
- Ensure logo, nav links, and theme toggle use `text-on-surface` / `text-on-surface-muted`

- [ ] **Step 2: Add top padding to main content in locale layout**

In `src/app/[locale]/layout.tsx`, add `pt-[104px]` to the `<main>` element to account for fixed header.

- [ ] **Step 3: Run dev server and visually verify header**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat(design): fixed header with gradient fade, 104px height"
```

---

### Task 10: Update Footer Component

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Restyle Footer per DESIGN.md**

Apply:
- Background: `bg-surface` (black)
- Text: `text-on-surface-muted` (replaces current text colors)
- Logo area: update to use `text-on-surface` for brand name
- Links: `text-on-surface-muted hover:text-on-surface`

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(design): update Footer to CodeWiki tokens"
```

---

## Chunk 4: Hero & Key Sections

### Task 11: Redesign Hero Section

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Apply DESIGN.md Hero specifications**

Changes:
- Background: pure black (`bg-surface`) with radial blue glow behind content (`gradient-blue-radial` as absolute positioned div)
- Headline: `text-[length:var(--text-display-large)] leading-[var(--leading-display-large)] font-normal text-on-surface` (font-weight 400, elegant)
- Subtitle: apply `gradient-hero-text` class for radial fade white > gray-blue
- Primary CTA: use `gradient-cta-premium` button variant
- Secondary CTA: ghost variant with new tokens
- Remove old accent gradient decoration if present
- Add `shadow-hero` glow behind the hero content area

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(design): redesign Hero with radial glow and gradient text"
```

---

### Task 12: Update ServicesOverview Cards

**Files:**
- Modify: `src/components/sections/ServicesOverview.tsx`

- [ ] **Step 1: Apply shine cards and new tokens**

Changes:
- Section background: `bg-surface`
- Card backgrounds: `bg-surface-container` with `shine` class
- Card shadows: `shadow-card`
- Headlines: `text-on-surface font-normal text-[length:var(--text-headline)] leading-[var(--leading-headline)]`
- Descriptions: `text-on-surface-muted`
- Badges: use new accent variant
- CTA buttons: update to new token colors
- Border-radius: `rounded-[--radius-card]`

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ServicesOverview.tsx
git commit -m "feat(design): apply shine cards and CodeWiki tokens to ServicesOverview"
```

---

### Task 13: Update Testimonials Section

**Files:**
- Modify: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Apply shine cards and glow**

Changes:
- Cards: `bg-surface-container shine shadow-card-inner`
- Remove left border accent, use shine instead
- Quote text: `text-on-surface`
- Author: `text-on-surface-muted`
- Company: `text-accent`
- Grid: 2 columns as per DESIGN.md

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat(design): update Testimonials with shine cards and glow"
```

---

### Task 14: Update CTASection

**Files:**
- Modify: `src/components/sections/CTASection.tsx`

- [ ] **Step 1: Apply CTA card design per DESIGN.md section 9 (CTA Cards)**

Changes:
- Container: apply "invert-theme" approach — light background on dark mode
- Background: `bg-[#f9fbfe]` (light surface)
- Text: `text-[#002549]` (dark text on light bg)
- Add `shine` class with amplified effect
- CTA button: `gradient-cta-premium text-white`
- Border-radius: `rounded-[--radius-card]`

- [ ] **Step 2: Run build to verify**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/CTASection.tsx
git commit -m "feat(design): CTA section with invert-theme and gradient premium button"
```

---

## Chunk 5: Remaining Sections (Token Propagation)

### Task 15: Update ProblemSolution Section

**Files:**
- Modify: `src/components/sections/ProblemSolution.tsx`

- [ ] **Step 1: Replace old color tokens with new ones**

Changes:
- Section title: `text-on-surface font-normal`
- Body text: `text-on-surface-muted`
- Solution card: `bg-surface-container rounded-[--radius-card] shadow-card`
- Replace `border-accent/30` with `border-accent`
- Problem indicators: `text-red-400` (keep), Solution indicators: `text-accent`

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/ProblemSolution.tsx
git commit -m "feat(design): update ProblemSolution tokens"
```

---

### Task 16: Update FAQ Section

**Files:**
- Modify: `src/components/sections/FAQ.tsx`

- [ ] **Step 1: Replace old tokens**

Changes:
- Title: `text-on-surface font-normal`
- Question text: `text-on-surface`
- Answer text: `text-on-surface-muted`
- Accordion container: `bg-surface-container rounded-[--radius-card]`
- Dividers/borders: `border-surface-elevated`
- Toggle icon: `text-accent`

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/FAQ.tsx
git commit -m "feat(design): update FAQ tokens"
```

---

### Task 17: Update CredibilityStats Section

**Files:**
- Modify: `src/components/sections/CredibilityStats.tsx`

- [ ] **Step 1: Replace tokens**

Changes:
- Stat values: `text-accent`
- Labels: `text-on-surface-muted`
- Cards: `bg-surface-container rounded-[--radius-card]`
- Founder card top border: `border-t-accent` (keep, update token)
- Grid: 5 columns per DESIGN.md

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/CredibilityStats.tsx
git commit -m "feat(design): update CredibilityStats tokens"
```

---

### Task 18: Update Stats, Values, Mission Sections

**Files:**
- Modify: `src/components/sections/Stats.tsx`
- Modify: `src/components/sections/Values.tsx`
- Modify: `src/components/sections/Mission.tsx`

- [ ] **Step 1: Token replacement across all three**

For each section:
- `text-white` / `text-text` → `text-on-surface`
- `text-text-muted` / `text-gray-300` → `text-on-surface-muted`
- `text-accent` stays (accent color changed at token level)
- `bg-white/5` → `bg-surface-container`
- `border-white/10` → `border-surface-elevated`
- Headlines: add `font-normal` (weight 400)

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/Stats.tsx src/components/sections/Values.tsx src/components/sections/Mission.tsx
git commit -m "feat(design): update Stats, Values, Mission tokens"
```

---

### Task 19: Update Founder & WhyLeadMind Sections

**Files:**
- Modify: `src/components/sections/Founder.tsx`
- Modify: `src/components/sections/WhyLeadMind.tsx`

- [ ] **Step 1: Token replacement**

Same pattern as Task 18:
- Replace old color classes with new tokens
- Update card backgrounds, text colors, border colors
- Credentials badges: use new Badge accent variant

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/Founder.tsx src/components/sections/WhyLeadMind.tsx
git commit -m "feat(design): update Founder and WhyLeadMind tokens"
```

---

### Task 20: Update Formations Sections

**Files:**
- Modify: `src/components/sections/FormationsHero.tsx`
- Modify: `src/components/sections/FormationsList.tsx`
- Modify: `src/components/sections/ProcessTimeline.tsx`

- [ ] **Step 1: Token replacement**

For FormationsHero: same token updates as other heroes.
For FormationsList: cards get `bg-surface-container shine shadow-card rounded-[--radius-card]`.
For ProcessTimeline: numbered circles `bg-accent text-on-surface`, connector lines `bg-surface-elevated`.

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/FormationsHero.tsx src/components/sections/FormationsList.tsx src/components/sections/ProcessTimeline.tsx
git commit -m "feat(design): update Formations sections tokens"
```

---

### Task 21: Update LogoBar Section

**Files:**
- Modify: `src/components/sections/LogoBar.tsx`

- [ ] **Step 1: Token replacement**

- Text: `text-on-surface-muted`
- Background: transparent (inherits `bg-surface`)
- Logo items: `text-on-surface-muted`

- [ ] **Step 2: Run build, commit**

```bash
git add src/components/sections/LogoBar.tsx
git commit -m "feat(design): update LogoBar tokens"
```

---

## Chunk 6: Contact & Forms

### Task 22: Update Contact Components

**Files:**
- Modify: `src/components/forms/ContactForm.tsx`
- Modify: `src/components/sections/ContactHero.tsx`
- Modify: `src/components/sections/CalendlyEmbed.tsx`

- [ ] **Step 1: Update ContactForm styling**

Changes:
- Input/textarea: `bg-surface-input border-surface-elevated rounded-[--radius-input] text-on-surface placeholder:text-on-surface-muted focus:border-accent focus:ring-2 focus:ring-accent-glow`
- Submit button: `bg-teal hover:bg-teal-light text-white rounded-[--radius-button]`
- Success message: `bg-accent-soft text-accent`

- [ ] **Step 2: Update ContactHero**

Same token pattern: `text-on-surface`, `text-on-surface-muted`.

- [ ] **Step 3: Update CalendlyEmbed**

Border: `border-surface-elevated rounded-[--radius-card]`.

- [ ] **Step 4: Run build, commit**

```bash
git add src/components/forms/ContactForm.tsx src/components/sections/ContactHero.tsx src/components/sections/CalendlyEmbed.tsx
git commit -m "feat(design): update Contact components tokens and input styling"
```

---

## Chunk 7: Final Verification

### Task 23: Full Build & Visual Verification

**Files:**
- All modified files

- [ ] **Step 1: Run full production build**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `cd /Users/njouonang/Projets/leadmind-ai-website-develop/.claude/worktrees/branding-codewiki && npm run lint`
Expected: No new errors

- [ ] **Step 3: Start dev server and visually verify all pages**

Run: `npm run dev`
Check:
- Home page: Hero glow, shine cards, gradient CTA
- Formations page: shine cards, timeline
- About page: founder section, values
- Contact page: form inputs, Calendly embed

- [ ] **Step 4: Verify responsive breakpoints**

Check all pages at:
- Mobile: < 640px (1 column cards)
- Tablet: 640-1024px (2 column cards)
- Desktop: > 1024px (3 column cards)

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(design): final polish and responsive fixes"
```
