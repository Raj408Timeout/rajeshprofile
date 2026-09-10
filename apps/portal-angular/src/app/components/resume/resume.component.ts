import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  standalone: true,
  template: `
    <section id="resume" class="py-24" style="background: rgba(17,24,39,0.4);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Resume</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Resume</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <!-- Resume preview -->
          <div class="lg:col-span-3">
            <div class="rounded-xl overflow-hidden shadow-2xl" style="border: 1px solid var(--color-border);">
              <!-- Preview header bar -->
              <div class="flex items-center gap-2 px-4 py-3" style="background: #1a2234; border-bottom: 1px solid var(--color-border);">
                <div class="w-3 h-3 rounded-full" style="background: #ef4444;"></div>
                <div class="w-3 h-3 rounded-full" style="background: #f59e0b;"></div>
                <div class="w-3 h-3 rounded-full" style="background: #10b981;"></div>
                <span class="ml-3 text-xs font-mono" style="color: var(--color-text-tertiary);">Rajeshkumar_Kalaimani_Resume.pdf</span>
              </div>

              <!-- Mini resume content -->
              <div class="p-6 space-y-5" style="background: var(--color-bg-card);">
                <!-- Name block -->
                <div class="pb-4 border-b" style="border-color: var(--color-border);">
                  <h3 class="text-2xl font-bold text-white">Rajeshkumar Kalaimani</h3>
                  <p class="text-sm mt-1" style="color: var(--color-accent);">Forward Deployed Engineer | AI Product Manager | LLM Solutions Architect</p>
                  <div class="flex flex-wrap items-center gap-4 mt-2 text-xs" style="color: var(--color-text-secondary);">
                    <span>📍 India</span>
                    <span>🔗 linkedin.com/in/rajeshkumarkalaimani</span>
                    <span>💻 github.com/rajeshkumarkalaimani</span>
                  </div>
                </div>

                <!-- Summary snippet -->
                <div>
                  <h4 class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--color-accent);">Summary</h4>
                  <p class="text-xs leading-relaxed" style="color: var(--color-text-secondary);">
                    Technology professional specializing in AI-powered applications using LLMs, with expertise in
                    prompt engineering, LLM API integration, and AI product strategy...
                  </p>
                </div>

                <!-- Experience snippet -->
                <div>
                  <h4 class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--color-accent);">Experience</h4>
                  <div class="space-y-3">
                    <div>
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="text-xs font-semibold text-white">AI Product Manager / Forward Deployed Engineer</p>
                          <p class="text-xs" style="color: var(--color-text-secondary);">Technology Consulting Services</p>
                        </div>
                        <span class="text-xs" style="color: var(--color-text-tertiary);">Jun 2022 — Present</span>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="text-xs font-semibold text-white">Senior QA Engineer / Technical Lead</p>
                          <p class="text-xs" style="color: var(--color-text-secondary);">Enterprise Software Firm</p>
                        </div>
                        <span class="text-xs" style="color: var(--color-text-tertiary);">Mar 2018 — May 2022</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Skills snippet -->
                <div>
                  <h4 class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--color-accent);">Key Skills</h4>
                  <div class="flex flex-wrap gap-1.5">
                    @for (skill of previewSkills; track skill) {
                      <span class="text-xs px-2 py-0.5 rounded"
                            style="background: rgba(59,130,246,0.1); color: #93c5fd;">
                        {{ skill }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Blur overlay -->
                <div class="absolute bottom-6 left-6 right-6 h-16 rounded-b-xl pointer-events-none"
                     style="background: linear-gradient(transparent, var(--color-bg-card));"></div>
              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="lg:col-span-2 space-y-5">
            <div class="rounded-xl p-6" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <h3 class="text-base font-semibold text-white mb-4">Get My Resume</h3>

              <!-- Download PDF button (disabled) -->
              <div class="relative group mb-4">
                <button
                  disabled
                  class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold cursor-not-allowed opacity-50"
                  style="background: var(--color-accent); color: white;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
                <div class="mt-2 text-xs text-center" style="color: var(--color-text-tertiary);">
                  Coming in Phase 4 — AI Resume Generation
                </div>
              </div>

              <!-- LinkedIn -->
              <a href="https://linkedin.com/in/rajeshkumarkalaimani"
                 target="_blank" rel="noopener noreferrer"
                 class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                 style="background: #0077b5; color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                View Full Profile on LinkedIn
              </a>
            </div>

            <!-- Phase roadmap card -->
            <div class="rounded-xl p-5" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <h4 class="text-xs font-semibold uppercase tracking-wider mb-4" style="color: var(--color-text-secondary);">Phase Roadmap</h4>
              <div class="space-y-3">
                @for (phase of roadmap; track phase.label) {
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full flex-shrink-0" [style]="'background: ' + phase.color + ';'"></div>
                    <div class="flex-1">
                      <div class="text-xs font-medium text-white">{{ phase.label }}</div>
                      <div class="text-xs" style="color: var(--color-text-tertiary);">{{ phase.desc }}</div>
                    </div>
                    <span class="text-xs px-2 py-0.5 rounded-full"
                          [style]="phase.active ? 'background: rgba(16,185,129,0.15); color: #10b981;' : 'background: rgba(107,114,128,0.1); color: var(--color-text-tertiary);'">
                      {{ phase.active ? 'Active' : 'Planned' }}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ResumeComponent {
  readonly previewSkills = [
    'LLM Applications', 'Prompt Engineering', 'Claude API', 'Angular', 'TypeScript',
    'Python', 'Azure', 'REST APIs', 'AI Product Management',
  ];

  readonly roadmap = [
    { label: 'Phase 1 — Static Profile', desc: 'Angular portal with static data', color: '#10b981', active: true },
    { label: 'Phase 2 — Backend API', desc: 'Node.js + PostgreSQL REST API', color: '#3b82f6', active: false },
    { label: 'Phase 3 — JD Analyzer', desc: 'AI-powered job description matching', color: '#f59e0b', active: false },
    { label: 'Phase 4 — AI Resume Gen', desc: 'Claude-powered resume generation', color: '#8b5cf6', active: false },
  ];
}
