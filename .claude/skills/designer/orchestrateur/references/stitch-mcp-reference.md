# Référence Outils MCP Stitch

## Serveur

**Endpoint :** `https://stitch.googleapis.com/mcp`
**Transport :** HTTP (remote)
**Auth :** API Key via header `X-Goog-Api-Key` (ou token OAuth Bearer)

## Outils disponibles

### Gestion de projet

| Outil | But | Paramètres |
|-------|-----|------------|
| `mcp__stitch__create_project` | Créer un nouveau projet design | `title` (string) |
| `mcp__stitch__list_projects` | Lister les projets actifs | `filter` (string): `view=owned` ou `view=shared` |
| `mcp__stitch__get_project` | Détails d'un projet | `name` (string): `projects/{id}` |

### Gestion des écrans

| Outil | But | Paramètres |
|-------|-----|------------|
| `mcp__stitch__list_screens` | Lister les écrans d'un projet | `projectId` (string) |
| `mcp__stitch__get_screen` | Détails d'un écran (HTML, captures) | `name`, `projectId`, `screenId` |

### Génération de design

| Outil | But | Paramètres |
|-------|-----|------------|
| `mcp__stitch__generate_screen_from_text` | Générer un UI depuis un prompt texte | `projectId`, `prompt`, `deviceType`, `modelId` |
| `mcp__stitch__edit_screens` | Modifier des écrans existants | `projectId`, `selectedScreenIds`, `prompt`, `deviceType`, `modelId` |
| `mcp__stitch__generate_variants` | Générer des variantes d'écrans | `projectId`, `selectedScreenIds`, `prompt`, `variantOptions` |

### Options modelId

| Modèle | Usage |
|--------|-------|
| `GEMINI_3_PRO` | Haute qualité, plus lent (~1-2 min) |
| `GEMINI_3_FLASH` | Rapide, bonne qualité (~30s) |

### Options deviceType

| Type | Description |
|------|-------------|
| `DESKTOP` | Design desktop |
| `MOBILE` | Design mobile |
| `TABLET` | Design tablette |
| `AGNOSTIC` | Non lié à un device |

## Workflow typique

### 1. Créer ou trouver le projet
```
mcp__stitch__list_projects (filter: "view=owned")
→ ou mcp__stitch__create_project (title: "{{NOM_PROJET}}")
```

### 2. Générer un écran
```
mcp__stitch__generate_screen_from_text
  projectId: [ID numérique]
  prompt: [prompt enrichi avec bloc DESIGN SYSTEM]
  deviceType: DESKTOP
  modelId: GEMINI_3_PRO
```

**Attention :** La génération peut prendre 1-2 minutes. Ne PAS relancer en cas de timeout.

### 3. Récupérer le résultat
```
mcp__stitch__get_screen
  name: projects/{projectId}/screens/{screenId}
  projectId: [ID]
  screenId: [ID]
→ retourne htmlCode.downloadUrl et screenshot.downloadUrl
```

### 4. Télécharger et intégrer
```
WebFetch sur htmlCode.downloadUrl → récupérer le HTML brut
Intégrer dans le projet (composants React, pages Next.js, etc.)
```

## Commande d'installation

```bash
claude mcp add stitch \
  --transport http https://stitch.googleapis.com/mcp \
  --header "X-Goog-Api-Key: VOTRE-CLE-API" \
  -s user
```
