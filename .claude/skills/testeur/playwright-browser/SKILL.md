---
name: playwright-browser
description: "Ce skill automatise les navigateurs web via Playwright CLI en mode headless. Gère les sessions parallèles nommées, les captures d'écran, l'interaction avec les éléments de page, et le stockage persistant (cookies, localStorage). Token-efficient car basé sur CLI sans chargement de schémas en contexte. Use when l'utilisateur veut automatiser un navigateur, exécuter des tests UI, prendre des screenshots, scraper du contenu web, ou lancer des sessions browser parallèles. Keywords — playwright, headless, browser, test, screenshot, scrape, parallel, QA."
allowed-tools: Bash
---

# Playwright Browser — Automatisation Browser Headless

## Objectif

Automatiser les navigateurs web via `playwright-cli` — un CLI token-efficient pour Playwright. Tourne en headless par défaut, supporte les sessions parallèles via `-s=<name>`, et ne charge pas de schémas d'outils en contexte.

## Caractéristiques

- **Headless par défaut** — passer `--headed` à `open` pour voir le navigateur
- **Sessions parallèles** — utiliser `-s=<name>` pour plusieurs instances indépendantes
- **Profils persistants** — cookies et état de stockage préservés entre les appels
- **Token-efficient** — basé sur CLI, pas d'arbre d'accessibilité ni de schémas en contexte
- **Mode vision** (opt-in) — `PLAYWRIGHT_MCP_CAPS=vision` pour recevoir les screenshots comme images dans le contexte

## References

- `references/playwright-reference.md` — Guide complet des commandes Playwright CLI (navigation, interaction, capture, sessions, devtools, réseau, stockage)

Consulter la référence pour la liste exhaustive des commandes et options.

## Sessions

**Toujours utiliser une session nommée.** Dériver un nom court en kebab-case du contexte de la tâche. Cela donne à chaque tâche un profil browser persistant (cookies, localStorage, historique) qui s'accumule entre les appels.

```bash
# Dériver le nom de session depuis le contexte :
# "tester le checkout sur mystore.com" → -s=mystore-checkout
# "scraper les prix de competitor.com" → -s=competitor-pricing
# "test UI de la page login"           → -s=login-ui-test

playwright-cli -s=mystore-checkout open https://mystore.com --persistent
playwright-cli -s=mystore-checkout snapshot
playwright-cli -s=mystore-checkout click e12
```

Gérer les sessions :
```bash
playwright-cli list                          # lister les sessions actives
playwright-cli close-all                     # fermer toutes les sessions
playwright-cli -s=<name> close               # fermer une session spécifique
playwright-cli -s=<name> delete-data         # supprimer le profil d'une session
```

## Référence rapide

```
Core:       open [url], goto <url>, click <ref>, fill <ref> <text>, type <text>, snapshot, screenshot [ref], close
Navigate:   go-back, go-forward, reload
Keyboard:   press <key>, keydown <key>, keyup <key>
Mouse:      mousemove <x> <y>, mousedown, mouseup, mousewheel <dx> <dy>
Tabs:       tab-list, tab-new [url], tab-close [index], tab-select <index>
Save:       screenshot [ref], pdf, screenshot --filename=f
Storage:    state-save, state-load, cookie-*, localstorage-*, sessionstorage-*
Network:    route <pattern>, route-list, unroute, network
DevTools:   console, run-code <code>, tracing-start/stop, video-start/stop
Sessions:   -s=<name> <cmd>, list, close-all, kill-all
Config:     open --headed, open --browser=chrome, resize <w> <h>
```

## Workflow

1. **Ouvrir** une session avec viewport configuré et `--persistent` pour préserver cookies/état :
```bash
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 playwright-cli -s=<session> open <url> --persistent
# ou en mode visible :
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 playwright-cli -s=<session> open <url> --persistent --headed
# ou avec vision (screenshots en contexte) :
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 PLAYWRIGHT_MCP_CAPS=vision playwright-cli -s=<session> open <url> --persistent
```

2. **Obtenir les références d'éléments** via snapshot :
```bash
playwright-cli snapshot
```

3. **Interagir** en utilisant les refs du snapshot :
```bash
playwright-cli click <ref>
playwright-cli fill <ref> "texte"
playwright-cli type "texte"
playwright-cli press Enter
```

4. **Capturer** les résultats :
```bash
playwright-cli screenshot
playwright-cli screenshot --filename=output.png
```

5. **Toujours fermer la session une fois terminé.** Ce n'est pas optionnel — fermer la session nommée après chaque tâche :
```bash
playwright-cli -s=<session> close
```

## Configuration

Si un fichier `playwright-cli.json` existe dans le répertoire de travail, il est utilisé automatiquement. Sinon, les variables d'environnement et les défauts CLI suffisent.

```json
{
  "browser": {
    "browserName": "chromium",
    "launchOptions": { "headless": true },
    "contextOptions": { "viewport": { "width": 1440, "height": 900 } }
  },
  "outputDir": "./screenshots"
}
```

## Aide

Exécuter `playwright-cli --help` ou `playwright-cli --help <commande>` pour l'aide détaillée.
