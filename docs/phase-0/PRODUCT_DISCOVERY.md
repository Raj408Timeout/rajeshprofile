# Product Discovery Document
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07  
**Author:** Rajeshkumar Kalaimani  
**Status:** Approved

---

## Executive Summary

The Rajesh Profile Portal is a full-stack, AI-powered professional presence platform designed to replace the static portfolio website paradigm. While traditional developer portfolios are manually maintained HTML pages that present identical content to every visitor, this platform uses large language models to dynamically adapt profile content, generate role-specific resumes, and identify skill gaps — all in real time.

This project serves dual purposes: (1) it is a working professional tool that Rajesh actively uses in his job search and career management, and (2) it is a learning vehicle that demonstrates mastery of AI product management, LLM integration, prompt engineering, full-stack TypeScript development, and cloud infrastructure — the exact skills relevant to Forward Deployed Engineer and AI Solutions Architect roles.

---

## Problem Statement: Why Static Portfolio Websites Fail

### The Core Problem

A static portfolio website answers the question "What has this person done?" but fails to answer the question that actually matters to recruiters and hiring managers: "Is this person right for *this specific role at this specific company*?"

### Five Specific Failure Modes

**1. One-size-fits-all presentation**
A Python backend developer applying for both a "Senior Data Engineer" and an "AI Product Manager" role presents identical content to both. The data engineer wants to see pipeline architecture. The PM wants to see product thinking. A static site serves neither well.

**2. Content staleness**
Engineers update their portfolios rarely — typically only when actively job searching. Between updates, the site does not reflect current skills, recent projects, or evolved thinking. The gap between the real person and their digital representation widens over time.

**3. No skill gap visibility**
Static portfolios show what someone has done but offer no analysis of what skills are missing for target roles. The developer must manually compare job descriptions to their skills and guess at what to learn next.

**4. Resume fragmentation**
Most professionals maintain multiple resume versions in separate files — "resume_v3_data_eng.docx", "resume_final_FINAL.pdf" — with no systematic versioning, no clarity on what was changed and why, and no way to regenerate a variant quickly.

**5. No signal to the owner**
A static portfolio provides zero feedback to its owner: How many people visited? What did they look at? What roles are people evaluating you for? The owner is flying blind.

### Opportunity

LLMs can read a job description, understand its requirements, and intelligently reframe existing experience to match — without fabricating anything. This is not about lying; it is about emphasis, framing, and relevance. A human would naturally highlight different aspects of their experience in different conversations. This platform automates that intelligence at scale.

---

## Target Users and Use Cases

### Persona 1: The Recruiter (Sarah, Technical Recruiter at a SaaS Company)

**Background:** Sarah screens 80-100 candidates per week across multiple open roles. She has 30 seconds to decide whether to pass a profile to a hiring manager. She does not have deep technical knowledge but understands role requirements.

**Goals:**
- Quickly understand if a candidate matches a specific job description
- Confirm key skills without reading an entire CV
- Get a shareable summary to send to the hiring manager

**Pain Points with Static Portfolios:**
- Cannot scan for specific technology matches quickly
- No clarity on seniority level or years of experience in specific domains
- Dense walls of text without clear structure

**Key Use Cases:**
- Pastes a JD into the portal and instantly sees Rajesh's match score and top matching skills
- Views an auto-adapted profile view that surfaces the most relevant experience
- Downloads a role-tailored resume in PDF format

---

### Persona 2: The Hiring Manager (David, VP of Engineering at a FinTech Startup)

**Background:** David evaluates the top 3-5 candidates that Sarah passes through. He has 15 minutes to form an opinion before a screening call. He has deep technical knowledge and will push back on vague claims.

**Goals:**
- Understand depth of technical experience, not just surface breadth
- Assess architecture thinking and product judgment
- Determine if the candidate can grow into the team's needs

**Pain Points with Static Portfolios:**
- Bullet points without context ("Built REST APIs" — what scale? what architecture?)
- No evidence of systems thinking or trade-off reasoning
- Cannot ask follow-up questions before the call

**Key Use Cases:**
- Reads the AI-adapted profile that surfaces architecture details for AI infrastructure roles
- Uses the conversational RAG assistant to ask "What's Rajesh's experience with high-throughput event streaming?" and get a sourced answer
- Reviews project deep-dives with technical rationale

---

### Persona 3: Rajesh Himself (The Owner)

**Background:** Rajesh is a Forward Deployed Engineer and AI Product Manager actively building expertise in LLM applications. He applies to 10-20 roles per month and needs to track applications, customize submissions, and understand his skill trajectory.

**Goals:**
- Generate high-quality, tailored resumes quickly without manual editing
- Understand which skills are most in-demand for his target roles
- Track AI API costs to stay within budget
- Use this project itself as a portfolio piece demonstrating AI engineering capability

**Key Use Cases:**
- Pastes a JD and gets an adapted profile + resume in under 2 minutes
- Views the token dashboard to confirm monthly AI spend is under $20
- Reviews skill gap recommendations to plan the next learning sprint
- Shows the codebase during technical interviews as a live demonstration

---

## Business Goals and Success Metrics

| Goal | KPI | Target | Measurement Method |
|---|---|---|---|
| Reduce resume tailoring time | Time from JD to tailored resume | < 3 minutes | User session timing logs |
| AI cost control | Monthly Anthropic API spend | < $20/month | Token usage dashboard |
| Profile freshness | Days since last profile data update | < 30 days | Last-updated timestamp in DB |
| JD analysis accuracy | Skill extraction precision | > 90% against manual review | Manual spot-check 10 JDs/month |
| Resume quality | Hiring callback rate | Baseline + 15% improvement | Application tracking log |
| System reliability | API uptime | > 99% | Health check monitoring |
| Performance | Profile page load time (P95) | < 1.5 seconds | Client-side performance API |
| AI response latency | JD analysis response time (P95) | < 8 seconds | Server-side timing middleware |

---

## Competitive Analysis

| Platform | What It Does Well | What It Fails At | Relevance to This Project |
|---|---|---|---|
| **LinkedIn** | Massive reach, recruiter tools, endorsements, network graph | Generic presentation, no AI adaptation, no resume generation, poor design control, no skill gap analysis | Rajesh maintains a LinkedIn profile but it cannot replace role-specific adaptation |
| **Personal Static Sites** (GitHub Pages, Vercel) | Full design control, developer credibility signal, fast | Identical to every visitor, manually maintained, no intelligence, no analytics, no resume generation | This project replaces the static site with an intelligent alternative |
| **Polywork** | Timeline-based work history, project showcasing, community features | No AI features, niche audience, low recruiter adoption, still static content | Interesting UX pattern but lacks AI intelligence layer |
| **Read.cv** | Clean design, developer-focused, honest presentation | No personalization, no AI, no resume export, not widely known in enterprise recruiting | Good aesthetic inspiration but functionally limited |
| **Resume.io / Enhancv** | Professional resume templates, AI writing assistance | Generic AI suggestions, no connection to a live profile, no JD matching, no skill gap analysis | Partial overlap on resume generation; this project does it from a structured data source |

**Differentiation:** No existing platform combines (a) a public professional portal, (b) real-time JD analysis, (c) AI-driven profile adaptation using *only verified real data*, (d) on-demand resume generation, and (e) transparent AI cost tracking. That combination is the moat.

---

## Product Vision Statement

**For** technical professionals who apply to specialized roles,  
**who** waste hours tailoring resumes and still fail to communicate the most relevant parts of their experience,  
**the Rajesh Profile Portal** is an AI-powered professional platform  
**that** dynamically adapts profile content to each job description, generates tailored resumes on demand, and identifies the most valuable skills to learn next —  
**unlike** static portfolio websites or generic resume builders,  
**our product** uses structured profile data as a single source of truth and LLMs as the adaptation layer, ensuring every generated output is accurate, relevant, and grounded in verified experience.

---

## Out of Scope for v1

The following items are explicitly excluded from the initial release to maintain focus:

1. **Multi-user support** — This platform is built for one person (Rajesh). No user accounts, no authentication for visitors, no multi-profile management.
2. **ATS optimization scanning** — While resumes are tailored, programmatic ATS keyword density optimization is out of scope.
3. **Application tracking CRM** — Tracking job applications, follow-ups, and hiring pipeline stages is a separate problem.
4. **Social sharing / public link generation** — Per-JD shareable links with access controls are a Phase 8+ feature.
5. **Mobile-native apps** — The Angular portal will be responsive but native iOS/Android apps are not planned.
6. **Interview preparation AI** — Using the AI to simulate interview questions is a future phase.
7. **Salary benchmarking** — No compensation data analysis is included.
8. **Multi-language resume generation** — English only for v1.

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM API rate limiting during peak usage | Medium | High | Redis caching of identical JD analyses; exponential backoff retry |
| AI hallucination generating fabricated skills in resumes | Medium | Critical | System prompt hard constraints; output validation against profile data source of truth; human review before send |
| PostgreSQL data loss | Low | Critical | Automated daily backups to Azure Blob Storage; point-in-time restore enabled |
| Angular/React build breaking Turborepo pipeline | Medium | Medium | Isolated workspace builds; CI catches build failures before merge |
| Token costs exceeding budget | Low | Medium | Hard monthly spend cap via Anthropic API; alert at 80% threshold; fallback to cached responses |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Project scope creep delaying Phase 1 | High | Medium | Strict sprint planning with Definition of Done; ADR process forces documented trade-offs |
| Recruiters not finding the portal | High | Medium | Maintain LinkedIn with portal link; submit URL in applications directly |
| Adapted profiles appearing dishonest | Low | Critical | Explicit prohibition on fabrication in all prompt templates; system always cites source data |
| Project abandoned due to complexity | Medium | High | Phase 0 complete before writing a single line of code; learning roadmap keeps motivation structured |

### AI-Specific Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Prompt injection via malicious JD text | Medium | Medium | System prompt injection defense; input sanitization; output schema validation |
| Model behavior drift after API updates | Medium | Medium | Pin model versions; regression test suite for prompt outputs |
| Claude API deprecation or pricing change | Low | Medium | Architecture abstraction layer; Vertex AI as fallback |
| Context window exhaustion for long JDs | Low | Medium | JD truncation to 4000 tokens with summary pre-processing |
