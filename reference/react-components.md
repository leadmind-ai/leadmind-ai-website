# Guide : Creer un composant React

> Utiliser ce guide quand on ajoute un composant section ou UI au site.

## Pattern general

Les composants sont organises en 4 categories dans `src/components/`. Les sections sont des Server Components sauf si elles utilisent Framer Motion ou du state.

```
src/components/
├── layout/     # Header, Footer (use client — state menu)
├── sections/   # Blocs de page (Hero, CTA, etc.)
├── ui/         # Composants reutilisables (Button, Card, FadeIn)
└── forms/      # Formulaires interactifs (use client)
```

## Etapes

### Etape 1 : Choisir le type

| Type | Dossier | `"use client"` ? | Export |
|------|---------|-------------------|--------|
| Section de page | `sections/` | Seulement si animation/state | `export default` |
| Composant UI | `ui/` | Seulement si animation/state | `export function` (nomme) |
| Layout | `layout/` | Generalement oui | `export function` (nomme) |
| Formulaire | `forms/` | Toujours | `export function` (nomme) |

### Etape 2 : Definir le type des props

```tsx
type MaSectionProps = {
  data: {
    title: string;
    description: string;
    items: { label: string; text: string }[];
  };
  locale: Locale;
};
```

Regles :
- Utiliser `type` (pas `interface`)
- Nommage : `PascalCase` + `Props`
- Les textes viennent toujours du dictionnaire (props), jamais hardcodes

### Etape 3 : Implementer le composant

```tsx
// Server Component (pas d'animation)
import { Container } from "@/components/ui/Container";

type MaSectionProps = { ... };

export default function MaSection({ data, locale }: MaSectionProps) {
  return (
    <section className="py-20 bg-surface">
      <Container>
        <h2 className="text-3xl font-bold text-primary">{data.title}</h2>
        <p className="mt-4 text-text-muted">{data.description}</p>
      </Container>
    </section>
  );
}
```

```tsx
// Client Component (avec animation Framer Motion)
"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";

export default function MaSection({ data }: MaSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <h2>{data.title}</h2>
        </FadeIn>
      </Container>
    </section>
  );
}
```

### Etape 4 : Utiliser les design tokens

| Token | Usage |
|-------|-------|
| `bg-primary` / `text-primary` | Fond/texte bleu marine |
| `bg-accent` / `text-accent` | Boutons, CTAs, liens actifs (teal) |
| `bg-surface` | Fond alternatif gris clair |
| `text-text` / `text-text-muted` | Texte principal / secondaire |
| `rounded-full` | Boutons (coins arrondis pill) |
| `py-20` / `py-24` | Espacement vertical sections |

## Checklist rapide

- [ ] Fichier dans le bon dossier (`sections/`, `ui/`, `layout/`, `forms/`)
- [ ] `PascalCase.tsx` pour le nom du fichier
- [ ] Type props defini avec `type` au-dessus du composant
- [ ] `"use client"` seulement si necessaire (animation, state, formulaire)
- [ ] Textes via props (dictionnaire), pas hardcodes
- [ ] Utilise `Container` pour le max-width
- [ ] Design tokens Tailwind du theme (pas de couleurs hex en dur)
