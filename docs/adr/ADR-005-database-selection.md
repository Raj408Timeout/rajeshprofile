# ADR-005: PostgreSQL as Primary Database with Prisma ORM

**Status:** Accepted  
**Date:** 2026-08-07  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

The project stores two categories of data:

**1. Structured profile data:** Skills, experiences, projects, certifications — well-defined, relational, with clear entity relationships (a project has many skills, an experience has many highlights). This data needs ACID guarantees because incorrect profile data served to recruiters would be a correctness problem.

**2. Semi-structured AI data:** JD analysis results (structured JSON, but schema may evolve), token usage logs (append-only telemetry), resume output JSON. This data benefits from flexible storage where the schema can evolve without database migrations for every AI output structure change.

The ORM choice must support: TypeScript-first type safety, database migrations as code, seed data scripting, and (in Phase 6) vector extension support for RAG.

---

## Decision

Use **PostgreSQL 16** as the primary database for both the Profile Service and the AI Orchestration Service (shared instance for cost efficiency in development, separate in production is possible).

Use **Prisma 5.x** as the ORM and migration management tool.

---

## Consequences

### Why PostgreSQL

**JSONB for semi-structured data:** PostgreSQL's JSONB column type provides the best of both worlds — the structured data (profile entities) is in normalized tables with foreign keys and indexes, while the semi-structured AI outputs (JD analysis results, resume JSON) are stored in JSONB columns. JSONB is indexed, queryable with operators, and can be extracted at query time without a full deserialization.

**pgvector extension:** Phase 6 (RAG assistant) requires storing and querying vector embeddings. The `pgvector` PostgreSQL extension adds a `vector` column type and cosine similarity operators, enabling a vector search index within the same database. This avoids adding a separate vector database (Pinecone, Weaviate, Qdrant) in Phase 6, which would add infrastructure cost and complexity.

**ACID compliance:** Profile data is financial-quality important — incorrect data served to a recruiter is a real-world problem. PostgreSQL's ACID guarantees ensure that writes are atomic and durable.

**Azure support:** Azure Database for PostgreSQL Flexible Server is a fully-managed PostgreSQL offering on Azure with automated backups, point-in-time restore, and read replicas. This aligns with the Azure-primary infrastructure decision.

**SQL familiarity:** SQL is a universal skill. Working with PostgreSQL reinforces SQL proficiency applicable across every engineering role.

### Why Prisma

**Type safety at the ORM layer:** Prisma generates TypeScript types from the schema. Every database query returns a strongly-typed result that matches the schema — no `any` types, no casting. Type errors in queries are caught at compile time, not at runtime.

**Schema-as-code with migrations:** `schema.prisma` is the authoritative source of truth for the database schema. Prisma generates SQL migration files from schema changes, and those migrations are committed to source control. The schema history is version-controlled alongside the application code.

**Excellent developer experience:** Prisma Studio (a GUI browser for the database), `prisma generate` (regenerates types after schema changes), and `prisma db seed` (runs the seed script) provide a fast feedback loop during development.

**Seed scripting:** `prisma/seed.ts` is a TypeScript file that runs real code to insert Rajesh's profile data. It uses upserts so it is idempotent (safe to run multiple times). This is far cleaner than raw SQL seed files.

**Active development and community:** Prisma is widely used in the Node.js ecosystem, with extensive documentation and community resources.

### Negative Consequences

**Prisma is not lightweight:** Prisma's query engine is a Rust binary that runs as a sidecar process. It adds ~5MB to the container image and has a small startup overhead. For this project's traffic level, this is irrelevant.

**Prisma does not support all PostgreSQL features:** Raw SQL or PostgreSQL-specific features (e.g., some window functions, advisory locks) require `prisma.$queryRaw`. The pgvector queries in Phase 6 will likely require `$queryRaw` because Prisma does not natively support the `<=>` cosine distance operator.

**Single database for two services:** In production, sharing a PostgreSQL instance between the Profile Service and AI Orchestration Service is a coupling that conflicts with service boundary purity. However, at this project's scale, the operational complexity of two separate database servers outweighs the architectural purity benefit. The two services access different table groups and do not need distributed transactions.

---

## Alternatives Considered

### MongoDB with Mongoose

Use MongoDB for flexible document storage.

**Strongest argument:** MongoDB's document model is naturally suited to the AI output storage (JD analysis, resume JSON). No rigid schema required for evolving AI output structures.

**Why not chosen:**
1. The profile data model is relational — skills belong to a profile, experiences link to skills, etc. Forcing relational data into documents requires either denormalization (data duplication) or complex application-level joins.
2. MongoDB does not have a pgvector-equivalent for Phase 6. A separate vector database would be required.
3. Prisma's MongoDB connector exists but is less mature than the PostgreSQL connector.
4. PostgreSQL's JSONB provides document-like flexibility for the parts that need it, while maintaining relational integrity for the structured parts.

### Supabase (PostgreSQL + REST API + Realtime)

Use Supabase as a hosted PostgreSQL service with auto-generated REST API.

**Strongest argument:** Supabase eliminates the need to write the Profile Service API — the REST API is auto-generated from the schema. Supabase also provides a pgvector integration out of the box.

**Why not chosen:**
1. The Profile Service API is not just CRUD — it includes business logic (contact form, rate limiting, response transformation). Auto-generated REST APIs from Supabase cannot replace custom business logic.
2. Using Supabase would reduce the learning value of building and testing an Express API from scratch, which is a key learning objective.
3. Supabase's pricing model may not align with the $50/month Azure infrastructure budget, depending on usage.
4. Vendor lock-in: migrating away from Supabase's proprietary features later is non-trivial.

### SQLite with Prisma

Use SQLite as a zero-configuration alternative to PostgreSQL for local development, with Prisma abstracting the difference.

**Strongest argument:** SQLite eliminates the need for Docker or a running PostgreSQL server during development. File-based database is simple to set up.

**Why not chosen:**
1. SQLite does not support the `pgvector` extension needed for Phase 6.
2. SQLite does not support JSONB (it has JSON functions but without binary storage optimization).
3. The development environment would differ significantly from production (SQLite vs. PostgreSQL), which is a common source of subtle bugs (data type handling, case sensitivity, constraint behavior).
4. Using PostgreSQL in development (via Docker Compose) keeps dev/prod parity, which is a core DevOps principle worth practicing.

### PlanetScale (MySQL with branching)

Use PlanetScale for a serverless MySQL database with built-in schema branching.

**Why not chosen:**
1. MySQL does not have a pgvector extension.
2. PlanetScale does not support foreign key constraints by default (a significant trade-off for relational data integrity).
3. Prisma's MySQL support is good but the PostgreSQL connector is more feature-complete.
4. Azure does not have a PlanetScale native integration; it would add a third cloud provider.
