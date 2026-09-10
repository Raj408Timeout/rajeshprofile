# Data Model Document
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07  
**Database:** PostgreSQL 16  
**ORM:** Prisma 5.x

---

## ER Diagram

```
┌──────────────────┐
│     profiles     │
│──────────────────│
│ id (PK)          │◄────────────────────────────────┐
│ full_name        │                                 │
│ title            │                                 │
│ summary          │     ┌─────────────────────┐    │
│ email            │     │       skills         │    │
│ location         │     │─────────────────────│    │
│ linkedin_url     │     │ id (PK)              │    │
│ github_url       │     │ profile_id (FK) ─────┼────┤
│ portfolio_url    │     │ name                 │    │
│ created_at       │     │ category             │    │
│ updated_at       │     │ proficiency          │    │
└──────────────────┘     │ years_of_experience  │    │
                         │ is_primary           │    │
                         │ created_at           │    │
                         └─────────────────────┘    │
                                                     │
┌──────────────────────────────┐                     │
│         experiences           │                     │
│──────────────────────────────│                     │
│ id (PK)                       │                     │
│ profile_id (FK) ──────────────┼─────────────────────┤
│ company_name                  │                     │
│ role_title                    │     ┌───────────────────────┐
│ employment_type               │     │  experience_skills    │
│ start_date                    │     │───────────────────────│
│ end_date (nullable)           │     │ experience_id (FK) ───┼──►experiences.id
│ is_current                    │     │ skill_id (FK) ─────────┼──►skills.id
│ summary                       │     │ PRIMARY KEY            │
│ highlights (JSONB)            │     │  (experience_id,       │
│ location                      │     │   skill_id)            │
│ created_at                    │     └───────────────────────┘
│ updated_at                    │
└──────────────────────────────┘
                                                     │
┌──────────────────────────────┐                     │
│           projects            │                     │
│──────────────────────────────│                     │
│ id (PK)                       │                     │
│ profile_id (FK) ──────────────┼─────────────────────┘
│ name                          │     ┌───────────────────────┐
│ slug                          │     │    project_skills     │
│ description                   │     │───────────────────────│
│ detailed_description          │     │ project_id (FK) ──────┼──►projects.id
│ tech_stack (JSONB)            │     │ skill_id (FK) ─────────┼──►skills.id
│ github_url (nullable)         │     │ PRIMARY KEY            │
│ demo_url (nullable)           │     │  (project_id,          │
│ status                        │     │   skill_id)            │
│ is_featured                   │     └───────────────────────┘
│ sort_order                    │
│ start_date                    │
│ end_date (nullable)           │
│ created_at                    │
│ updated_at                    │
└──────────────────────────────┘

┌──────────────────────────────┐
│        certifications         │
│──────────────────────────────│
│ id (PK)                       │
│ profile_id (FK) ──────────────┼──►profiles.id
│ name                          │
│ issuing_organization          │
│ issue_date                    │
│ expiry_date (nullable)        │
│ credential_id (nullable)      │
│ credential_url (nullable)     │
│ is_active                     │
│ created_at                    │
└──────────────────────────────┘

┌──────────────────────────────┐
│       token_usage_logs        │
│──────────────────────────────│
│ id (PK)                       │
│ feature (ENUM)                │
│ model_id                      │
│ prompt_tokens                 │
│ completion_tokens             │
│ total_tokens                  │
│ estimated_cost_usd            │
│ cache_hit                     │
│ jd_hash (nullable)            │
│ duration_ms                   │
│ created_at                    │
└──────────────────────────────┘

┌──────────────────────────────┐
│      jd_analysis_cache        │
│──────────────────────────────│
│ id (PK)                       │
│ jd_hash (UNIQUE)              │
│ jd_text_preview               │
│ analysis_result (JSONB)       │
│ model_id                      │
│ hit_count                     │
│ created_at                    │
│ last_accessed_at              │
│ expires_at                    │
└──────────────────────────────┘
```

---

## Table Definitions

### profiles

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| full_name | VARCHAR(100) | NOT NULL | Full legal or professional name |
| title | VARCHAR(200) | NOT NULL | Professional title/tagline |
| summary | TEXT | NOT NULL | 2-3 sentence professional summary |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Primary contact email |
| location | VARCHAR(100) | | City, Country |
| linkedin_url | VARCHAR(500) | | Full LinkedIn profile URL |
| github_url | VARCHAR(500) | | Full GitHub profile URL |
| portfolio_url | VARCHAR(500) | | This portal's URL |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL | Last modification timestamp |

**Notes:** This table is intentionally designed for a single-profile use case. The primary record is inserted via seed and updated via migration as Rajesh's profile evolves.

---

### skills

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| profile_id | UUID | NOT NULL, FK → profiles.id | Owning profile |
| name | VARCHAR(100) | NOT NULL | Skill name (e.g., "Prompt Engineering") |
| category | SkillCategory ENUM | NOT NULL | Domain grouping |
| proficiency | ProficiencyLevel ENUM | NOT NULL | Self-assessed proficiency level |
| years_of_experience | DECIMAL(3,1) | | Approximate years using this skill |
| is_primary | BOOLEAN | NOT NULL, DEFAULT false | Whether to feature prominently |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |

**Enum: SkillCategory**
```
AI_ML | FRONTEND | BACKEND | CLOUD | DATABASE | DEVOPS | ENTERPRISE | SOFT_SKILLS
```

**Enum: ProficiencyLevel**
```
EXPERT | ADVANCED | INTERMEDIATE | BEGINNER
```

---

### experiences

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| profile_id | UUID | NOT NULL, FK → profiles.id | Owning profile |
| company_name | VARCHAR(200) | NOT NULL | Employer name |
| role_title | VARCHAR(200) | NOT NULL | Job title |
| employment_type | VARCHAR(50) | NOT NULL | FULL_TIME, PART_TIME, CONTRACT, FREELANCE |
| start_date | DATE | NOT NULL | Employment start date |
| end_date | DATE | | Employment end date (NULL if current) |
| is_current | BOOLEAN | NOT NULL, DEFAULT false | Whether this is current role |
| summary | TEXT | NOT NULL | Role overview paragraph |
| highlights | JSONB | | Array of achievement bullet strings |
| location | VARCHAR(100) | | City, Country or "Remote" |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL | Last modification timestamp |

**highlights JSONB structure:**
```json
[
  "Built and deployed Claude-powered document analysis pipeline processing 500+ documents/day",
  "Reduced manual review time by 70% through AI-assisted classification"
]
```

---

### experience_skills (Junction Table)

| Column | Type | Constraints | Description |
|---|---|---|---|
| experience_id | UUID | NOT NULL, FK → experiences.id | Experience reference |
| skill_id | UUID | NOT NULL, FK → skills.id | Skill reference |

**Primary Key:** (experience_id, skill_id)

**Purpose:** Links specific skills to the experience entries where they were used. Enables the AI adapter to know which skills are associated with which job context.

---

### projects

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| profile_id | UUID | NOT NULL, FK → profiles.id | Owning profile |
| name | VARCHAR(200) | NOT NULL | Project display name |
| slug | VARCHAR(200) | NOT NULL, UNIQUE | URL-safe identifier |
| description | TEXT | NOT NULL | Short description (1-2 sentences) |
| detailed_description | TEXT | | Full technical write-up |
| tech_stack | JSONB | NOT NULL | Array of technology strings |
| github_url | VARCHAR(500) | | GitHub repository URL |
| demo_url | VARCHAR(500) | | Live demo or video link |
| status | VARCHAR(50) | NOT NULL | ACTIVE, COMPLETED, ARCHIVED |
| is_featured | BOOLEAN | NOT NULL, DEFAULT false | Display in featured section |
| sort_order | INTEGER | NOT NULL, DEFAULT 0 | Display ordering (lower = first) |
| start_date | DATE | | Project start date |
| end_date | DATE | | Project completion date |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL | Last modification timestamp |

**tech_stack JSONB structure:**
```json
["Python", "Anthropic Claude API", "Gmail API", "LangChain"]
```

---

### project_skills (Junction Table)

| Column | Type | Constraints | Description |
|---|---|---|---|
| project_id | UUID | NOT NULL, FK → projects.id | Project reference |
| skill_id | UUID | NOT NULL, FK → skills.id | Skill reference |

**Primary Key:** (project_id, skill_id)

---

### certifications

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| profile_id | UUID | NOT NULL, FK → profiles.id | Owning profile |
| name | VARCHAR(300) | NOT NULL | Full certification name |
| issuing_organization | VARCHAR(200) | NOT NULL | Certifying body |
| issue_date | DATE | NOT NULL | Date of certification |
| expiry_date | DATE | | Expiration date (NULL if no expiry) |
| credential_id | VARCHAR(200) | | Credential verification ID |
| credential_url | VARCHAR(500) | | Verification URL |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Whether cert is currently valid |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Record creation timestamp |

---

### token_usage_logs

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| feature | AIFeature ENUM | NOT NULL | Which AI feature generated this call |
| model_id | VARCHAR(100) | NOT NULL | Model identifier (e.g., "claude-3-5-sonnet-20241022") |
| prompt_tokens | INTEGER | NOT NULL | Input token count |
| completion_tokens | INTEGER | NOT NULL | Output token count |
| total_tokens | INTEGER | NOT NULL | Sum of prompt + completion |
| estimated_cost_usd | DECIMAL(10,6) | NOT NULL | Cost estimate at time of call |
| cache_hit | BOOLEAN | NOT NULL, DEFAULT false | Whether result was served from cache |
| jd_hash | VARCHAR(64) | | SHA-256 hash of JD (for correlation) |
| duration_ms | INTEGER | | API call duration in milliseconds |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Timestamp of the API call |

**Enum: AIFeature**
```
JD_ANALYZER | PROFILE_ADAPTER | RESUME_GENERATOR | RECOMMENDATION_ENGINE | RAG_QUERY | EMBEDDING_GENERATION
```

---

### jd_analysis_cache

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| jd_hash | VARCHAR(64) | NOT NULL, UNIQUE | SHA-256 hash of sanitized JD text |
| jd_text_preview | VARCHAR(500) | | First 500 chars for debugging |
| analysis_result | JSONB | NOT NULL | Full JDAnalysisResponse JSON |
| model_id | VARCHAR(100) | NOT NULL | Model used to generate this analysis |
| hit_count | INTEGER | NOT NULL, DEFAULT 0 | How many times this cache entry was used |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | When analysis was first generated |
| last_accessed_at | TIMESTAMPTZ | NOT NULL | When cache was last read |
| expires_at | TIMESTAMPTZ | NOT NULL | Cache expiry (created_at + 24 hours) |

---

## Relationships

| Relationship | Type | Description |
|---|---|---|
| profiles → skills | One-to-Many | A profile has many skills; each skill belongs to one profile |
| profiles → experiences | One-to-Many | A profile has many experience entries |
| profiles → projects | One-to-Many | A profile has many projects |
| profiles → certifications | One-to-Many | A profile has many certifications |
| experiences ↔ skills | Many-to-Many | Via experience_skills junction table |
| projects ↔ skills | Many-to-Many | Via project_skills junction table |
| token_usage_logs | Standalone | No FK relations; append-only log table |
| jd_analysis_cache | Standalone | Independent cache store |

---

## Index Strategy

### profiles
- Primary key index on `id` (automatic)
- Index on `email` for uniqueness checks

### skills
- Primary key index on `id` (automatic)
- Index on `(profile_id, category)` — most queries filter by profile and category simultaneously
- Index on `(profile_id, proficiency)` — for ordering by skill level

### experiences
- Primary key index on `id` (automatic)
- Index on `profile_id`
- Index on `(profile_id, is_current)` — current role is frequently queried separately
- Index on `start_date DESC` for chronological ordering

### projects
- Primary key index on `id` (automatic)
- Unique index on `slug`
- Index on `(profile_id, is_featured)` — featured projects query is the most frequent
- Index on `sort_order` for display ordering

### certifications
- Primary key index on `id` (automatic)
- Index on `(profile_id, is_active)` — active certs are most commonly displayed

### token_usage_logs
- Primary key index on `id` (automatic)
- Index on `created_at DESC` — all aggregation queries filter by time range
- Index on `(feature, created_at)` — dashboard breakdown queries filter by feature + time

### jd_analysis_cache
- Primary key index on `id` (automatic)
- Unique index on `jd_hash` — lookup key for cache hits
- Index on `expires_at` — periodic cleanup job filters by expiry

---

## Migration Strategy

### Tooling
All schema migrations are managed through Prisma Migrate. Migration files are version-controlled in `backend/profile-service/prisma/migrations/`.

### Workflow
```
1. Modify prisma/schema.prisma
2. Run: npx prisma migrate dev --name <descriptive-name>
3. Prisma generates a SQL migration file
4. Review the generated SQL before committing
5. Commit both schema.prisma and migration file together
```

### Naming Convention
Migrations are named descriptively: `YYYYMMDDHHMMSS_<action>_<entity>`

Example: `20260807120000_create_initial_schema`

### Rollback Strategy
Each migration that creates tables should have a corresponding `down` script documented in comments. Prisma does not auto-generate down scripts, so complex migrations should document reversal steps in a comment block at the top of the SQL file.

### Seed Data
The `prisma/seed.ts` file is idempotent — it uses upsert operations so running it multiple times does not create duplicate records. The seed is run after migrations in both the development setup script and CI pipeline.

### Production Migration Policy
- Migrations are applied via `npx prisma migrate deploy` in the CI/CD pipeline before the new container version starts
- Migrations that require table locks on large tables must be scheduled for off-peak hours
- Destructive migrations (dropping columns, changing types) require explicit review and a one-release deprecation period where both old and new columns exist
