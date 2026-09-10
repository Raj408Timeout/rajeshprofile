/**
 * Prisma Database Seed — Rajesh Profile Portal
 *
 * Seeds Rajeshkumar Kalaimani's profile data into the database.
 * All data is derived from docs/profile-data/PROFILE_DATA.md.
 *
 * This script is idempotent: it uses upsert operations and can be run
 * multiple times without creating duplicates.
 *
 * Usage:
 *   npx ts-node prisma/seed.ts
 *   OR: npm run db:seed
 */

import { PrismaClient, SkillCategory, ProficiencyLevel, EmploymentType, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  console.log('Starting database seed...')

  // ===================================================================
  // Profile
  // ===================================================================
  const profile = await prisma.profile.upsert({
    where: { email: 'rajeshkumar@example.com' },
    update: {
      fullName: 'Rajeshkumar Kalaimani',
      title: 'Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect',
      summary:
        'Technology professional specializing in the design and deployment of AI-powered applications using large language models, with hands-on expertise in prompt engineering, LLM API integration, and AI product strategy. Experienced in bridging the gap between enterprise software requirements and emerging AI capabilities, with a focus on building practical, production-ready LLM solutions that solve real business problems. Actively building full-stack AI engineering skills across Angular, React, Node.js, Python, Azure, and GCP to complement deep AI product and prompt engineering expertise.',
      location: 'India',
      linkedinUrl: 'https://linkedin.com/in/rajeshkumarkalaimani',
      githubUrl: 'https://github.com/rajeshkumarkalaimani',
      portfolioUrl: 'https://rajeshkumar.dev',
    },
    create: {
      email: 'rajeshkumar@example.com',
      fullName: 'Rajeshkumar Kalaimani',
      title: 'Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect',
      summary:
        'Technology professional specializing in the design and deployment of AI-powered applications using large language models, with hands-on expertise in prompt engineering, LLM API integration, and AI product strategy. Experienced in bridging the gap between enterprise software requirements and emerging AI capabilities, with a focus on building practical, production-ready LLM solutions that solve real business problems. Actively building full-stack AI engineering skills across Angular, React, Node.js, Python, Azure, and GCP to complement deep AI product and prompt engineering expertise.',
      location: 'India',
      linkedinUrl: 'https://linkedin.com/in/rajeshkumarkalaimani',
      githubUrl: 'https://github.com/rajeshkumarkalaimani',
      portfolioUrl: 'https://rajeshkumar.dev',
    },
  })

  console.log(`Profile upserted: ${profile.fullName} (${profile.id})`)

  // ===================================================================
  // Skills
  // ===================================================================
  const skillsData = [
    // AI/ML
    { name: 'Prompt Engineering', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.EXPERT, yearsOfExperience: 2.5, isPrimary: true },
    { name: 'LLM Applications', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.EXPERT, yearsOfExperience: 2.5, isPrimary: true },
    { name: 'AI Product Management', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 3.0, isPrimary: true },
    { name: 'Claude API (Anthropic)', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.EXPERT, yearsOfExperience: 1.5, isPrimary: true },
    { name: 'RAG Systems', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.0, isPrimary: true },
    { name: 'AI System Design', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'Token Optimization', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 1.5, isPrimary: false },
    { name: 'Hallucination Prevention', category: SkillCategory.AI_ML, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 1.5, isPrimary: false },
    // Frontend
    { name: 'Angular', category: SkillCategory.FRONTEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 3.0, isPrimary: true },
    { name: 'TypeScript', category: SkillCategory.FRONTEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 3.0, isPrimary: true },
    { name: 'React', category: SkillCategory.FRONTEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'HTML5 / CSS3', category: SkillCategory.FRONTEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 5.0, isPrimary: false },
    { name: 'RxJS', category: SkillCategory.FRONTEND, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 2.0, isPrimary: false },
    // Backend
    { name: 'Python', category: SkillCategory.BACKEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 4.0, isPrimary: true },
    { name: 'Node.js', category: SkillCategory.BACKEND, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'REST APIs', category: SkillCategory.BACKEND, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 4.0, isPrimary: true },
    { name: 'Express.js', category: SkillCategory.BACKEND, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.5, isPrimary: false },
    { name: 'FastAPI', category: SkillCategory.BACKEND, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.0, isPrimary: false },
    // Cloud
    { name: 'Microsoft Azure', category: SkillCategory.CLOUD, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 3.0, isPrimary: true },
    { name: 'Google Cloud Platform', category: SkillCategory.CLOUD, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.5, isPrimary: true },
    { name: 'Azure Blob Storage', category: SkillCategory.CLOUD, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 2.0, isPrimary: false },
    { name: 'Azure Container Apps', category: SkillCategory.CLOUD, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.0, isPrimary: false },
    { name: 'Azure Key Vault', category: SkillCategory.CLOUD, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.5, isPrimary: false },
    // Database
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'Azure Cosmos DB', category: SkillCategory.DATABASE, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'SQL', category: SkillCategory.DATABASE, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 5.0, isPrimary: false },
    { name: 'Redis', category: SkillCategory.DATABASE, proficiency: ProficiencyLevel.BEGINNER, yearsOfExperience: 0.5, isPrimary: false },
    // DevOps
    { name: 'Docker', category: SkillCategory.DEVOPS, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 2.0, isPrimary: true },
    { name: 'GitHub Actions', category: SkillCategory.DEVOPS, proficiency: ProficiencyLevel.INTERMEDIATE, yearsOfExperience: 1.5, isPrimary: true },
    { name: 'Git', category: SkillCategory.DEVOPS, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 6.0, isPrimary: false },
    { name: 'Terraform', category: SkillCategory.DEVOPS, proficiency: ProficiencyLevel.BEGINNER, yearsOfExperience: 0.5, isPrimary: false },
    // Enterprise
    { name: 'SDLC', category: SkillCategory.ENTERPRISE, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 5.0, isPrimary: true },
    { name: 'Enterprise Software QA', category: SkillCategory.ENTERPRISE, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 4.0, isPrimary: true },
    { name: 'Agile / Scrum', category: SkillCategory.ENTERPRISE, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 4.0, isPrimary: false },
    { name: 'Technical Documentation', category: SkillCategory.ENTERPRISE, proficiency: ProficiencyLevel.ADVANCED, yearsOfExperience: 4.0, isPrimary: false },
  ]

  const skillMap: Record<string, string> = {}

  for (const skill of skillsData) {
    const created = await prisma.skill.upsert({
      where: {
        // We need a unique constraint on name+profileId — adding a compound unique
        // For seeding purposes, find by name and profileId
        id: (await prisma.skill.findFirst({ where: { profileId: profile.id, name: skill.name } }))?.id ?? '',
      },
      update: {
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
        isPrimary: skill.isPrimary,
      },
      create: {
        profileId: profile.id,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
        isPrimary: skill.isPrimary,
      },
    })
    skillMap[skill.name] = created.id
  }

  console.log(`Seeded ${skillsData.length} skills`)

  // ===================================================================
  // Experiences
  // ===================================================================

  // Experience 1: AI PM / FDE (Current)
  const exp1 = await prisma.experience.upsert({
    where: { id: (await prisma.experience.findFirst({ where: { profileId: profile.id, companyName: 'Technology Consulting Services (Private)' } }))?.id ?? '' },
    update: {},
    create: {
      profileId: profile.id,
      companyName: 'Technology Consulting Services (Private)',
      roleTitle: 'AI Product Manager / Forward Deployed Engineer',
      employmentType: EmploymentType.FULL_TIME,
      startDate: new Date('2022-06-01'),
      endDate: null,
      isCurrent: true,
      summary:
        'Leading AI product initiatives and forward deployment work, acting as the technical bridge between client requirements and AI capabilities. Responsible for designing LLM-powered features, managing AI product roadmaps, and deploying AI solutions in enterprise client environments.',
      highlights: [
        'Designed and deployed multiple LLM-powered features using the Anthropic Claude API, covering use cases including document analysis, intelligent search, and automated response generation',
        'Developed prompt engineering frameworks and internal guidelines for consistent, high-quality LLM outputs across multiple projects',
        'Led AI product discovery sessions with enterprise clients, translating vague AI opportunities into structured product requirements with measurable success criteria',
        'Managed token budgets and AI cost optimization across deployed LLM applications, reducing per-feature AI costs through caching strategies and prompt compression',
        'Acted as technical liaison between client stakeholders and development teams, authoring technical specifications for AI features',
      ],
      location: 'Remote',
    },
  })

  // Link skills to experience 1
  for (const skillName of ['Prompt Engineering', 'LLM Applications', 'Claude API (Anthropic)', 'AI Product Management', 'AI System Design', 'Token Optimization', 'Python', 'REST APIs', 'Technical Documentation']) {
    if (skillMap[skillName]) {
      await prisma.experienceSkill.upsert({
        where: { experienceId_skillId: { experienceId: exp1.id, skillId: skillMap[skillName] } },
        update: {},
        create: { experienceId: exp1.id, skillId: skillMap[skillName] },
      })
    }
  }

  // Experience 2: Senior QA Engineer
  const exp2 = await prisma.experience.upsert({
    where: { id: (await prisma.experience.findFirst({ where: { profileId: profile.id, companyName: 'Enterprise Software Firm (Private)' } }))?.id ?? '' },
    update: {},
    create: {
      profileId: profile.id,
      companyName: 'Enterprise Software Firm (Private)',
      roleTitle: 'Senior QA Engineer / Technical Lead',
      employmentType: EmploymentType.FULL_TIME,
      startDate: new Date('2018-03-01'),
      endDate: new Date('2022-05-31'),
      isCurrent: false,
      summary:
        'Technical lead for quality assurance across multiple enterprise software products, responsible for test strategy, automation framework design, and team mentoring.',
      highlights: [
        'Designed and implemented test automation frameworks that significantly reduced manual regression effort for multiple enterprise software products',
        'Led a team of QA engineers, conducting code reviews, defining testing standards, and mentoring junior team members on automation best practices',
        'Partnered with product and development teams during SDLC to shift quality left, embedding testing earlier in the development cycle',
        'Developed comprehensive test plans for complex enterprise features including multi-tenant data handling, workflow automation, and third-party integrations',
        'Authored technical documentation for testing processes and onboarding guides for new QA team members',
      ],
      location: 'India',
    },
  })

  for (const skillName of ['Enterprise Software QA', 'SDLC', 'Python', 'REST APIs', 'Git', 'Agile / Scrum', 'Technical Documentation']) {
    if (skillMap[skillName]) {
      await prisma.experienceSkill.upsert({
        where: { experienceId_skillId: { experienceId: exp2.id, skillId: skillMap[skillName] } },
        update: {},
        create: { experienceId: exp2.id, skillId: skillMap[skillName] },
      })
    }
  }

  // Experience 3: Software QA Engineer
  const exp3 = await prisma.experience.upsert({
    where: { id: (await prisma.experience.findFirst({ where: { profileId: profile.id, companyName: 'Software Development Company (Private)' } }))?.id ?? '' },
    update: {},
    create: {
      profileId: profile.id,
      companyName: 'Software Development Company (Private)',
      roleTitle: 'Software QA Engineer',
      employmentType: EmploymentType.FULL_TIME,
      startDate: new Date('2015-08-01'),
      endDate: new Date('2018-02-28'),
      isCurrent: false,
      summary:
        'Software quality assurance engineer responsible for functional testing, API testing, and defect management across web and enterprise applications.',
      highlights: [
        'Performed functional, regression, and integration testing across web applications and REST APIs',
        'Developed and maintained test cases, test plans, and defect reports using standard QA tooling',
        'Collaborated closely with development teams to reproduce, triage, and verify bug fixes',
        'Contributed to improving test coverage by identifying untested edge cases in complex business logic',
      ],
      location: 'India',
    },
  })

  for (const skillName of ['Enterprise Software QA', 'SDLC', 'REST APIs', 'SQL', 'Agile / Scrum']) {
    if (skillMap[skillName]) {
      await prisma.experienceSkill.upsert({
        where: { experienceId_skillId: { experienceId: exp3.id, skillId: skillMap[skillName] } },
        update: {},
        create: { experienceId: exp3.id, skillId: skillMap[skillName] },
      })
    }
  }

  console.log('Seeded 3 experience entries')

  // ===================================================================
  // Projects
  // ===================================================================

  const projectsData = [
    {
      name: 'Gmail AI Agent',
      slug: 'gmail-ai-agent',
      description: 'An autonomous AI agent that reads, understands, and responds to Gmail messages using the Claude API and Gmail API, demonstrating practical agentic AI design.',
      detailedDescription: 'The Gmail AI Agent is a Python application that integrates the Anthropic Claude API with the Gmail API to create an autonomous email processing agent. The agent authenticates with Gmail using OAuth 2.0, retrieves unread emails, uses Claude to classify email intent (action required, informational, promotional, spam), drafts contextually appropriate responses for action-required emails, and can send replies with human-in-the-loop approval. The project demonstrates core agentic AI patterns: tool use, iterative reasoning, and structured decision making. A token management layer tracks API usage to prevent overspend.',
      techStack: ['Python', 'Anthropic Claude API', 'Gmail API', 'Google OAuth 2.0', 'python-dotenv'],
      githubUrl: 'https://github.com/rajeshkumarkalaimani/Gmail_Agent',
      demoUrl: null,
      status: ProjectStatus.ACTIVE,
      isFeatured: true,
      sortOrder: 1,
      startDate: new Date('2024-10-01'),
      endDate: null,
      skills: ['Prompt Engineering', 'LLM Applications', 'Claude API (Anthropic)', 'Python', 'AI System Design', 'Token Optimization'],
    },
    {
      name: 'Azure Cosmos DB Methods Explorer',
      slug: 'cosmos-db-methods-explorer',
      description: 'A comprehensive code reference and testing environment for Azure Cosmos DB SDK methods, covering all major CRUD patterns, query APIs, and partitioning strategies.',
      detailedDescription: 'A practical reference implementation that exercises every major method in the Azure Cosmos DB Python SDK. Covers creating and managing databases and containers, document CRUD operations, cross-partition and single-partition queries, pagination with continuation tokens, change feed processing, and TTL configuration. Each method is implemented in an isolated, runnable Python script with inline comments explaining key parameters and gotchas.',
      techStack: ['Python', 'Azure Cosmos DB', 'Azure SDK for Python', 'python-dotenv'],
      githubUrl: 'https://github.com/rajeshkumarkalaimani/Azure_Cosmos_DB_Methods',
      demoUrl: null,
      status: ProjectStatus.ACTIVE,
      isFeatured: true,
      sortOrder: 2,
      startDate: new Date('2024-08-01'),
      endDate: null,
      skills: ['Python', 'Azure Cosmos DB', 'Microsoft Azure', 'REST APIs'],
    },
    {
      name: 'AI Profile Portal',
      slug: 'ai-profile-portal',
      description: 'A full-stack monorepo combining Angular, React, Node.js, PostgreSQL, and Claude API to build an AI-powered professional platform with JD analysis, resume generation, and RAG assistant.',
      detailedDescription: 'A production-quality monorepo using Turborepo, combining an Angular 17 public-facing portal with a React 18 private AI dashboard. Backend consists of two Node.js microservices: a Profile Service (Express + Prisma + PostgreSQL) and an AI Orchestration Service (Claude API integration with Redis caching, token budget management, and hallucination prevention). AI features include JD analysis, profile adaptation, resume generation, and a RAG assistant.',
      techStack: ['TypeScript', 'Angular', 'React', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Anthropic Claude API', 'Google Vertex AI', 'Docker', 'Terraform', 'Azure', 'GitHub Actions', 'Turborepo'],
      githubUrl: 'https://github.com/rajeshkumarkalaimani/My_Profile',
      demoUrl: 'https://rajeshkumar.dev',
      status: ProjectStatus.ACTIVE,
      isFeatured: true,
      sortOrder: 3,
      startDate: new Date('2026-08-07'),
      endDate: null,
      skills: ['Prompt Engineering', 'LLM Applications', 'AI System Design', 'Angular', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Microsoft Azure', 'Docker', 'GitHub Actions'],
    },
    {
      name: 'Enterprise QA Automation Framework',
      slug: 'qa-automation-framework',
      description: 'A comprehensive test automation framework for enterprise software, covering API testing, integration testing, and regression test suite management.',
      detailedDescription: 'Designed and implemented a structured QA automation framework covering REST API test suites, integration tests for critical business workflows, and regression test organization by feature area. The framework was built with maintainability and team adoption in mind, with clear documentation and standardized patterns for adding new test cases.',
      techStack: ['Python', 'REST APIs', 'GitHub Actions', 'SDLC'],
      githubUrl: null,
      demoUrl: null,
      status: ProjectStatus.COMPLETED,
      isFeatured: false,
      sortOrder: 4,
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-05-01'),
      skills: ['Enterprise Software QA', 'Python', 'REST APIs', 'SDLC', 'GitHub Actions', 'Technical Documentation'],
    },
  ]

  for (const projectData of projectsData) {
    const { skills: projectSkillNames, ...projectFields } = projectData

    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {
        ...projectFields,
      },
      create: {
        profileId: profile.id,
        ...projectFields,
      },
    })

    for (const skillName of projectSkillNames) {
      if (skillMap[skillName]) {
        await prisma.projectSkill.upsert({
          where: { projectId_skillId: { projectId: project.id, skillId: skillMap[skillName] } },
          update: {},
          create: { projectId: project.id, skillId: skillMap[skillName] },
        })
      }
    }
  }

  console.log(`Seeded ${projectsData.length} projects`)

  // ===================================================================
  // Certifications
  // ===================================================================

  const certificationsData = [
    {
      name: 'Microsoft Azure Fundamentals',
      issuingOrganization: 'Microsoft',
      issueDate: new Date('2023-04-01'),
      expiryDate: null,
      credentialId: 'AZ-900',
      credentialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
      isActive: true,
    },
    {
      name: 'Anthropic Prompt Engineering Fundamentals',
      issuingOrganization: 'Anthropic',
      issueDate: new Date('2024-09-01'),
      expiryDate: null,
      credentialId: null,
      credentialUrl: 'https://anthropic.com',
      isActive: true,
    },
    {
      name: 'ISTQB Certified Tester Foundation Level',
      issuingOrganization: 'ISTQB',
      issueDate: new Date('2017-06-01'),
      expiryDate: null,
      credentialId: null,
      credentialUrl: 'https://www.istqb.org',
      isActive: true,
    },
  ]

  for (const certData of certificationsData) {
    await prisma.certification.upsert({
      where: {
        id: (await prisma.certification.findFirst({
          where: { profileId: profile.id, name: certData.name }
        }))?.id ?? '',
      },
      update: certData,
      create: {
        profileId: profile.id,
        ...certData,
      },
    })
  }

  console.log(`Seeded ${certificationsData.length} certifications`)
  console.log('Database seed complete!')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
