---
name: nano-banana-ui
description: "Ce skill génère des images via Nano Banana (Gemini Image API) et construit des interfaces frontend intégrant ces assets visuels. Ce skill devrait être utilisé quand l'utilisateur veut des assets visuels ciblés (hero images, textures, éléments 3D, illustrations) ou mentionne 'Nano Banana', 'images IA', 'assets générés'. Supporte deux modes — Anti-Gravity (gratuit) et API Gemini (automatisé). Ne PAS utiliser pour du backend, des endpoints API, ou du travail sans composante visuelle."
---

# Nano Banana UI

Générer des images avec Nano Banana et construire des interfaces frontend de production autour de ces assets. Un skill, deux modes.

## Critique

- Ne PAS sauter l'étape 3 (validation). Construire une UI autour d'images manquantes ou corrompues gaspille du temps.
- Ne PAS écrire de prompts image sans lire `references/prompting-rules.md` d'abord. Chaque règle existe parce que l'approche inverse a été testée et a échoué.
- Prendre son temps à chaque étape. La qualité prime sur la vitesse — un résultat cohérent exige des prompts soignés, une évaluation honnête, et la volonté de re-générer.

## Cohérence avec le pipeline Stitch

Si un `DESIGN.md` existe dans le projet (produit par le skill `design-md` via Stitch), le lire avant de commencer. Les couleurs, typographies et styles du DESIGN.md sont la source de vérité — les images Nano Banana doivent s'y conformer.

Si aucun DESIGN.md n'existe, demander à l'utilisateur de définir sa palette via `AskUserQuestion` ou utiliser le skill `design-md` d'abord.

## Palette par défaut

Aucune palette n'est définie par défaut. Le fichier `DESIGN.md` (produit par `/designer`) est la source de vérité. Si absent, le skill demandera une palette à l'utilisateur avant de générer.

## Avant de commencer

Si l'utilisateur a explicitement demandé Nano Banana ou des images IA, passer à "Choisir le mode".

Si l'utilisateur a demandé une tâche design générale (ex: "construis-moi un dashboard"), demander via `AskUserQuestion` : "Voulez-vous des assets visuels générés par IA (hero images, textures, éléments 3D) ? Je peux les générer gratuitement via Anti-Gravity ou automatiquement via l'API Gemini."

S'il dit non, construire uniquement avec du code en utilisant les principes de `references/frontend-aesthetics.md`.

## Choisir le mode

Proposer via `AskUserQuestion` :

### Mode 1 : Anti-Gravity (Gratuit)
- Anti-Gravity est une app desktop avec un agent Nano Banana intégré
- Ce skill génère les prompts exacts à donner à l'agent Anti-Gravity
- L'utilisateur génère les images et les place dans `public/images/`
- Puis ce skill construit l'UI autour de ces images

### Mode 2 : API (Automatisé)
- Requiert la variable d'environnement `GEMINI_API_KEY`
- Exécuter `python .claude/skills/designer/nano-banana-ui/scripts/generate_image.py --prompt "..." --output path/to/image.png`
- Images générées et sauvegardées automatiquement

Si pas de préférence, vérifier `GEMINI_API_KEY`. Si présente → API. Sinon → Anti-Gravity.

## Workflow

### Étape 0 : Scaffolder le projet

Avant tout, créer le projet s'il n'existe pas déjà.

- **Next.js** : `npx create-next-app@latest project-name --typescript --tailwind --app`
- **React (Vite)** : `npm create vite@latest project-name -- --template react-ts`
- **Vanilla** : Créer `index.html`, `style.css`, `script.js`

Demander le package manager préféré via `AskUserQuestion` (npm, pnpm, yarn, bun).

Créer un répertoire `public/images/` pour les assets générés :
```bash
mkdir -p public/images
```

Ne PAS passer à la génération d'images tant que le projet n'est pas scaffoldé.

### Étape 1 : Comprendre ce qui est construit

Avant de générer quoi que ce soit, déterminer :

1. **App ou landing page ?**
   - App = verrouiller la structure, libérer le styling
   - Landing page = libérer la structure ET le styling

2. **Définir la palette de couleurs AVANT les images.**
   Si un DESIGN.md existe, utiliser sa palette. Sinon, définir 3-5 codes hex via `AskUserQuestion`. Chaque prompt image utilisera ces hex exactement.

3. **Quels assets image sont nécessaires ?**
   - **Doit être image** (Nano Banana) : éléments 3D, formes organiques, bokeh, hero images, textures, patterns, illustrations, gradients complexes
   - **Construit en code** : Navigation, texte, boutons, cartes, layout, icônes (Lucide/Heroicons), animations CSS, glassmorphisme

4. **Créer un manifeste d'assets** listant chaque image nécessaire :
   - Nom de fichier (kebab-case)
   - Description
   - Emplacement dans l'UI
   - **Couleur de fond** : code hex exact sur lequel l'image sera placée
   - **Cropper après ?** Oui (background/texture → ratio cible) ou Non (objet standalone → garder carré)

### Étape 2 : Générer les prompts image

Pour chaque asset du manifeste, écrire un prompt Nano Banana en suivant les règles de `references/prompting-rules.md`.

**Critique** : Lire `references/prompting-rules.md` avant d'écrire un seul prompt.

#### Mode Anti-Gravity
Lister tous les prompts numérotés. Chaque prompt Anti-Gravity DOIT commencer par ce préambule :
```
You are ONLY generating images. Do NOT write any code. Do NOT create any files other than images. Do NOT build a website. Do NOT modify any existing files. Your ONLY job is to generate the images listed below using the image tool. Pass each prompt to the image tool EXACTLY as written — do not rewrite, summarize, or modify the prompts.

CRITICAL: Do NOT resize, compress, convert, or post-process any generated images. Save them EXACTLY as the image tool outputs them — no dimension changes, no format conversion, no optimization.

Save all generated images to public/images/ with the exact file names specified.
```

#### Mode API
Pour chaque asset, exécuter :
```bash
python .claude/skills/designer/nano-banana-ui/scripts/generate_image.py --prompt "LE PROMPT" --output public/images/FILENAME.png
```

### Étape 3 : Valider les assets

Deux vérifications — technique d'abord, puis visuelle.

**3a. Validation technique.** Exécuter :
```bash
python .claude/skills/designer/nano-banana-ui/scripts/validate_images.py --dir public/images
```

Si la validation échoue : re-générer uniquement les images manquantes/corrompues.

**3b. Revue visuelle.** LIRE chaque image générée. Pour chaque image, vérifier :
1. Correspond-elle au prompt ?
2. La couleur de fond correspond-elle à la palette ?
3. Artefacts IA (texte bizarre, formes distordues, bords flous) ?
4. Cohérence de style entre toutes les images ?
5. Qualité suffisante ?

Pour chaque image : verdict **pass** ou **fail + raison**.

Si une image échoue → supprimer, écrire un **nouveau prompt corrigé**, re-générer.

<HARD-GATE>
Ne PAS passer à la construction UI tant que TOUTES les images n'ont pas passé la validation technique ET visuelle.
</HARD-GATE>

### Étape 3.5 : Cropper si nécessaire

Toutes les images Nano Banana sont carrées. Certaines nécessitent un crop. Toujours preview d'abord :
```bash
python .claude/skills/designer/nano-banana-ui/scripts/crop_image.py --input public/images/hero-bg.png --ratio 16:9 --preview
```

Si le preview est satisfaisant :
```bash
python .claude/skills/designer/nano-banana-ui/scripts/crop_image.py --input public/images/hero-bg.png --ratio 16:9 --apply --output public/images/hero-bg-cropped.png
```

**Safe to crop** : backgrounds, textures, gradients, scènes.
**Garder carré** : orbes, cristaux, icônes, objets standalone.

### Étape 3.75 : Extraire les couleurs des images

LIRE chaque image générée. Pour chaque image :
1. Identifier les 3-5 couleurs dominantes
2. Noter les codes hex approximatifs
3. Définir les CSS variables depuis ces couleurs

Si un DESIGN.md existe, vérifier la cohérence avec sa palette.

### Étape 4 : Construire l'UI

Construire le frontend avec les images intégrées.

Lire `references/frontend-aesthetics.md` et `references/design-patterns.md` avant d'écrire du code.

Règles :
- Direction esthétique BOLD cohérente avec les images générées
- Références aux fichiers image par leurs chemins réels
- Construire en code tout ce que le CSS peut gérer
- **Choisir les fonts depuis la table mood-matching** dans `references/frontend-aesthetics.md`
- Utiliser les CSS variables de l'étape 3.75
- `mix-blend-mode: screen` pour les éléments standalone sur fond sombre
- `mask-image: radial-gradient(...)` pour fondre les bords
- Les images s'intègrent avec le code (overlap, bleed, backgrounds partagés)

### Étape 5 : Vérification visuelle

Demander à l'utilisateur : **"Prenez un screenshot de la page dans le navigateur et partagez-le pour que je puisse vérifier le design."**

Vérifier :
1. **Background bleed** : bordure rectangulaire visible ?
2. **Cohérence couleurs** : CSS vs images ?
3. **Font appropriée** : mood des fonts vs mood des images ?
4. **Intégration images** : partie de la page ou posées dessus ?
5. **Test screenshot** : site réel ou "projet IA" ?

Maximum 3 cycles de refinement.

## Troubleshooting

### API : "GEMINI_API_KEY not set"
Clé disponible sur https://aistudio.google.com/app/apikey — billing requis pour la génération d'images.

### API : "No image in response"
Le prompt a peut-être déclenché les filtres de sécurité. Simplifier le prompt.

### Images ressemblent à des posters, pas à des sites web
Manque "screenshot of a real website" dans le prompt. Voir les règles de prompting.

### Anti-Gravity réécrit les prompts
Instruire AG : "Pass this prompt to the image tool exactly as written, do not modify it."
