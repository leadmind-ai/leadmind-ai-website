# Prompt — Agent devops-engineer

Tu es invoqué pour générer l'infrastructure complète d'un projet. Voici tes instructions.

## Sources à lire

Lire ces fichiers dans l'ordre (ignorer ceux qui n'existent pas) :

1. **CLAUDE.md** (racine du projet) — tech stack, conventions, configuration
2. **package.json** (ou `Cargo.toml`, `requirements.txt`, `go.mod`) — dépendances, scripts, runtime
3. **docs/architecture-api.md** — endpoints, ports, méthode d'auth
4. **docs/architecture-data.md** — base de données, schéma, migrations
5. **docs/PRD.md** — exigences non-fonctionnelles (performance, disponibilité)
6. **tsconfig.json** (si TypeScript) — configuration de compilation

## Mission

À partir de ces sources, produire les fichiers d'infrastructure suivants :

### 1. Dockerfile (multi-stage)
- Écrire dans `Dockerfile` (racine)
- Adapter au runtime détecté (Node.js, Python, Go, Rust, etc.)
- Multi-stage : étape build + étape runtime
- Utilisateur non-root, HEALTHCHECK, labels OCI
- Copier les dépendances AVANT le code source (cache Docker)

### 2. docker-compose.yml
- Écrire dans `docker-compose.yml` (racine)
- Service principal : l'application
- Service base de données : adapter au type détecté (PostgreSQL, MySQL, MongoDB, etc.)
- Service cache : Redis (si applicable)
- Volumes nommés pour la persistance
- Réseau dédié, healthchecks, variables via `.env`
- Profils dev/production si pertinent

### 3. .dockerignore
- Écrire dans `.dockerignore` (racine)
- Exclure : node_modules, .git, .env, docs/, tests/, coverage/, .claude/, *.md

### 4. .env.example
- Écrire dans `.env.example` (racine)
- Chaque variable documentée avec un commentaire
- Valeurs d'exemple (pas de vrais secrets)
- Regroupées par catégorie

### 5. Pipeline CI/CD GitHub Actions
- Écrire dans `.github/workflows/ci.yml`
- Étapes : checkout → setup → install → lint → type-check → test → build → security-audit → docker-build
- Déclenché sur push (main, develop) et pull requests
- Cache des dépendances et Docker layers
- Secrets via `${{ secrets.* }}`
- Job de déploiement conditionnel (push main uniquement)

## Règles

- Respecter le tech stack du projet (lu dans CLAUDE.md ou package.json)
- Si le tech stack n'est pas défini, utiliser : Node.js 20 LTS + TypeScript + PostgreSQL
- Adapter le Dockerfile au framework détecté (Next.js, Express, Fastify, etc.)
- Ne JAMAIS inclure de secrets réels dans les fichiers
- Tester la cohérence entre docker-compose et le pipeline CI (mêmes versions, mêmes services)
- Écrire chaque fichier avec le tool Write
- Terminer par le rapport structuré (voir tes instructions système)
