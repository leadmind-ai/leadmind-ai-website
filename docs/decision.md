# Decision Log

<!--
  Record every significant technical or architectural decision here.
  Update this document throughout the project lifecycle.
-->

## How to Use This Log

For each decision, fill in this template:

```
## D[number]: [Decision Title]

**Context:** [Why this decision was needed]

**Options Considered:**
1. **[Option A]** — [Brief description, pros]
2. **[Option B]** — [Brief description, pros]

**Decision:** [Which option was chosen]

**Rationale:** [Why this option won over the others]

**Trade-offs:** [What you gave up, risks accepted]
```

---

## D001: Framework — Next.js

**Context:** Besoin d'un framework web pour un site vitrine entreprise avec bon SEO.

**Options Considered:**
1. **Next.js** — React + SSR/SSG, excellent SEO, déploiement Vercel natif
2. **Astro** — Multi-framework, très performant pour le contenu statique
3. **Nuxt** — Vue.js, bon DX mais écosystème plus petit

**Decision:** Next.js

**Rationale:** Écosystème React le plus mature, SSG natif pour les performances, déploiement Vercel en un clic, large communauté.

**Trade-offs:** Bundle légèrement plus lourd qu'Astro pour un site purement statique. Acceptable pour la flexibilité future.

---

## D002: Hébergement — Vercel

**Context:** Choix de la plateforme de déploiement.

**Options Considered:**
1. **Vercel** — Déploiement natif Next.js, CDN global, gratuit pour petits sites
2. **Netlify** — Alternative solide, bon support SSG
3. **VPS** — Contrôle total mais maintenance requise

**Decision:** Vercel

**Rationale:** Intégration native avec Next.js, déploiement automatique depuis git, CDN global, plan gratuit suffisant.

**Trade-offs:** Dépendance à un fournisseur cloud. Migration possible vers self-hosted si nécessaire.
