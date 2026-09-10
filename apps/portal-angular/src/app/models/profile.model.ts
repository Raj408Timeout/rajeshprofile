export interface Profile {
  id: string;
  name: string;
  title: string;
  summary: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

export type SkillCategory = 'AI/ML' | 'Frontend' | 'Backend' | 'Cloud' | 'Databases' | 'DevOps' | 'Enterprise';

export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: Proficiency;
  yearsOfExp: number;
  isPrimary: boolean;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  location: string;
  summary: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  isFeatured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string;
}
