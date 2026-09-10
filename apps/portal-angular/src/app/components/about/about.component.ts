import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">About</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Left: Text -->
          <div class="space-y-5">
            <p class="text-base leading-relaxed" style="color: var(--color-text-secondary);">
              I'm a technology professional specializing in the design and deployment of AI-powered applications
              using large language models. With hands-on expertise in prompt engineering, LLM API integration,
              and AI product strategy, I focus on building production-ready solutions that solve real business problems.
            </p>
            <p class="text-base leading-relaxed" style="color: var(--color-text-secondary);">
              My career bridges enterprise software engineering and emerging AI capabilities. Starting as a QA Engineer
              and growing into a Technical Lead, I developed a deep appreciation for quality, process, and user-centric
              design — skills that now directly inform how I approach AI product management and forward deployment.
            </p>
            <p class="text-base leading-relaxed" style="color: var(--color-text-secondary);">
              Today, I work at the intersection of enterprise software requirements and AI — translating complex
              client needs into LLM-powered features using Anthropic Claude, managing token budgets for cost
              efficiency, and acting as the technical bridge between stakeholders and engineering teams.
            </p>

            <!-- Highlights -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              @for (item of highlights; track item.label) {
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: var(--color-accent);"></div>
                  <span class="text-sm" style="color: var(--color-text-secondary);">{{ item.label }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: Stats + What I Do -->
          <div class="space-y-6">
            <!-- Stats grid -->
            <div class="grid grid-cols-2 gap-4">
              @for (stat of stats; track stat.label) {
                <div class="rounded-xl p-5 card-hover" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
                  <div class="text-3xl font-bold mb-1" style="color: var(--color-accent);">{{ stat.value }}</div>
                  <div class="text-sm font-medium text-white">{{ stat.label }}</div>
                  <div class="text-xs mt-0.5" style="color: var(--color-text-tertiary);">{{ stat.sub }}</div>
                </div>
              }
            </div>

            <!-- What I Do -->
            <div class="rounded-xl p-5" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <h3 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">What I Do</h3>
              <div class="space-y-4">
                @for (item of whatIDo; track item.title) {
                  <div class="flex items-start gap-3">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                         [style]="'background: ' + item.bgColor + '; border: 1px solid ' + item.borderColor + ';'">
                      {{ item.icon }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-white">{{ item.title }}</div>
                      <div class="text-xs mt-0.5" style="color: var(--color-text-tertiary);">{{ item.desc }}</div>
                    </div>
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
export class AboutComponent {
  readonly stats = [
    { value: '8+', label: 'Years Experience', sub: 'Software & AI Engineering' },
    { value: '3+', label: 'AI Projects', sub: 'Production LLM Solutions' },
    { value: '3', label: 'Certifications', sub: 'Microsoft, Anthropic, ISTQB' },
    { value: '2', label: 'Cloud Platforms', sub: 'Azure & GCP' },
  ];

  readonly highlights = [
    { label: 'LLM Application Development' },
    { label: 'Prompt Engineering' },
    { label: 'AI Product Strategy' },
    { label: 'Enterprise Software QA' },
    { label: 'Angular & TypeScript' },
    { label: 'Microsoft Azure' },
  ];

  readonly whatIDo = [
    {
      icon: '🤖',
      title: 'AI Engineering',
      desc: 'Design and deploy LLM-powered features using Claude API with prompt frameworks',
      bgColor: 'rgba(59,130,246,0.1)',
      borderColor: 'rgba(59,130,246,0.2)',
    },
    {
      icon: '📋',
      title: 'Product Management',
      desc: 'Lead AI product discovery, roadmap planning, and stakeholder alignment',
      bgColor: 'rgba(16,185,129,0.1)',
      borderColor: 'rgba(16,185,129,0.2)',
    },
    {
      icon: '✅',
      title: 'Enterprise QA',
      desc: 'Test automation frameworks, quality processes, and SDLC best practices',
      bgColor: 'rgba(245,158,11,0.1)',
      borderColor: 'rgba(245,158,11,0.2)',
    },
  ];
}
