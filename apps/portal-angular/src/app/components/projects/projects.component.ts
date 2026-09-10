import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import type { Project } from '../../models/profile.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-24" style="background: rgba(17,24,39,0.4);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Work</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Projects</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <!-- Projects grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (project of projects(); track project.id) {
            <div class="rounded-xl p-6 flex flex-col card-hover relative overflow-hidden"
                 style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <!-- Featured badge -->
              @if (project.isFeatured) {
                <div class="absolute top-0 right-0">
                  <div class="text-xs font-semibold px-3 py-1 rounded-bl-lg"
                       style="background: rgba(59,130,246,0.2); color: #60a5fa; border-left: 1px solid rgba(59,130,246,0.3); border-bottom: 1px solid rgba(59,130,246,0.3);">
                    Featured
                  </div>
                </div>
              }

              <!-- Card content -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-2 pr-16">{{ project.title }}</h3>
                <p class="text-sm leading-relaxed mb-4" style="color: var(--color-text-secondary);">
                  {{ project.shortDescription }}
                </p>

                <!-- Tech stack -->
                <div class="flex flex-wrap gap-2 mb-5">
                  @for (tech of project.techStack; track tech) {
                    <span class="text-xs px-2.5 py-1 rounded-full font-medium"
                          style="background: rgba(59,130,246,0.1); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2);">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>

              <!-- Links -->
              <div class="flex items-center gap-3 pt-4 border-t" style="border-color: var(--color-border);">
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer"
                     class="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
                     style="color: var(--color-text-secondary);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                } @else {
                  <span class="flex items-center gap-2 text-sm" style="color: var(--color-text-tertiary);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    Internal Project
                  </span>
                }

                @if (project.demoUrl) {
                  <a [href]="project.demoUrl" target="_blank" rel="noopener noreferrer"
                     class="flex items-center gap-1.5 text-sm font-medium ml-auto transition-colors duration-200"
                     style="color: var(--color-accent);">
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                }
              </div>
            </div>
          }
        </div>

        <!-- View all on GitHub -->
        <div class="mt-10 text-center">
          <a href="https://github.com/rajeshkumarkalaimani" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
             style="background: var(--color-bg-card); color: var(--color-text-secondary); border: 1px solid var(--color-border);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ProjectsComponent implements OnInit {
  private profileService = inject(ProfileService);
  readonly projects = signal<Project[]>([]);

  ngOnInit(): void {
    this.profileService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }
}
