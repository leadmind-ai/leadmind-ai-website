---
name: react-components
description: "Ce skill convertit les designs Stitch (HTML) et le DESIGN.md en composants React production-ready avec shadcn/ui et Tailwind CSS. Pipeline : lire DESIGN.md, analyser les HTML Stitch, mapper les sections en composants, appliquer les tokens du design system, TDD pour chaque composant. Use when l'utilisateur veut transformer un design en composants React, convertir du HTML en React, ou construire des composants depuis le design system."
---

# React Components — Design vers Code Production-Ready

## Vue d'ensemble

Convertir les designs Stitch (fichiers HTML) et le design system (DESIGN.md) en composants React typés, testés et accessibles. Chaque composant utilise shadcn/ui pour les éléments standards et respecte strictement les tokens du design system.

## Prérequis

<HARD-GATE>
Le fichier DESIGN.md doit exister avant de commencer. Si absent, proposer via AskUserQuestion de lancer le skill `design-md` pour le générer.
</HARD-GATE>

Vérifier la présence de :
- `DESIGN.md` — Design system (palette, typographie, spacing, composants)
- Fichiers HTML Stitch dans `queue/` ou `site/public/` ou dossier spécifié par l'utilisateur

## Reference

- `references/react-component-template.md` — Template de composant React + test + conventions shadcn/ui + tokens CSS

Lire cette reference avant de commencer.

---

## Phase 1 : Analyse du design system

1. **Lire DESIGN.md** : extraire les tokens du design system
   - Palette de couleurs (CSS variables : `--primary`, `--secondary`, etc.)
   - Typographie (polices, tailles, poids)
   - Spacing (marges, paddings, grille)
   - Composants documentés (variantes, états)

2. **Lire les fichiers HTML Stitch** : identifier les sections et éléments UI
   - Localiser les fichiers dans `queue/`, `site/public/`, ou le dossier spécifié
   - Analyser la structure HTML de chaque page
   - Identifier les sections répétées (header, footer, sidebar, cards, etc.)

3. **Mapper HTML → Composants React** : dresser la liste des composants à créer

   | Section HTML | Composant React | shadcn/ui utilisé |
   |-------------|----------------|-------------------|
   | [section] | [NomComposant] | [composants shadcn] |

### Checkpoint — Validation de la liste

Valider via `AskUserQuestion` :

- **"Liste approuvée — commencer le build"** — Passer à la Phase 2
- **"Modifier la liste"** — Ajouter, supprimer ou renommer des composants
- **"Prioriser certains composants"** — Construire un sous-ensemble d'abord

Ne pas passer à la suite sans approbation explicite.

---

## Phase 2 : Build TDD des composants

Pour chaque composant de la liste approuvée, suivre ce cycle strict :

<HARD-GATE>
Chaque composant doit avoir un test qui échoue AVANT l'implémentation. Pas de code de production sans test RED d'abord.
</HARD-GATE>

### Cycle par composant

#### 1. Écrire le test (RED)

Créer `src/components/[NomComposant]/[NomComposant].test.tsx` en suivant le template de `references/react-component-template.md` :
- Tester le rendu du contenu principal
- Tester les props optionnelles (présentes et absentes)
- Tester les interactions (clics, soumissions)
- Tester l'accessibilité (rôles, aria-labels)

#### 2. Vérifier l'échec

Exécuter les tests et confirmer que le test échoue pour la bonne raison (composant manquant, pas erreur de syntaxe).

#### 3. Implémenter le composant (GREEN)

Créer `src/components/[NomComposant]/[NomComposant].tsx` :
- Utiliser les composants shadcn/ui appropriés (Button, Card, Table, Dialog, etc.)
- Appliquer les tokens CSS du design system (pas de valeurs arbitraires)
- Typer les props avec une interface TypeScript explicite
- Export nommé (`export const NomComposant`)

#### 4. Vérifier le passage

Exécuter les tests et confirmer qu'ils passent tous.

#### 5. Refactorer si nécessaire

Nettoyer le code en gardant les tests verts.

---

## Phase 3 : Composition des pages

Après les composants individuels :

1. **Assembler les pages** : combiner les composants en pages complètes
   - Respecter le layout du design Stitch (grid, flexbox)
   - Appliquer le responsive (mobile-first avec breakpoints Tailwind)

2. **Créer les hooks** si nécessaire :
   - `useApi` pour les appels réseau
   - `useForm` pour la gestion de formulaires
   - Hooks custom pour la logique métier

3. **Vérifier le build** :
   - `tsc --noEmit` — pas d'erreurs TypeScript
   - `npm run build` — build réussi
   - Pas d'erreurs console dans le navigateur

---

## Phase 4 : Validation finale

Valider via `AskUserQuestion` :

- **"Composants validés"** — Terminer le skill
- **"Ajuster le design"** — Modifier les tokens ou le layout
- **"Ajouter des composants"** — Retourner à la Phase 1 avec les nouveaux besoins

---

## Rapport final

```
## React Components — Terminé

### Composants créés
| Composant | Fichier | Tests | shadcn/ui |
|-----------|---------|-------|-----------|
| [Nom] | src/components/[Nom]/[Nom].tsx | X pass | [liste] |

### Design system appliqué
- Palette : [tokens utilisés]
- Typographie : [polices appliquées]
- Composants shadcn/ui : [nombre] utilisés

### Build
- TypeScript : [pass/fail]
- Build : [pass/fail]
- Tests : [X/Y pass]
```

---

## Principes clés

- **TDD strict** — Test RED avant chaque implémentation
- **shadcn/ui** — Utiliser les composants standards pour tout élément reconnu
- **Design tokens** — CSS variables du DESIGN.md, jamais de valeurs arbitraires
- **TypeScript strict** — Interfaces explicites, pas de `any`
- **Accessibilité** — HTML sémantique, aria-labels, contraste suffisant
- **AskUserQuestion** — Toute validation passe par le tool
