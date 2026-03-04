#!/bin/bash
# Hook: Protège les fichiers d'environnement et de secrets
# Exit code 2 = erreur bloquante (l'agent doit se corriger)
# Exit code 0 = autorisé (continuer)
#
# Ce hook est déclenché sur PreToolUse pour les outils Edit et Write.
# Il bloque les modifications de fichiers contenant potentiellement des secrets.

INPUT=$(cat)

# Extraire le chemin du fichier depuis le JSON
FILE_PATH=$(echo "$INPUT" | grep -oE '"file_path"\s*:\s*"[^"]*"' | head -1 | sed 's/.*: *"//;s/"//')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Toujours bloquer les fichiers de secrets critiques (cles privees, certificats)
if echo "$FILE_PATH" | grep -qiE '(credentials|secrets|\.pem|\.key|\.crt|\.p12|\.pfx|id_rsa|id_ed25519)'; then
  echo "BLOQUE: Les modifications de fichiers de secrets ne sont pas autorisees." >&2
  echo "Fichier: $FILE_PATH" >&2
  echo "Ces fichiers contiennent des identifiants sensibles. Gerez-les manuellement." >&2
  exit 2
fi

# Fichiers .env : autorises en phase de developpement (avertissement seulement)
if echo "$FILE_PATH" | grep -qiE '(\.env|\.env\.)'; then
  echo "AVERTISSEMENT: Modification d'un fichier .env autorisee (mode developpement)." >&2
  echo "Fichier: $FILE_PATH" >&2
  echo "Verifiez qu'aucun secret de production n'est commite." >&2
  exit 0
fi

exit 0
