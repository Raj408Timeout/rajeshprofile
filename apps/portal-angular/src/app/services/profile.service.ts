import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, map, catchError } from 'rxjs'
import type { Profile, Skill, SkillCategory, Experience, Project, Certification } from '../models/profile.model'
import { PROFILE, SKILLS, EXPERIENCES, PROJECTS, CERTIFICATIONS } from '../data/profile.data'

/** Shape returned by the backend API envelope */
interface ApiResponse<T> {
  data: T
  meta: { timestamp: string }
}

/**
 * ProfileService — data access layer for all profile information.
 *
 * Phase 1: returns static in-memory data via of()
 * Phase 2: calls the Node.js backend API via HttpClient
 *
 * Components never change — only this service switches data source.
 *
 * API base URL reads from the environment. In development, Angular's proxy
 * (proxy.conf.json) forwards /api/* calls to http://localhost:3001.
 * In production, the same path hits the deployed backend.
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient)

  /**
   * Whether to use the live API or fall back to static data.
   * Flip to `true` once the backend is running.
   */
  private readonly useApi = true

  private readonly apiBase = '/api/v1'

  // ─── Public API ────────────────────────────────────────────────────

  getProfile(): Observable<Profile> {
    if (!this.useApi) return of(PROFILE)
    return this.http
      .get<ApiResponse<Profile>>(`${this.apiBase}/profile`)
      .pipe(
        map(res => res.data),
        catchError(() => of(PROFILE)),
      )
  }

  getSkills(): Observable<Skill[]> {
    if (!this.useApi) return of(SKILLS)
    return this.http
      .get<ApiResponse<Skill[]>>(`${this.apiBase}/profile/skills`)
      .pipe(
        map(res => res.data),
        catchError(() => of(SKILLS)),
      )
  }

  getSkillsByCategory(): Observable<Record<SkillCategory, Skill[]>> {
    return this.getSkills().pipe(
      map(skills =>
        skills.reduce(
          (acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = []
            acc[skill.category].push(skill)
            return acc
          },
          {} as Record<SkillCategory, Skill[]>,
        ),
      ),
    )
  }

  getExperiences(): Observable<Experience[]> {
    if (!this.useApi) return of(EXPERIENCES)
    return this.http
      .get<ApiResponse<Experience[]>>(`${this.apiBase}/profile/experience`)
      .pipe(
        map(res => res.data),
        catchError(() => of(EXPERIENCES)),
      )
  }

  getProjects(): Observable<Project[]> {
    if (!this.useApi) return of(PROJECTS)
    return this.http
      .get<ApiResponse<Project[]>>(`${this.apiBase}/profile/projects`)
      .pipe(
        map(res => res.data),
        catchError(() => of(PROJECTS)),
      )
  }

  getFeaturedProjects(): Observable<Project[]> {
    if (!this.useApi) return of(PROJECTS.filter(p => p.isFeatured))
    return this.http
      .get<ApiResponse<Project[]>>(`${this.apiBase}/profile/projects/featured`)
      .pipe(
        map(res => res.data),
        catchError(() => of(PROJECTS.filter(p => p.isFeatured))),
      )
  }

  getCertifications(): Observable<Certification[]> {
    if (!this.useApi) return of(CERTIFICATIONS)
    return this.http
      .get<ApiResponse<Certification[]>>(`${this.apiBase}/profile/certifications`)
      .pipe(
        map(res => res.data),
        catchError(() => of(CERTIFICATIONS)),
      )
  }
}
