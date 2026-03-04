#!/bin/bash
# Hook: Protège les fichiers de test contre les modifications
# Exit code 2 = erreur bloquante (l'agent doit se corriger)
# Exit code 0 = autorisé (continuer)
#
# Ce hook est déclenché sur PreToolUse pour les outils Edit et Write.
# Il lit l'input JSON sur stdin et vérifie si le fichier cible
# est dans un répertoire de test ou est un fichier de test.

INPUT=$(cat)

# Extraire le chemin du fichier depuis le JSON
FILE_PATH=$(echo "$INPUT" | grep -oE '"file_path"\s*:\s*"[^"]*"' | head -1 | sed 's/.*: *"//;s/"//')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Vérifier si le chemin contient des répertoires ou noms de fichiers liés aux tests
if echo "$FILE_PATH" | grep -qiE '(/__tests__/|/tests?/|\.test\.|\.spec\.|\.tests\.|test_|_test\.)'; then
  # Distinguer création (TDD: écrire un test RED) vs modification (protégé)
  # Convertir le chemin Windows en chemin Unix si nécessaire
  UNIX_PATH=$(echo "$FILE_PATH" | sed 's|\\|/|g')
  if [ -f "$UNIX_PATH" ] || [ -f "$FILE_PATH" ]; then
    echo "BLOQUE: Les modifications de fichiers de test existants ne sont pas autorisees." >&2
    echo "Fichier: $FILE_PATH" >&2
    echo "Corrige l'implementation pour passer les tests — ne modifie pas les tests." >&2
    exit 2
  else
    echo "AUTORISE: Creation d'un nouveau fichier de test (TDD phase RED)." >&2
    echo "Fichier: $FILE_PATH" >&2
    exit 0
  fi
fi

exit 0
