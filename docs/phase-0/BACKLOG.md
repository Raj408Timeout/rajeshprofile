# Project Backlog
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Last Updated:** 2026-08-07  
**Status Key:** Planned | In Progress | Done | Blocked

---

## Phase 0: Discovery & Planning

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P0-001 | Write PRODUCT_DISCOVERY.md covering problem statement, personas, competitive analysis, and risk assessment | P0 | 1 | Done |
| P0-002 | Write REQUIREMENTS.md with 10 FRs, NFRs, and 15 user stories with Gherkin acceptance criteria | P0 | 1 | Done |
| P0-003 | Write ARCHITECTURE.md with component diagram, technology justifications, service boundaries, and data flows | P0 | 1 | Done |
| P0-004 | Write DATA_MODEL.md with ER diagram, full table definitions, index strategy, and migration notes | P0 | 0.5 | Done |
| P0-005 | Write API_DESIGN.md documenting all endpoints with request/response shapes and error taxonomy | P0 | 1 | Done |
| P0-006 | Write AI_STRATEGY.md covering model selection, prompt strategy, token budgets, and hallucination prevention | P0 | 1 | Done |
| P0-007 | Create 5 ADRs (monorepo, framework split, AI provider, backend language, database) | P0 | 0.5 | Done |
| P0-008 | Write production-quality prompt templates for all 4 AI features | P0 | 1 | Done |
| P0-009 | Write SPRINT_PLAN.md for Phase 0 and Phase 1 | P0 | 0.5 | Done |
| P0-010 | Initialize monorepo structure: Turborepo, workspace layout, root package.json, shared-types package | P0 | 0.5 | Done |

---

## Phase 1: Foundation & Static Profile

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P1-001 | Scaffold Angular 17 application in apps/portal-angular with routing, Angular Material, and standalone components | P0 | 1 | Planned |
| P1-002 | Implement Angular shell layout: navigation component, footer component, responsive hamburger menu | P0 | 1 | Planned |
| P1-003 | Create ProfileHeroComponent with name, title, and call-to-action buttons | P0 | 0.5 | Planned |
| P1-004 | Create SkillsComponent rendering skills grouped by category with proficiency indicators | P0 | 1 | Planned |
| P1-005 | Create ProjectsComponent with project cards and tech stack tags | P0 | 1 | Planned |
| P1-006 | Create ExperienceComponent rendering timeline of professional experience | P0 | 1 | Planned |
| P1-007 | Create CertificationsComponent displaying active certifications | P0 | 0.5 | Planned |
| P1-008 | Create ContactComponent with reactive form, validation, and submission handling | P0 | 1 | Planned |
| P1-009 | Implement Angular profile data service (HTTP client) calling the Profile Service API | P0 | 0.5 | Planned |
| P1-010 | Configure Angular routing with lazy-loaded feature modules | P0 | 0.5 | Planned |
| P1-011 | Apply Angular animations for component transitions and scroll-reveal effects | P1 | 1 | Planned |
| P1-012 | Scaffold React 18 + Vite application in apps/ai-dashboard-react with React Router | P0 | 1 | Planned |
| P1-013 | Implement React dashboard layout: sidebar navigation, main content area | P0 | 1 | Planned |
| P1-014 | Configure Tailwind CSS in React dashboard | P0 | 0.5 | Planned |
| P1-015 | Write unit tests for Angular components (TestBed) achieving 80% coverage | P1 | 2 | Planned |

---

## Phase 2: Backend API & Database

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P2-001 | Scaffold Express + TypeScript server in backend/profile-service with project structure | P0 | 0.5 | Planned |
| P2-002 | Set up Prisma schema with all tables as defined in DATA_MODEL.md | P0 | 1 | Planned |
| P2-003 | Write and run initial Prisma migration | P0 | 0.5 | Planned |
| P2-004 | Write seed.ts with Rajesh's complete profile data | P0 | 1 | Planned |
| P2-005 | Implement GET /api/v1/profile endpoint with full profile data | P0 | 0.5 | Planned |
| P2-006 | Implement GET /api/v1/skills endpoint with category filtering | P0 | 0.5 | Planned |
| P2-007 | Implement GET /api/v1/projects and GET /api/v1/projects/:slug endpoints | P0 | 0.5 | Planned |
| P2-008 | Implement GET /api/v1/experience endpoint | P0 | 0.5 | Planned |
| P2-009 | Implement POST /api/v1/contact with email sending via Nodemailer/SendGrid | P0 | 1 | Planned |
| P2-010 | Implement rate limiting middleware using Redis sliding window | P0 | 1 | Planned |
| P2-011 | Implement structured JSON logging middleware (request/response logging) | P0 | 0.5 | Planned |
| P2-012 | Write integration tests for all Profile Service endpoints using Supertest | P1 | 2 | Planned |

---

## Phase 3: JD Analyzer

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P3-001 | Scaffold Express + TypeScript server in backend/ai-orchestration-service | P0 | 0.5 | Planned |
| P3-002 | Implement Anthropic SDK client wrapper with retry logic and error handling | P0 | 1 | Planned |
| P3-003 | Implement JD analyzer service using v1/jd-analyzer.md prompt template | P0 | 1 | Planned |
| P3-004 | Implement Zod schema validation for JD analysis output | P0 | 0.5 | Planned |
| P3-005 | Implement Redis caching for JD analysis results (SHA-256 hash key) | P0 | 1 | Planned |
| P3-006 | Implement POST /api/v1/analyze-jd endpoint with input sanitization | P0 | 0.5 | Planned |
| P3-007 | Implement token usage logging to PostgreSQL on every AI call | P0 | 0.5 | Planned |
| P3-008 | Build React JD Analyzer page: textarea input, submit button, results display | P0 | 2 | Planned |
| P3-009 | Implement match score visualization (progress bars, color-coded skill badges) in React | P1 | 1 | Planned |
| P3-010 | Write unit and integration tests for JD analyzer service | P1 | 1 | Planned |

---

## Phase 4: Resume Generator + Token Dashboard

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P4-001 | Implement resume generator service using v1/resume-generator.md prompt template | P0 | 1 | Planned |
| P4-002 | Implement hallucination assertion validator (cross-check generated skills against DB) | P0 | 1 | Planned |
| P4-003 | Implement POST /api/v1/generate-resume endpoint | P0 | 0.5 | Planned |
| P4-004 | Build React resume preview component (renders JSON resume into visual layout) | P0 | 2 | Planned |
| P4-005 | Implement PDF export using @react-pdf/renderer | P1 | 2 | Planned |
| P4-006 | Implement AI budget monitoring: check budget before each API call, enforce hard stop at 100% | P0 | 1 | Planned |
| P4-007 | Implement email alert when budget reaches 80% threshold | P1 | 0.5 | Planned |
| P4-008 | Build React token dashboard page with daily/weekly/monthly aggregations | P0 | 2 | Planned |
| P4-009 | Build Recharts bar chart for daily token usage over 30 days | P1 | 1 | Planned |
| P4-010 | Implement GET /api/v1/token-usage private endpoint with admin key auth middleware | P0 | 0.5 | Planned |

---

## Phase 5: Profile Adapter + Recommendations

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P5-001 | Implement profile adapter service using v1/profile-adapter.md prompt template | P0 | 1 | Planned |
| P5-002 | Implement adapted profile comparison view (original vs. adapted side-by-side) in React | P1 | 2 | Planned |
| P5-003 | Implement POST /api/v1/adapt-profile endpoint | P0 | 0.5 | Planned |
| P5-004 | Implement recommendation engine service using v1/recommendation-engine.md template | P0 | 1 | Planned |
| P5-005 | Implement POST /api/v1/recommendations endpoint | P0 | 0.5 | Planned |
| P5-006 | Build React recommendations page with ranked skill cards and resource links | P1 | 1 | Planned |
| P5-007 | Integrate full AI workflow: JD analysis → Profile adaptation → Resume generation in React | P0 | 2 | Planned |
| P5-008 | Add "Export Analysis Report" feature: save JD + match + resume as a PDF package | P2 | 2 | Planned |
| P5-009 | Write unit tests for profile adapter and recommendation services | P1 | 1 | Planned |
| P5-010 | Add Angular portal CTA: "Analyze this profile for a role" deep-link to React dashboard | P2 | 0.5 | Planned |

---

## Phase 6: RAG Assistant

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P6-001 | Install and configure pgvector extension in PostgreSQL | P0 | 0.5 | Planned |
| P6-002 | Create profile_embeddings table in Prisma schema | P0 | 0.5 | Planned |
| P6-003 | Implement Vertex AI text-embedding-004 client in ai-orchestration-service | P0 | 1 | Planned |
| P6-004 | Implement profile embedding pipeline: chunk profile sections, generate and store vectors | P0 | 2 | Planned |
| P6-005 | Implement vector similarity search service using pgvector cosine distance | P0 | 1 | Planned |
| P6-006 | Implement RAG query orchestration: embed query → vector search → Claude synthesis | P0 | 2 | Planned |
| P6-007 | Implement POST /api/v1/rag/query endpoint | P0 | 0.5 | Planned |
| P6-008 | Build Angular "Ask About Rajesh" chat component with streaming response display | P1 | 3 | Planned |

---

## Phase 7: Production Hardening

| ID | Story | Priority | Effort (days) | Status |
|---|---|---|---|---|
| P7-001 | Write Terraform configuration for all Azure resources (main.tf, variables.tf, outputs.tf) | P0 | 2 | Planned |
| P7-002 | Run `terraform apply` and validate all resources are provisioned correctly | P0 | 1 | Planned |
| P7-003 | Configure GitHub Actions CI workflow: lint, type-check, test, build, security scan | P0 | 1 | Planned |
| P7-004 | Configure GitHub Actions deploy-staging workflow: build images, push to ACR, deploy | P0 | 1 | Planned |
| P7-005 | Configure GitHub Actions deploy-production workflow: manual dispatch, blue/green deploy | P0 | 1 | Planned |
| P7-006 | Configure Application Insights SDK in all services for distributed tracing | P1 | 1 | Planned |
| P7-007 | Run Google Lighthouse audit on Angular portal; fix issues to reach score > 85 on all categories | P1 | 1 | Planned |
| P7-008 | Conduct security review: run npm audit, check for prompt injection vulnerabilities, verify all secrets in Key Vault | P0 | 1 | Planned |
