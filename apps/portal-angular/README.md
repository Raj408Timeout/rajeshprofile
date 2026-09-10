# Angular Portal — Public-Facing Profile Site

## What This App Is

The Angular portal is the **public-facing face of the Rajesh Profile Portal**. It is a professionally designed, fully responsive Angular 17 single-page application that displays Rajeshkumar Kalaimani's professional profile — skills, projects, experience, and certifications — to recruiters, hiring managers, and anyone who follows a link to the portal.

Unlike a static site, this Angular app fetches its data from the Profile Service REST API, which is seeded from a PostgreSQL database. This means profile updates (new projects, new skills, new experience) flow to the public portal without requiring a redeployment of the Angular app itself.

## Role in the Architecture

```
Public Internet
      │
      ▼
Angular Portal (Port 4200) ─── HTTP GET ──► Profile Service API (Port 3001)
                                                        │
                                                        ▼
                                                   PostgreSQL DB
```

The Angular portal is read-only — it only makes GET requests to the Profile Service. No AI features are in this app. AI features live in the React dashboard (`apps/ai-dashboard-react`).

## Key Features

- **Hero section** — Name, title, professional summary, call-to-action links
- **Skills section** — Skills organized by category (AI/ML, Frontend, Backend, Cloud, etc.) with proficiency indicators
- **Projects section** — Featured project cards with tech stack tags and GitHub links
- **Experience section** — Vertical timeline of professional roles with highlights
- **Certifications section** — Active certifications with issuer and dates
- **Contact form** — Sends message to Rajesh via the Profile Service email API
- **Ask About Rajesh** (Phase 6) — RAG-powered conversational Q&A about the profile

## Technology

| Technology | Purpose |
|---|---|
| Angular 17 | SPA framework with standalone components |
| Angular Material | UI component library (theme, navigation, cards, chips) |
| Angular Router | Client-side routing with lazy-loaded feature modules |
| Angular HttpClient | HTTP calls to Profile Service API |
| RxJS | Reactive data streams for async profile data |
| Angular Animations | Scroll-reveal and transition effects |
| TypeScript (strict) | Full type safety throughout the app |

## How to Run

### Prerequisites

- Node.js 20+
- npm 10+
- Profile Service running at http://localhost:3001

### Development

```bash
# From monorepo root
npm install

# Start the Angular dev server
cd apps/portal-angular
npm start

# Or from the monorepo root using Turborepo
npm run dev
```

The Angular portal will be available at **http://localhost:4200**.

### Build for Production

```bash
cd apps/portal-angular
npm run build
# Output: dist/portal-angular/browser/
```

### Run Tests

```bash
cd apps/portal-angular
npm test                          # Run once (CI mode)
npm test -- --watch              # Watch mode
npm test -- --code-coverage      # With coverage report
```

## Project Structure

```
apps/portal-angular/
├── src/
│   ├── app/
│   │   ├── core/                 # Services, interceptors, guards
│   │   │   └── services/
│   │   │       └── profile-api.service.ts
│   │   ├── features/             # Feature modules (lazy-loaded)
│   │   │   ├── hero/
│   │   │   ├── skills/
│   │   │   ├── projects/
│   │   │   ├── experience/
│   │   │   ├── certifications/
│   │   │   └── contact/
│   │   ├── shared/               # Shared components and pipes
│   │   ├── app.component.ts      # Root component
│   │   ├── app.routes.ts         # Route configuration
│   │   └── app.config.ts         # App configuration (providers)
│   ├── environments/
│   │   ├── environment.ts        # Development config
│   │   └── environment.prod.ts   # Production config
│   ├── styles.scss               # Global styles and Angular Material theme
│   └── main.ts                   # Bootstrap
├── angular.json                  # Angular workspace config
└── tsconfig.app.json             # TypeScript config for app code
```

## Environment Configuration

The app reads environment variables from `src/environments/`:

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  profileApiUrl: 'http://localhost:3001/api/v1',
}

// environment.prod.ts (production)
export const environment = {
  production: true,
  profileApiUrl: 'https://api.rajeshkumar.dev/api/v1',
}
```

## Deployment

The Angular portal is deployed to **Azure Static Web Apps** using the GitHub Actions workflow at `.github/workflows/deploy-staging.yml` and `deploy-production.yml`.

Azure Static Web Apps provides:
- Global CDN distribution
- Automatic SSL certificate management
- PR preview deployments (each PR gets its own staging URL)
- Free tier sufficient for personal portfolio traffic
