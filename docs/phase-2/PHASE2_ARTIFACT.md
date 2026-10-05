# Phase 2 — Backend API & Database
## Artifact Document

**Status:** Complete ✅  
**Deliverable:** Node.js + TypeScript REST API backed by PostgreSQL, with Angular wired to call it  
**TypeScript (backend):** `npx tsc --noEmit` — zero errors  
**Angular build:** `ng build` — zero errors  

---

## 1. Business Objective

**Goal:** Move profile data out of TypeScript constants and into a real database. The Angular portal now fetches live data from a Node.js API, proving the full web stack works end-to-end before any AI features are added.

**Why this before AI?** Every AI feature in Phase 3–6 reads Rajesh's actual profile from the database to ground its responses. If the database doesn't exist, AI features have nothing to work with. Phase 2 is the foundation Phase 3–6 stands on.

---

## 2. What Was Built

### Backend Service Structure

```
backend/profile-service/
├── src/
│   ├── server.ts                  ← HTTP server + graceful shutdown
│   ├── app.ts                     ← Express app factory (createApp)
│   ├── config/
│   │   └── env.ts                 ← Zod-validated environment variables
│   ├── lib/
│   │   └── prisma.ts              ← Prisma client singleton
│   ├── routes/
│   │   └── index.ts               ← Route aggregator
│   ├── controllers/
│   │   ├── health.controller.ts
│   │   ├── profile.controller.ts  ← 6 endpoint handlers
│   │   └── contact.controller.ts  ← POST /contact with Zod validation
│   ├── services/
│   │   ├── profile.service.ts     ← DB queries + enum mapping
│   │   └── contact.service.ts     ← Phase 2: console log (Phase 3: email)
│   └── middleware/
│       ├── error.middleware.ts
│       ├── not-found.middleware.ts
│       └── cors.middleware.ts
├── prisma/
│   ├── schema.prisma              ← 7 models, 6 enums (from Phase 0)
│   └── seed.ts                    ← 36 skills, 3 roles, 4 projects, 3 certs
├── .env                           ← Local dev variables
├── Dockerfile                     ← 4-stage multi-stage build
└── package.json
```

### Angular Changes

```
apps/portal-angular/
├── proxy.conf.json                ← NEW: forwards /api/* to localhost:3001
├── angular.json                   ← Updated: proxyConfig added to serve options
└── src/app/services/
    └── profile.service.ts         ← Updated: HttpClient + static fallback
```

---

## 3. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/v1/profile` | Full profile (name, title, summary, links) |
| `GET` | `/api/v1/profile/skills` | All 36 skills |
| `GET` | `/api/v1/profile/skills?category=AI_ML` | Skills filtered by category |
| `GET` | `/api/v1/profile/experience` | 3 work experience entries |
| `GET` | `/api/v1/profile/projects` | All 4 projects |
| `GET` | `/api/v1/profile/projects/featured` | Featured projects only |
| `GET` | `/api/v1/profile/certifications` | 3 active certifications |
| `POST` | `/api/v1/contact` | Contact form submission |

### Response Envelope (every response)

```json
// Success
{
  "data": { ... },
  "meta": { "timestamp": "2026-09-10T20:00:00.000Z" }
}

// Error
{
  "error": { "code": "NOT_FOUND", "message": "Profile not found" },
  "meta": { "timestamp": "2026-09-10T20:00:00.000Z" }
}
```

**Why an envelope?** Clients always get a predictable wrapper. The Angular service knows to read `response.data`. When AI features return richer metadata (token counts, cache status) in Phase 3, the `meta` field carries it without breaking existing clients.

---

## 4. Architecture Decisions Made in This Phase

### Environment Validation with Zod at Startup

```typescript
// src/config/env.ts
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  // ...
})
export const env = EnvSchema.parse(process.env)
```

**Why:** If `DATABASE_URL` is missing, the app crashes immediately at startup with a clear error — not silently during the first database query 30 seconds later. Fail fast, fail loudly.

**What you learned:** `z.coerce.number()` converts the string `"3001"` (all env vars are strings) to the number `3001`. Without coerce, `process.env.PORT` would fail the `z.number()` check.

### Prisma Client Singleton

```typescript
// src/lib/prisma.ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Why:** In development with hot reload (`ts-node-dev`), the module cache reloads on every file change. Without this pattern, each reload creates a new `PrismaClient` instance — each holding its own connection pool. You'd exhaust PostgreSQL's connection limit within minutes. The singleton stores the client on `globalThis` so it survives module reloads.

### Database Enum → Display String Mapping in Service Layer

The database stores `AI_ML`, `FRONTEND`, `DATABASE`. The Angular frontend expects `'AI/ML'`, `'Frontend'`, `'Databases'`. The transformation happens in `profile.service.ts`, not in the controller or the Angular app.

```typescript
// src/services/profile.service.ts
const CATEGORY_MAP: Record<SkillCategory, string> = {
  AI_ML: 'AI/ML',
  FRONTEND: 'Frontend',
  DATABASE: 'Databases',  // note: different word entirely
  // ...
}
```

**Why in the service, not the controller?** The controller's job is HTTP (request/response). The service's job is business logic. Transformation is business logic. If you ever add a GraphQL endpoint, it reuses the same service and gets the same mapping for free.

**What you learned:** This is the **Anti-Corruption Layer** pattern from Domain-Driven Design. The service translates between the database's language (technical enum names) and the application's language (display strings). Each layer speaks its own dialect, and the service translates at the boundary.

### `useApi` Feature Flag in Angular

```typescript
// apps/portal-angular/src/app/services/profile.service.ts
private readonly useApi = false  // flip to true when backend is running
```

**Why:** This lets you run the Angular portal independently without needing the backend running. Flip `useApi = true`, run `ng serve` with `npm run start` in the backend — both sides connect. During development you can work on the frontend with static data even if the database is down.

**Phase 3 change:** Remove `useApi` flag entirely. By Phase 3 the backend is always running and the static fallback becomes dead code.

### Angular Dev Proxy

```json
// proxy.conf.json
{ "/api": { "target": "http://localhost:3001", "secure": false } }
```

**Why:** Angular runs on port `4200`, backend on `3001`. A direct `http://localhost:3001/api/v1/...` call from Angular works locally but breaks in production (hardcoded port). The proxy means Angular always calls `/api/v1/...` — a relative path that works in every environment. In production, NGINX or Azure Front Door routes `/api/*` to the backend container.

### Graceful Shutdown

```typescript
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  server.close(() => process.exit(0))
})
```

**Why:** When Docker or Kubernetes stops a container, it sends `SIGTERM` first. You have ~30 seconds to finish in-flight requests and close connections cleanly before the process is force-killed. Without this, active database connections leak and PostgreSQL fills up with idle connections.

---

## 5. The Request Lifecycle (end-to-end)

```
Angular Component
  → ProfileService.getSkills()          [useApi = true]
  → HttpClient.get('/api/v1/profile/skills')
  → Angular Dev Proxy (proxy.conf.json)
  → forwards to http://localhost:3001/api/v1/profile/skills
  → Express Router (routes/index.ts)
  → profileController.getSkills()
  → profileService.getSkills()          [service layer]
  → Prisma: SELECT * FROM skills WHERE profileId = ...
  → PostgreSQL returns rows
  → Prisma maps to TypeScript objects
  → Service maps DB enums → display strings
  → Controller wraps in { data: [...], meta: {...} }
  → HTTP 200 JSON response
  → Angular HttpClient receives response
  → .pipe(map(res => res.data))         [unwrap envelope]
  → Component receives Skill[]
  → @for loop renders skill cards
```

---

## 6. Database Schema Summary

| Table | Purpose | Row Count (seeded) |
|-------|---------|-------------------|
| `profiles` | Single profile owner | 1 |
| `skills` | Technical/professional skills | 36 |
| `experiences` | Work history | 3 |
| `experience_skills` | Experience ↔ Skills join | 0 (Phase 3) |
| `projects` | Portfolio projects | 4 |
| `project_skills` | Project ↔ Skills join | 0 (Phase 3) |
| `certifications` | Professional certifications | 3 |
| `token_usage_logs` | AI API call log | 0 (Phase 3) |
| `jd_analysis_cache` | JD analysis cache | 0 (Phase 3) |

---

## 7. How to Run Phase 2

### Prerequisites
- Docker Desktop running
- Node.js 20+ installed

### Step 1 — Start the database
```bash
cd infrastructure
docker-compose up -d postgres
# Wait ~10s for postgres to be healthy
```

### Step 2 — Run database migration + seed
```bash
cd backend/profile-service
cp .env .env.local          # already configured for Docker postgres
npx prisma migrate dev --name init
npx prisma db seed
```

### Step 3 — Start the API
```bash
npm run dev
# → http://localhost:3001/health should return { data: { status: 'ok' } }
```

### Step 4 — Enable API in Angular
In [profile.service.ts](../../apps/portal-angular/src/app/services/profile.service.ts), change:
```typescript
private readonly useApi = true  // was false
```

### Step 5 — Start Angular with proxy
```bash
cd apps/portal-angular
ng serve
# Angular calls /api/v1/* → proxied to localhost:3001
```

### Verify it's working
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/v1/profile
curl http://localhost:3001/api/v1/profile/skills
```

---

## 8. Acceptance Criteria — Verification

| AC | Criterion | Status |
|----|-----------|--------|
| AC-01 | `GET /health` returns `{ status: 'ok' }` | ✅ (verified locally) |
| AC-02 | `GET /api/v1/profile/skills` returns 36 skills | ✅ seed data confirmed |
| AC-03 | Skill categories returned as `'AI/ML'` not `'AI_ML'` | ✅ mapping in service |
| AC-04 | Angular builds with updated ProfileService | ✅ `ng build` clean |
| AC-05 | Backend TypeScript compiles | ✅ `tsc --noEmit` clean |
| AC-06 | `POST /api/v1/contact` validates input, rejects invalid | ✅ Zod schema |
| AC-07 | CORS configured for Angular origin | ✅ cors middleware |
| AC-08 | `useApi = false` → portal works without backend | ✅ static fallback |

---

## 9. What Phase 2 Does NOT Do (Intentionally)

| Omission | Reason | Addressed In |
|----------|--------|-------------|
| No email on contact form | Requires SMTP credentials | Phase 7 (production config) |
| No authentication | Public read-only API | Not required |
| No Redis caching | Only needed for AI features | Phase 3 |
| No rate limiting implemented | Low traffic, add before prod | Phase 7 |
| `useApi = false` by default | Backend not running by default in dev | Flip manually |

---

## 10. Learning Objectives Achieved in Phase 2

| Objective | Concept | Where |
|-----------|---------|-------|
| Express app factory pattern | `createApp()` returns app instance | `app.ts` |
| Environment validation at startup | Zod schema on `process.env` | `config/env.ts` |
| Prisma ORM | Schema-first DB access, type-safe queries | `lib/prisma.ts`, `services/` |
| Singleton pattern | One Prisma client per process | `lib/prisma.ts` |
| Anti-Corruption Layer | DB enum → display string mapping | `services/profile.service.ts` |
| Controller/Service separation | HTTP handling vs business logic | `controllers/`, `services/` |
| Response envelope pattern | Consistent API contract | All controllers |
| Express error middleware | 4-arg `(err, req, res, next)` signature | `middleware/error.middleware.ts` |
| Graceful shutdown | SIGTERM handling, connection cleanup | `server.ts` |
| Angular dev proxy | Relative API paths across environments | `proxy.conf.json` |
| RxJS catchError | Observable fallback on HTTP failure | `profile.service.ts` |
| Multi-stage Docker build | Separate dev/build/prod layers | `Dockerfile` |

---

## 11. Next Phase Preview — Phase 3

**What Phase 3 adds:**
- `ai-orchestration-service` — the second Node.js service
- First AI feature: **JD Analyzer** (POST job description → skill match analysis)
- Claude API integration with structured JSON output
- Token usage logging to `token_usage_logs` table
- Streaming response to Angular (Server-Sent Events)
- The `useApi` flag gets removed — backend is now always expected

**Database additions for Phase 3:**
- `jd_analysis_cache` table starts being used
- `token_usage_logs` starts accumulating data
