# Rajesh Profile Portal — AI-Powered Professional Profile Platform

## What This Is (And Why It's Not a Static Portfolio)

Most developer portfolios are static websites: a hero section, a list of skills as badges, a few project cards, and a contact form. They are frozen in time, identical to every visitor, and require the developer to manually update them after every role change.

This project is fundamentally different. The **Rajesh Profile Portal** is a living, AI-powered platform that:

- **Adapts dynamically** — When a recruiter pastes a job description, the portal reframes Rajesh's experience to highlight the most relevant work without fabricating anything.
- **Generates tailored resumes on demand** — A single click produces a resume calibrated to a specific role, company, and tech stack.
- **Identifies skill gaps** — The AI recommends exactly what to learn next based on the delta between Rajesh's current profile and target roles.
- **Tracks its own AI costs** — A real-time token usage dashboard prevents runaway spend and demonstrates responsible AI system design.
- **Serves as a living learning journal** — Every architectural decision, trade-off, and lesson learned is documented in ADRs and phase docs.

This is a full-stack engineering project built to demonstrate mastery of modern software architecture, AI product management, prompt engineering, and cloud infrastructure — not just a showcase of completed work.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│                                                                     │
│  ┌───────────────────────┐      ┌───────────────────────────────┐  │
│  │   Angular Portal      │      │    React AI Dashboard         │  │
│  │   (Public-facing)     │      │    (Private / Authenticated)  │  │
│  │   Port 4200           │      │    Port 3000                  │  │
│  └──────────┬────────────┘      └──────────────┬────────────────┘  │
└─────────────┼────────────────────────────────────┼─────────────────┘
              │ REST/JSON                           │ REST/JSON
              ▼                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY / NGINX                          │
│              Rate limiting, CORS, TLS termination                   │
└────────────────────────┬───────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
┌─────────────────────┐    ┌───────────────────────────┐
│  Profile Service    │    │  AI Orchestration Service  │
│  Node.js/Express    │    │  Node.js/Express           │
│  Port 3001          │    │  Port 3002                 │
│                     │    │                            │
│  - GET /profile     │    │  - POST /analyze-jd        │
│  - POST /contact    │    │  - POST /adapt-profile     │
│  - GET /projects    │    │  - POST /generate-resume   │
│  - GET /skills      │    │  - GET  /token-usage       │
└────────┬────────────┘    └────────────┬───────────────┘
         │                              │
         ▼                              ▼
┌──────────────────┐         ┌─────────────────────────┐
│  PostgreSQL 16   │         │  Redis (Cache)           │
│  Prisma ORM      │         │  JD analysis cache       │
│  Port 5432       │         │  Session store           │
└──────────────────┘         └──────────────┬───────────┘
                                            │
                                            ▼
                              ┌─────────────────────────┐
                              │   External AI APIs      │
                              │                         │
                              │  Anthropic Claude API   │
                              │  (JD Analysis, Resume,  │
                              │   Profile Adaptation)   │
                              │                         │
                              │  Google Vertex AI       │
                              │  (Embeddings for RAG)   │
                              └─────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend (Public)** | Angular 17 + TypeScript | Enterprise-grade SPA, SSR support, strong typing |
| **Frontend (Dashboard)** | React 18 + TypeScript + Vite | Faster iteration for AI-heavy interactive UI |
| **Backend** | Node.js 20 + Express + TypeScript | Unified language across stack, large ecosystem |
| **ORM** | Prisma | Type-safe DB client, excellent migration tooling |
| **Database** | PostgreSQL 16 | ACID compliance, JSONB for flexible AI outputs |
| **Cache** | Redis | Sub-millisecond response for repeated AI queries |
| **Primary AI** | Anthropic Claude (claude-3-5-sonnet) | Superior instruction following, structured JSON output |
| **Embeddings** | Google Vertex AI text-embedding-004 | Cost-effective, high-quality for RAG search |
| **Monorepo** | Turborepo | Incremental builds, task caching, workspace management |
| **Cloud** | Azure (primary) + GCP (AI) | Azure expertise, GCP for Vertex AI |
| **IaC** | Terraform | Reproducible, version-controlled infrastructure |
| **CI/CD** | GitHub Actions | Native GitHub integration, free for public repos |
| **Containerization** | Docker + Azure Container Apps | Serverless containers, auto-scaling |

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Docker Desktop (for local services)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rajeshkumarkalaimani/profile-portal.git
cd profile-portal

# Install all workspace dependencies
npm install
```

### Environment Setup

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and fill in your actual values
# At minimum for local dev, you need:
# - DATABASE_URL (or use Docker Compose)
# - ANTHROPIC_API_KEY (for AI features)
nano .env
```

### Running Locally

**Option A: Full stack with Docker Compose (recommended)**

```bash
# Start all infrastructure services (PostgreSQL, Redis, pgAdmin)
docker-compose -f infrastructure/docker-compose.yml up -d postgres redis pgadmin

# Run database migrations and seed data
npm run db:migrate
npm run db:seed

# Start all apps in development mode
npm run dev
```

**Option B: Individual services**

```bash
# Terminal 1: Profile Service
cd backend/profile-service && npm run dev

# Terminal 2: AI Orchestration Service
cd backend/ai-orchestration-service && npm run dev

# Terminal 3: Angular Portal
cd apps/portal-angular && npm start

# Terminal 4: React Dashboard
cd apps/ai-dashboard-react && npm run dev
```

**Access points:**
- Angular Portal: http://localhost:4200
- React Dashboard: http://localhost:3000
- Profile API: http://localhost:3001
- AI Service API: http://localhost:3002
- pgAdmin: http://localhost:5050

---

## Project Structure

```
rajesh-profile-portal/
├── apps/
│   ├── portal-angular/          # Public-facing Angular profile portal
│   └── ai-dashboard-react/      # Private React dashboard for AI tools
├── backend/
│   ├── profile-service/         # REST API for profile data (Express + Prisma)
│   └── ai-orchestration-service/ # AI feature orchestration (Claude + Vertex AI)
├── packages/
│   └── shared-types/            # TypeScript interfaces shared across all apps
├── infrastructure/
│   ├── docker-compose.yml       # Local development services
│   └── terraform/               # Azure infrastructure as code
├── docs/
│   ├── phase-0/                 # Discovery: requirements, architecture, backlog
│   ├── adr/                     # Architecture Decision Records
│   ├── prompts/v1/              # Production prompt templates
│   └── profile-data/            # Structured profile source of truth
├── .github/
│   ├── workflows/               # CI/CD pipelines
│   └── ISSUE_TEMPLATE/          # Issue templates
├── turbo.json                   # Turborepo task pipeline configuration
└── package.json                 # Root workspace package.json
```

---

## Phase Roadmap

| Phase | Name | Description | Status |
|---|---|---|---|
| **Phase 0** | Discovery & Planning | Requirements, architecture, ADRs, backlog, data model | In Progress |
| **Phase 1** | Foundation | Monorepo setup, Angular portal shell, static profile content | Planned |
| **Phase 2** | Backend API | Profile Service, PostgreSQL schema, REST endpoints, seeding | Planned |
| **Phase 3** | JD Analyzer | Claude integration, JD parsing, skill matching, React UI | Planned |
| **Phase 4** | Resume Generator + Token Dashboard | PDF export, token tracking, cost monitoring UI | Planned |
| **Phase 5** | Profile Adapter + Recommendations | Dynamic profile reranking, skill gap analysis | Planned |
| **Phase 6** | RAG Assistant | Vertex AI embeddings, vector search, conversational Q&A | Planned |
| **Phase 7** | Production Hardening | Terraform deploy, CI/CD, monitoring, security audit | Planned |

---

## Contributing

This is a personal learning project, but if you spot bugs or have improvement ideas:

1. Open an issue using the provided templates
2. Fork the repository and create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear commits: `git commit -m "feat: add JD keyword extraction"`
4. Ensure all tests pass: `npm test`
5. Ensure no lint errors: `npm run lint`
6. Open a Pull Request using the provided PR template

**Commit message convention:** This project follows [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

MIT License — see [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Rajeshkumar Kalaimani
