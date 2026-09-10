import type { Profile, Skill, Experience, Project, Certification } from '../models/profile.model';

export const PROFILE: Profile = {
  id: 'rajeshkumar-kalaimani',
  name: 'Rajeshkumar Kalaimani',
  title: 'Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect',
  summary: 'Technology professional specializing in the design and deployment of AI-powered applications using large language models, with hands-on expertise in prompt engineering, LLM API integration, and AI product strategy. Experienced in bridging the gap between enterprise software requirements and emerging AI capabilities, with a focus on building practical, production-ready LLM solutions that solve real business problems.',
  location: 'India',
  linkedinUrl: 'https://linkedin.com/in/rajeshkumarkalaimani',
  githubUrl: 'https://github.com/rajeshkumarkalaimani',
  portfolioUrl: 'https://rajeshkumarkalaimani.dev',
};

export const SKILLS: Skill[] = [
  // AI/ML
  { id: 'skill-001', name: 'Prompt Engineering', category: 'AI/ML', proficiency: 'Expert', yearsOfExp: 2.5, isPrimary: true },
  { id: 'skill-002', name: 'LLM Applications', category: 'AI/ML', proficiency: 'Expert', yearsOfExp: 2.5, isPrimary: true },
  { id: 'skill-003', name: 'AI Product Management', category: 'AI/ML', proficiency: 'Advanced', yearsOfExp: 3, isPrimary: true },
  { id: 'skill-004', name: 'RAG Systems', category: 'AI/ML', proficiency: 'Intermediate', yearsOfExp: 1, isPrimary: false },
  { id: 'skill-005', name: 'Claude API', category: 'AI/ML', proficiency: 'Expert', yearsOfExp: 1.5, isPrimary: true },
  { id: 'skill-006', name: 'AI System Design', category: 'AI/ML', proficiency: 'Advanced', yearsOfExp: 2, isPrimary: true },
  { id: 'skill-007', name: 'Token Optimization', category: 'AI/ML', proficiency: 'Advanced', yearsOfExp: 1.5, isPrimary: false },
  { id: 'skill-008', name: 'Hallucination Prevention', category: 'AI/ML', proficiency: 'Advanced', yearsOfExp: 1.5, isPrimary: false },

  // Frontend
  { id: 'skill-009', name: 'Angular', category: 'Frontend', proficiency: 'Advanced', yearsOfExp: 3, isPrimary: true },
  { id: 'skill-010', name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced', yearsOfExp: 3, isPrimary: true },
  { id: 'skill-011', name: 'React', category: 'Frontend', proficiency: 'Advanced', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-012', name: 'HTML5/CSS3', category: 'Frontend', proficiency: 'Advanced', yearsOfExp: 5, isPrimary: false },
  { id: 'skill-013', name: 'RxJS', category: 'Frontend', proficiency: 'Intermediate', yearsOfExp: 2, isPrimary: false },

  // Backend
  { id: 'skill-014', name: 'Python', category: 'Backend', proficiency: 'Advanced', yearsOfExp: 4, isPrimary: true },
  { id: 'skill-015', name: 'Node.js', category: 'Backend', proficiency: 'Intermediate', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-016', name: 'REST APIs', category: 'Backend', proficiency: 'Advanced', yearsOfExp: 4, isPrimary: true },
  { id: 'skill-017', name: 'Express.js', category: 'Backend', proficiency: 'Intermediate', yearsOfExp: 1.5, isPrimary: false },
  { id: 'skill-018', name: 'FastAPI', category: 'Backend', proficiency: 'Intermediate', yearsOfExp: 1, isPrimary: false },

  // Cloud
  { id: 'skill-019', name: 'Microsoft Azure', category: 'Cloud', proficiency: 'Advanced', yearsOfExp: 3, isPrimary: true },
  { id: 'skill-020', name: 'GCP', category: 'Cloud', proficiency: 'Intermediate', yearsOfExp: 1.5, isPrimary: false },
  { id: 'skill-021', name: 'Azure Blob Storage', category: 'Cloud', proficiency: 'Advanced', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-022', name: 'Azure Container Apps', category: 'Cloud', proficiency: 'Intermediate', yearsOfExp: 1, isPrimary: false },
  { id: 'skill-023', name: 'Azure Key Vault', category: 'Cloud', proficiency: 'Intermediate', yearsOfExp: 1.5, isPrimary: false },

  // Databases
  { id: 'skill-024', name: 'PostgreSQL', category: 'Databases', proficiency: 'Intermediate', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-025', name: 'Azure Cosmos DB', category: 'Databases', proficiency: 'Intermediate', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-026', name: 'Redis', category: 'Databases', proficiency: 'Beginner', yearsOfExp: 0.5, isPrimary: false },
  { id: 'skill-027', name: 'SQL', category: 'Databases', proficiency: 'Advanced', yearsOfExp: 5, isPrimary: true },

  // DevOps
  { id: 'skill-028', name: 'Docker', category: 'DevOps', proficiency: 'Intermediate', yearsOfExp: 2, isPrimary: false },
  { id: 'skill-029', name: 'GitHub Actions', category: 'DevOps', proficiency: 'Intermediate', yearsOfExp: 1.5, isPrimary: false },
  { id: 'skill-030', name: 'Git', category: 'DevOps', proficiency: 'Advanced', yearsOfExp: 6, isPrimary: true },
  { id: 'skill-031', name: 'Terraform', category: 'DevOps', proficiency: 'Beginner', yearsOfExp: 0.5, isPrimary: false },

  // Enterprise
  { id: 'skill-032', name: 'SDLC', category: 'Enterprise', proficiency: 'Advanced', yearsOfExp: 5, isPrimary: false },
  { id: 'skill-033', name: 'Enterprise Software QA', category: 'Enterprise', proficiency: 'Advanced', yearsOfExp: 4, isPrimary: false },
  { id: 'skill-034', name: 'Agile/Scrum', category: 'Enterprise', proficiency: 'Advanced', yearsOfExp: 4, isPrimary: false },
  { id: 'skill-035', name: 'Technical Documentation', category: 'Enterprise', proficiency: 'Advanced', yearsOfExp: 4, isPrimary: false },
  { id: 'skill-036', name: 'Stakeholder Communication', category: 'Enterprise', proficiency: 'Advanced', yearsOfExp: 5, isPrimary: false },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-001',
    company: 'Technology Consulting Services',
    title: 'AI Product Manager / Forward Deployed Engineer',
    startDate: 'Jun 2022',
    endDate: null,
    isCurrent: true,
    location: 'India',
    summary: 'Leading AI product development and deployment of LLM-powered enterprise solutions, bridging technical AI capabilities with real-world client needs.',
    highlights: [
      'Designed and deployed LLM-powered features using Anthropic Claude API',
      'Developed prompt engineering frameworks and internal guidelines',
      'Led AI product discovery sessions with enterprise clients',
      'Managed token budgets and AI cost optimization across deployed LLM applications',
      'Acted as technical liaison between client stakeholders and development teams',
    ],
  },
  {
    id: 'exp-002',
    company: 'Enterprise Software Firm',
    title: 'Senior QA Engineer / Technical Lead',
    startDate: 'Mar 2018',
    endDate: 'May 2022',
    isCurrent: false,
    location: 'India',
    summary: 'Led quality assurance initiatives and technical teams for complex enterprise software projects, implementing automation and best practices.',
    highlights: [
      'Designed test automation frameworks reducing manual regression effort',
      'Led QA team of engineers, conducting code reviews and mentoring',
      'Partnered with product and dev teams to shift quality left in SDLC',
      'Developed comprehensive test plans for complex enterprise features',
    ],
  },
  {
    id: 'exp-003',
    company: 'Software Development Company',
    title: 'Software QA Engineer',
    startDate: 'Aug 2015',
    endDate: 'Feb 2018',
    isCurrent: false,
    location: 'India',
    summary: 'Performed comprehensive software quality assurance for enterprise software products, ensuring reliability and compliance with requirements.',
    highlights: [
      'Performed functional, regression, and integration testing',
      'Developed and maintained test cases and defect reports',
      'Collaborated with dev teams on bug triage and verification',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Gmail AI Agent',
    slug: 'gmail-ai-agent',
    shortDescription: 'Autonomous email processing agent that reads, classifies, and drafts responses using Claude AI and Gmail API with Google OAuth 2.0.',
    techStack: ['Python', 'Anthropic Claude API', 'Gmail API', 'Google OAuth 2.0'],
    githubUrl: 'https://github.com/rajeshkumarkalaimani/Gmail_Agent',
    demoUrl: null,
    isFeatured: true,
  },
  {
    id: 'proj-002',
    title: 'Azure Cosmos DB Methods Explorer',
    slug: 'cosmos-db-explorer',
    shortDescription: 'Comprehensive reference implementation covering all Azure Cosmos DB SDK methods — ideal for developers learning the Cosmos DB Python SDK.',
    techStack: ['Python', 'Azure Cosmos DB SDK'],
    githubUrl: 'https://github.com/rajeshkumarkalaimani/Azure_Cosmos_DB_Methods',
    demoUrl: null,
    isFeatured: true,
  },
  {
    id: 'proj-003',
    title: 'AI Profile Portal',
    slug: 'ai-profile-portal',
    shortDescription: 'Production monorepo with AI features including a JD analyzer, profile adapter, and AI resume generator. This very project.',
    techStack: ['Angular', 'React', 'Node.js', 'PostgreSQL', 'Claude API', 'Turborepo'],
    githubUrl: 'https://github.com/rajeshkumarkalaimani/My_Profile',
    demoUrl: null,
    isFeatured: true,
  },
  {
    id: 'proj-004',
    title: 'Enterprise QA Automation Framework',
    slug: 'qa-automation-framework',
    shortDescription: 'Structured test automation framework for enterprise software, with CI/CD integration via GitHub Actions for continuous quality assurance.',
    techStack: ['Python', 'REST APIs', 'GitHub Actions'],
    githubUrl: null,
    demoUrl: null,
    isFeatured: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-001',
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issueDate: 'Apr 2023',
    expiryDate: null,
    credentialUrl: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
  },
  {
    id: 'cert-002',
    name: 'Anthropic Prompt Engineering Fundamentals',
    issuer: 'Anthropic',
    issueDate: 'Sep 2024',
    expiryDate: null,
    credentialUrl: 'https://www.anthropic.com/',
  },
  {
    id: 'cert-003',
    name: 'ISTQB Certified Tester Foundation Level',
    issuer: 'ISTQB',
    issueDate: 'Jun 2017',
    expiryDate: null,
    credentialUrl: 'https://www.istqb.org/',
  },
];
