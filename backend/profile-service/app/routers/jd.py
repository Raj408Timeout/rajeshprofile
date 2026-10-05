from __future__ import annotations

from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.jd import JDAnalyzeRequest, JDCurrentResponse
from app.services import jd_service, reset_service

router = APIRouter(prefix="/jd", tags=["jd"])

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.post("/analyze")
async def analyze_jd(request: JDAnalyzeRequest, db: DbDep) -> dict:
    try:
        result = await jd_service.save_and_optimize(
            title=request.title,
            company=request.company,
            description=request.description,
            db=db,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Claude optimization failed: {e}")

    return {
        "data": result,
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }


@router.get("/current")
async def get_current_jd(db: DbDep) -> dict:
    result = await jd_service.get_current_jd(db)
    return {
        "data": result,
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }


@router.post("/reset")
async def reset_profile(db: DbDep) -> dict:
    try:
        await reset_service.reset_to_seed(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reset failed: {e}")

    return {
        "data": {"message": "Profile reset to original seed data"},
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }
