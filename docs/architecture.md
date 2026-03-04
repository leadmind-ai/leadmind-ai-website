# Architecture Document

<!--
  Fill this document in after the PRD is complete.
  Use the prompt in templates/context-generation-prompt.md to generate it,
  or fill it in manually using the structure below.
-->

## System Overview

```
[Your system diagram here]
```

---

## Tech Stack

- **Runtime:** Node.js 20+ / TypeScript
- **Framework:** Next.js (App Router, SSG/SSR)
- **Styling:** Tailwind CSS
- **Database:** Aucune
- **Auth:** Aucune
- **Testing:** Jest + React Testing Library
- **Hosting:** Vercel

---

## Data Models

_Aucune base de données — site statique/SSG._

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [sections]/
├── components/
│   ├── ui/
│   └── sections/
└── lib/
    └── utils.ts
```

---

## API Endpoints

_Aucun endpoint API — site vitrine statique._

---

## Key Design Decisions

- **[Choice]:** [One-line rationale]
