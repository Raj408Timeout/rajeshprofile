# Learning Roadmap
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07

---

## Learning Philosophy

This project is designed around a single principle: **learn by shipping real code, not by taking courses in isolation.**

Every topic in this roadmap is tied to a specific feature or phase. Theory is introduced just before it is applied. The goal is not to become an expert in every technology listed here before writing the first line of code; it is to develop a working understanding of each area through the discomfort of implementation.

Three supporting rules:

1. **If you're stuck for more than 45 minutes, seek help** — from documentation, communities, or AI assistants. Productive struggle is valuable; spinning in circles is waste.
2. **Document what you learn** — every non-obvious decision in this codebase should have either an ADR or a comment explaining the "why." This builds the habit of technical communication.
3. **Revisit early code with late knowledge** — when Phase 6 is complete, refactor Phase 2 code with what you now know. Software quality compounds over revisits.

---

## Skill Matrix

| Skill Area | Current Level | Target Level by Project End | Evidence of Achievement |
|---|---|---|---|
| **Prompt Engineering** | Expert (daily practice) | Expert+ (production systems) | 4 production prompt templates with versioning and regression tests |
| **LLM API Integration** | Expert (Claude SDK) | Expert (advanced features: caching, streaming, tool use) | Full AI orchestration service with caching, retry, budget control |
| **AI Product Management** | Advanced | Expert | AI_STRATEGY.md, token budget tracking, hallucination prevention system |
| **RAG Systems** | Intermediate | Advanced | Working RAG implementation with pgvector + Vertex AI embeddings |
| **Angular 17** | Advanced (prior experience) | Advanced (standalone components, SSR) | Full public portal with lazy loading, animations, accessibility |
| **React 18** | Advanced | Advanced (React Query, performance optimization) | Full AI dashboard with Recharts, react-pdf, suspense boundaries |
| **Node.js + TypeScript** | Intermediate | Advanced (production patterns, testing) | Two Express services with middleware, error handling, full test coverage |
| **Prisma ORM** | Beginner | Intermediate | Complete schema design, migrations, seeding, complex queries |
| **PostgreSQL** | Intermediate | Intermediate (JSONB, pgvector, query optimization) | Optimized schema with indexes, JSONB columns, vector extension |
| **Redis** | Beginner | Intermediate | Production caching layer with TTL, key strategy, ioredis client |
| **Azure Cloud** | Advanced | Advanced (Container Apps, Key Vault, PG Flexible) | Terraform-provisioned production environment |
| **Terraform** | Beginner | Intermediate | Complete Azure infrastructure as code, plan/apply workflow |
| **Docker** | Intermediate | Intermediate (multi-stage builds, compose) | Working docker-compose for all local services |
| **GitHub Actions** | Intermediate | Advanced (caching, matrix builds, environments) | Three production workflows: CI, staging, production |
| **Turborepo** | Beginner | Intermediate | Monorepo with cached builds, task pipeline configuration |

---

## Week-by-Week Learning Plan

### Week 1-2: Phase 0 — Discovery, Architecture, Monorepo Setup
**Focus:** Software architecture fundamentals, AI strategy, Turborepo

Topics:
- How to write an Architecture Decision Record (ADR)
- Turborepo concepts: workspaces, task pipelines, caching
- Monorepo trade-offs: when they help, when they hurt
- PostgreSQL schema design: normalization, JSONB, indexes
- Prisma schema language and migration workflow

**Learning Activities:**
- Read [Turborepo documentation](https://turbo.build/repo/docs) — Getting Started section
- Read [Architecture Patterns with Microservices](https://microservices.io/patterns/index.html) — relevant patterns
- Watch: Prisma YouTube channel — "Complete Introduction to Prisma ORM"

---

### Week 3-4: Phase 1 — Angular Portal Foundation
**Focus:** Angular 17 modern patterns, TypeScript strict mode

Topics:
- Angular standalone components (no NgModules)
- Angular Signals for reactive state management
- Angular Material component library integration
- TypeScript strict mode patterns: discriminated unions, type guards
- CSS Grid and Flexbox for responsive layouts

**Learning Activities:**
- Read [Angular docs: Standalone Components](https://angular.dev/guide/components)
- Read [Angular docs: Signals](https://angular.dev/guide/signals)
- Read: "TypeScript Deep Dive" by Basarat Ali Syed (free online)

---

### Week 5: Phase 1 — React Dashboard Foundation
**Focus:** React 18 modern patterns, Vite, Tailwind CSS

Topics:
- React 18 Suspense and concurrent features
- React Query (TanStack Query) for server state management
- Tailwind CSS utility-first approach
- Vite configuration and HMR
- Component composition patterns

**Learning Activities:**
- Read [TanStack Query docs](https://tanstack.com/query/latest)
- Read [Tailwind CSS docs: Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
- Practice: Build 3 dashboard components with Tailwind without external UI library

---

### Week 6-7: Phase 2 — Backend API & Database
**Focus:** Express middleware patterns, Prisma, PostgreSQL

Topics:
- Express middleware chain: logging, error handling, validation
- Zod for runtime validation of request bodies
- Prisma: complex queries with includes, transactions, upserts
- PostgreSQL: JSONB operators, index types, EXPLAIN ANALYZE
- Testing Express APIs with Supertest and Jest
- Structured logging with Pino

**Learning Activities:**
- Read [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- Read [Prisma docs: CRUD Operations](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- Read [Zod documentation](https://zod.dev)
- Practice: Build a test Express server with a middleware chain before implementing the real service

---

### Week 8-9: Phase 3 — JD Analyzer (First AI Feature)
**Focus:** Anthropic SDK, prompt engineering at the system level, Redis

Topics:
- Anthropic Node.js SDK: messages API, parameters, token counting
- Prompt caching with `cache_control` ephemeral
- SHA-256 hashing in Node.js for cache keys
- ioredis client: connection management, TTL operations, error handling
- Prompt injection: attack vectors and defense patterns
- JSON Schema vs. Zod for validating LLM output

**Learning Activities:**
- Read [Anthropic API documentation](https://docs.anthropic.com) — Messages API in depth
- Read [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- Study: [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- Experiment: Try prompt injection attacks on your own implementation before it's deployed

---

### Week 10-11: Phase 4 — Resume Generator + Token Dashboard
**Focus:** PDF generation, data visualization, financial monitoring

Topics:
- @react-pdf/renderer: document structure, styling, fonts
- Recharts: line charts, bar charts, responsive containers
- Token counting with Anthropic's token counting API (or tiktoken equivalent)
- Cost calculation: per-token pricing models
- API key authentication middleware patterns

**Learning Activities:**
- Read [@react-pdf/renderer documentation](https://react-pdf.org)
- Read [Recharts documentation](https://recharts.org/en-US/)
- Study: Anthropic usage and billing dashboard to understand cost structure

---

### Week 12-13: Phase 5 — Profile Adapter + Recommendations
**Focus:** Multi-step AI workflows, complex prompt chaining

Topics:
- Chaining AI calls: using output of one call as input to another
- Managing context across a multi-step AI workflow
- Caching intermediate results to avoid redundant AI calls
- Grounding AI outputs in source data (anti-hallucination patterns)

**Learning Activities:**
- Read: "Building LLM-Powered Applications" by Valentina Alto (Manning)
- Study: Examples of grounded generation in Anthropic docs

---

### Week 14-16: Phase 6 — RAG Assistant
**Focus:** Embeddings, vector search, RAG architecture

Topics:
- What embeddings are and why semantic similarity works
- pgvector extension: installation, usage, cosine distance operators
- Google Vertex AI text-embedding-004 API
- Chunking strategies: by sentence, paragraph, section
- RAG retrieval: top-k search, re-ranking, context window management
- Evaluating RAG quality: precision, recall, faithfulness

**Learning Activities:**
- Read [pgvector GitHub documentation](https://github.com/pgvector/pgvector)
- Read [Google Vertex AI text-embedding docs](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings)
- Read: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (original RAG paper — arxiv.org/abs/2005.11401)
- Watch: "A Survey of RAG" — various YouTube resources on RAG pipeline design

---

### Week 17-18: Phase 7 — Production Hardening
**Focus:** Terraform, Azure infrastructure, GitHub Actions advanced patterns

Topics:
- Terraform: providers, resources, data sources, outputs, state management
- Azure Container Apps: scaling rules, environment configuration, managed identity
- Azure Key Vault: secrets management, access policies, SDK integration
- GitHub Actions: job dependencies, environment gates, secrets, matrix builds
- Docker: multi-stage builds, .dockerignore, image size optimization
- Google Lighthouse: performance, accessibility, SEO metrics

**Learning Activities:**
- Read [Terraform Azure Provider documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- Read [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
- Complete: [Terraform: Associate Certification prep](https://developer.hashicorp.com/terraform/tutorials/certification-003) (free tutorials)

---

## Recommended Resources

### Books
| Title | Author | Relevance |
|---|---|---|
| "TypeScript Deep Dive" | Basarat Ali Syed | TypeScript fundamentals and patterns (free online) |
| "Building LLM-Powered Applications" | Valentina Alto | AI application architecture (Manning) |
| "Designing Data-Intensive Applications" | Martin Kleppmann | Database and system design fundamentals |
| "Clean Code" | Robert C. Martin | Code quality habits applicable throughout project |

### Documentation (Primary Sources — Always Prefer Official Docs)
- [Anthropic Documentation](https://docs.anthropic.com)
- [Angular Documentation](https://angular.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [pgvector GitHub](https://github.com/pgvector/pgvector)

### Courses
| Platform | Course | Relevance |
|---|---|---|
| Microsoft Learn | Azure Fundamentals (AZ-900) | Azure infrastructure fundamentals |
| Google Cloud Skills Boost | Vertex AI for Developers | Vertex AI and Gemini API usage |
| Anthropic | Prompt Engineering Fundamentals (free) | Structured prompt design |

---

## Learning Milestones

### Milestone 1: Architecture is Done (End of Week 2)
**Check:** Can you explain to someone why you chose Turborepo over Nx without reading from notes? Can you draw the service boundary diagram from memory? Can you explain what the shared-types package does and why it exists?

### Milestone 2: Full-Stack Loop is Working (End of Week 7)
**Check:** Angular portal displays real profile data from the PostgreSQL database via the Profile Service API. Data flows end-to-end: database → API → HTTP → frontend display. All API endpoints return the correct response envelope format.

### Milestone 3: First AI Feature in Production (End of Week 9)
**Check:** A recruiter can paste a JD and receive a structured analysis within 10 seconds. The Redis cache returns results for repeated JDs without making new API calls. Token usage is logged to PostgreSQL.

### Milestone 4: Resume Generation Works (End of Week 11)
**Check:** A complete, tailored resume can be generated as a PDF from a JD analysis. The hallucination assertion check has been manually verified against 5 test cases. The token dashboard shows accurate cost breakdowns.

### Milestone 5: RAG System Works (End of Week 16)
**Check:** The system correctly answers 8 out of 10 test questions about Rajesh's background with accurate source citations. Retrieval returns relevant chunks for at least 90% of test queries.

### Milestone 6: Production Deployed (End of Week 18)
**Check:** The Angular portal is live on a public URL. CI/CD pipeline runs on every push. All secrets are in Key Vault. Monthly infrastructure cost is within budget.

---

## AI/LLM Deep Dive

### Prompt Engineering Mastery Checklist

By the end of Phase 3, verify you can:

- [ ] Write a system prompt that produces consistent JSON output across 10 runs
- [ ] Identify when to use few-shot examples vs. zero-shot instructions
- [ ] Design a prompt that is resilient to user prompt injection
- [ ] Use `cache_control` to reduce token costs on static system prompts
- [ ] Interpret the `usage` object in Anthropic responses and calculate cost
- [ ] Write a Zod schema that validates Claude's structured output
- [ ] Design a retry strategy that handles malformed LLM output gracefully

### Token Optimization Mastery Checklist

By the end of Phase 4, verify you can:

- [ ] Estimate the token count of a prompt before sending it
- [ ] Calculate the cost of 1,000 calls to a given Claude model
- [ ] Implement a Redis-based result cache with SHA-256 key hashing
- [ ] Design a budget enforcement system with configurable thresholds
- [ ] Explain the cost difference between prompt caching hit vs. cache miss

### RAG Architecture Mastery Checklist

By the end of Phase 6, verify you can:

- [ ] Explain cosine similarity and why it works for semantic search
- [ ] Choose an appropriate chunk size for embedding profile content
- [ ] Run a pgvector nearest-neighbor query and interpret the results
- [ ] Explain what a hallucination is in a RAG context and how citation helps prevent user harm
- [ ] Evaluate RAG quality using faithfulness and relevance metrics
