# Guide : Creer une page Next.js i18n

> Utiliser ce guide quand on ajoute une nouvelle page au site.

## Pattern general

Chaque page est un Server Component async dans `src/app/[locale]/`. Elle fetch le dictionnaire, genere les metadata SEO, et passe les donnees aux composants sections.

```
src/app/[locale]/ma-page/page.tsx    # Page principale
src/dictionaries/fr.json             # + section "ma_page"
src/dictionaries/en.json             # + section "ma_page"
```

## Etapes

### Etape 1 : Ajouter les cles dans les dictionnaires

Ajouter une section identique dans `fr.json` et `en.json` :

```json
{
  "ma_page": {
    "title": "Titre de la page",
    "description": "Description pour SEO"
  }
}
```

Regles :
- Cles identiques dans les deux fichiers
- Jamais de texte hardcode dans le composant

### Etape 2 : Creer la page

```tsx
// src/app/[locale]/ma-page/page.tsx
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return createMetadata({
    title: `LeadMind AI — ${dict.ma_page.title}`,
    description: dict.ma_page.description,
    locale: locale as Locale,
    path: "/ma-page",
  });
}

export default async function MaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SectionComposant data={dict.ma_page} locale={locale as Locale} />
    </>
  );
}
```

Regles :
- Server Component par defaut (pas de `"use client"`)
- `generateMetadata` obligatoire pour le SEO
- Utiliser `createMetadata()` helper (gere alternates hreflang)
- `params` est une Promise dans Next.js 16 — toujours `await params`

### Etape 3 : Ajouter le lien dans la navigation

Mettre a jour les dictionnaires (`nav` section) et le composant `Header.tsx` si necessaire.

### Etape 4 : Verifier

```bash
npm run build   # Verifier que la page est generee en statique
npm run lint     # Pas d'erreurs
```

## Checklist rapide

- [ ] Cles ajoutees dans `fr.json` ET `en.json`
- [ ] `generateMetadata()` avec `createMetadata()`
- [ ] `params` est await (Promise)
- [ ] Server Component (pas de `"use client"` sauf si interactif)
- [ ] Lien ajoute dans la nav si necessaire
- [ ] Build OK
