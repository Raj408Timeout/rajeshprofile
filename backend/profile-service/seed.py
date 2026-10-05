"""
Idempotent seed script for the Rajesh Profile Portal.

Usage:
    python seed.py

Logic:
  - If a profile with email 'rajeshkumar@example.com' already exists, skip
    profile creation and reuse that profile's id.
  - Skills, experiences, projects, and certifications are deleted and
    recreated each run for idempotency.
  - seed_database(db) is importable for use by reset_service.
"""
from __future__ import annotations

import asyncio
import uuid
from datetime import date

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal
from app.models.profile import (
    Certification,
    EmploymentType,
    Experience,
    Profile,
    Project,
    ProjectStatus,
    Skill,
    SkillCategory,
    ProficiencyLevel,
)

ORIGINAL_SUMMARY = (
    "Technology professional specializing in the design and deployment of "
    "AI-powered applications using large language models, with hands-on "
    "expertise in prompt engineering, LLM API integration, and AI product "
    "strategy. Experienced in bridging the gap between enterprise software "
    "requirements and emerging AI capabilities, with a focus on building "
    "practical, production-ready LLM solutions that solve real business problems."
)


# ---------------------------------------------------------------------------
# Seed data helpers
# ---------------------------------------------------------------------------

def _skill(
    profile_id: str,
    name: str,
    category: SkillCategory,
    proficiency: ProficiencyLevel,
    years: float,
    is_primary: bool = False,
    sort_order: int = 0,
) -> Skill:
    return Skill(
        id=str(uuid.uuid4()),
        profile_id=profile_id,
        name=name,
        category=category,
        proficiency=proficiency,
        years_of_exp=years,
        is_primary=is_primary,
        sort_order=sort_order,
    )


# ---------------------------------------------------------------------------
# Core seed function — importable by reset_service
# ---------------------------------------------------------------------------

async def seed_database(db: AsyncSession) -> None:
    """Idempotent seed. Reuses existing profile, replaces all child records."""

    # Profile
    result = await db.execute(
        select(Profile).where(Profile.email == "rajeshkumar@example.com")
    )
    existing = result.scalars().first()

    if existing:
        profile_id = existing.id
        # Reset summary to original in case Claude modified it
        existing.summary = ORIGINAL_SUMMARY
        print(f"[seed] Profile already exists (id={profile_id}), resetting data.")
    else:
        profile_id = str(uuid.uuid4())
        db.add(Profile(
            id=profile_id,
            full_name="Rajeshkumar Kalaimani",
            title="Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect",
            summary=ORIGINAL_SUMMARY,
            email="rajeshkumar@example.com",
            location="India",
            linkedin_url="https://linkedin.com/in/rajeshkumarkalaimani",
            github_url="https://github.com/rajeshkumarkalaimani",
            portfolio_url="https://rajeshkumarkalaimani.dev",
            is_active=True,
        ))
        await db.flush()
        print(f"[seed] Created profile (id={profile_id})")

    # Skills
    await db.execute(delete(Skill).where(Skill.profile_id == profile_id))
    AI = SkillCategory.AI_ML
    FE = SkillCategory.FRONTEND
    BE = SkillCategory.BACKEND
    CL = SkillCategory.CLOUD
    DB_ = SkillCategory.DATABASE
    DO = SkillCategory.DEVOPS
    EN = SkillCategory.ENTERPRISE
    EX = ProficiencyLevel.EXPERT
    AV = ProficiencyLevel.ADVANCED
    IN = ProficiencyLevel.INTERMEDIATE
    BG = ProficiencyLevel.BEGINNER

    skills = [
        _skill(profile_id, "Prompt Engineering",        AI, EX, 2.5, is_primary=True,  sort_order=1),
        _skill(profile_id, "LLM Applications",          AI, EX, 2.5, is_primary=True,  sort_order=2),
        _skill(profile_id, "AI Product Management",     AI, AV, 3.0, is_primary=True,  sort_order=3),
        _skill(profile_id, "RAG Systems",               AI, IN, 1.0, is_primary=False, sort_order=4),
        _skill(profile_id, "Claude API",                AI, EX, 1.5, is_primary=True,  sort_order=5),
        _skill(profile_id, "AI System Design",          AI, AV, 2.0, is_primary=True,  sort_order=6),
        _skill(profile_id, "Token Optimization",        AI, AV, 1.5, is_primary=False, sort_order=7),
        _skill(profile_id, "Hallucination Prevention",  AI, AV, 1.5, is_primary=False, sort_order=8),
        _skill(profile_id, "Angular",                   FE, AV, 3.0, is_primary=True,  sort_order=9),
        _skill(profile_id, "TypeScript",                FE, AV, 3.0, is_primary=True,  sort_order=10),
        _skill(profile_id, "React",                     FE, AV, 2.0, is_primary=False, sort_order=11),
        _skill(profile_id, "HTML5/CSS3",                FE, AV, 5.0, is_primary=False, sort_order=12),
        _skill(profile_id, "RxJS",                      FE, IN, 2.0, is_primary=False, sort_order=13),
        _skill(profile_id, "Python",                    BE, AV, 4.0, is_primary=True,  sort_order=14),
        _skill(profile_id, "Node.js",                   BE, IN, 2.0, is_primary=False, sort_order=15),
        _skill(profile_id, "REST APIs",                 BE, AV, 4.0, is_primary=True,  sort_order=16),
        _skill(profile_id, "Express.js",                BE, IN, 1.5, is_primary=False, sort_order=17),
        _skill(profile_id, "FastAPI",                   BE, IN, 1.0, is_primary=False, sort_order=18),
        _skill(profile_id, "Microsoft Azure",           CL, AV, 3.0, is_primary=True,  sort_order=19),
        _skill(profile_id, "GCP",                       CL, IN, 1.5, is_primary=False, sort_order=20),
        _skill(profile_id, "Azure Blob Storage",        CL, AV, 2.0, is_primary=False, sort_order=21),
        _skill(profile_id, "Azure Container Apps",      CL, IN, 1.0, is_primary=False, sort_order=22),
        _skill(profile_id, "Azure Key Vault",           CL, IN, 1.5, is_primary=False, sort_order=23),
        _skill(profile_id, "PostgreSQL",                DB_, IN, 2.0, is_primary=False, sort_order=24),
        _skill(profile_id, "Azure Cosmos DB",           DB_, IN, 2.0, is_primary=False, sort_order=25),
        _skill(profile_id, "Redis",                     DB_, BG, 0.5, is_primary=False, sort_order=26),
        _skill(profile_id, "SQL",                       DB_, AV, 5.0, is_primary=True,  sort_order=27),
        _skill(profile_id, "Docker",                    DO, IN, 2.0, is_primary=False, sort_order=28),
        _skill(profile_id, "GitHub Actions",            DO, IN, 1.5, is_primary=False, sort_order=29),
        _skill(profile_id, "Git",                       DO, AV, 6.0, is_primary=True,  sort_order=30),
        _skill(profile_id, "Terraform",                 DO, BG, 0.5, is_primary=False, sort_order=31),
        _skill(profile_id, "SDLC",                      EN, AV, 5.0, is_primary=False, sort_order=32),
        _skill(profile_id, "Enterprise Software QA",    EN, AV, 4.0, is_primary=False, sort_order=33),
        _skill(profile_id, "Agile/Scrum",               EN, AV, 4.0, is_primary=False, sort_order=34),
        _skill(profile_id, "Technical Documentation",   EN, AV, 4.0, is_primary=False, sort_order=35),
        _skill(profile_id, "Stakeholder Communication", EN, AV, 5.0, is_primary=False, sort_order=36),
    ]
    db.add_all(skills)
    print(f"[seed] Seeded {len(skills)} skills")

    # Experiences
    await db.execute(delete(Experience).where(Experience.profile_id == profile_id))
    experiences = [
        Experience(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            company_name="Technology Consulting Services",
            role_title="AI Product Manager / Forward Deployed Engineer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2022, 6, 1),
            end_date=None,
            is_current=True,
            location="India",
            summary="Leading AI product development and deployment of LLM-powered enterprise solutions.",
            highlights=[
                "Designed and deployed LLM-powered features using Anthropic Claude API",
                "Developed prompt engineering frameworks and internal guidelines",
                "Led AI product discovery sessions with enterprise clients",
                "Managed token budgets and AI cost optimization across deployed LLM applications",
                "Acted as technical liaison between client stakeholders and development teams",
            ],
            sort_order=1,
        ),
        Experience(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            company_name="Enterprise Software Firm",
            role_title="Senior QA Engineer / Technical Lead",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2018, 3, 1),
            end_date=date(2022, 5, 31),
            is_current=False,
            location="India",
            summary="Led quality assurance initiatives for complex enterprise software projects.",
            highlights=[
                "Designed test automation frameworks reducing manual regression effort",
                "Led QA team of engineers conducting code reviews and mentoring",
                "Partnered with product and dev teams to shift quality left in SDLC",
                "Developed comprehensive test plans for complex enterprise features",
            ],
            sort_order=2,
        ),
        Experience(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            company_name="Software Development Company",
            role_title="Software QA Engineer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2015, 8, 1),
            end_date=date(2018, 2, 28),
            is_current=False,
            location="India",
            summary="Performed comprehensive QA across enterprise software products.",
            highlights=[
                "Performed functional, regression, and integration testing",
                "Developed and maintained test cases and defect reports",
                "Collaborated with dev teams on bug triage and verification",
            ],
            sort_order=3,
        ),
    ]
    db.add_all(experiences)
    print(f"[seed] Seeded {len(experiences)} experiences")

    # Projects
    await db.execute(delete(Project).where(Project.profile_id == profile_id))
    projects = [
        Project(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="Gmail AI Agent",
            slug="gmail-ai-agent",
            description="Autonomous email processing agent that reads, classifies, and drafts responses using Claude AI and Gmail API.",
            tech_stack=["Python", "Anthropic Claude API", "Gmail API", "Google OAuth 2.0"],
            github_url="https://github.com/rajeshkumarkalaimani/Gmail_Agent",
            demo_url=None,
            status=ProjectStatus.ACTIVE,
            is_featured=True,
            sort_order=1,
        ),
        Project(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="Azure Cosmos DB Methods Explorer",
            slug="cosmos-db-explorer",
            description="Comprehensive reference covering all Azure Cosmos DB SDK methods — CRUD, query, partitioning, pagination.",
            tech_stack=["Python", "Azure Cosmos DB SDK"],
            github_url="https://github.com/rajeshkumarkalaimani/Azure_Cosmos_DB_Methods",
            demo_url=None,
            status=ProjectStatus.ACTIVE,
            is_featured=True,
            sort_order=2,
        ),
        Project(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="AI Profile Portal",
            slug="ai-profile-portal",
            description="Production monorepo with AI features: JD analyzer, profile adapter, resume generator.",
            tech_stack=["Angular", "React", "FastAPI", "PostgreSQL", "Claude API", "Turborepo"],
            github_url="https://github.com/rajeshkumarkalaimani/My_Profile",
            demo_url=None,
            status=ProjectStatus.ACTIVE,
            is_featured=True,
            sort_order=3,
        ),
        Project(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="Enterprise QA Automation Framework",
            slug="qa-automation-framework",
            description="Structured test automation framework for enterprise software with CI/CD integration.",
            tech_stack=["Python", "REST APIs", "GitHub Actions"],
            github_url=None,
            demo_url=None,
            status=ProjectStatus.COMPLETED,
            is_featured=False,
            sort_order=4,
        ),
    ]
    db.add_all(projects)
    print(f"[seed] Seeded {len(projects)} projects")

    # Certifications
    await db.execute(delete(Certification).where(Certification.profile_id == profile_id))
    certifications = [
        Certification(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="Microsoft Azure Fundamentals (AZ-900)",
            issuing_organization="Microsoft",
            issue_date=date(2023, 4, 1),
            expiry_date=None,
            is_active=True,
            credential_url="https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
            sort_order=1,
        ),
        Certification(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="Anthropic Prompt Engineering Fundamentals",
            issuing_organization="Anthropic",
            issue_date=date(2024, 9, 1),
            expiry_date=None,
            is_active=True,
            credential_url="https://www.anthropic.com/",
            sort_order=2,
        ),
        Certification(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            name="ISTQB Certified Tester Foundation Level",
            issuing_organization="ISTQB",
            issue_date=date(2017, 6, 1),
            expiry_date=None,
            is_active=True,
            credential_url="https://www.istqb.org/",
            sort_order=3,
        ),
    ]
    db.add_all(certifications)
    print(f"[seed] Seeded {len(certifications)} certifications")

    await db.commit()
    print("[seed] All data committed successfully.")


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

async def main() -> None:
    async with AsyncSessionLocal() as db:
        await seed_database(db)


if __name__ == "__main__":
    asyncio.run(main())
