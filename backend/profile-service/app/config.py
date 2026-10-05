from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    NODE_ENV: str = "development"
    PORT: int = 3001
    DATABASE_URL: str  # required, no default
    ALLOWED_ORIGINS: str = "http://localhost:4200,http://localhost:3000"
    CONTACT_EMAIL_TO: str = ""
    ANTHROPIC_API_KEY: str = ""

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",")]


settings = Settings()
