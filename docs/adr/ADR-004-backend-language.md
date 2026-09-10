# ADR-004: Node.js TypeScript as Primary Backend Language

**Status:** Accepted  
**Date:** 2026-08-07  
**Deciders:** Rajeshkumar Kalaimani

---

## Context

The project requires two backend services: a Profile Service (CRUD operations, email sending) and an AI Orchestration Service (LLM API integration, caching, token tracking). Both are relatively simple HTTP servers without heavy computational requirements.

Rajesh has experience with Python (AI/ML work), Node.js/TypeScript (web APIs), and has exposure to .NET. The backend language choice affects:
- Integration with the shared-types TypeScript package
- Ecosystem compatibility with the AI SDKs (Anthropic, Vertex AI)
- Consistency with the frontend workspaces in the monorepo
- Learning objectives for the project

---

## Decision

Use **Node.js 20 with TypeScript** as the backend language for both services, using Express as the HTTP framework.

---

## Consequences

### Positive

**Monorepo type sharing:** The shared-types package (`packages/shared-types`) exports TypeScript interfaces consumed by both frontends and backends. If backends are in TypeScript, the type sharing is seamless — no code generation, no schema sync, no translation layer. Changing `JDAnalysisResponse` in shared-types causes immediate compile errors in both the AI service and the React dashboard, catching breaking changes at development time.

**Single language across the stack:** A solo developer maintains one mental model for language idioms, error handling patterns, async/await semantics, and tooling. Debugging a request from the Angular frontend through the Profile Service backend involves the same language constructs throughout.

**SDK ecosystem:** The Anthropic SDK (`@anthropic-ai/sdk`) and Google Cloud AI Platform SDK (`@google-cloud/aiplatform`) both have official, well-maintained Node.js TypeScript packages. Python alternatives exist, but using them would require a separate Python service or breaking the monorepo language unity.

**npm ecosystem:** The Node.js ecosystem has excellent libraries for all requirements: Express, Prisma, ioredis, zod, nodemailer, pino for logging, jest and supertest for testing. All are well-maintained and have TypeScript support.

**Async I/O fit:** Both services are I/O-bound (database queries, HTTP calls to AI APIs). Node.js's event loop handles I/O-bound workloads efficiently without requiring multi-threading.

### Negative

**Python is stronger for AI/ML work:** If the AI service ever needed to run local model inference, process large datasets, or integrate with Python-specific AI libraries (LangChain, Hugging Face Transformers, scikit-learn), Node.js would be a poor fit. For this project's use case (calling external API endpoints), Node.js is appropriate.

**Express is not the fastest framework:** Express's middleware chain has measurable overhead compared to Fastify or Hono. For a low-traffic personal portfolio, this is irrelevant, but it is worth noting for future scaling.

**Prisma is Node.js-specific:** If the backend language changes later, Prisma would need to be replaced with another ORM.

---

## Alternatives Considered

### Python with FastAPI

Use Python and FastAPI for both backend services.

**Strongest argument for this choice:** Python is the dominant language for AI/ML work. The Anthropic Python SDK is as mature as the Node.js SDK. FastAPI is modern, performant, and has excellent TypeScript-like type hints via Pydantic.

**Why not chosen:**
1. The shared-types package is TypeScript. Using Python would mean maintaining a separate Pydantic schema definition duplicating the TypeScript interfaces — a synchronization problem that creates bugs over time.
2. Rajesh's goal is to strengthen Node.js/TypeScript expertise to be language-agnostic between Python and TypeScript (both are common in AI engineering roles). The AI orchestration work (calling APIs, caching, token tracking) does not require Python-specific ML libraries.
3. Prisma does not support Python. Switching to SQLAlchemy or Tortoise ORM would add another learning topic.

**Future note:** If the project ever adds a feature requiring local model inference or ML pipeline work, adding a Python microservice for that specific capability is a viable evolution.

### .NET 8 (C#) with ASP.NET Core

Use .NET 8 and ASP.NET Core for both backend services.

**Strongest argument for this choice:** .NET 8 is a high-performance, production-grade platform with excellent TypeScript interop via OpenAPI code generation. For enterprise environments (which Rajesh targets), .NET expertise is valuable. Rajesh has prior exposure to .NET.

**Why not chosen:**
1. The Anthropic SDK does not have an official .NET client. An unofficial community package exists but is less maintained.
2. Prisma does not support .NET. Would need to use Entity Framework Core instead, adding complexity and reducing the SQL control that Prisma provides.
3. The monorepo value proposition (shared TypeScript types) breaks down with .NET. Types would need to be duplicated or generated via OpenAPI.
4. For a personal project on a tight learning budget, switching from TypeScript to C# across the stack would require significant ramp-up time that delays AI feature development.
5. The node_modules ecosystem (ioredis, zod, jest, supertest) is more familiar and faster to work with for this use case.

**Future note:** A .NET microservice for specific enterprise integration features (e.g., connecting to Azure Service Bus or Graph API) would be worth considering in a future phase if those features are needed.

### Go (Golang)

Use Go for both backend services.

**Why not chosen:** Go has excellent performance and a strong ecosystem for HTTP services. However, the Anthropic SDK does not have an official Go client, and Go's type system (while powerful) does not have the same NPM-ecosystem depth for the supporting libraries needed (ioredis equivalent, Prisma equivalent, supertest equivalent). The learning investment in Go is high, and Go expertise is not as directly aligned with Rajesh's target AI PM / FDE roles as TypeScript expertise is.
