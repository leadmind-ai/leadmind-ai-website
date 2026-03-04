# Registry Template

> Ce template est utilisé par le lead pour créer et maintenir `docs/contracts/registry.md`.
> Le registry est la mémoire persistante entre les slices. Il est écrit sur disque et lu par chaque nouvelle invocation.

## Structure du fichier `docs/contracts/registry.md`

```markdown
# Registry des Slices — [Nom du Projet]

> Fichier mis à jour automatiquement par le lead développeur après chaque slice.
> Source de vérité pour la continuité inter-slices.

## Vue d'ensemble

| # | Slice | Statut | Date | Mode |
|---|-------|--------|------|------|
| 1 | Auth | Complété | YYYY-MM-DD | Séquentiel |
| 2 | Dashboard | Complété | YYYY-MM-DD | Parallèle |
| 3 | Remboursements | En cours | — | — |

---

## Slice 1 : Auth (complété le YYYY-MM-DD)

### Contrat DB
TABLE users:
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid()
  email         VARCHAR(255) UNIQUE NOT NULL
  password_hash VARCHAR(255) NOT NULL
  name          VARCHAR(100) NOT NULL
  created_at    TIMESTAMPTZ DEFAULT NOW()

TABLE sessions:
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
  token       VARCHAR(512) UNIQUE NOT NULL
  expires_at  TIMESTAMPTZ NOT NULL
  created_at  TIMESTAMPTZ DEFAULT NOW()

QUERIES:
  getUserById(id: UUID) → User | null
  getUserByEmail(email: string) → User | null
  createUser(data: CreateUserInput) → User
  createSession(userId: UUID) → Session
  getSessionByToken(token: string) → Session | null
  deleteSession(id: UUID) → void

### Contrat API
POST /api/auth/register
  Request:  { "email": string, "password": string, "name": string }
  Response: { "token": string, "user": { "id": string, "email": string, "name": string } }
  Status:   201 Created | 400 { "error": "Email already exists" }

POST /api/auth/login
  Request:  { "email": string, "password": string }
  Response: { "token": string, "user": { "id": string, "email": string, "name": string } }
  Status:   200 OK | 401 { "error": "Invalid credentials" }

POST /api/auth/logout
  Status:   204 No Content
  Headers:  Authorization: Bearer <token>

GET /api/auth/me
  Response: { "id": string, "email": string, "name": string }
  Status:   200 OK | 401 { "error": "Unauthorized" }
  Headers:  Authorization: Bearer <token>

### Conventions établies
- Auth : JWT via cookie httpOnly, middleware dans src/lib/auth.ts
- Erreurs : format { "error": string } — status HTTP cohérent
- Validation : Zod schemas dans src/lib/validators/
- Types : interfaces dans src/types/[slice].ts
- Composants : dossier par composant, co-located tests
- Structure API : src/app/api/[slice]/[resource]/route.ts

### Fichiers clés
- prisma/schema.prisma — Schéma complet (lire avant d'étendre)
- src/lib/auth.ts — Middleware auth (réutiliser dans tous les slices)
- src/lib/validators/auth.ts — Pattern de validation Zod
- src/types/auth.ts — Types Request/Response
- src/components/auth/ — Composants auth (LoginForm, RegisterForm)
- src/hooks/useAuth.ts — Hook d'authentification

---

## Slice 2 : Dashboard (complété le YYYY-MM-DD)

### Contrat DB
[Tables ajoutées/étendues...]

### Contrat API
[Endpoints ajoutés...]

### Conventions établies
[Nouvelles conventions ou confirmations...]

### Fichiers clés
[Fichiers importants de ce slice...]

---
```

## Règles d'écriture du registry

1. **Cumulatif** : chaque slice ajoute une section, les sections précédentes ne sont jamais modifiées
2. **Concis** : ~30-40 lignes par slice maximum
3. **Contrats exacts** : copier les contrats réels (post contract-diff), pas les contrats du plan
4. **Conventions** : noter uniquement les NOUVELLES conventions établies dans ce slice
5. **Fichiers clés** : lister les fichiers qu'un futur agent devra lire en priorité
6. **Vue d'ensemble** : mettre à jour le tableau récapitulatif en haut du fichier
