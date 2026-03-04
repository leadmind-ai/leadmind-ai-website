# Sections MCP — Référence

Blocs MCP à intégrer dans le CLAUDE.md selon les besoins du projet.

---

## Bloc obligatoire : Context7

Toujours inclure cette section dans le CLAUDE.md :

```markdown
## Documentation via Context7 MCP

- Lors de l'implémentation de features dépendant de librairies/frameworks externes, utiliser Context7 MCP pour récupérer la documentation à jour
- Ne PAS se fier uniquement aux données d'entraînement pour les APIs de librairies — toujours vérifier avec Context7
- Cela prévient les erreurs de version et l'utilisation d'APIs obsolètes
- Si Context7 ne trouve pas la documentation, effectuer une recherche web
```

## Bloc obligatoire : MCP Tool Search

Toujours inclure cette section :

```markdown
## MCP Tool Search

MCP Tool Search empêche la surcharge de contexte liée aux MCP connectés.
- Configuré via `ENABLE_TOOL_SEARCH` dans la clé `env` de `.claude/settings.json`
- Quand activé, les schemas d'outils ne sont PAS chargés au démarrage — découverte et appel on-demand
- Valeurs acceptées : `"true"` (toujours actif), `"auto"` (s'active quand les MCP dépassent 10% du contexte), `"auto:N"` (seuil personnalisé)
```

## Blocs optionnels (selon le projet)

### Stitch MCP (Design UI/UX)

```markdown
## Design UI via Stitch MCP

- **Serveur** : `https://stitch.googleapis.com/mcp` (HTTP remote)
- **Auth** : Clé API via header `X-Goog-Api-Key`
- **Modèles** : `GEMINI_3_PRO` (haute qualité) | `GEMINI_3_FLASH` (rapide)
- Utiliser pour générer des maquettes haute fidélité depuis des descriptions textuelles
- Toujours générer UNE LONGUE PAGE, pas section par section
```

### Puppeteer MCP (Tests navigateur)

```markdown
## Tests navigateur via Puppeteer MCP

- Package : `@modelcontextprotocol/server-puppeteer`
- Navigateur isolé, pas d'interférence avec les sessions existantes
- Utiliser pour la vérification visuelle des features UI
```

### Obsidian MCP (Notes et documentation)

```markdown
## Notes via Obsidian MCP

- Transport : local
- Utiliser pour la gestion de notes et documentation projet
```

---

## Pattern d'ajout de MCP

Quand un nouveau MCP est nécessaire pour le projet :

1. Ajouter l'installation dans `env-setup.sh` :
   ```bash
   claude mcp add <nom-mcp> -- npx -y @package/mcp-server
   ```

2. Ajouter la section dans CLAUDE.md :
   ```markdown
   ## [Nom MCP] — [Rôle]
   - [Instructions d'utilisation]
   - [Quand l'utiliser]
   ```

3. Documenter dans le tableau MCP du CLAUDE.md
