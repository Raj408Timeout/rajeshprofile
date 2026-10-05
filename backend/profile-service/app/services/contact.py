from __future__ import annotations

import logging

from app.schemas.profile import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)


async def submit_contact(data: ContactRequest) -> ContactResponse:
    logger.info(
        "[CONTACT] New submission from: %s <%s> — Subject: %s",
        data.name,
        data.email,
        data.subject or "N/A",
    )
    logger.info("[CONTACT] Message: %s...", data.message[:100])
    return ContactResponse(
        success=True,
        message="Message received. Will respond within 48 hours.",
    )
