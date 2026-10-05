from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter

from app.schemas.profile import ContactRequest
from app.services import contact as contact_service

router = APIRouter(tags=["contact"])


@router.post("/contact")
async def submit_contact(body: ContactRequest) -> dict:
    result = await contact_service.submit_contact(body)
    return {
        "data": result.model_dump(),
        "meta": {"timestamp": datetime.utcnow().isoformat()},
    }
