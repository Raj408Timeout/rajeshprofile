# Profile Data — Rajeshkumar Kalaimani
**Document Type:** Structured Profile Source of Truth  
**Last Updated:** 2026-08-07  
**Note:** This document is the authoritative reference for all data seeded into the database via `prisma/seed.ts`. Changes here must be reflected in the seed file.

---

## Personal Information

| Field | Value |
|---|---|
| **Full Name** | Rajeshkumar Kalaimani |
| **Professional Title** | Forward Deployed Engineer \| AI Product Manager \| LLM Solutions Architect |
| **Location** | India |
| **LinkedIn** | https://linkedin.com/in/rajeshkumarkalaimani |
| **GitHub** | https://github.com/rajeshkumarkalaimani |
| **Portfolio** | https://rajeshkumar.dev (planned) |

### Professional Summary

Technology professional specializing in the design and deployment of AI-powered applications using large language models, with hands-on expertise in prompt engineering, LLM API integration, and AI product strategy. Experienced in bridging the gap between enterprise software requirements and emerging AI capabilities, with a focus on building practical, production-ready LLM solutions that solve real business problems. Actively building full-stack AI engineering skills across Angular, React, Node.js, Python, Azure, and GCP to complement deep AI product and prompt engineering expertise.

---

## Skills

### AI / ML

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| Prompt Engineering | Expert | 2.5 | Yes |
| LLM Applications | Expert | 2.5 | Yes |
| AI Product Management | Advanced | 3.0 | Yes |
| RAG Systems | Intermediate | 1.0 | Yes |
| Claude API (Anthropic) | Expert | 1.5 | Yes |
| AI System Design | Advanced | 2.0 | Yes |
| Token Optimization | Advanced | 1.5 | No |
| Hallucination Prevention | Advanced | 1.5 | No |

### Frontend

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| Angular | Advanced | 3.0 | Yes |
| TypeScript | Advanced | 3.0 | Yes |
| React | Advanced | 2.0 | Yes |
| HTML5 / CSS3 | Advanced | 5.0 | No |
| RxJS | Intermediate | 2.0 | No |

### Backend

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| Python | Advanced | 4.0 | Yes |
| Node.js | Intermediate | 2.0 | Yes |
| REST APIs | Advanced | 4.0 | Yes |
| Express.js | Intermediate | 1.5 | No |
| FastAPI | Intermediate | 1.0 | No |

### Cloud

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| Microsoft Azure | Advanced | 3.0 | Yes |
| Google Cloud Platform (GCP) | Intermediate | 1.5 | Yes |
| Azure Blob Storage | Advanced | 2.0 | No |
| Azure Container Apps | Intermediate | 1.0 | No |
| Azure Key Vault | Intermediate | 1.5 | No |

### Databases

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| PostgreSQL | Intermediate | 2.0 | Yes |
| Azure Cosmos DB | Intermediate | 2.0 | Yes |
| Redis | Beginner | 0.5 | No |
| SQL | Advanced | 5.0 | No |

### DevOps

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| Docker | Intermediate | 2.0 | Yes |
| GitHub Actions | Intermediate | 1.5 | Yes |
| Git | Advanced | 6.0 | No |
| Terraform | Beginner | 0.5 | No |

### Enterprise

| Skill | Proficiency | Years | Primary |
|---|---|---|---|
| SDLC | Advanced | 5.0 | Yes |
| Enterprise Software QA | Advanced | 4.0 | Yes |
| Agile / Scrum | Advanced | 4.0 | No |
| Technical Documentation | Advanced | 4.0 | No |
| Stakeholder Communication | Advanced | 5.0 | No |

---

## Projects

### Project 1: Gmail AI Agent

| Field | Value |
|---|---|
| **Name** | Gmail AI Agent |
| **Slug** | gmail-ai-agent |
| **Status** | Active |
| **Featured** | Yes |
| **Sort Order** | 1 |
| **GitHub** | https://github.com/rajeshkumarkalaimani/Gmail_Agent |
| **Demo** | None |

**Short Description:** An autonomous AI agent that reads, understands, and responds to Gmail messages using the Claude API and Gmail API, demonstrating practical agentic AI design.

**Detailed Description:** The Gmail AI Agent is a Python application that integrates the Anthropic Claude API with the Gmail API to create an autonomous email processing agent. The agent authenticates with Gmail using OAuth 2.0, retrieves unread emails, uses Claude to classify email intent (action required, informational, promotional, spam), drafts contextually appropriate responses for action-required emails, and can send replies with human-in-the-loop approval. The project demonstrates core agentic AI patterns: tool use, iterative reasoning, and structured decision making. A token management layer tracks API usage to prevent overspend.

**Tech Stack:** Python, Anthropic Claude API, Gmail API, Google OAuth 2.0, python-dotenv

**Skills Used:** Prompt Engineering, LLM Applications, Claude API (Anthropic), Python, AI System Design, Token Optimization

---

### Project 2: Azure Cosmos DB Methods Explorer

| Field | Value |
|---|---|
| **Name** | Azure Cosmos DB Methods Explorer |
| **Slug** | cosmos-db-methods-explorer |
| **Status** | Active |
| **Featured** | Yes |
| **Sort Order** | 2 |
| **GitHub** | https://github.com/rajeshkumarkalaimani/Azure_Cosmos_DB_Methods |
| **Demo** | None |

**Short Description:** A comprehensive code reference and testing environment for Azure Cosmos DB SDK methods, covering all major CRUD patterns, query APIs, and partitioning strategies.

**Detailed Description:** A practical reference implementation that exercises every major method in the Azure Cosmos DB Python SDK. The project covers: creating and managing databases and containers, document CRUD operations (create, read, replace, upsert, delete), cross-partition and single-partition queries, pagination with continuation tokens, change feed processing, and TTL configuration. Each method is implemented in an isolated, runnable Python script with inline comments explaining key parameters and gotchas. The project serves as both a personal learning journal and a reference for future Cosmos DB integrations.

**Tech Stack:** Python, Azure Cosmos DB, Azure SDK for Python, python-dotenv

**Skills Used:** Python, Azure Cosmos DB, Microsoft Azure, REST APIs

---

### Project 3: AI-Powered Professional Profile Portal

| Field | Value |
|---|---|
| **Name** | AI Profile Portal |
| **Slug** | ai-profile-portal |
| **Status** | Active |
| **Featured** | Yes |
| **Sort Order** | 3 |
| **GitHub** | https://github.com/rajeshkumarkalaimani/My_Profile |
| **Demo** | https://rajeshkumar.dev (planned) |

**Short Description:** A full-stack monorepo project combining Angular, React, Node.js, PostgreSQL, and Claude API to build an AI-powered professional platform with JD analysis, resume generation, and RAG assistant.

**Detailed Description:** A production-quality monorepo using Turborepo, combining an Angular 17 public-facing portal with a React 18 private AI dashboard. The backend consists of two Node.js microservices: a Profile Service (Express + Prisma + PostgreSQL) and an AI Orchestration Service (Claude API integration with Redis caching, token budget management, and hallucination prevention). AI features include JD analysis (structured skill extraction from job descriptions), profile adaptation (relevance reranking), resume generation (tailored PDF output), and a RAG assistant (Phase 6: pgvector + Vertex AI embeddings). The project follows documented architectural decisions (ADRs), phase-based delivery, sprint planning, and complete prompt engineering documentation.

**Tech Stack:** TypeScript, Angular, React, Node.js, Express, Prisma, PostgreSQL, Redis, Anthropic Claude API, Google Vertex AI, Docker, Terraform, Azure, GitHub Actions, Turborepo

**Skills Used:** Prompt Engineering, LLM Applications, AI System Design, Angular, React, TypeScript, Node.js, PostgreSQL, Redis, Microsoft Azure, Docker, GitHub Actions, Terraform

---

### Project 4: Enterprise QA Automation Framework

| Field | Value |
|---|---|
| **Name** | Enterprise QA Automation Framework |
| **Slug** | qa-automation-framework |
| **Status** | Completed |
| **Featured** | No |
| **Sort Order** | 4 |
| **GitHub** | None (internal project) |
| **Demo** | None |

**Short Description:** A comprehensive test automation framework for an enterprise software application, covering API testing, integration testing, and regression test suite management.

**Detailed Description:** Designed and implemented a structured QA automation framework for an enterprise software product, covering: REST API test suites with parameterized test cases, integration tests for critical business workflows, regression test organization by feature area, test reporting and CI pipeline integration. The framework was built with maintainability and team adoption in mind, with clear documentation and standardized patterns for adding new test cases. The framework reduced manual regression testing time significantly by automating the most repetitive high-value test scenarios.

**Tech Stack:** Python, REST APIs, CI/CD, GitHub Actions, SDLC, Test Planning

**Skills Used:** Enterprise Software QA, Python, REST APIs, SDLC, GitHub Actions, Technical Documentation

---

## Professional Experience

### Experience 1: AI Product Manager / Forward Deployed Engineer

| Field | Value |
|---|---|
| **Company** | Technology Consulting Services (Private) |
| **Role Title** | AI Product Manager / Forward Deployed Engineer |
| **Employment Type** | Full-time |
| **Start Date** | 2022-06-01 |
| **End Date** | null (current) |
| **Is Current** | Yes |
| **Location** | Remote |

**Summary:** Leading AI product initiatives and forward deployment work, acting as the technical bridge between client requirements and AI capabilities. Responsible for designing LLM-powered features, managing AI product roadmaps, and deploying AI solutions in enterprise client environments.

**Highlights:**
- Designed and deployed multiple LLM-powered features using the Anthropic Claude API, covering use cases including document analysis, intelligent search, and automated response generation
- Developed prompt engineering frameworks and internal guidelines for consistent, high-quality LLM outputs across multiple projects
- Led AI product discovery sessions with enterprise clients, translating vague AI opportunities into structured product requirements with measurable success criteria
- Managed token budgets and AI cost optimization across deployed LLM applications, reducing per-feature AI costs through caching strategies and prompt compression
- Acted as technical liaison between client stakeholders and development teams, authoring technical specifications for AI features

---

### Experience 2: Senior QA Engineer / Technical Lead

| Field | Value |
|---|---|
| **Company** | Enterprise Software Firm (Private) |
| **Role Title** | Senior QA Engineer / Technical Lead |
| **Employment Type** | Full-time |
| **Start Date** | 2018-03-01 |
| **End Date** | 2022-05-31 |
| **Is Current** | No |
| **Location** | India |

**Summary:** Technical lead for quality assurance across multiple enterprise software products, responsible for test strategy, automation framework design, and team mentoring.

**Highlights:**
- Designed and implemented test automation frameworks that significantly reduced manual regression effort for multiple enterprise software products
- Led a team of QA engineers, conducting code reviews, defining testing standards, and mentoring junior team members on automation best practices
- Partnered with product and development teams during SDLC to shift quality left, embedding testing earlier in the development cycle
- Developed comprehensive test plans for complex enterprise features including multi-tenant data handling, workflow automation, and third-party integrations
- Authored technical documentation for testing processes and onboarding guides for new QA team members

---

### Experience 3: Software QA Engineer

| Field | Value |
|---|---|
| **Company** | Software Development Company (Private) |
| **Role Title** | Software QA Engineer |
| **Employment Type** | Full-time |
| **Start Date** | 2015-08-01 |
| **End Date** | 2018-02-28 |
| **Is Current** | No |
| **Location** | India |

**Summary:** Software quality assurance engineer responsible for functional testing, API testing, and defect management across web and enterprise applications.

**Highlights:**
- Performed functional, regression, and integration testing across web applications and REST APIs
- Developed and maintained test cases, test plans, and defect reports using standard QA tooling
- Collaborated closely with development teams to reproduce, triage, and verify bug fixes
- Contributed to improving test coverage by identifying untested edge cases in complex business logic

---

## Certifications

### Certification 1: Microsoft Azure Fundamentals (AZ-900)

| Field | Value |
|---|---|
| **Name** | Microsoft Azure Fundamentals |
| **Issuer** | Microsoft |
| **Credential ID** | AZ-900 |
| **Issue Date** | 2023-04-01 |
| **Expiry** | None (does not expire) |
| **Is Active** | Yes |
| **Verification URL** | https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/ |

---

### Certification 2: Google Cloud Associate Cloud Engineer (Preparation In Progress)

| Field | Value |
|---|---|
| **Name** | Google Cloud Associate Cloud Engineer |
| **Issuer** | Google Cloud |
| **Issue Date** | — (in preparation) |
| **Is Active** | No (not yet obtained) |

**Note:** This certification is currently being prepared for. Do not include in the public profile until obtained.

---

### Certification 3: Anthropic Claude Fundamentals (Completion Badge)

| Field | Value |
|---|---|
| **Name** | Anthropic Prompt Engineering Fundamentals |
| **Issuer** | Anthropic |
| **Issue Date** | 2024-09-01 |
| **Expiry** | None |
| **Is Active** | Yes |
| **Verification URL** | https://anthropic.com |

---

### Certification 4: ISTQB Certified Tester Foundation Level

| Field | Value |
|---|---|
| **Name** | ISTQB Certified Tester Foundation Level |
| **Issuer** | ISTQB (International Software Testing Qualifications Board) |
| **Issue Date** | 2017-06-01 |
| **Expiry** | None (does not expire) |
| **Is Active** | Yes |
| **Verification URL** | https://www.istqb.org |
