#!/bin/bash
# =============================================================================
# Configuration de l'environnement Claude Code — Projet Full App Dev
# =============================================================================
# Installe et configure tous les outils pour le workflow Full App Dev.
# A executer une seule fois par machine. Prerequis : Node.js 18+, npm, git, gh CLI.
#
# Utilisation :
#   chmod +x scripts/env-setup.sh
#   ./scripts/env-setup.sh
# =============================================================================

set -e

echo "============================================"
echo "  Configuration de l'environnement Claude Code"
echo "============================================"
echo ""

# ------------------------------------
# 1. CLI Claude Code
# ------------------------------------
echo "[1/8] Installation du CLI Claude Code..."
if command -v claude &>/dev/null; then
  echo "  Claude Code deja installe : $(claude --version 2>/dev/null || echo 'installe')"
else
  npm install -g @anthropic-ai/claude-code
  echo "  Claude Code installe."
fi
echo ""

# ------------------------------------
# 2. Context7 MCP — Documentation de librairies en temps reel
# ------------------------------------
echo "[2/8] Configuration de Context7 MCP..."
# Package : @upstash/context7-mcp (https://github.com/upstash/context7)
if claude mcp list 2>/dev/null | grep -q "context7"; then
  echo "  Context7 MCP deja configure."
else
  claude mcp add context7 -- npx -y @upstash/context7-mcp 2>/dev/null || {
    echo "  Note : echec de claude mcp add. Ajoutez manuellement :"
    echo "    claude mcp add context7 -- npx -y @upstash/context7-mcp"
  }
  echo "  Context7 MCP configure."
fi
echo ""

# ------------------------------------
# 3. Playwright MCP — Tests navigateur optimises en tokens
# ------------------------------------
echo "[3/8] Configuration de Playwright MCP..."
# Package : @playwright/mcp (https://github.com/playwright-community/mcp)
# Automatisation navigateur CLI avec sessions paralleles, econome en tokens.
if claude mcp list 2>/dev/null | grep -q "playwright"; then
  echo "  Playwright MCP deja configure."
else
  claude mcp add playwright -- npx -y @playwright/mcp@latest 2>/dev/null || {
    echo "  Note : echec de claude mcp add. Ajoutez manuellement :"
    echo "    claude mcp add playwright -- npx -y @playwright/mcp@latest"
  }
  echo "  Playwright MCP configure."
fi
echo ""

# ------------------------------------
# 4. Stitch MCP — Generation de designs UI
# ------------------------------------
echo "[4/8] Configuration de Stitch MCP..."
# Stitch genere des maquettes UI haute fidelite depuis des prompts textuels.
# Utilise par le role Designer (Segment 3).
if claude mcp list 2>/dev/null | grep -q "stitch"; then
  echo "  Stitch MCP deja configure."
else
  echo "  Note : Stitch MCP necessite une configuration manuelle."
  echo "  Configurez via .claude/settings.json ou executez :"
  echo "    claude mcp add stitch -- npx -y @anthropic-ai/mcp-server-stitch"
fi
echo ""

# ------------------------------------
# 5. Git & GitHub CLI
# ------------------------------------
echo "[5/8] Verification de git et GitHub CLI..."
if git --version &>/dev/null; then
  echo "  Git $(git --version | cut -d' ' -f3) — support des worktrees disponible."
else
  echo "  ATTENTION : Git non trouve. Installez git pour utiliser le controle de version."
fi
if command -v gh &>/dev/null; then
  echo "  GitHub CLI $(gh --version 2>/dev/null | head -1 | cut -d' ' -f3) — creation de repos disponible."
  if gh auth status &>/dev/null 2>&1; then
    echo "  GitHub CLI authentifie."
  else
    echo "  ATTENTION : GitHub CLI non authentifie. Executez : gh auth login"
  fi
else
  echo "  ATTENTION : GitHub CLI (gh) non trouve. Installez : https://cli.github.com/"
  echo "  Requis pour : gh repo create, gh pr create"
fi
echo ""

# ------------------------------------
# 6. Configuration des hooks Claude Code
# ------------------------------------
echo "[6/8] Mise en place des hooks Claude Code..."
HOOKS_DIR=".claude/hooks"
if [ -d "$HOOKS_DIR" ]; then
  for hook in protect-tests.sh protect-env.sh task-completed.sh; do
    if [ -f "$HOOKS_DIR/$hook" ]; then
      chmod +x "$HOOKS_DIR/$hook"
      echo "  Hook $hook pret."
    fi
  done
else
  echo "  Note : Executez ce script depuis la racine de votre projet ou se trouve .claude/."
fi
echo ""

# ------------------------------------
# 7. MCP Tool Search (chargement d'outils a la demande)
# ------------------------------------
echo "[7/8] Verification de la configuration MCP Tool Search..."
# Tool Search empeche les schemas d'outils MCP de surcharger la fenetre de contexte.
# Configure via la variable ENABLE_TOOL_SEARCH dans .claude/settings.json.
SETTINGS_FILE=".claude/settings.json"
if [ -f "$SETTINGS_FILE" ]; then
  if grep -q 'ENABLE_TOOL_SEARCH' "$SETTINGS_FILE" 2>/dev/null; then
    echo "  MCP Tool Search deja configure dans $SETTINGS_FILE."
  else
    echo "  Note : ENABLE_TOOL_SEARCH non trouve dans $SETTINGS_FILE."
    echo "  Ajoutez dans settings.json : \"env\": { \"ENABLE_TOOL_SEARCH\": \"true\" }"
  fi
else
  echo "  Note : $SETTINGS_FILE non trouve. Copiez d'abord le repertoire .claude/ depuis le template."
fi
echo ""

# ------------------------------------
# 8. Gemini API Key (Nano Banana — generation d'images)
# ------------------------------------
echo "[8/8] Configuration de la cle Gemini API..."
ENV_LOCAL=".env.local"
if [ -f "$ENV_LOCAL" ]; then
  GEMINI_KEY=$(grep -E '^GEMINI_API_KEY=' "$ENV_LOCAL" 2>/dev/null | cut -d'=' -f2-)
  if [ -n "$GEMINI_KEY" ]; then
    export GEMINI_API_KEY="$GEMINI_KEY"
    echo "  GEMINI_API_KEY chargee depuis $ENV_LOCAL."
  else
    echo "  ATTENTION : GEMINI_API_KEY absente dans $ENV_LOCAL."
    echo "  Ajoutez : GEMINI_API_KEY=votre_cle"
    echo "  Obtenez une cle : https://aistudio.google.com/app/apikey"
  fi
else
  echo "  Note : $ENV_LOCAL non trouve."
  echo "  Creez le fichier avec : GEMINI_API_KEY=votre_cle"
  echo "  Obtenez une cle : https://aistudio.google.com/app/apikey"
fi
echo ""

# ------------------------------------
# Creation du repertoire docs/
# ------------------------------------
mkdir -p docs
echo "  Repertoire docs/ cree (pour PRD, architecture, features.json)."
echo ""

# ------------------------------------
# Resume
# ------------------------------------
echo "============================================"
echo "  Configuration terminee"
echo "============================================"
echo ""
echo "Installe/configure :"
echo "  - CLI Claude Code"
echo "  - Context7 MCP (documentation librairies)         — @upstash/context7-mcp"
echo "  - Playwright MCP (tests navigateur)                — @anthropic-ai/mcp-server-playwright"
echo "  - Stitch MCP (generation de designs UI)            — configuration manuelle"
echo "  - Git + GitHub CLI (worktrees, creation de repos)"
echo "  - Hooks (protect-tests, protect-env, task-completed)"
echo "  - MCP Tool Search (chargement d'outils a la demande)"
echo "  - Gemini API Key (Nano Banana — generation d'images) — depuis .env.local"
echo ""
echo "Prochaines etapes :"
echo "  1. Copiez le repertoire .claude/ dans la racine de votre projet"
echo "  2. Initialisez le depot :  git init && gh repo create"
echo "  3. Lancez le pipeline :  /chef-de-projet \"Mon projet\""
echo ""
echo "Pour le workflow complet, consultez les skills dans .claude/skills/"
