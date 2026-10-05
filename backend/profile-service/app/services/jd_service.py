from __future__ import annotations

import json

import anthropic
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.profile import JobDescription, Profile, Project, Skill


async def save_and_optimize(
    title: str,
    company: str | None,
    description: str,
    db: AsyncSession,
) -> dict:
    if not settings.ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY is not set in .env")

    # 1. Deactivate all previous JDs, save the new one
    await db.execute(update(JobDescription).values(is_active=False))

    jd = JobDescription(title=title, company=company, description=description, is_active=True)
    db.add(jd)
    await db.flush()  # gets jd.id without committing

    # 2. Load profile + child data
    profile = (
        await db.execute(select(Profile).where(Profile.is_active == True).limit(1))
    ).scalars().first()

    if not profile:
        raise ValueError("No active profile found in the database")

    skills = (
        await db.execute(select(Skill).where(Skill.profile_id == profile.id))
    ).scalars().all()

    projects = (
        await db.execute(select(Project).where(Project.profile_id == profile.id))
    ).scalars().all()

    # 3. Build the context payload for Claude
    profile_context = {
        "original_summary": profile.summary,
        "skills": [
            {
                "id": s.id,
                "name": s.name,
                "category": s.category.value,
                "proficiency": s.proficiency.value,
                "years_of_exp": float(s.years_of_exp),
            }
            for s in skills
        ],
        "projects": [
            {
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "tech_stack": p.tech_stack,
            }
            for p in projects
        ],
    }

    company_line = f"Company: {company}\n" if company else ""

    # 4. Call Claude — async client, structured JSON output
    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    response = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=(
            "You are a career profile optimizer. Your only job is to reorder and highlight "
            "the most relevant parts of an existing professional profile to match a job description.\n\n"
            "STRICT RULES:\n"
            "- Do NOT invent any new skills, experiences, projects, or qualifications.\n"
            "- The rewritten summary must use ONLY facts already present in original_summary. "
            "You may rearrange sentences and adjust emphasis, but must not add new claims.\n"
            "- Return ONLY valid JSON. No markdown, no explanation."
        ),
        messages=[
            {
                "role": "user",
                "content": (
                    f"Optimize this profile to match the job description.\n\n"
                    f"JOB DESCRIPTION:\n"
                    f"Title: {title}\n"
                    f"{company_line}"
                    f"---\n{description}\n---\n\n"
                    f"CURRENT PROFILE DATA:\n"
                    f"{json.dumps(profile_context, indent=2)}\n\n"
                    f"Return JSON in this exact structure:\n"
                    f'{{\n'
                    f'  "summary": "rewritten summary using ONLY facts from original_summary",\n'
                    f'  "skills": [{{"id": "...", "sort_order": 1, "is_primary": true}}],\n'
                    f'  "projects": [{{"id": "...", "is_featured": true, "sort_order": 1}}]\n'
                    f"}}\n\n"
                    f"Rules:\n"
                    f"- Include ALL {len(skills)} skills. Order by relevance to JD (most relevant = sort_order 1).\n"
                    f"- Mark the top 8 most relevant skills as is_primary: true, rest as false.\n"
                    f"- Include ALL {len(projects)} projects. "
                    f"Set is_featured: true for the 2-3 most relevant to the JD, false for the rest."
                ),
            }
        ],
    )

    # 5. Parse Claude response (strip markdown fences if Claude adds them)
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1]
        if raw.startswith("json"):
            raw = raw[4:]
    result = json.loads(raw.strip())

    # 6. Apply updates to DB — only touch sort_order / is_primary / is_featured / summary
    await db.execute(
        update(Profile)
        .where(Profile.id == profile.id)
        .values(summary=result["summary"])
    )

    for su in result["skills"]:
        await db.execute(
            update(Skill)
            .where(Skill.id == su["id"])
            .values(sort_order=su["sort_order"], is_primary=su["is_primary"])
        )

    for pu in result["projects"]:
        await db.execute(
            update(Project)
            .where(Project.id == pu["id"])
            .values(is_featured=pu["is_featured"], sort_order=pu["sort_order"])
        )

    await db.commit()

    return {"jd_id": str(jd.id), "title": title}


async def get_current_jd(db: AsyncSession) -> dict | None:
    jd = (
        await db.execute(
            select(JobDescription)
            .where(JobDescription.is_active == True)
            .order_by(JobDescription.created_at.desc())
            .limit(1)
        )
    ).scalars().first()

    if not jd:
        return None

    return {
        "id": jd.id,
        "title": jd.title,
        "company": jd.company,
        "description": jd.description,
    }
