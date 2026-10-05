from __future__ import annotations

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.config import settings


def _make_async_url(url: str) -> str:
    """Convert postgresql:// to postgresql+asyncpg:// for async engine."""
    return url.replace("postgresql://", "postgresql+asyncpg://", 1)


engine = create_async_engine(_make_async_url(settings.DATABASE_URL), echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
