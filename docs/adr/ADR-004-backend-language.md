# ADR-004: Python + FastAPI as Backend Language

**Status:** Superseded (replaces Node.js decision from 2026-08-07)  
**Date:** 2026-09-15  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

The original ADR-004 (2026-08-07) selected Node.js + TypeScript as the backend language for the profile-service, primarily for monorepo type-sharing with the Angular/React frontends.

After implementing Phase 2, a pragmatic reassessment was made: Rajeshkumar's deepest comfort and daily practice is in Python. The profile-service and future AI orchestration service involve database access, REST API design, and LLM SDK integration — all areas where the Python ecosystem is equally strong (and for AI work, often stronger).

The shared-types argument (TypeScript on both frontend and backend enables direct interface sharing) was evaluated against the practical cost: maintaining Node.js backend code as a secondary language slows iteration speed and reduces code quality when the developer is less fluent.

---

## Decision

Use **Python 3.12+ with FastAPI** as the backend language for both services.

Replace the Node.js/Express implementation of profile-service with a Python/FastAPI equivalent. Use SQLAlchemy 2.0 (async) as the ORM and Alembic for migrations.

---

## Consequences

### Positive

**Primary language advantage:** Python is Rajeshkumar's strongest backend language (4 years, Advanced proficiency). Code written in a developer's primary language is clearer, more idiomatic, and less error-prone. The quality ceiling is higher.

**AI ecosystem alignment:** The Anthropic Python SDK (`anthropic`), LangChain, LlamaIndex, and all embedding/vector store libraries are Python-first. When Phase 3 adds Claude API integration and Phase 6 adds RAG, Python is the natural home for that work.

**FastAPI is production-grade:** FastAPI provides automatic OpenAPI docs (`/docs`), Pydantic validation, async-native request handling, and dependency injection — comparable to or better than Express for this use case.

**Pydantic v2 replaces Zod:** Pydantic is the Python equivalent of Zod for runtime validation and schema declaration. The validation semantics (`field_validator`, required fields, type coercion) are nearly identical.

**asyncio native:** Python's `asyncio` + `asyncpg` handles the same async I/O workloads as Node.js's event loop. SQLAlchemy 2.0 async is production-ready.

### Negative

**Shared-types package becomes frontend-only:** The `packages/shared-types` TypeScript interfaces are no longer shared with the backend. Instead:
- Frontend TypeScript interfaces live in `packages/shared-types/`
- Backend Pydantic schemas live in `backend/profile-service/app/schemas/`
- These must stay in sync manually (or via OpenAPI code generation in Phase 7)

**Mitigation:** Both the Angular models and the FastAPI Pydantic schemas are small and change infrequently. A mismatch is caught immediately by integration tests (Phase 2+). OpenAPI auto-generation from FastAPI (`/openapi.json`) can bootstrap TypeScript types automatically when needed.

**Two languages in the monorepo:** TypeScript (frontend) + Python (backend) requires context switching. This is accepted as a deliberate skill-demonstration choice — showing full-stack capability across both dominant AI engineering languages.

---

## Tech Stack for Python Backend

| Concern | Library | Rationale |
|---------|---------|-----------|
| Web framework | FastAPI 0.115 | Async-native, auto OpenAPI, Pydantic integration |
| ORM | SQLAlchemy 2.0 async | Industry standard, type-safe, async-first |
| Migrations | Alembic | Official SQLAlchemy migration tool |
| DB driver | asyncpg 0.30 | Fastest async PostgreSQL driver for Python |
| Validation | Pydantic v2 | FastAPI's native validation layer |
| Config | pydantic-settings | Type-safe env var parsing (equivalent to Zod env schema) |
| ASGI server | Uvicorn + uvloop | Production-ready async server |

---

## Alternatives Reconsidered

### Keep Node.js + TypeScript
**Why not:** Developer velocity matters more than language consistency for a solo learning project. Python expertise is a core portfolio goal. The shared-types benefit does not outweigh the cost of writing backend code in a secondary language.

### Django + Django REST Framework
**Why not:** Django is synchronous by default (async support added later, incomplete). DRF has significant boilerplate. FastAPI is a better fit for a microservice API with explicit schema control.

### Flask
**Why not:** Flask is synchronous, lacks built-in data validation, and requires more manual wiring than FastAPI. FastAPI gives more for less code.
