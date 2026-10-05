from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, field_validator


class JDAnalyzeRequest(BaseModel):
    title: str
    company: Optional[str] = None
    description: str

    model_config = {"str_strip_whitespace": True}

    @field_validator("title")
    @classmethod
    def title_min_length(cls, v: str) -> str:
        if len(v) < 3:
            raise ValueError("title must be at least 3 characters")
        return v

    @field_validator("description")
    @classmethod
    def description_min_length(cls, v: str) -> str:
        if len(v) < 50:
            raise ValueError("description must be at least 50 characters")
        return v


class JDCurrentResponse(BaseModel):
    id: str
    title: str
    company: Optional[str] = None
    description: str
