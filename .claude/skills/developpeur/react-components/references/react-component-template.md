# Template de composant React

## Structure d'un composant

```tsx
// src/components/[NomComposant]/[NomComposant].tsx

import { type FC } from "react";
// Imports shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Imports design tokens
import { cn } from "@/lib/utils";

interface NomComposantProps {
  // Props typées explicitement
  title: string;
  description?: string;
  onAction?: () => void;
}

export const NomComposant: FC<NomComposantProps> = ({
  title,
  description,
  onAction,
}) => {
  return (
    <Card className={cn("w-full")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && <p className="text-muted-foreground">{description}</p>}
        {onAction && (
          <Button onClick={onAction} className="mt-4">
            Action
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
```

## Structure du test (TDD — test AVANT l'implémentation)

```tsx
// src/components/[NomComposant]/[NomComposant].test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NomComposant } from "./NomComposant";

describe("NomComposant", () => {
  it("affiche le titre", () => {
    render(<NomComposant title="Mon titre" />);
    expect(screen.getByText("Mon titre")).toBeInTheDocument();
  });

  it("affiche la description quand elle est fournie", () => {
    render(<NomComposant title="Titre" description="Ma description" />);
    expect(screen.getByText("Ma description")).toBeInTheDocument();
  });

  it("n'affiche pas la description quand elle est absente", () => {
    render(<NomComposant title="Titre" />);
    expect(screen.queryByText("Ma description")).not.toBeInTheDocument();
  });

  it("appelle onAction au clic sur le bouton", () => {
    const handleAction = vi.fn();
    render(<NomComposant title="Titre" onAction={handleAction} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleAction).toHaveBeenCalledOnce();
  });

  it("n'affiche pas le bouton sans onAction", () => {
    render(<NomComposant title="Titre" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
```

## Conventions

### Nommage
- **Composant** : PascalCase (`RemboursementCard`, `ContratTable`)
- **Fichier** : PascalCase identique au composant (`RemboursementCard.tsx`)
- **Test** : même nom + `.test.tsx` (`RemboursementCard.test.tsx`)
- **Dossier** : PascalCase identique au composant (`src/components/RemboursementCard/`)

### shadcn/ui — Composants standards à utiliser

| Besoin | Composant shadcn/ui |
|--------|-------------------|
| Bouton d'action | `Button` |
| Carte d'information | `Card`, `CardHeader`, `CardContent`, `CardFooter` |
| Tableau de données | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` |
| Formulaire | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` |
| Dialog/Modal | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` |
| Menu de navigation | `NavigationMenu`, `NavigationMenuItem` |
| Badge/Tag | `Badge` |
| Indicateur de chargement | `Skeleton` |
| Alertes | `Alert`, `AlertTitle`, `AlertDescription` |
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |

### Design System — Tokens CSS

Utiliser les CSS variables du design system (`DESIGN.md`) pour les couleurs :

```tsx
// Utiliser les classes Tailwind liées aux tokens
<div className="bg-primary text-primary-foreground">   {/* couleur principale */}
<div className="bg-secondary text-secondary-foreground"> {/* couleur secondaire */}
<div className="bg-muted text-muted-foreground">         {/* couleur atténuée */}
<div className="bg-accent text-accent-foreground">       {/* couleur d'accent */}
<div className="bg-destructive text-destructive-foreground"> {/* couleur d'erreur */}
```

### Accessibilité

- Utiliser les éléments HTML sémantiques (`<nav>`, `<main>`, `<section>`, `<article>`)
- Ajouter `aria-label` sur les boutons icône
- Utiliser `role` approprié pour les composants interactifs
- Contraste suffisant (vérifier avec les tokens du design system)

### Responsive

- Mobile-first : commencer par les styles mobiles
- Breakpoints Tailwind : `sm:`, `md:`, `lg:`, `xl:`
- Flexbox et Grid pour les layouts
