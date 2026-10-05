from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict:
    return {
        "data": {"status": "ok", "service": "profile-service"},
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }
