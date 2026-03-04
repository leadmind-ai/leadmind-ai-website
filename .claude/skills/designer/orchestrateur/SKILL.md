---
name: designer
description: "Ce skill orchestre la phase Design UI/UX en enchaînant : enrichissement du prompt (enhance-prompt), génération Stitch MCP, et extraction du design system (design-md). Ce skill devrait être utilisé après le pipeline Architecte, quand l'architecture API et data existent. Il transforme la description fonctionnelle en maquettes haute fidélité et un design system documenté — sans aucun handoff Figma."
---

# Designer — Pipeline Orchestré Stitch MCP

## Vue d'ensemble

Orchestrer la phase de design UI/UX en enchaînant trois étapes : enrichir le prompt, générer les écrans via Stitch, et extraire le design system. L'humain valide à chaque checkpoint.

**Annoncer au démarrage :**

> Je lance le pipeline **Designer UI/UX** :
>
> | Phase | Action | Livrable |
> |-------|--------|----------|
> | 1 | Enrichir le prompt | Prompt Stitch optimisé |
> | 2 | Générer avec Stitch | Maquette(s) haute fidélité |
> | 3 | Extraire le design system | `DESIGN.md` |
>
> Chaque phase est validée avant de passer à la suivante.

## Prérequis

Avant de lancer ce skill, vérifier qu'au moins un de ces documents existe :
- Design doc dans `docs/plans/`
- PRD dans `docs/PRD.md`
- Architecture API dans `docs/architecture-api.md`

Si aucun document n'existe, proposer via `AskUserQuestion` :
- **"Lancer le pipeline Architecte d'abord"** — Invoquer le skill `architecte`
- **"Continuer sans specs"** — Demander une description du projet en texte libre

## References

- `references/stitch-mcp-reference.md` — Référence complète des outils MCP Stitch (tools, params, workflow)

Lire ce fichier de référence avant de lancer la génération.

---

## Phase 1 : Enrichissement du prompt

### 1.1 Localiser les documents sources

- Chercher le design doc dans `docs/plans/`
- Chercher le PRD dans `docs/PRD.md`
- Chercher l'architecture dans `docs/architecture-api.md` et `docs/architecture-data.md`
- Chercher le CLAUDE.md pour le tech stack

### 1.2 Déterminer l'écran à designer

Proposer à l'utilisateur via `AskUserQuestion` l'écran prioritaire à générer. Exemples :
- Dashboard adhérent (écran principal)
- Page de connexion
- Suivi des remboursements
- Formulaire de demande de prise en charge

### 1.3 Enrichir le prompt via enhance-prompt

Invoquer le skill `enhance-prompt` via le tool `Skill` :

```
Skill: enhance-prompt
Args: [description de l'écran choisi + contexte du projet]
```

Le skill enhance-prompt va :
1. Évaluer ce qui manque dans la description
2. Vérifier si un DESIGN.md existe déjà
3. Enrichir avec des mots-clés UI/UX, des descripteurs d'ambiance
4. Structurer en sections numérotées
5. Formater les couleurs correctement
6. **Valider avec l'utilisateur** avant de continuer

<HARD-GATE>
Ne PAS passer à la Phase 2 sans un prompt enrichi validé par l'utilisateur (via AskUserQuestion dans le skill enhance-prompt).
</HARD-GATE>

---

## Phase 2 : Génération Stitch

### 2.1 Créer ou récupérer le projet Stitch

Vérifier si un projet Stitch existe déjà :
- Si `stitch.json` existe dans le projet, utiliser le `projectId`
- Sinon, appeler `mcp__stitch__create_project` avec le titre du projet
- Sauvegarder l'ID dans `stitch.json` pour les futures générations

### 2.2 Générer l'écran

Appeler `mcp__stitch__generate_screen_from_text` avec :
- `projectId` : l'ID du projet Stitch
- `prompt` : le prompt enrichi validé en Phase 1
- `deviceType` : `DESKTOP` (ou selon choix utilisateur)
- `modelId` : selon le choix utilisateur (défaut `GEMINI_3_PRO`)

**Verbaliser pendant l'attente :**
> Stitch génère la maquette haute fidélité. Cela prend généralement 30 secondes à 2 minutes selon la complexité.

**Important :** Ne PAS relancer si la génération semble longue. Vérifier avec `mcp__stitch__get_screen` après coup.

### 2.3 Récupérer et présenter le résultat

1. Appeler `mcp__stitch__get_screen` pour obtenir les URLs de téléchargement
2. Récupérer le HTML via `WebFetch` sur `htmlCode.downloadUrl`
3. Sauvegarder dans le projet :
   - HTML dans `queue/{ecran}.html`
   - Mentionner la capture d'écran disponible

### 2.4 Checkpoint — Validation du design

Valider via `AskUserQuestion` :

- **"Design approuvé"** — Passer à la Phase 3
- **"Modifier le design"** — Utiliser `mcp__stitch__edit_screens` pour ajuster
- **"Régénérer"** — Relancer avec un prompt modifié
- **"Générer un autre écran"** — Boucler en Phase 1 pour un nouvel écran

<HARD-GATE>
Ne PAS passer à la Phase 3 sans approbation explicite du design via AskUserQuestion.
</HARD-GATE>

---

## Phase 2b (Alternative) : Nano Banana — Assets visuels ciblés

Si Stitch MCP est indisponible OU si l'utilisateur veut des assets visuels ciblés (hero images, textures, éléments 3D, illustrations) plutôt que des maquettes pleine page :

### 2b.1 Proposer le chemin design

Proposer via `AskUserQuestion` :

- **"Stitch MCP (maquettes pleine page)" (Recommandé)** — Continuer avec la Phase 2 standard
- **"Nano Banana (assets visuels ciblés)"** — Générer des images IA pour hero, textures, éléments décoratifs
- **"Les deux"** — Stitch pour les maquettes, Nano Banana pour les assets complémentaires

### 2b.2 Invoquer nano-banana-ui

Si l'utilisateur choisit Nano Banana (seul ou combiné) :

Invoquer le skill `nano-banana-ui` via le tool `Skill` :

```
Skill: nano-banana-ui
Args: [description des assets nécessaires + contexte du projet]
```

Le skill nano-banana-ui va :
1. Déterminer les assets nécessaires (manifeste)
2. Générer les prompts image (mode Anti-Gravity ou API Gemini)
3. Valider techniquement et visuellement
4. Cropper si nécessaire
5. Construire l'UI autour des images

Le `DESIGN.md` reste la source de vérité commune — qu'il soit produit par Stitch (Phase 3) ou défini manuellement. Si les deux chemins sont utilisés, Nano Banana s'aligne sur le design system extrait par Stitch.

<HARD-GATE>
Si le chemin "Les deux" est choisi, terminer la Phase 2 (Stitch) et la Phase 3 (extraction DESIGN.md) AVANT d'invoquer Nano Banana. Le DESIGN.md doit exister pour guider la cohérence des assets.
</HARD-GATE>

---

## Phase 3 : Extraction du Design System

### 3.1 Invoquer design-md

Invoquer le skill `design-md` via le tool `Skill` :

```
Skill: design-md
Args: [projectId et screenId du design approuvé]
```

Le skill design-md va :
1. Analyser le HTML et les métadonnées Stitch
2. Extraire la palette de couleurs, typographie, composants
3. Synthétiser un DESIGN.md sémantique
4. **Valider avec l'utilisateur** avant d'écrire le fichier

### 3.2 Checkpoint — Validation du design system

Le skill design-md gère sa propre validation via AskUserQuestion. Après écriture du DESIGN.md :

Proposer via `AskUserQuestion` :

- **"Générer d'autres écrans"** — Enchaîner avec le skill `stitch-loop` pour les pages suivantes
- **"Passer au développement"** — Terminer le pipeline designer, prêt pour le Segment 4
- **"Arrêter ici"** — Terminer le pipeline

---

## Phase 4 (optionnelle) : Génération multi-pages

Si l'utilisateur souhaite générer d'autres écrans :

1. Créer un `SITE.md` documentant la vision du site et les pages à générer
2. Invoquer le skill `stitch-loop` pour la construction itérative
3. Chaque page utilise le bloc Design System de DESIGN.md pour la cohérence

---

## Checkpoint Git — Push sur GitHub

Après validation des designs, proposer via `AskUserQuestion` :

- **"Committer et pousser sur GitHub" (Recommandé)** — Committer les designs et pousser
- **"Committer localement"** — Committer sans pousser
- **"Ne pas committer"** — Continuer sans versioning

Si commit accepté :

1. `git add` des fichiers produits : `queue/*.html`, `DESIGN.md`, `stitch.json`, `site/` (si multi-pages)
2. `git commit -m "design: maquettes Stitch et design system"`
3. `git push` si option choisie

---

## Rapport final

Après le pipeline complet ou un arrêt anticipé, afficher :

```
## Pipeline Designer — Terminé

**Projet** : [nom du projet]
**Projet Stitch** : [ID / titre]

### Artefacts produits
| Phase | Artefact | Fichier | Statut |
|-------|----------|---------|--------|
| 1 | Prompt enrichi | (en mémoire) | |
| 2 | Maquette(s) | queue/{ecran}.html | |
| 3 | Design System | DESIGN.md | |
| 4 | Pages additionnelles | site/public/*.html | |

### Prochaine étape
[Action choisie par l'utilisateur]
→ Le **react-components skill** (Segment 4 — Développeur) convertira ces designs en composants React.
```

---

## Principes clés

- **Pipeline séquentiel** — Chaque phase dépend de la précédente (contrairement à l'architecte qui parallélise)
- **Validation humaine à chaque checkpoint** — Rien n'est généré sans feu vert
- **AskUserQuestion systématique** — Toute validation passe par le tool, jamais en texte libre
- **Design System comme source de vérité** — Le DESIGN.md garantit la cohérence sur toutes les pages
- **Pas de handoff** — Le design EST le code : les maquettes Stitch produisent du HTML/CSS directement utilisable
- **Stitch MCP** — Tous les appels passent par les outils `mcp__stitch__*` documentés dans `references/stitch-mcp-reference.md`
