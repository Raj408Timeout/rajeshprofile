from __future__ import annotations

from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.profile import Certification, Experience, Profile, Project, Skill
from app.schemas.profile import (
    CertificationResponse,
    ExperienceResponse,
    ProfileResponse,
    ProjectResponse,
    SkillResponse,
)

# ---------------------------------------------------------------------------
# Enum → display string maps
# ---------------------------------------------------------------------------

CATEGORY_MAP: dict[str, str] = {
    "AI_ML": "AI/ML",
    "FRONTEND": "Frontend",
    "BACKEND": "Backend",
    "CLOUD": "Cloud",
    "DATABASE": "Databases",
    "DEVOPS": "DevOps",
    "ENTERPRISE": "Enterprise",
}

PROFICIENCY_MAP: dict[str, str] = {
    "EXPERT": "Expert",
    "ADVANCED": "Advanced",
    "INTERMEDIATE": "Intermediate",
    "BEGINNER": "Beginner",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _format_date(d: date | None) -> str | None:
    if d is None:
        return None
    return d.strftime("%b %Y")  # e.g. "Jun 2022"


# ---------------------------------------------------------------------------
# Service functions
# ---------------------------------------------------------------------------

async def get_profile(db: AsyncSession) -> ProfileResponse | None:
    result = await db.execute(
        select(Profile).where(Profile.is_active == True).limit(1)
    )
    profile = result.scalars().first()
    if profile is None:
        return None
    return ProfileResponse(
        id=profile.id,
        name=profile.full_name,
        title=profile.title,
        summary=profile.summary,
        location=profile.location,
        linkedinUrl=profile.linkedin_url,
        githubUrl=profile.github_url,
        portfolioUrl=profile.portfolio_url,
    )


async def get_skills(
    db: AsyncSession, category: str | None = None
) -> list[SkillResponse]:
    stmt = select(Skill).order_by(Skill.sort_order, Skill.name)
    if category is not None:
        stmt = stmt.where(Skill.category == category)
    result = await db.execute(stmt)
    skills = result.scalars().all()
    return [
        SkillResponse(
            id=s.id,
            name=s.name,
            category=CATEGORY_MAP.get(s.category.value, s.category.value),
            proficiency=PROFICIENCY_MAP.get(s.proficiency.value, s.proficiency.value),
            yearsOfExp=float(s.years_of_exp),
            isPrimary=s.is_primary,
        )
        for s in skills
    ]


async def get_experiences(db: AsyncSession) -> list[ExperienceResponse]:
    result = await db.execute(
        select(Experience).order_by(Experience.sort_order, Experience.start_date.desc())
    )
    experiences = result.scalars().all()
    return [
        ExperienceResponse(
            id=e.id,
            company=e.company_name,
            title=e.role_title,
            startDate=_format_date(e.start_date),
            endDate=_format_date(e.end_date),
            isCurrent=e.is_current,
            location=e.location,
            summary=e.summary,
            highlights=e.highlights if isinstance(e.highlights, list) else [],
        )
        for e in experiences
    ]


async def get_projects(
    db: AsyncSession, featured_only: bool = False
) -> list[ProjectResponse]:
    stmt = select(Project).order_by(Project.sort_order, Project.name)
    if featured_only:
        stmt = stmt.where(Project.is_featured == True)
    result = await db.execute(stmt)
    projects = result.scalars().all()
    return [
        ProjectResponse(
            id=p.id,
            title=p.name,
            slug=p.slug,
            shortDescription=p.description,
            techStack=p.tech_stack if isinstance(p.tech_stack, list) else [],
            githubUrl=p.github_url,
            demoUrl=p.demo_url,
            isFeatured=p.is_featured,
        )
        for p in projects
    ]


async def get_certifications(db: AsyncSession) -> list[CertificationResponse]:
    result = await db.execute(
        select(Certification)
        .where(Certification.is_active == True)
        .order_by(Certification.sort_order, Certification.issue_date.desc())
    )
    certifications = result.scalars().all()
    return [
        CertificationResponse(
            id=c.id,
            name=c.name,
            issuer=c.issuing_organization,
            issueDate=_format_date(c.issue_date),
            expiryDate=_format_date(c.expiry_date),
            credentialUrl=c.credential_url,
        )
        for c in certifications
    ]
