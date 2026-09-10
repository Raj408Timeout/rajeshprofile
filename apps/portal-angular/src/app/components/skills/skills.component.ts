import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import type { Skill, SkillCategory, Proficiency } from '../../models/profile.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-24" style="background: rgba(17,24,39,0.4);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-12">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Expertise</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <!-- Category filter tabs -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            [style]="selectedCategory() === null
              ? 'background: var(--color-accent); color: white;'
              : 'background: var(--color-bg-card); color: var(--color-text-secondary); border: 1px solid var(--color-border);'"
            (click)="selectedCategory.set(null)">
            All
          </button>
          @for (cat of categories; track cat) {
            <button
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              [style]="selectedCategory() === cat
                ? 'background: var(--color-accent); color: white;'
                : 'background: var(--color-bg-card); color: var(--color-text-secondary); border: 1px solid var(--color-border);'"
              (click)="selectedCategory.set(cat)">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Skills grid by category -->
        <div class="space-y-8">
          @for (cat of visibleCategories(); track cat) {
            <div class="rounded-xl p-6" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <h3 class="text-sm font-semibold uppercase tracking-wider mb-5 flex items-center gap-2"
                  style="color: var(--color-text-secondary);">
                <span class="w-2 h-2 rounded-full" style="background: var(--color-accent);"></span>
                {{ cat }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                @for (skill of getSkillsForCategory(cat); track skill.id) {
                  <div class="rounded-lg p-3 transition-all duration-200 hover:border-blue-500/40"
                       style="background: rgba(10,15,30,0.6); border: 1px solid var(--color-border);">
                    <div class="flex items-start justify-between mb-2">
                      <span class="text-sm font-medium text-white leading-tight">{{ skill.name }}</span>
                      <span class="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-1"
                            [style]="getProficiencyStyle(skill.proficiency)">
                        {{ skill.proficiency }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <!-- Dots -->
                      <div class="flex items-center gap-1">
                        @for (dot of [1,2,3,4]; track dot) {
                          <div class="w-2 h-2 rounded-full transition-all"
                               [style]="dot <= getProficiencyLevel(skill.proficiency)
                                 ? 'background: ' + getProficiencyColor(skill.proficiency) + ';'
                                 : 'background: var(--color-border);'">
                          </div>
                        }
                      </div>
                      <span class="text-xs" style="color: var(--color-text-tertiary);">{{ skill.yearsOfExp }}yr</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class SkillsComponent implements OnInit {
  private profileService = inject(ProfileService);

  readonly selectedCategory = signal<SkillCategory | null>(null);
  readonly allSkills = signal<Skill[]>([]);

  readonly categories: SkillCategory[] = ['AI/ML', 'Frontend', 'Backend', 'Cloud', 'Databases', 'DevOps', 'Enterprise'];

  readonly visibleCategories = computed<SkillCategory[]>(() => {
    const sel = this.selectedCategory();
    return sel ? [sel] : this.categories;
  });

  ngOnInit(): void {
    this.profileService.getSkills().subscribe(skills => {
      this.allSkills.set(skills);
    });
  }

  getSkillsForCategory(category: SkillCategory): Skill[] {
    return this.allSkills().filter(s => s.category === category);
  }

  getProficiencyLevel(proficiency: Proficiency): number {
    const map: Record<Proficiency, number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
    return map[proficiency];
  }

  getProficiencyColor(proficiency: Proficiency): string {
    const map: Record<Proficiency, string> = {
      Expert: '#3b82f6',
      Advanced: '#10b981',
      Intermediate: '#f59e0b',
      Beginner: '#6b7280',
    };
    return map[proficiency];
  }

  getProficiencyStyle(proficiency: Proficiency): string {
    const styles: Record<Proficiency, string> = {
      Expert: 'background: rgba(59,130,246,0.15); color: #60a5fa;',
      Advanced: 'background: rgba(16,185,129,0.15); color: #34d399;',
      Intermediate: 'background: rgba(245,158,11,0.15); color: #fbbf24;',
      Beginner: 'background: rgba(107,114,128,0.15); color: #9ca3af;',
    };
    return styles[proficiency];
  }
}
