/**
 * Profile Types — Shared TypeScript interfaces for Rajesh's professional profile data.
 * These interfaces are shared between the Profile Service backend and both frontends.
 * Changes here must be backward-compatible or versioned.
 */

/**
 * Proficiency levels for skills, ordered from highest to lowest.
 */
export enum Proficiency {
  EXPERT = 'EXPERT',
  ADVANCED = 'ADVANCED',
  INTERMEDIATE = 'INTERMEDIATE',
  BEGINNER = 'BEGINNER',
}

/**
 * Categories grouping related skills together.
 * Used for display organization in the portal.
 */
export enum SkillCategory {
  AI_ML = 'AI_ML',
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  CLOUD = 'CLOUD',
  DATABASE = 'DATABASE',
  DEVOPS = 'DEVOPS',
  ENTERPRISE = 'ENTERPRISE',
  SOFT_SKILLS = 'SOFT_SKILLS',
}

/**
 * A single skill entry in Rajesh's profile.
 */
export interface Skill {
  /** Unique identifier (UUID) */
  id: string
  /** Display name for the skill, e.g. "Prompt Engineering" */
  name: string
  /** Domain grouping for display */
  category: SkillCategory
  /** Self-assessed proficiency level */
  proficiency: Proficiency
  /** Approximate years of hands-on experience with this skill */
  yearsOfExperience: number | null
  /** Whether this skill should be prominently featured in the profile summary */
  isPrimary: boolean
}

/**
 * A professional experience entry (job role).
 */
export interface Experience {
  /** Unique identifier (UUID) */
  id: string
  /** Name of the employer organization */
  companyName: string
  /** Job title held */
  roleTitle: string
  /** Employment arrangement */
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE'
  /** Start date in ISO 8601 format (YYYY-MM-DD) */
  startDate: string
  /** End date in ISO 8601 format. Null if this is the current role. */
  endDate: string | null
  /** Whether this is the current active role */
  isCurrent: boolean
  /** One paragraph overview of the role's responsibilities and context */
  summary: string
  /** Achievement-focused bullet points from this role */
  highlights: string[]
  /** City, Country or "Remote" */
  location: string
  /** Skills that were actively used in this role */
  skills: Skill[]
}

/**
 * A technical or product project Rajesh has built or contributed to.
 */
export interface Project {
  /** Unique identifier (UUID) */
  id: string
  /** Display name for the project */
  name: string
  /** URL-safe slug for linking (e.g., "gmail-ai-agent") */
  slug: string
  /** 1-2 sentence overview for list views */
  description: string
  /** Full technical write-up for detail views */
  detailedDescription: string | null
  /** Technologies, frameworks, and tools used in this project */
  techStack: string[]
  /** GitHub repository URL, if public */
  githubUrl: string | null
  /** Live demo or video URL, if available */
  demoUrl: string | null
  /** Current state of the project */
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
  /** Whether to display this project in the featured section */
  isFeatured: boolean
  /** Integer for controlling display order — lower values display first */
  sortOrder: number
  /** Project start date in ISO 8601 format */
  startDate: string | null
  /** Project completion date in ISO 8601 format. Null if ongoing. */
  endDate: string | null
  /** Skills demonstrated or used in this project */
  skills: Skill[]
}

/**
 * A professional certification or credential.
 */
export interface Certification {
  /** Unique identifier (UUID) */
  id: string
  /** Full official name of the certification */
  name: string
  /** Organization that issued the certification (e.g., "Microsoft", "Anthropic") */
  issuingOrganization: string
  /** Date the certification was earned, in ISO 8601 format */
  issueDate: string
  /** Expiry date in ISO 8601 format. Null if the certification does not expire. */
  expiryDate: string | null
  /** Verification ID provided by the issuing organization */
  credentialId: string | null
  /** URL to verify the credential online */
  credentialUrl: string | null
  /** Whether the certification is currently valid (not expired or revoked) */
  isActive: boolean
}

/**
 * The complete professional profile for Rajeshkumar Kalaimani.
 * This is the top-level type returned by GET /api/v1/profile.
 */
export interface Profile {
  /** Unique identifier (UUID) */
  id: string
  /** Full professional name */
  fullName: string
  /** Professional title or tagline */
  title: string
  /** 2-3 sentence professional summary */
  summary: string
  /** Primary contact email address */
  email: string
  /** City, Country location */
  location: string | null
  /** LinkedIn profile URL */
  linkedinUrl: string | null
  /** GitHub profile URL */
  githubUrl: string | null
  /** Portfolio/portal URL */
  portfolioUrl: string | null
  /** All skills, ordered by proficiency then name */
  skills: Skill[]
  /** Professional experiences in reverse chronological order */
  experiences: Experience[]
  /** Projects, ordered by sortOrder */
  projects: Project[]
  /** Active certifications */
  certifications: Certification[]
  /** ISO 8601 timestamp of when the profile was created */
  createdAt: string
  /** ISO 8601 timestamp of the most recent profile update */
  updatedAt: string
}
