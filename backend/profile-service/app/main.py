from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import contact, health, jd, profile


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"[profile-service] Starting on port {settings.PORT}")
    yield
    # Shutdown
    from app.database import engine
    await engine.dispose()
    print("[profile-service] Shutdown complete")


app = FastAPI(
    title="Rajesh Profile Service",
    description="REST API for Rajeshkumar Kalaimani's professional profile",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

app.include_router(health.router)
app.include_router(profile.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")
app.include_router(jd.router, prefix="/api/v1")
