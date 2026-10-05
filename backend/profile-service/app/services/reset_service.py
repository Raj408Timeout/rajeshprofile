from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession


async def reset_to_seed(db: AsyncSession) -> None:
    """Reset profile to original seed data. Imports seed_database from seed.py at project root."""
    from seed import seed_database  # seed.py lives at backend/profile-service/ root, in sys.path
    await seed_database(db)
