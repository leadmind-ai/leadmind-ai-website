#!/usr/bin/env bash
# Hook: PreToolUse sur TaskUpdate
# Exécute les tests avant d'autoriser la complétion d'une tâche.
#
# Ce hook reçoit l'input JSON sur stdin quand TaskUpdate est appelé.
# Il n'agit que quand le status passe à "completed".
#
# Exit codes:
#   0 — autoriser le TaskUpdate
#   2 — bloquer le TaskUpdate (vérification qualité échouée)

set -euo pipefail

INPUT="$(cat)"

# Extraire le status depuis l'input
if command -v jq &>/dev/null; then
  STATUS="$(echo "$INPUT" | jq -r '.status // empty')"
else
  STATUS="$(echo "$INPUT" | grep -oE '"status"\s*:\s*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/' || true)"
fi

# Ne valider que lors du passage à completed
if [[ "$STATUS" != "completed" ]]; then
  exit 0
fi

echo "Tache marquee comme completee — verification qualite en cours..."

# --- Check 1: Suite de tests ---
TESTS_FAILED=false

if [[ -f "package.json" ]] && grep -q '"test"' package.json 2>/dev/null; then
  echo "Execution de npm test..."
  if ! npm test --silent 2>&1; then
    TESTS_FAILED=true
  fi
elif [[ -f "Cargo.toml" ]]; then
  echo "Execution de cargo test..."
  if ! cargo test --quiet 2>&1; then
    TESTS_FAILED=true
  fi
elif [[ -f "pytest.ini" ]] || [[ -f "conftest.py" ]]; then
  if command -v pytest &>/dev/null; then
    echo "Execution de pytest..."
    if ! pytest --quiet 2>&1; then
      TESTS_FAILED=true
    fi
  fi
elif [[ -f "pyproject.toml" ]] && grep -q '\[tool\.pytest' pyproject.toml 2>/dev/null; then
  if command -v pytest &>/dev/null; then
    echo "Execution de pytest..."
    if ! pytest --quiet 2>&1; then
      TESTS_FAILED=true
    fi
  fi
elif [[ -f "Makefile" ]] && grep -q '^test:' Makefile 2>/dev/null; then
  echo "Execution de make test..."
  if ! make test 2>&1; then
    TESTS_FAILED=true
  fi
else
  echo "Aucune suite de tests detectee. Validation des tests ignoree."
fi

if [[ "$TESTS_FAILED" == true ]]; then
  echo ""
  echo "Impossible de completer la tache — les tests echouent."
  echo "Corrige les tests avant de completer cette tache."
  exit 2
fi

# --- Check 2: Build (si applicable) ---
if [[ -f "package.json" ]] && grep -q '"build"' package.json 2>/dev/null; then
  echo "Execution de npm run build..."
  if ! npm run build --silent 2>&1; then
    echo ""
    echo "Impossible de completer la tache — le build est casse."
    exit 2
  fi
fi

echo "Toutes les verifications ont reussi."
exit 0
