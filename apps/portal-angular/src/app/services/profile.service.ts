import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { Profile, Skill, SkillCategory, Experience, Project, Certification } from '../models/profile.model';
import { PROFILE, SKILLS, EXPERIENCES, PROJECTS, CERTIFICATIONS } from '../data/profile.data';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getProfile(): Observable<Profile> {
    return of(PROFILE);
  }

  getSkills(): Observable<Skill[]> {
    return of(SKILLS);
  }

  getSkillsByCategory(): Observable<Record<SkillCategory, Skill[]>> {
    const grouped = SKILLS.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<SkillCategory, Skill[]>);
    return of(grouped);
  }

  getExperiences(): Observable<Experience[]> {
    return of(EXPERIENCES);
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(PROJECTS.filter(p => p.isFeatured));
  }

  getCertifications(): Observable<Certification[]> {
    return of(CERTIFICATIONS);
  }
}
