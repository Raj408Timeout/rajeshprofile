# React AI Dashboard — Private AI Tools Interface

## What This App Is

The React AI Dashboard is the **private, AI-powered tools interface** of the Rajesh Profile Portal. It is a React 18 + Vite single-page application designed exclusively for Rajesh's own use — not public-facing.

The dashboard provides a suite of AI-powered career tools:

1. **JD Analyzer** — Paste a job description, get structured skill extraction and a match score against Rajesh's profile
2. **Profile Adapter** — View how Rajesh's profile would be dynamically reframed for a specific analyzed role
3. **Resume Generator** — Generate a tailored resume PDF in under 15 seconds, calibrated to a specific JD
4. **Recommendations** — Get ranked learning recommendations for skill gaps identified in a JD analysis
5. **Token Dashboard** — Real-time view of Anthropic API token usage, cost breakdown by feature, and monthly budget tracking
6. **RAG Assistant** (Phase 6) — Conversational Q&A powered by vector search over embedded profile content

## Role in the Architecture

```
Rajesh's Browser
      │
      ▼
React Dashboard (Port 3000)
      │
      ├── GET /api/v1/profile ──────────────► Profile Service (Port 3001)
      ├── POST /api/v1/analyze-jd ──────────► AI Orchestration Service (Port 3002)
      ├── POST /api/v1/adapt-profile ───────► AI Orchestration Service (Port 3002)
      ├── POST /api/v1/generate-resume ─────► AI Orchestration Service (Port 3002)
      ├── POST /api/v1/recommendations ─────► AI Orchestration Service (Port 3002)
      └── GET /api/v1/token-usage ──────────► AI Orchestration Service (Port 3002)
                                              (Requires X-Admin-Key header)
```

## Technology

| Technology | Purpose |
|---|---|
| React 18 | UI framework with Suspense and concurrent features |
| Vite | Development server and build tool (sub-100ms HMR) |
| TypeScript (strict) | Full type safety using shared-types package |
| React Router v6 | Client-side routing |
| TanStack Query (React Query) | Server state management, caching, background refetching |
| Tailwind CSS | Utility-first styling |
| Recharts | Token usage charts (bar, line, pie) |
| @react-pdf/renderer | Client-side PDF generation for resume export |
| Zod | Runtime validation of API responses |

## How to Run

### Prerequisites

- Node.js 20+
- npm 10+
- Profile Service running at http://localhost:3001
- AI Orchestration Service running at http://localhost:3002
- Admin API key set in environment variables

### Development

```bash
# From monorepo root
npm install

# Create local environment file
cp ../../.env.example .env.local
# Edit .env.local to set:
# VITE_PROFILE_API_URL=http://localhost:3001
# VITE_AI_API_URL=http://localhost:3002
# VITE_ADMIN_API_KEY=local-dev-admin-key

# Start the React dev server
cd apps/ai-dashboard-react
npm run dev

# Or from the monorepo root using Turborepo
npm run dev
```

The React dashboard will be available at **http://localhost:3000**.

### Build for Production

```bash
cd apps/ai-dashboard-react
npm run build
# Output: dist/
```

### Run Tests

```bash
cd apps/ai-dashboard-react
npm test           # Run once (Vitest)
npm test -- --watch   # Watch mode
```

## Project Structure

```
apps/ai-dashboard-react/
├── src/
│   ├── api/                    # API client functions
│   │   ├── profile.api.ts      # Profile Service API calls
│   │   └── ai.api.ts           # AI Orchestration Service calls
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Generic UI (buttons, cards, loaders)
│   │   └── features/           # Feature-specific components
│   ├── pages/                  # Route-level page components
│   │   ├── JdAnalyzerPage.tsx
│   │   ├── ResumeGeneratorPage.tsx
│   │   ├── TokenDashboardPage.tsx
│   │   ├── RecommendationsPage.tsx
│   │   └── RagAssistantPage.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useJdAnalysis.ts
│   │   ├── useResume.ts
│   │   └── useTokenUsage.ts
│   ├── utils/                  # Utility functions
│   │   ├── cost.utils.ts       # Token cost calculation helpers
│   │   └── format.utils.ts     # Date and number formatting
│   ├── App.tsx                 # Root component with router
│   ├── main.tsx                # React entry point
│   └── vite-env.d.ts          # Vite environment type declarations
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Environment Variables

All environment variables are prefixed with `VITE_` to be exposed to the browser build:

```bash
# .env.local (gitignored — never commit this)
VITE_PROFILE_API_URL=http://localhost:3001
VITE_AI_API_URL=http://localhost:3002
VITE_ADMIN_API_KEY=your-local-admin-api-key
```

**Security note:** The admin API key is embedded in the React bundle. This is acceptable for a single-user private dashboard that is not publicly deployed. For a multi-user system, this would need a proper authentication flow.

## AI Feature Workflow

The typical user flow through the AI features:

```
1. JD Analyzer
   └─ Paste job description → POST /analyze-jd
   └─ View match score, required skills, gaps

2. Profile Adapter (optional)
   └─ Click "Adapt Profile" → POST /adapt-profile
   └─ View side-by-side original vs. adapted profile sections

3. Resume Generator
   └─ Click "Generate Resume" → POST /generate-resume
   └─ View resume preview → Click "Download PDF"

4. Recommendations
   └─ Click "View Learning Recommendations" → POST /recommendations
   └─ View ranked skill learning paths
```

Each step uses the `analysisId` from step 1, avoiding redundant LLM calls.

## Deployment

The React dashboard is deployed as a Docker container to **Azure Container Apps**. Unlike the Angular portal (which goes to Static Web Apps for CDN distribution), the React dashboard benefits from server-side routing handled by the container.

The deploy workflow is at `.github/workflows/deploy-staging.yml` and `deploy-production.yml`.

**Access control:** In production, the React dashboard URL is not publicly advertised. The admin API key is required for any request that accesses AI features or token data. This provides pragmatic security without a full auth system for a single-user tool.
