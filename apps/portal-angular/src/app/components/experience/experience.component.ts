import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import type { Experience } from '../../models/profile.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Career</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-4 md:left-8 top-0 bottom-0 w-px"
               style="background: linear-gradient(180deg, var(--color-accent), transparent);"></div>

          <div class="space-y-10">
            @for (exp of experiences(); track exp.id; let i = $index) {
              <div class="relative flex gap-8 md:gap-12">
                <!-- Circle dot -->
                <div class="flex-shrink-0 relative z-10">
                  <div class="w-8 h-8 md:w-16 md:h-16 flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full border-2 flex-shrink-0"
                         [style]="exp.isCurrent
                           ? 'background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 12px rgba(59,130,246,0.5);'
                           : 'background: var(--color-bg-card); border-color: #374151;'">
                    </div>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 pb-4">
                  <div class="rounded-xl p-6 card-hover" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
                    <!-- Header -->
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 class="text-lg font-semibold text-white">{{ exp.title }}</h3>
                        <p class="text-base font-medium mt-0.5" style="color: var(--color-accent);">{{ exp.company }}</p>
                      </div>
                      <div class="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          @if (exp.isCurrent) {
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                  style="background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3);">
                              Current
                            </span>
                          }
                          <span class="text-xs px-2.5 py-0.5 rounded-full"
                                style="background: rgba(59,130,246,0.08); color: var(--color-text-secondary); border: 1px solid var(--color-border);">
                            {{ formatDateRange(exp.startDate, exp.endDate, exp.isCurrent) }}
                          </span>
                        </div>
                        <div class="flex items-center gap-1 text-xs" style="color: var(--color-text-tertiary);">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {{ exp.location }}
                        </div>
                      </div>
                    </div>

                    <!-- Summary -->
                    <p class="text-sm mb-4 leading-relaxed" style="color: var(--color-text-secondary);">{{ exp.summary }}</p>

                    <!-- Highlights -->
                    <ul class="space-y-2">
                      @for (highlight of exp.highlights; track highlight) {
                        <li class="flex items-start gap-2 text-sm" style="color: var(--color-text-secondary);">
                          <div class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style="background: var(--color-accent);"></div>
                          {{ highlight }}
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ExperienceComponent implements OnInit {
  private profileService = inject(ProfileService);
  readonly experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.profileService.getExperiences().subscribe(exp => {
      this.experiences.set(exp);
    });
  }

  formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean): string {
    const end = isCurrent ? 'Present' : endDate ?? '';
    return `${startDate} — ${end}`;
  }
}
