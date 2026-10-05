from __future__ import annotations

from datetime import datetime
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services import profile as profile_service

router = APIRouter(tags=["profile"])

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.get("/profile")
async def get_profile(db: DbDep) -> dict:
    result = await profile_service.get_profile(db)
    if result is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {
        "data": result.model_dump(),
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }


@router.get("/profile/skills")
async def get_skills(
    db: DbDep,
    category: Optional[str] = Query(default=None, description="Filter by category enum value e.g. AI_ML"),
) -> dict:
    result = await profile_service.get_skills(db, category=category)
    return {
        "data": [s.model_dump() for s in result],
        "meta": {"timestamp": datetime.utcnow().isoformat(), "count": len(result)},
    }


@router.get("/profile/experience")
async def get_experiences(db: DbDep) -> dict:
    result = await profile_service.get_experiences(db)
    return {
        "data": [e.model_dump() for e in result],
        "meta": {"timestamp": datetime.utcnow().isoformat(), "count": len(result)},
    }


@router.get("/profile/projects/featured")
async def get_featured_projects(db: DbDep) -> dict:
    result = await profile_service.get_projects(db, featured_only=True)
    return {
        "data": [p.model_dump() for p in result],
        "meta": {"timestamp": datetime.utcnow().isoformat(), "count": len(result)},
    }


@router.get("/profile/projects")
async def get_projects(db: DbDep) -> dict:
    result = await profile_service.get_projects(db, featured_only=False)
    return {
        "data": [p.model_dump() for p in result],
        "meta": {"timestamp": datetime.utcnow().isoformat(), "count": len(result)},
    }


@router.get("/profile/certifications")
async def get_certifications(db: DbDep) -> dict:
    result = await profile_service.get_certifications(db)
    return {
        "data": [c.model_dump() for c in result],
        "meta": {"timestamp": datetime.utcnow().isoformat(), "count": len(result)},
    }
