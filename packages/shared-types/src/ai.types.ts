/**
 * AI Types — Shared TypeScript interfaces for AI feature inputs and outputs.
 * These interfaces are shared between the AI Orchestration Service and the React dashboard.
 */

import type { Profile, Skill } from './profile.types'

// =====================================================================
// JD Analyzer Types
// =====================================================================

/**
 * Request body for the POST /api/v1/analyze-jd endpoint.
 */
export interface JDAnalysisRequest {
  /** Raw job description text. Min 100 chars, max 8000 chars. */
  jdText: string
}

/**
 * A single skill extracted from a job description.
 */
export interface ExtractedSkill {
  /** Canonical skill name (normalized, e.g. "JavaScript" not "JS") */
  name: string
  /** Whether this skill is required or just preferred */
  importance: 'critical' | 'preferred'
}

/**
 * The result of analyzing a single skill match between JD requirements and the profile.
 */
export interface SkillMatch {
  /** The skill name from the JD */
  skill: string
  /** The candidate's proficiency level for this skill */
  profileProficiency: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE' | 'BEGINNER'
  /** Optional note explaining the match (e.g., adjacent skill, partial match) */
  note: string | null
}

/**
 * A skill gap — a required or preferred JD skill not present in the profile.
 */
export interface SkillGap {
  /** The skill name from the JD */
  skill: string
  /** Importance level from the JD */
  importance: 'critical' | 'preferred'
}

/**
 * The match analysis between the profile and the analyzed JD.
 */
export interface MatchAnalysis {
  /** Overall match score, 0-100 */
  overallScore: number
  /** Skills where the profile has strong, direct matches */
  strongMatches: SkillMatch[]
  /** Skills where the profile has related but not exact matches */
  partialMatches: SkillMatch[]
  /** Required or preferred skills with no match in the profile */
  gaps: SkillGap[]
}

/**
 * Response from the POST /api/v1/analyze-jd endpoint.
 */
export interface JDAnalysisResponse {
  /** Cache key (SHA-256 hash of the sanitized JD text). Use this as the analysis_id in subsequent calls. */
  analysisId: string
  /** Whether this result was served from cache (true means no new AI tokens were consumed) */
  fromCache: boolean
  /** Seniority level extracted from the JD */
  seniorityLevel: string
  /** Primary domain/department for this role */
  domain: string
  /** Minimum years of experience required, null if not specified */
  experienceYearsRequired: number | null
  /** Skills explicitly listed as required or essential */
  requiredSkills: ExtractedSkill[]
  /** Skills listed as preferred, nice-to-have, or bonus */
  preferredSkills: ExtractedSkill[]
  /** Specific technologies, tools, and platforms mentioned */
  techStack: string[]
  /** Most important responsibilities from the JD */
  keyResponsibilities: string[]
  /** Signals about company type (startup, enterprise, etc.) */
  companyTypeSignals: string[]
  /** Automated match analysis against Rajesh's profile */
  matchAnalysis: MatchAnalysis
  /** Token usage for this call (or undefined if served from cache) */
  tokensUsed?: TokenUsageSummaryForCall
  /** Any caveats about parsing quality */
  parsingNotes: string | null
}

// =====================================================================
// Profile Adapter Types
// =====================================================================

/**
 * An adapted experience entry — the original experience reframed for a specific JD.
 */
export interface AdaptedExperience {
  /** UUID referencing the original experience record in the database */
  experienceId: string
  /** 0-100 relevance score for this experience to the analyzed JD */
  relevanceScore: number
  /** Rewritten versions of the original highlights, using JD-aligned language */
  adaptedHighlights: string[]
  /** Explanation of why this experience is relevant to the role */
  relevanceReason: string
}

/**
 * An adapted project — highlighted aspects relevant to the specific JD.
 */
export interface AdaptedProject {
  /** UUID referencing the original project record in the database */
  projectId: string
  /** 0-100 relevance score */
  relevanceScore: number
  /** Which aspects of this project to emphasize for this JD */
  emphasisPoints: string[]
  /** Explanation of relevance */
  relevanceReason: string
}

/**
 * An identified skill gap with context for the recommendation engine.
 */
export interface IdentifiedGap {
  /** Name of the skill in the JD */
  skillName: string
  /** How important this skill is to the JD */
  importance: 'critical' | 'preferred'
  /** Whether the skill is completely absent or only partially covered */
  gapType: 'missing' | 'partial'
  /** If partial, the related profile skill that provides partial coverage */
  partialMatch: string | null
}

/**
 * A prioritized skill with its relevance context for the adapted profile.
 */
export interface PrioritizedSkill extends Skill {
  /** How relevant this skill is to the target JD */
  relevanceToJd: 'primary' | 'secondary' | 'supporting'
  /** One sentence explaining why this skill matters for this JD */
  jdMatchReason: string
}

/**
 * The AI-adapted version of Rajesh's profile, tailored for a specific JD.
 */
export interface AdaptedProfile {
  /** Role-specific professional summary, derived from real profile data */
  adaptedSummary: string
  /** Skills reordered and annotated by JD relevance */
  prioritizedSkills: PrioritizedSkill[]
  /** Experience entries sorted by relevance, with adapted highlights */
  relevantExperiences: AdaptedExperience[]
  /** Projects highlighted for this role */
  relevantProjects: AdaptedProject[]
  /** Skills from the JD not present in the profile */
  identifiedGaps: IdentifiedGap[]
  /** Overall match score, 0-100 */
  overallMatchScore: number
  /** Any unusual decisions made during adaptation */
  adaptationNotes: string | null
  /** Token usage for this call */
  tokensUsed: TokenUsageSummaryForCall
}

// =====================================================================
// Resume Generator Types
// =====================================================================

/**
 * Request body for the POST /api/v1/generate-resume endpoint.
 */
export interface ResumeGenerationRequest {
  /** The analysis_id from a prior JD analysis call */
  analysisId: string
}

/**
 * Personal contact information for the resume header.
 */
export interface ResumeContact {
  fullName: string
  title: string
  email: string
  location: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

/**
 * A single experience entry as formatted for the resume.
 */
export interface ResumeExperience {
  company: string
  role: string
  employmentType: string
  location: string
  /** Formatted date range string, e.g. "Jan 2022 – Present" */
  dateRange: string
  isCurrent: boolean
  /** Achievement bullet points */
  bullets: string[]
}

/**
 * A single project as formatted for the resume.
 */
export interface ResumeProject {
  name: string
  dateRange: string | null
  techStack: string[]
  description: string
  githubUrl: string | null
}

/**
 * A single certification as formatted for the resume.
 */
export interface ResumeCertification {
  name: string
  issuer: string
  /** Formatted date string, e.g. "Apr 2023" */
  date: string
  isActive: boolean
  credentialUrl: string | null
}

/**
 * The complete structured resume content, ready for PDF rendering.
 */
export interface ResumeContent {
  /** Metadata about when and for what role this resume was generated */
  meta: {
    generatedAt: string
    targetRole: string
    profileVersion: string
  }
  personal: ResumeContact
  /** 2-3 sentence professional summary tailored to the target role */
  summary: string
  skills: {
    /** Most relevant skills for this role (max 8) */
    primary: string[]
    /** Additional notable skills (max 10) */
    additional: string[]
  }
  experience: ResumeExperience[]
  projects: ResumeProject[]
  certifications: ResumeCertification[]
  /** Issues or weak sections flagged during generation */
  generationWarnings: string[]
  /** Token usage for this call */
  tokensUsed: TokenUsageSummaryForCall
}

// =====================================================================
// Recommendation Engine Types
// =====================================================================

/**
 * A single step in a skill learning path.
 */
export interface LearningStep {
  step: number
  /** Action verb: "Read", "Complete", "Build", "Practice" */
  action: string
  /** Name of the resource */
  resourceTitle: string
  /** Type of learning resource */
  resourceType: 'documentation' | 'course' | 'book' | 'tutorial' | 'project'
  /** URL to the resource, or null for general practice steps */
  resourceUrl: string | null
  /** Estimated hours for this step */
  timeHours: number
}

/**
 * A single skill learning recommendation.
 */
export interface SkillRecommendation {
  /** Name of the skill to learn */
  skillName: string
  /** How important this skill is to the target JD */
  importanceInJd: 'critical' | 'preferred'
  /** How serious the gap is */
  gapSeverity: 'blocking' | 'significant' | 'minor' | 'enhancement'
  /** Profile skills that will accelerate learning this skill */
  adjacentSkills: string[]
  /** Realistic estimate in weeks for a professional with 10h/week available */
  estimatedLearningWeeks: number
  /** Priority rank (1 = highest priority) */
  priorityRank: number
  /** Why this specific skill matters for this specific role */
  whyItMatters: string
  /** Ordered list of learning steps */
  learningPath: LearningStep[]
}

/**
 * Response from the POST /api/v1/recommendations endpoint.
 */
export interface RecommendationResponse {
  /** Domain/role from the analyzed JD */
  targetRole: string
  /** Honest 1-2 sentence assessment of current fit */
  currentMatchAssessment: string
  /** Ranked list of learning recommendations */
  recommendations: SkillRecommendation[]
  /** Skills already close to requirements that just need emphasis */
  quickWins: string[]
  /** High-value skills worth learning over 3+ months */
  longTermInvestments: string[]
  /** Any important caveat or encouragement */
  advisorNote: string | null
  /** Token usage for this call */
  tokensUsed: TokenUsageSummaryForCall
}

// =====================================================================
// Supporting Types
// =====================================================================

/**
 * Summary of token usage for a single AI API call.
 * Returned inline in AI feature responses.
 */
export interface TokenUsageSummaryForCall {
  /** Input token count */
  prompt: number
  /** Output token count */
  completion: number
  /** Total tokens (prompt + completion) */
  total: number
  /** Estimated cost in USD for this call */
  estimatedCostUsd: number
}
