# Architecture Document
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07  
**Status:** Accepted

---

## Architecture Principles

This system is designed around six guiding principles that inform every technology and structural decision:

**1. Separation of Intelligence from Presentation**
The AI orchestration layer is a distinct service, not embedded in the frontend or profile service. This means the intelligence can be swapped, tested, and scaled independently of how the data is displayed.

**2. Profile Data as Single Source of Truth**
All AI-generated content — adapted profiles, resumes, recommendations — must be traceable to specific records in the profile database. The LLM is a transformation engine, not a knowledge source. This prevents hallucination from entering generated outputs.

**3. Cost-Conscious AI Design**
Every AI feature has an explicit token budget. Results are cached. Budget alerts prevent runaway spend. The system is designed as if every API call has a real monetary cost — because it does.

**4. Graceful Degradation Over Hard Failures**
When the AI layer is unavailable (rate limits, API outage, budget exceeded), the system falls back to static responses. The profile itself remains accessible at all times. AI features are an enhancement, not a dependency for core functionality.

**5. Observable by Default**
Every service logs structured JSON. Every AI call logs token counts. Every API request logs response time. Observability is not added later — it is built in from the start.

**6. Learn By Building**
Architecture decisions are documented in ADRs before implementation. The complexity of the architecture is deliberately calibrated to maximize learning across AI integration, cloud infrastructure, full-stack TypeScript, and DevOps — not just to solve the immediate problem.

---

## Architecture Decisions Summary

| Decision | Choice | ADR |
|---|---|---|
| Monorepo strategy | Turborepo | ADR-001 |
| Frontend frameworks | Angular (public) + React (dashboard) | ADR-002 |
| AI provider strategy | Claude primary, Vertex AI for embeddings | ADR-003 |
| Backend language | Node.js + TypeScript | ADR-004 |
| Primary database | PostgreSQL + Prisma | ADR-005 |

---

## High-Level Component Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          INTERNET / VISITORS                                ║
╚════════════════════════════════════╤═════════════════════════════════════════╝
                                     │ HTTPS
                                     ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                    AZURE STATIC WEB APPS / NGINX                            ║
║              TLS Termination  │  CORS  │  Rate Limiting                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
              │                                        │
              ▼                                        ▼
╔═════════════════════════════╗    ╔═════════════════════════════════════════╗
║   apps/portal-angular        ║    ║        apps/ai-dashboard-react          ║
║   Angular 17 SPA             ║    ║        React 18 + Vite SPA              ║
║   Public Profile Portal      ║    ║        Private AI Tool Dashboard        ║
║   Port 4200                  ║    ║        Port 3000                        ║
║                              ║    ║                                         ║
║   Pages:                     ║    ║   Pages:                                ║
║   - / (Hero + Skills)        ║    ║   - /jd-analyzer                        ║
║   - /projects                ║    ║   - /resume-generator                   ║
║   - /experience              ║    ║   - /token-dashboard                    ║
║   - /contact                 ║    ║   - /recommendations                    ║
║   - /ask (RAG chat)          ║    ║   - /rag-assistant                      ║
╚══════════════┬══════════════╝    ╚══════════════════┬══════════════════════╝
               │ REST/JSON                             │ REST/JSON
               │ GET requests only                    │ GET + POST
               ▼                                      ▼
╔═════════════════════════════╗    ╔═════════════════════════════════════════╗
║  backend/profile-service     ║    ║  backend/ai-orchestration-service        ║
║  Node.js 20 + Express        ║    ║  Node.js 20 + Express                    ║
║  Port 3001                   ║    ║  Port 3002                               ║
║                              ║    ║                                          ║
║  Routes:                     ║    ║  Routes:                                 ║
║  GET  /api/v1/profile        ║    ║  POST /api/v1/analyze-jd                 ║
║  GET  /api/v1/skills         ║    ║  POST /api/v1/adapt-profile              ║
║  GET  /api/v1/projects       ║    ║  POST /api/v1/generate-resume            ║
║  GET  /api/v1/experience     ║    ║  POST /api/v1/recommendations            ║
║  POST /api/v1/contact        ║    ║  GET  /api/v1/token-usage                ║
║  GET  /health                ║    ║  POST /api/v1/rag/query                  ║
╚══════════════┬══════════════╝    ╚══════════════════┬══════════════════════╝
               │                                      │
               ▼                                      │
╔═════════════════════════════╗                      │
║     PostgreSQL 16            ║◄─────────────────────┤ (token logs + analysis
║     Prisma ORM               ║                      │  cache metadata)
║     Port 5432                ║                      │
║                              ║                      ▼
║   Tables:                    ║    ╔══════════════════════════════════════╗
║   - profiles                 ║    ║     Redis 7                           ║
║   - skills                   ║    ║     Port 6379                         ║
║   - experiences              ║    ║                                       ║
║   - projects                 ║    ║   Keys:                               ║
║   - certifications           ║    ║   - jd_analysis:{hash}                ║
║   - token_usage_logs         ║    ║   - profile_cache                     ║
║   - jd_analysis_cache        ║    ║   - session:{id}                      ║
╚══════════════════════════════╝    ╚═════════════════┬════════════════════╝
                                                      │
                                                      ▼
                                    ╔══════════════════════════════════════╗
                                    ║        EXTERNAL AI SERVICES           ║
                                    ║                                       ║
                                    ║  ┌───────────────────────────────┐   ║
                                    ║  │  Anthropic Claude API          │   ║
                                    ║  │  claude-3-5-sonnet-20241022    │   ║
                                    ║  │                                │   ║
                                    ║  │  Features:                     │   ║
                                    ║  │  - JD Analysis                 │   ║
                                    ║  │  - Profile Adaptation          │   ║
                                    ║  │  - Resume Generation           │   ║
                                    ║  │  - Skill Recommendations       │   ║
                                    ║  └───────────────────────────────┘   ║
                                    ║                                       ║
                                    ║  ┌───────────────────────────────┐   ║
                                    ║  │  Google Vertex AI              │   ║
                                    ║  │  text-embedding-004            │   ║
                                    ║  │                                │   ║
                                    ║  │  Features:                     │   ║
                                    ║  │  - Profile content embeddings  │   ║
                                    ║  │  - Query embeddings for RAG    │   ║
                                    ║  └───────────────────────────────┘   ║
                                    ╚══════════════════════════════════════╝
```

---

## Technology Stack Justification

| Layer | Technology | Why This, Not That |
|---|---|---|
| **Angular 17** | Public portal | Strong typing, dependency injection, and SSR support are production requirements for a public-facing site. Angular's opinionated structure reduces decision fatigue. React was chosen for the dashboard (faster prototyping) but Angular fits the public portal's stability needs. |
| **React 18 + Vite** | AI dashboard | The AI dashboard requires frequent iteration as AI features evolve. React's ecosystem (react-query, recharts, react-pdf) makes data-heavy UI faster to build. Vite's HMR is significantly faster than Angular's dev server for rapid AI feature prototyping. |
| **Node.js 20 + Express** | Both backends | Unified language across the stack reduces cognitive overhead. The team (solo developer) knows TypeScript deeply. Express is minimal and well-understood. Fastify was considered but Express's ecosystem is more familiar for this use case. |
| **Prisma** | ORM | Type-safe query client eliminates an entire class of runtime errors. Migration tooling is excellent. The generated types integrate directly with the shared-types package. Alternatives (TypeORM, Drizzle) don't match Prisma's developer experience for solo development. |
| **PostgreSQL 16** | Database | ACID compliance for data integrity. JSONB columns for flexible AI output storage. Excellent Prisma support. pgvector extension available for Phase 6 RAG embeddings. MongoDB was considered but relational structure fits the profile data model better. |
| **Redis 7** | Cache | Sub-millisecond reads for JD analysis cache. Mature Node.js client (ioredis). Low operational complexity on Azure Cache for Redis. |
| **Anthropic Claude** | Primary AI | Superior instruction following and JSON structured output. claude-3-5-sonnet offers the best balance of capability and cost for this use case. Tested against GPT-4o and Gemini 1.5 Pro — Claude produced more consistent structured outputs in prompt testing. |
| **Vertex AI text-embedding-004** | Embeddings | High-quality embeddings at lower cost per token than OpenAI Ada-002. GCP free tier covers initial embedding generation. Integrates with pgvector for Phase 6 RAG. |
| **Turborepo** | Monorepo | Incremental builds and intelligent task caching cut CI time significantly. Built-in workspace management. See ADR-001 for full comparison. |
| **Terraform** | IaC | Industry standard for Azure infrastructure. State management, plan/apply workflow prevents accidental changes. Bicep was considered but Terraform's provider ecosystem and transferable skills won out. |
| **GitHub Actions** | CI/CD | Native integration with the repository. Free for public repos. Sufficient for a solo project's CI/CD needs. |

---

## Service Boundaries

### Profile Service (backend/profile-service)

**Owns:** All read/write operations on the profile database (profiles, skills, experiences, projects, certifications).

**Does NOT own:** AI processing, token logging, or any external API calls.

**Contracts:**
- Exposes REST API consumed by both frontends
- Has exclusive write access to the profile data tables
- Reads token_usage_logs table for the dashboard summary (read-only)

**Why isolated:** Profile data must remain accessible even when the AI service is down. Separation ensures the public portal never depends on an AI API for basic content display.

---

### AI Orchestration Service (backend/ai-orchestration-service)

**Owns:** All LLM API calls, prompt construction, token logging, and result caching logic.

**Does NOT own:** Profile data writes, email sending, or public profile display.

**Contracts:**
- Calls Profile Service API to fetch profile data (does not access DB directly)
- Writes token usage logs to shared PostgreSQL instance
- Reads/writes JD analysis results to Redis cache
- Calls Anthropic Claude API and Vertex AI APIs

**Why isolated:** AI features change frequently as models evolve and prompts are tuned. Isolating this service means prompt changes, model swaps, and new AI features don't risk destabilizing the core profile API.

---

### Shared Types Package (packages/shared-types)

**Owns:** TypeScript interfaces consumed by all services and frontends.

**Does NOT own:** Any business logic; interfaces only.

**Purpose:** Ensures that the shape of data flowing between services is verified at compile time across the entire monorepo. A change to the `JDAnalysisResponse` interface immediately surfaces type errors in both the AI service and the React dashboard.

---

## Data Flow Diagrams

### Profile Load Flow

```
Browser (Angular Portal)
       │
       │ 1. GET /api/v1/profile
       ▼
Profile Service
       │
       │ 2. Check application cache (in-memory, 5min TTL)
       │    Cache hit? Return immediately.
       │    Cache miss? Continue.
       │
       ▼
PostgreSQL
       │
       │ 3. SELECT profile + skills + experience + projects + certs
       │    (single optimized JOIN query via Prisma)
       │
       ▼
Profile Service
       │
       │ 4. Transform to API response shape
       │ 5. Write to application cache
       │
       ▼
Browser
       │ 6. Render Angular components from response data
```

### JD Analyzer Flow

```
Browser (React Dashboard)
       │
       │ 1. POST /api/v1/analyze-jd { jd_text: "..." }
       ▼
AI Orchestration Service
       │
       │ 2. Sanitize input (strip HTML, truncate to 4000 tokens)
       │ 3. Generate cache key: SHA-256 hash of cleaned JD text
       │
       ▼
Redis
       │ 4. GET jd_analysis:{hash}
       │    Cache hit? Return cached result (skip steps 5-9)
       │    Cache miss? Continue
       ▼
AI Orchestration Service
       │
       │ 5. Fetch current profile data from Profile Service API
       │ 6. Construct prompt (system prompt + JD text)
       │
       ▼
Anthropic Claude API
       │
       │ 7. Send messages request with structured output instructions
       │ 8. Receive JSON response with skill extraction
       │
       ▼
AI Orchestration Service
       │
       │ 9.  Validate response against Zod schema
       │ 10. Log token usage to PostgreSQL (model, tokens, cost)
       │ 11. Write result to Redis (TTL: 24 hours)
       │
       ▼
Browser
       │ 12. Display analysis results + match scores
```

### Resume Generation Flow

```
Browser (React Dashboard)
       │
       │ 1. POST /api/v1/generate-resume { jd_analysis_id, profile_id }
       ▼
AI Orchestration Service
       │
       │ 2. Fetch full profile data from Profile Service
       │ 3. Fetch JD analysis from Redis cache (or DB if expired)
       │ 4. Construct resume generation prompt with profile data
       │    (includes anti-fabrication constraints)
       │
       ▼
Anthropic Claude API
       │
       │ 5. Generate tailored resume JSON
       │
       ▼
AI Orchestration Service
       │
       │ 6. Validate resume JSON against schema
       │ 7. Verify all resume claims exist in profile data (assertion check)
       │ 8. Log token usage
       │
       ▼
Browser
       │ 9. Render resume preview in React component
       │ 10. User clicks "Download PDF"
       │ 11. Client-side PDF generation (react-pdf)
```

---

## Security Architecture

### Threat Model

| Threat | Vector | Control |
|---|---|---|
| Prompt injection | Malicious text in JD input field | Input sanitization; strict system prompt structure; output schema validation |
| API key exposure | Secrets in code/logs | Azure Key Vault; environment variables only; never logged |
| Unauthorized AI dashboard access | Direct URL access | Admin API key header required; key stored in Key Vault |
| DoS via AI endpoint spam | Repeated JD submissions | Rate limiting (10/hour/IP); Redis cache prevents duplicate API calls |
| SQL injection | Malformed profile query parameters | Prisma parameterized queries; no raw SQL in application code |
| Dependency vulnerabilities | Outdated npm packages | Dependabot alerts; npm audit in CI pipeline |

### Secret Management

```
Development:  .env file (gitignored)
Production:   Azure Key Vault → injected at container startup as environment variables
              via Azure Container Apps managed secrets
```

---

## Deployment Architecture

### Local Development

```
Docker Compose orchestrates:
- postgres:16 container (port 5432)
- redis:7-alpine container (port 6379)
- pgadmin container (port 5050)
Node.js services run natively (faster HMR)
Angular and React dev servers run natively
```

### Production (Azure)

```
┌─────────────────────────────────────────────────────────┐
│                    Azure Subscription                   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              rajesh-profile-rg                    │  │
│  │                                                   │  │
│  │  Azure Static Web Apps ──── Angular Portal        │  │
│  │                                                   │  │
│  │  Azure Container Apps Environment                 │  │
│  │  ├── profile-service container                    │  │
│  │  ├── ai-orchestration-service container           │  │
│  │  └── react-dashboard container                    │  │
│  │                                                   │  │
│  │  Azure Database for PostgreSQL Flexible Server    │  │
│  │  Azure Cache for Redis                            │  │
│  │  Azure Blob Storage (resume PDFs)                 │  │
│  │  Azure Key Vault (secrets)                        │  │
│  │  Azure Container Registry (Docker images)         │  │
│  │  Application Insights (monitoring + tracing)      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Deployment pipeline:**
1. Developer pushes to `main` branch
2. GitHub Actions CI runs: lint, type-check, tests, build
3. On CI pass: Docker images built and pushed to Azure Container Registry
4. Container Apps automatically pulls new images (rolling update, zero downtime)
5. Smoke tests run against the newly deployed containers
6. Application Insights confirms no spike in error rates
