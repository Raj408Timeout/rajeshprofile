# Requirements Document
## Rajesh Profile Portal — AI-Powered Professional Profile Platform

**Version:** 1.0  
**Date:** 2026-08-07  
**Status:** Baselined

---

## Functional Requirements

### FR-001: Public Profile Display

**Description:** The system shall display Rajesh's professional profile on a publicly accessible web portal without requiring visitor authentication. The profile shall include personal information, skills categorized by domain and proficiency, professional experience, projects with technical details, and certifications.

**Priority:** Must Have  
**Phase:** 1

---

### FR-002: Job Description Analysis

**Description:** The system shall accept a plain-text or pasted job description of up to 8,000 characters and use an LLM to extract structured data including: required technical skills, preferred skills, seniority level, domain/industry, technology stack, and years of experience expected. The analysis result shall be returned within 10 seconds under normal conditions.

**Priority:** Must Have  
**Phase:** 3

---

### FR-003: Profile Adaptation

**Description:** Given a completed JD analysis result, the system shall use an LLM to rerank and reframe Rajesh's existing profile content to emphasize the most relevant experience, projects, and skills for the analyzed role. The system shall **never fabricate skills, companies, dates, or experience that does not exist** in the profile data source of truth. The adapted profile shall clearly distinguish between primary matches, secondary matches, and gaps.

**Priority:** Must Have  
**Phase:** 5

---

### FR-004: Resume Generation

**Description:** The system shall generate a tailored resume in structured JSON format based on the adapted profile, which can be rendered as a downloadable PDF. The generated resume shall include a role-specific summary, reordered skills list, relevant experience bullets, matching projects, and certifications. All content shall be derived exclusively from verified profile data.

**Priority:** Must Have  
**Phase:** 4

---

### FR-005: Token Usage Tracking

**Description:** Every AI API call made by the system shall be logged to the database with: timestamp, feature name, model used, prompt token count, completion token count, and estimated cost in USD. The system shall expose this data through a private dashboard showing daily, weekly, and monthly aggregations by feature.

**Priority:** Must Have  
**Phase:** 4

---

### FR-006: Skill Gap Recommendations

**Description:** After analyzing a job description, the system shall compare the JD's required skills against the profile's current skill set and produce a ranked list of skill gaps with recommended learning paths. Each recommendation shall include the skill name, estimated learning time, and suggested resources.

**Priority:** Should Have  
**Phase:** 5

---

### FR-007: Contact Form

**Description:** The public portal shall include a contact form that captures: sender name, email address, subject, and message. On submission, the system shall send an email notification to Rajesh's configured email address. The form shall be protected by rate limiting (maximum 3 submissions per IP per hour) and basic honeypot spam detection.

**Priority:** Should Have  
**Phase:** 2

---

### FR-008: RAG-Based Conversational Q&A

**Description:** The system shall maintain a vector embedding index of Rajesh's profile content. Visitors (or Rajesh himself) shall be able to ask natural language questions about his background and receive contextually accurate answers grounded in actual profile data, with source citations.

**Priority:** Nice to Have  
**Phase:** 6

---

### FR-009: Profile Data Management

**Description:** Rajesh shall be able to update his profile data through the backend seed mechanism and database. The system shall expose a private admin API to update profile sections without requiring redeployment. Profile updates shall propagate to the vector embedding index within 5 minutes.

**Priority:** Should Have  
**Phase:** 2

---

### FR-010: AI Cost Budget Alerts

**Description:** The system shall monitor cumulative AI API spend against a configurable monthly budget. When spend reaches 80% of the budget threshold, the system shall send an alert email. When spend reaches 100%, the system shall disable non-essential AI features and serve cached or fallback responses.

**Priority:** Must Have  
**Phase:** 4

---

## Non-Functional Requirements

### Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-P01 | Profile page initial load (Largest Contentful Paint) | < 2.0 seconds on 4G |
| NFR-P02 | Profile API response time (P95) | < 300ms |
| NFR-P03 | JD analysis end-to-end response time (P95) | < 10 seconds |
| NFR-P04 | Resume generation response time (P95) | < 15 seconds |
| NFR-P05 | Redis cache hit rate for repeated JD analyses | > 70% |
| NFR-P06 | Database query response time (P99) | < 100ms |

### Security

| ID | Requirement |
|---|---|
| NFR-S01 | All API endpoints shall enforce HTTPS; HTTP traffic shall be redirected |
| NFR-S02 | All secrets (API keys, DB credentials) shall be stored in Azure Key Vault; never in code or environment files in production |
| NFR-S03 | The AI Orchestration Service shall validate and sanitize all user inputs before including them in LLM prompts to prevent prompt injection |
| NFR-S04 | API endpoints shall enforce rate limiting: 10 JD analyses per IP per hour, 3 contact form submissions per IP per hour |
| NFR-S05 | All LLM prompt outputs shall be validated against expected JSON schema before being served to clients |
| NFR-S06 | The private dashboard API shall be protected by an API key header; no public access |
| NFR-S07 | Dependencies shall be scanned for known vulnerabilities via GitHub Dependabot on every commit |
| NFR-S08 | Database connections shall use SSL/TLS in all environments except local Docker dev |

### Reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-R01 | Profile Service uptime | > 99.5% monthly |
| NFR-R02 | AI features shall degrade gracefully if the Anthropic API is unavailable | Cached or static fallback within 2 seconds |
| NFR-R03 | Database backups | Daily automated backups; 7-day retention |
| NFR-R04 | Failed AI requests shall be retried with exponential backoff | Up to 3 retries |
| NFR-R05 | Health check endpoints on all services | GET /health returning 200 with uptime data |

### Maintainability

| ID | Requirement |
|---|---|
| NFR-M01 | All TypeScript code shall pass strict mode compilation with no type errors |
| NFR-M02 | Unit test coverage for all business logic functions | > 80% line coverage |
| NFR-M03 | All AI prompt templates shall be versioned (v1, v2, etc.) and changes documented in ADRs |
| NFR-M04 | Architecture decisions shall be recorded in ADR format before implementation begins |
| NFR-M05 | Every database migration shall be reversible (up/down scripts via Prisma) |
| NFR-M06 | All public functions and interfaces shall have JSDoc comments |

### Cost

| ID | Requirement | Target |
|---|---|---|
| NFR-C01 | Monthly Anthropic API spend | < $20 USD |
| NFR-C02 | Monthly Azure infrastructure cost | < $50 USD |
| NFR-C03 | Repeated identical JD analyses shall be served from Redis cache, not new API calls | Cache TTL: 24 hours |
| NFR-C04 | Profile data API responses shall be cached at the application level | Cache TTL: 5 minutes |

### Observability

| ID | Requirement |
|---|---|
| NFR-O01 | All API requests shall be logged with: timestamp, method, path, status code, response time, user agent |
| NFR-O02 | All AI API calls shall be logged with token counts and cost estimate |
| NFR-O03 | Application errors shall be captured with stack traces and request context |
| NFR-O04 | Azure Application Insights shall be configured for distributed tracing in production |
| NFR-O05 | Structured JSON logging format for all services to enable log aggregation |

---

## User Stories

### US-001: View Professional Profile
```gherkin
Feature: Public Profile Viewing

Scenario: Recruiter views Rajesh's profile for the first time
  Given I am a recruiter who received a link to Rajesh's profile portal
  When I navigate to the portal URL in my browser
  Then I should see Rajesh's name and professional title
  And I should see a professional summary paragraph
  And I should see skills organized by category (AI/ML, Frontend, Backend, Cloud, etc.)
  And I should see a list of featured projects with technical details
  And the page should load within 2 seconds on a standard connection
```

### US-002: Analyze a Job Description
```gherkin
Feature: JD Analysis

Scenario: User submits a job description for analysis
  Given I have navigated to the JD Analyzer section of the portal
  And I have a job description text copied from a job posting
  When I paste the job description text into the input field
  And I click the "Analyze" button
  Then I should see a loading indicator within 500ms
  And within 10 seconds I should see structured results including:
    | Field             | Example                     |
    | Required Skills   | Python, LangChain, REST API |
    | Seniority Level   | Senior                      |
    | Domain            | AI/ML Engineering           |
    | Experience Years  | 5+                          |
  And the results should be organized in a clear, readable layout
```

### US-003: View Profile Match Score
```gherkin
Feature: Profile Matching

Scenario: User sees how well Rajesh matches a job description
  Given I have submitted a job description and analysis is complete
  When the analysis results are displayed
  Then I should see an overall match percentage (0-100%)
  And I should see a list of "Strong Matches" (skills Rajesh has that the JD requires)
  And I should see a list of "Partial Matches" (related but not exact skill matches)
  And I should see a list of "Gaps" (required skills not present in Rajesh's profile)
  And each match should show the proficiency level from the profile
```

### US-004: Generate a Tailored Resume
```gherkin
Feature: Resume Generation

Scenario: User generates a tailored resume from JD analysis
  Given I am viewing an analyzed job description with match results
  When I click the "Generate Tailored Resume" button
  Then I should see a loading indicator
  And within 15 seconds I should see a preview of the tailored resume
  And the resume should include a summary customized for the analyzed role
  And the skills section should prioritize skills matching the JD
  And experience bullets should be reordered to surface most relevant achievements
  And I should be able to download the resume as a PDF
```

### US-005: View Skill Gap Recommendations
```gherkin
Feature: Skill Gap Analysis

Scenario: User views learning recommendations based on JD gaps
  Given I have completed a JD analysis that identified skill gaps
  When I navigate to the "Recommendations" tab
  Then I should see a ranked list of missing skills from the JD
  And each skill should have an estimated learning time (e.g., "2-4 weeks")
  And each skill should have at least one recommended learning resource
  And the list should be ordered by relevance to the analyzed role
```

### US-006: Resume Download as PDF
```gherkin
Feature: PDF Export

Scenario: User downloads a generated resume
  Given I have generated a tailored resume
  When I click the "Download PDF" button
  Then a PDF file should be downloaded within 3 seconds
  And the PDF should be named with the format "Rajesh_Kalaimani_Resume_{date}.pdf"
  And the PDF should contain all resume sections in a professional layout
  And the PDF should render correctly in Adobe Reader and browser PDF viewers
```

### US-007: Contact Rajesh via Form
```gherkin
Feature: Contact Form

Scenario: Visitor submits a contact message
  Given I am a visitor on the public portal
  When I navigate to the Contact section
  And I fill in my name, email, subject, and message
  And I click the "Send Message" button
  Then I should see a success confirmation message
  And Rajesh should receive an email notification within 60 seconds
  And the form fields should be cleared after successful submission

Scenario: Contact form prevents spam
  Given I have successfully submitted the contact form 3 times in the last hour from my IP
  When I try to submit the form a 4th time
  Then I should see an error message: "Too many requests. Please try again later."
  And the form should not be submitted
```

### US-008: Token Usage Dashboard
```gherkin
Feature: AI Cost Monitoring

Scenario: Rajesh views his AI API usage
  Given I am Rajesh and I have authenticated with the admin API key
  When I navigate to the Token Usage Dashboard
  Then I should see total tokens used today, this week, and this month
  And I should see a cost breakdown by AI feature (JD Analyzer, Resume Gen, etc.)
  And I should see a bar chart of daily token usage for the past 30 days
  And I should see the current month's spend vs. my $20 budget
  And if usage is above 80% of budget, I should see a yellow warning banner
```

### US-009: Cached JD Analysis
```gherkin
Feature: Analysis Caching

Scenario: Same JD is analyzed twice
  Given a job description has already been analyzed and cached
  When I submit the same job description text again
  Then I should receive the analysis results within 1 second (from cache)
  And the results should be identical to the first analysis
  And the token usage log should show "served from cache" for the second request
  And no additional Anthropic API tokens should be consumed
```

### US-010: AI Graceful Degradation
```gherkin
Feature: AI Fallback Handling

Scenario: Anthropic API is unavailable
  Given the Anthropic Claude API is currently returning errors
  When I submit a job description for analysis
  Then I should see a user-friendly error message: "AI analysis is temporarily unavailable. Please try again in a few minutes."
  And I should NOT see a raw error stack trace or technical error details
  And the error should be logged internally with full details
  And the system should retry up to 3 times with exponential backoff before showing the error
```

### US-011: Conversational Profile Q&A (Phase 6)
```gherkin
Feature: RAG Assistant

Scenario: Visitor asks a question about Rajesh's experience
  Given I am on the public portal's "Ask About Rajesh" section
  When I type "What AI projects has Rajesh built with Python?"
  And I click Send
  Then I should receive a response within 5 seconds
  And the response should accurately describe Rajesh's Python AI projects
  And the response should cite the specific source (e.g., "from the Projects section")
  And the response should NOT invent projects or experiences not in the profile
```

### US-012: Profile Data Update
```gherkin
Feature: Profile Management

Scenario: Rajesh adds a new project to his profile
  Given I am Rajesh and I have updated the seed data file
  When I run the database seed command
  Then the new project should appear in the Profile Service API response
  And the Angular portal should display the new project within 5 minutes
  And the vector index should be updated with the new project's content within 5 minutes
```

### US-013: Budget Limit Enforcement
```gherkin
Feature: AI Budget Control

Scenario: Monthly AI budget is exhausted
  Given the current month's Anthropic API spend has reached the configured budget limit
  When any user submits a job description for AI analysis
  Then the system should return a message: "AI features are currently unavailable due to usage limits. Please check back next month."
  And no new Anthropic API calls should be made
  And cached analyses should still be served normally
```

### US-014: Profile Skills Section
```gherkin
Feature: Skills Display

Scenario: Visitor views the skills section
  Given I am viewing Rajesh's public profile
  When I look at the Skills section
  Then skills should be organized by category (AI/ML, Frontend, Backend, Cloud, DevOps)
  And each skill should display a proficiency level (Expert, Advanced, Intermediate, Beginner)
  And skills within each category should be ordered by proficiency level, highest first
  And the skills should be visually distinct (e.g., color-coded by category)
```

### US-015: Mobile Responsive Portal
```gherkin
Feature: Responsive Design

Scenario: Recruiter views profile on mobile device
  Given I am a recruiter viewing Rajesh's portal on an iPhone 14 (390px width)
  When the page loads
  Then all content should be readable without horizontal scrolling
  And navigation should collapse to a hamburger menu
  And skill tags should wrap gracefully
  And the contact form should be fully usable with touch inputs
  And the page should achieve a Google Lighthouse mobile score > 85
```

---

## Assumptions and Constraints

### Assumptions

1. Rajesh will maintain profile data by updating the Prisma seed file; no CMS or GUI editor is planned for v1.
2. The platform will serve a small volume of traffic (< 1,000 unique visitors/month); horizontal scaling is not a near-term concern.
3. All LLM interactions are in English; multi-language support is explicitly out of scope for v1.
4. The Anthropic Claude API (claude-3-5-sonnet or equivalent) will remain available at current pricing; cost estimates are based on public pricing at project start.
5. The platform does not store any visitor data; no cookies, no tracking, no GDPR-sensitive data collection beyond the contact form (which is transient).

### Constraints

1. **Budget:** Total monthly operational cost (AI + infrastructure) must remain under $70 USD.
2. **Solo development:** All work is done by Rajesh alone; no team dependencies.
3. **Learning time:** Development proceeds in parallel with full-time work; approximately 10-15 hours per week available for this project.
4. **No employment history fabrication:** The AI layer must never generate employment history, company names, dates, or specific achievements not present in the verified profile data.
5. **Technology stack:** The stack is fixed as defined in the ADRs; major framework changes require a new ADR and explicit decision to change.
