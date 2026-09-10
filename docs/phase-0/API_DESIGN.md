# API Design Document
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07  
**Base URL (Dev):** http://localhost:3001/api/v1 (Profile Service), http://localhost:3002/api/v1 (AI Service)

---

## API Design Principles

1. **Consistency over cleverness** — Every endpoint follows the same request/response envelope format. No surprises.
2. **Explicit versioning** — All routes are prefixed with `/api/v1/`. Breaking changes require a new version prefix, never a change to existing routes.
3. **Fail informatively** — Error responses always include a machine-readable code and human-readable message. Stack traces are never exposed to clients.
4. **Minimal surface area** — Only expose what is needed. Public endpoints return profile data. AI endpoints are minimal. No admin CRUD exposed publicly.
5. **Stateless by default** — No server-side session state. Each request is self-contained. The admin API key is passed per-request, not maintained in session.
6. **Document the contract** — Every endpoint is documented with request shape, response shape, and all possible error codes before implementation begins.

---

## Authentication Strategy

### Public Endpoints (Profile Service)
No authentication required. These endpoints return Rajesh's profile data and are intended to be publicly accessible.

### AI Feature Endpoints (AI Orchestration Service — Public Features)
No authentication for JD analysis and resume generation. These are rate-limited per IP address. The reasoning: requiring auth adds friction for recruiters and hiring managers using the portal.

### Private Dashboard Endpoints
Protected by a static API key sent in the `X-Admin-Key` header. The key is stored in Azure Key Vault and injected at runtime. This is a pragmatic choice for a single-user system — a full OAuth2 flow would be over-engineered.

```
Request header:
X-Admin-Key: <secret-key-from-key-vault>
```

Endpoints requiring this header are marked **(PRIVATE)** in the documentation below.

---

## Request/Response Conventions

### Response Envelope Format

All successful responses return a consistent JSON envelope:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-08-07T10:30:00.000Z",
    "version": "1.0",
    "request_id": "req_abc123"
  }
}
```

Paginated responses include additional meta:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "timestamp": "2026-08-07T10:30:00.000Z",
    "version": "1.0",
    "request_id": "req_abc123",
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 47,
      "total_pages": 3
    }
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "jd_text is required and must be a non-empty string",
    "field": "jd_text",
    "request_id": "req_abc123"
  }
}
```

---

## Error Code Taxonomy

| HTTP Status | Error Code | Description |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Request body or query params failed validation |
| 400 | `INVALID_JD_TEXT` | JD text is empty, too short, or too long |
| 401 | `UNAUTHORIZED` | Missing or invalid admin API key |
| 403 | `FORBIDDEN` | Valid key but insufficient permissions |
| 404 | `NOT_FOUND` | Requested resource does not exist |
| 409 | `CONFLICT` | Duplicate resource (e.g., duplicate email on profile) |
| 422 | `AI_OUTPUT_INVALID` | LLM returned output that failed schema validation |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests from this IP |
| 500 | `INTERNAL_ERROR` | Unexpected server error (details in server logs) |
| 502 | `AI_API_ERROR` | Upstream AI API returned an error |
| 503 | `AI_BUDGET_EXCEEDED` | Monthly AI token budget exhausted |
| 504 | `AI_TIMEOUT` | AI API call exceeded timeout threshold |

---

## Profile Service Endpoints

### GET /api/v1/profile

Returns the complete profile for public display.

**Authentication:** None  
**Rate Limit:** 60 requests per minute per IP

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Rajeshkumar Kalaimani",
    "title": "Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect",
    "summary": "...",
    "email": "rajeshkumar@example.com",
    "location": "...",
    "linkedin_url": "https://linkedin.com/in/rajeshkumar",
    "github_url": "https://github.com/rajeshkumarkalaimani",
    "skills": [ ... ],
    "experiences": [ ... ],
    "projects": [ ... ],
    "certifications": [ ... ]
  },
  "meta": { ... }
}
```

**Error Cases:**
- `404 NOT_FOUND` — Profile record not found in database (indicates seeding issue)

---

### GET /api/v1/skills

Returns all skills, optionally filtered by category.

**Authentication:** None  
**Rate Limit:** 60 requests per minute per IP

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| category | string | No | Filter by SkillCategory enum value |
| proficiency | string | No | Filter by ProficiencyLevel enum value |

**Example:** `GET /api/v1/skills?category=AI_ML`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Prompt Engineering",
      "category": "AI_ML",
      "proficiency": "EXPERT",
      "years_of_experience": 2.5,
      "is_primary": true
    }
  ],
  "meta": { ... }
}
```

**Error Cases:**
- `400 VALIDATION_ERROR` — Invalid category or proficiency value

---

### GET /api/v1/projects

Returns all projects, optionally filtered to featured only.

**Authentication:** None  
**Rate Limit:** 60 requests per minute per IP

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| featured | boolean | No | If true, returns only is_featured=true projects |
| status | string | No | Filter by status (ACTIVE, COMPLETED, ARCHIVED) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Gmail AI Agent",
      "slug": "gmail-ai-agent",
      "description": "...",
      "detailed_description": "...",
      "tech_stack": ["Python", "Anthropic Claude API", "Gmail API"],
      "github_url": "https://github.com/rajeshkumarkalaimani/Gmail_Agent",
      "demo_url": null,
      "status": "ACTIVE",
      "is_featured": true,
      "sort_order": 1
    }
  ],
  "meta": { ... }
}
```

---

### GET /api/v1/projects/:slug

Returns a single project by its URL slug.

**Authentication:** None

**Path Parameters:**

| Parameter | Type | Description |
|---|---|---|
| slug | string | URL-safe project identifier |

**Error Cases:**
- `404 NOT_FOUND` — No project with that slug exists

---

### GET /api/v1/experience

Returns all experience entries in reverse chronological order.

**Authentication:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "company_name": "...",
      "role_title": "...",
      "employment_type": "FULL_TIME",
      "start_date": "2022-01-01",
      "end_date": null,
      "is_current": true,
      "summary": "...",
      "highlights": ["Achievement 1", "Achievement 2"],
      "location": "Remote",
      "skills": [ ... ]
    }
  ],
  "meta": { ... }
}
```

---

### POST /api/v1/contact

Submits a contact form message.

**Authentication:** None  
**Rate Limit:** 3 requests per hour per IP

**Request Body:**
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@techcorp.com",
  "subject": "Interested in your AI background",
  "message": "Hi Rajesh, I came across your profile and wanted to reach out..."
}
```

**Validation Rules:**
- `name`: required, 2-100 characters
- `email`: required, valid email format
- `subject`: required, 5-200 characters
- `message`: required, 20-2000 characters

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Your message has been sent. Rajesh will be in touch soon."
  },
  "meta": { ... }
}
```

**Error Cases:**
- `400 VALIDATION_ERROR` — One or more fields failed validation
- `429 RATE_LIMIT_EXCEEDED` — Too many contact submissions from this IP

---

### GET /health (Profile Service)

Health check endpoint for container orchestration and monitoring.

**Authentication:** None

**Response (200):**
```json
{
  "status": "ok",
  "uptime_seconds": 3661,
  "db_connection": "ok",
  "version": "0.1.0",
  "timestamp": "2026-08-07T10:30:00.000Z"
}
```

**Response (503) — Unhealthy:**
```json
{
  "status": "degraded",
  "db_connection": "error",
  "error": "Cannot connect to database"
}
```

---

## AI Orchestration Service Endpoints

### POST /api/v1/analyze-jd

Analyzes a job description text using Claude and returns structured skill extraction.

**Authentication:** None  
**Rate Limit:** 10 requests per hour per IP

**Request Body:**
```json
{
  "jd_text": "We are looking for a Senior AI Engineer with 5+ years of experience..."
}
```

**Validation Rules:**
- `jd_text`: required, 100-8000 characters

**Response (200):**
```json
{
  "success": true,
  "data": {
    "analysis_id": "cache-hash-sha256",
    "from_cache": false,
    "seniority_level": "Senior",
    "domain": "AI/ML Engineering",
    "experience_years_required": 5,
    "required_skills": [
      { "name": "Python", "importance": "critical" },
      { "name": "LLM APIs", "importance": "critical" },
      { "name": "RAG Systems", "importance": "high" }
    ],
    "preferred_skills": [
      { "name": "LangChain", "importance": "preferred" },
      { "name": "Vector Databases", "importance": "preferred" }
    ],
    "tech_stack": ["Python", "FastAPI", "PostgreSQL", "Pinecone"],
    "match_analysis": {
      "overall_score": 82,
      "strong_matches": [
        { "skill": "Python", "profile_proficiency": "ADVANCED" },
        { "skill": "LLM APIs", "profile_proficiency": "EXPERT" }
      ],
      "partial_matches": [
        { "skill": "RAG Systems", "profile_proficiency": "INTERMEDIATE", "note": "Has RAG knowledge, building Phase 6 implementation" }
      ],
      "gaps": [
        { "skill": "Vector Databases", "importance": "preferred" }
      ]
    },
    "tokens_used": {
      "prompt": 1847,
      "completion": 412,
      "total": 2259,
      "estimated_cost_usd": 0.0068
    }
  },
  "meta": { ... }
}
```

**Error Cases:**
- `400 INVALID_JD_TEXT` — JD text too short or too long
- `422 AI_OUTPUT_INVALID` — Claude returned non-parseable output
- `429 RATE_LIMIT_EXCEEDED` — Hourly limit exceeded for this IP
- `502 AI_API_ERROR` — Anthropic API returned error
- `503 AI_BUDGET_EXCEEDED` — Monthly budget exhausted
- `504 AI_TIMEOUT` — Request exceeded 15-second timeout

---

### POST /api/v1/adapt-profile

Adapts Rajesh's profile content to emphasize the most relevant experience for the analyzed role.

**Authentication:** None  
**Rate Limit:** 10 requests per hour per IP

**Request Body:**
```json
{
  "analysis_id": "cache-hash-sha256"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "adapted_summary": "Forward Deployed AI Engineer with expertise in building...",
    "prioritized_skills": [ ... ],
    "relevant_experience": [
      {
        "experience_id": "uuid",
        "relevance_score": 95,
        "adapted_highlights": ["Reframed achievement 1", "Reframed achievement 2"],
        "reason": "Direct AI engineering experience matches role requirements"
      }
    ],
    "relevant_projects": [ ... ],
    "tokens_used": { ... }
  },
  "meta": { ... }
}
```

**Error Cases:**
- `404 NOT_FOUND` — analysis_id not found in cache
- `422 AI_OUTPUT_INVALID` — Claude output failed validation
- `502 AI_API_ERROR` — Anthropic API error

---

### POST /api/v1/generate-resume

Generates a tailored resume JSON from profile data and JD analysis.

**Authentication:** None  
**Rate Limit:** 5 requests per hour per IP

**Request Body:**
```json
{
  "analysis_id": "cache-hash-sha256"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "resume": {
      "full_name": "Rajeshkumar Kalaimani",
      "title": "Senior AI Engineer",
      "contact": { ... },
      "summary": "Tailored professional summary...",
      "skills": { "primary": [...], "additional": [...] },
      "experience": [
        {
          "company": "...",
          "role": "...",
          "dates": "Jan 2022 – Present",
          "bullets": ["Achievement 1", "Achievement 2"]
        }
      ],
      "projects": [ ... ],
      "certifications": [ ... ]
    },
    "tokens_used": { ... }
  },
  "meta": { ... }
}
```

---

### POST /api/v1/recommendations

Returns skill gap recommendations based on JD analysis.

**Authentication:** None  
**Rate Limit:** 10 requests per hour per IP

**Request Body:**
```json
{
  "analysis_id": "cache-hash-sha256"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "skill": "Vector Databases",
        "importance": "preferred",
        "estimated_learning_weeks": 2,
        "resources": [
          { "type": "course", "title": "Pinecone Fundamentals", "url": "https://docs.pinecone.io/guides/get-started/quickstart" },
          { "type": "documentation", "title": "pgvector Documentation", "url": "https://github.com/pgvector/pgvector" }
        ],
        "rationale": "Vector databases are central to RAG systems, which appear in 3 of the 5 required skills for this role"
      }
    ],
    "tokens_used": { ... }
  },
  "meta": { ... }
}
```

---

### POST /api/v1/rag/query (Phase 6)

Answers a natural language question about Rajesh's background using RAG.

**Authentication:** None  
**Rate Limit:** 20 requests per hour per IP

**Request Body:**
```json
{
  "question": "What AI projects has Rajesh built with Python?",
  "session_id": "optional-client-generated-uuid"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "answer": "Rajesh has built two notable AI projects with Python...",
    "sources": [
      { "type": "project", "id": "uuid", "name": "Gmail AI Agent", "excerpt": "..." },
      { "type": "project", "id": "uuid", "name": "Azure Cosmos DB Explorer", "excerpt": "..." }
    ],
    "tokens_used": { ... }
  },
  "meta": { ... }
}
```

---

### GET /api/v1/token-usage (PRIVATE)

Returns token usage statistics for the dashboard.

**Authentication:** X-Admin-Key header required  
**Rate Limit:** 60 requests per minute

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| period | string | No | "today", "week", "month" (default: "month") |
| feature | string | No | Filter by AIFeature enum value |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "total_tokens": 142500,
    "total_cost_usd": 4.27,
    "budget_usd": 20.00,
    "budget_used_percent": 21.4,
    "by_feature": [
      {
        "feature": "JD_ANALYZER",
        "calls": 34,
        "total_tokens": 76800,
        "total_cost_usd": 2.31,
        "cache_hit_rate": 67.6
      },
      {
        "feature": "RESUME_GENERATOR",
        "calls": 12,
        "total_tokens": 48200,
        "total_cost_usd": 1.45
      }
    ],
    "daily_breakdown": [
      { "date": "2026-08-01", "tokens": 5400, "cost_usd": 0.16 }
    ]
  },
  "meta": { ... }
}
```

---

## Rate Limiting Strategy

Rate limiting is implemented using Redis as the sliding window counter store. Each IP address has independent counters per endpoint group.

| Endpoint Group | Limit | Window |
|---|---|---|
| Public profile reads | 60 requests | 1 minute |
| AI analysis endpoints | 10 requests | 1 hour |
| Resume generation | 5 requests | 1 hour |
| Contact form | 3 requests | 1 hour |
| RAG queries | 20 requests | 1 hour |
| Admin/Dashboard | 60 requests | 1 minute |

**Rate limit response headers** are always included:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1754564400
```

---

## Versioning Strategy

**Current version:** v1  
**URL scheme:** `/api/v1/...`

**When to increment:** Only when making breaking changes (removing fields, changing response shapes, removing endpoints). Adding new optional fields or new endpoints does NOT require a version increment.

**Deprecation policy:** When v2 launches, v1 endpoints remain functional for a minimum of 6 months with deprecation warnings in the response headers:

```
Deprecation: true
Sunset: Mon, 01 Feb 2027 00:00:00 GMT
```

---

## OpenAPI Spec Reference

A complete OpenAPI 3.1 specification will be maintained at:

- File: `docs/openapi/v1.yaml`
- Auto-generated from JSDoc annotations on Express routes using `swagger-jsdoc`
- Served at `/api/docs` in development (Swagger UI)

The OpenAPI spec is the authoritative reference for client generation and integration testing. This document (API_DESIGN.md) serves as the human-readable design record; the OpenAPI spec is the machine-readable contract.
