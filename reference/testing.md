# Guide : Ecrire des tests

> Utiliser ce guide quand on ajoute des tests pour les composants ou pages.

## Pattern general

Jest + React Testing Library. Les tests vivent dans `tests/` avec une structure miroir de `src/`. Le `jest.config.ts` mappe `@/` vers `src/`.

```
tests/
├── components/    # Tests de composants
├── pages/         # Tests de pages
└── smoke.test.tsx # Test d'infrastructure
```

## Etapes

### Etape 1 : Creer le fichier de test

```
tests/components/Hero.test.tsx      # Pour src/components/sections/Hero.tsx
tests/components/Button.test.tsx    # Pour src/components/ui/Button.tsx
tests/pages/home.test.tsx           # Pour src/app/[locale]/page.tsx
```

### Etape 2 : Ecrire le test

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as link when href is provided", () => {
    render(<Button href="/contact">Contact</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
  });
});
```

Regles :
- `describe` par composant, `it` par comportement
- Tester le rendu et le comportement, pas l'implementation
- Utiliser `screen.getByText`, `screen.getByRole` (queries accessibles)

### Etape 3 : Mocker les modules Next.js si necessaire

```tsx
// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => <div {...props}>{children}</div>,
  },
}));
```

### Etape 4 : Executer

```bash
npm test                    # Tous les tests
npm test -- --watch         # Mode watch
npm test -- Button.test     # Un fichier specifique
```

## Checklist rapide

- [ ] Fichier dans `tests/` (pas a cote du composant)
- [ ] Imports depuis `@/` (alias configure dans jest.config.ts)
- [ ] Mocks pour next/image, next/link, framer-motion si utilises
- [ ] Queries accessibles (getByRole, getByText)
- [ ] `npm test` passe au vert
