# Protocole Contract-First

## Principe

Le lead ne code jamais. Il orchestre la chaîne de contrats entre agents. Chaque agent publie son contrat d'interface **avant** de coder (mode séquentiel) ou **après** avoir codé depuis le plan (mode parallèle). Le lead **vérifie** la cohérence dans les deux cas.

## Deux modes d'exécution

### Mode Séquentiel — Contract-First avec Lead Relay

Utilisé quand : greenfield (premier slice), architecture incomplète, ou incertitude sur les contrats.

```
1. Spawner Database agent → attend contrat
2. Database publie schéma via SendMessage → Lead
3. Lead VÉRIFIE le contrat (checklist ci-dessous)
4. Lead forward le contrat vérifié au Backend via SendMessage
5. Backend publie API contract via SendMessage → Lead
6. Lead VÉRIFIE le contrat API (checklist ci-dessous)
7. Lead forward le contrat API vérifié au Frontend via SendMessage
8. Frontend implémente avec le contrat exact
```

**Avantage** : contrats vérifiés avant chaque étape, zéro risque d'incohérence.
**Inconvénient** : séquentiel, ~3x plus lent.

### Mode Parallèle — Plan-Based avec Contract Diff

Utilisé quand : architecture détaillée disponible, codebase mature, prime_planner a produit un plan fiable.

```
1. Prime_planner produit un plan avec contrats attendus
2. Lead valide le plan (HARD-GATE)
3. Spawner les 3 builders simultanément, chacun avec sa section du plan
4. Les 3 builders implémentent en parallèle
5. Les 3 builders terminent et publient leur contrat réel
6. Lead effectue un CONTRACT DIFF : réel vs plan
7. Si delta → correction ciblée
8. Si match → intégration
```

**Avantage** : ~3x plus rapide, contexte des builders protégé.
**Inconvénient** : risque de delta entre plan et réalité (mitigé par le contract diff).

## Critères de choix du mode

| Critère | → Séquentiel | → Parallèle |
|---------|-------------|-------------|
| Premier slice (greenfield) | Oui | Non |
| Architecture API détaillée | Non requis | Requis |
| Architecture Data détaillée | Non requis | Requis |
| Prime_planner a produit un plan | Non requis | Requis |
| Codebase existante à étendre | Possible | Recommandé |
| Slice complexe avec incertitudes | Oui | Non |

Le prime_planner recommande le mode dans son plan. Le lead valide via AskUserQuestion.

## Checklist de vérification du lead

### Contrat Database (séquentiel : avant forward / parallèle : après build)

- [ ] Noms de tables et colonnes sans ambiguïté
- [ ] Types exacts spécifiés (VARCHAR(255), TIMESTAMPTZ, NUMERIC(10,2), etc.)
- [ ] Contraintes déclarées (NOT NULL, UNIQUE, FK, CHECK)
- [ ] Function signatures pour les opérations CRUD
- [ ] Tables existantes non modifiées (EXTEND ONLY)

### Contrat API (séquentiel : avant forward / parallèle : après build)

- [ ] URLs exactes avec ou sans trailing slash
- [ ] Méthodes HTTP pour chaque endpoint
- [ ] JSON shapes de requête avec types exacts pour chaque champ
- [ ] JSON shapes de réponse avec types exacts pour chaque champ
- [ ] Status codes pour chaque scénario (200, 201, 400, 401, 404, 500)
- [ ] Format des erreurs cohérent avec les slices précédents
- [ ] Headers requis (Authorization, Content-Type, etc.)
- [ ] Middleware auth réutilisé (pas recréé)

### Contract Diff Frontend → API (parallèle uniquement)

- [ ] Fetch calls du frontend correspondent aux URLs réelles du backend
- [ ] JSON shapes envoyées correspondent aux schémas de validation Zod
- [ ] JSON shapes reçues correspondent aux types TypeScript
- [ ] Status codes gérés correspondent aux status codes réels
- [ ] Headers envoyés correspondent aux headers attendus

## Contract Diff — Procédure

Après le build parallèle, le lead effectue :

1. **Lire** le contrat réel publié par chaque builder (via SendMessage)
2. **Comparer** avec le contrat attendu du plan
3. **Classifier** les deltas :
   - **Compatible** : le builder a ajouté un champ optionnel → acceptable
   - **Incompatible** : le builder a changé un type ou une URL → correction nécessaire
   - **Manquant** : le builder n'a pas implémenté un endpoint du plan → correction nécessaire
4. **Si corrections nécessaires** : relancer uniquement le builder concerné avec les corrections ciblées
5. **Vérifier** : `tsc --noEmit` et `npm run build` passent

## Cross-cutting concerns

| Concern | Agent assigné | Justification |
|---------|--------------|---------------|
| Types partagés (`src/types/[slice].ts`) | Backend | Source de vérité des interfaces |
| Variables d'environnement | Lead | Configuration partagée |
| Package.json / dependencies | Lead | Fichier partagé |
| Gestion d'erreurs globale | Backend (réutilise l'existant) | Patterns API |
| Design tokens / CSS variables | Frontend (réutilise DESIGN.md) | Source de vérité design |
| Middleware auth | Read-only (créé dans le slice Auth) | Partagé entre slices |

## Anti-patterns

### Spawn parallèle sans plan (INTERDIT)
```
Spawner frontend + backend + database en même temps SANS plan du prime_planner
→ Chaque agent invente ses propres interfaces
→ Incohérence garantie
```

### Modifier le code des slices précédents (INTERDIT)
```
Un builder modifie des fichiers d'un slice précédent
→ Régression sur les fonctionnalités existantes
→ Contract diff des slices précédents invalidé
```

### Ignorer le contract diff (INTERDIT)
```
Le lead skip le contract diff après un build parallèle
→ Incohérences non détectées entre les couches
→ Bugs d'intégration tardifs
```

## Format des contrats

### Contrat Database (exemple)
```
TABLE users:
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
  email       VARCHAR(255) UNIQUE NOT NULL
  name        VARCHAR(100) NOT NULL
  created_at  TIMESTAMPTZ DEFAULT NOW()

QUERIES:
  getUserById(id: UUID) → User | null
  getUserByEmail(email: string) → User | null
  createUser(email: string, name: string) → User
```

### Contrat API (exemple)
```
POST /api/auth/login
  Request:  { "email": string, "password": string }
  Response: { "token": string, "user": { "id": string, "email": string, "name": string } }
  Status:   200 OK | 401 Unauthorized { "error": "Invalid credentials" }
  Headers:  Content-Type: application/json

GET /api/users/:id
  Response: { "id": string, "email": string, "name": string, "createdAt": string }
  Status:   200 OK | 404 Not Found { "error": "User not found" }
  Headers:  Authorization: Bearer <token>
```
