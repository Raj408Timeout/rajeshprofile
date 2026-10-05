from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, field_validator


class ProfileResponse(BaseModel):
    id: str
    name: str           # maps from full_name
    title: str
    summary: str
    location: Optional[str] = None
    linkedinUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    portfolioUrl: Optional[str] = None

    model_config = {"from_attributes": True}


class SkillResponse(BaseModel):
    id: str
    name: str
    category: str       # display string e.g. 'AI/ML' not 'AI_ML'
    proficiency: str    # display string e.g. 'Expert' not 'EXPERT'
    yearsOfExp: float
    isPrimary: bool

    model_config = {"from_attributes": True}


class ExperienceResponse(BaseModel):
    id: str
    company: str        # maps from company_name
    title: str          # maps from role_title
    startDate: str      # formatted: 'Jun 2022'
    endDate: Optional[str] = None   # formatted or null
    isCurrent: bool
    location: Optional[str] = None
    summary: str
    highlights: list[str]

    model_config = {"from_attributes": True}


class ProjectResponse(BaseModel):
    id: str
    title: str              # maps from name
    slug: str
    shortDescription: str   # maps from description
    techStack: list[str]
    githubUrl: Optional[str] = None
    demoUrl: Optional[str] = None
    isFeatured: bool

    model_config = {"from_attributes": True}


class CertificationResponse(BaseModel):
    id: str
    name: str
    issuer: str         # maps from issuing_organization
    issueDate: str      # formatted: 'Apr 2023'
    expiryDate: Optional[str] = None
    credentialUrl: Optional[str] = None

    model_config = {"from_attributes": True}


class ContactRequest(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str

    model_config = {"str_strip_whitespace": True}

    @field_validator("name")
    @classmethod
    def name_min_length(cls, v: str) -> str:
        if len(v) < 2:
            raise ValueError("name must be at least 2 characters")
        return v

    @field_validator("message")
    @classmethod
    def message_min_length(cls, v: str) -> str:
        if len(v) < 20:
            raise ValueError("message must be at least 20 characters")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
