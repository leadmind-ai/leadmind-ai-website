# Playwright CLI — Référence des commandes

## Démarrage rapide

```bash
# Ouvrir une session avec viewport configuré
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 playwright-cli -s=<session> open <url> --persistent

# Headed (visible)
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 playwright-cli -s=<session> open <url> --persistent --headed

# Avec vision (screenshots en contexte)
PLAYWRIGHT_MCP_VIEWPORT_SIZE=1440x900 PLAYWRIGHT_MCP_CAPS=vision playwright-cli -s=<session> open <url> --persistent
```

## Commandes par catégorie

### Navigation
| Commande | Description |
|----------|-------------|
| `open [url]` | Ouvrir une URL (avec `--persistent` pour garder le profil) |
| `goto <url>` | Naviguer vers une URL |
| `go-back` | Page précédente |
| `go-forward` | Page suivante |
| `reload` | Recharger la page |

### Interaction
| Commande | Description |
|----------|-------------|
| `snapshot` | Obtenir les références d'éléments de la page |
| `click <ref>` | Cliquer sur un élément par sa référence |
| `fill <ref> "texte"` | Remplir un champ (efface d'abord) |
| `type "texte"` | Taper du texte (sans effacer) |
| `press <touche>` | Appuyer sur une touche (Enter, Tab, Escape...) |

### Clavier et souris
| Commande | Description |
|----------|-------------|
| `keydown <touche>` | Appuyer sur une touche |
| `keyup <touche>` | Relâcher une touche |
| `mousemove <x> <y>` | Déplacer la souris |
| `mousedown` | Bouton souris enfoncé |
| `mouseup` | Bouton souris relâché |
| `mousewheel <dx> <dy>` | Scroll |

### Onglets
| Commande | Description |
|----------|-------------|
| `tab-list` | Lister les onglets ouverts |
| `tab-new [url]` | Ouvrir un nouvel onglet |
| `tab-close [index]` | Fermer un onglet |
| `tab-select <index>` | Sélectionner un onglet |

### Capture
| Commande | Description |
|----------|-------------|
| `screenshot` | Capture d'écran (stdout) |
| `screenshot --filename=f` | Capture d'écran vers un fichier |
| `screenshot <ref>` | Capture d'un élément spécifique |
| `pdf` | Exporter la page en PDF |

### Stockage
| Commande | Description |
|----------|-------------|
| `state-save` | Sauvegarder l'état complet (cookies + storage) |
| `state-load` | Restaurer l'état sauvegardé |
| `cookie-*` | Gérer les cookies |
| `localstorage-*` | Gérer le localStorage |
| `sessionstorage-*` | Gérer le sessionStorage |

### Réseau
| Commande | Description |
|----------|-------------|
| `network` | Voir les requêtes réseau |
| `route <pattern>` | Intercepter des requêtes |
| `route-list` | Lister les routes interceptées |
| `unroute` | Supprimer les interceptions |

### DevTools
| Commande | Description |
|----------|-------------|
| `console` | Voir les messages console JS |
| `run-code <code>` | Exécuter du JavaScript dans la page |
| `tracing-start` | Démarrer le traçage |
| `tracing-stop` | Arrêter le traçage |
| `video-start` | Démarrer l'enregistrement vidéo |
| `video-stop` | Arrêter l'enregistrement vidéo |

### Sessions
| Commande | Description |
|----------|-------------|
| `-s=<name> <cmd>` | Exécuter une commande dans une session nommée |
| `list` | Lister toutes les sessions actives |
| `close-all` | Fermer toutes les sessions |
| `kill-all` | Forcer la fermeture de toutes les sessions |
| `-s=<name> close` | Fermer une session spécifique |
| `-s=<name> delete-data` | Supprimer le profil d'une session |

### Configuration
| Commande | Description |
|----------|-------------|
| `open --headed` | Ouvrir en mode visible |
| `open --browser=chrome` | Utiliser Chrome au lieu de Chromium |
| `resize <w> <h>` | Redimensionner la fenêtre |

## Convention de nommage des sessions

Dériver un nom court en kebab-case du contexte :

```bash
# "tester le checkout" → -s=checkout-test
# "scraper les prix"   → -s=prix-scraping
# "login flow"         → -s=login-flow
```

## Configuration via fichier

Si `playwright-cli.json` existe dans le répertoire de travail :

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

```bash
playwright-cli --help
playwright-cli --help <commande>
```
