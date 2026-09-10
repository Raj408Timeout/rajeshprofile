import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative min-h-screen flex items-center grid-pattern overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
             style="background: radial-gradient(circle, #3b82f6, transparent);"></div>
        <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
             style="background: radial-gradient(circle, #10b981, transparent);"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Left: Text content -->
          <div class="flex-1 text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-sm font-medium"
                 style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10b981;">
              <span class="w-2 h-2 rounded-full dot-pulse" style="background: #10b981;"></span>
              Open to Opportunities
            </div>

            <!-- Hi I'm -->
            <p class="text-lg font-medium mb-2" style="color: var(--color-text-secondary);">Hi, I'm</p>

            <!-- Name -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Rajeshkumar<br class="hidden sm:block" />
              <span style="color: var(--color-accent);">Kalaimani</span>
            </h1>

            <!-- Animated title -->
            <div class="h-10 mb-6 overflow-hidden">
              <div class="text-xl md:text-2xl font-semibold transition-all duration-500"
                   [class.opacity-0]="titleChanging()"
                   [class.opacity-100]="!titleChanging()"
                   style="color: var(--color-text-secondary);">
                {{ currentTitle() }}
              </div>
            </div>

            <!-- Summary -->
            <p class="text-base max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed" style="color: var(--color-text-secondary);">
              Technology professional specializing in AI-powered applications using large language models,
              with hands-on expertise in prompt engineering, LLM API integration, and AI product strategy.
            </p>

            <!-- Location -->
            <p class="text-sm mb-8" style="color: var(--color-text-tertiary);">
              📍 India
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-8 justify-center lg:justify-start">
              <a href="#projects"
                 class="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 text-sm"
                 style="background: var(--color-accent);"
                 (click)="scrollTo($event, 'projects')">
                View My Work
              </a>
              <a href="#resume"
                 class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
                 style="color: var(--color-accent); border: 1px solid var(--color-accent); background: transparent;"
                 (click)="scrollTo($event, 'resume')">
                View Resume
              </a>
            </div>

            <!-- Social links -->
            <div class="flex items-center gap-4 justify-center lg:justify-start">
              <a href="https://github.com/rajeshkumarkalaimani" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
                 style="color: var(--color-text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <span style="color: var(--color-border);">|</span>
              <a href="https://linkedin.com/in/rajeshkumarkalaimani" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
                 style="color: var(--color-text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <!-- Right: Terminal block -->
          <div class="flex-1 max-w-md w-full lg:max-w-lg">
            <div class="rounded-xl overflow-hidden shadow-2xl"
                 style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <!-- Terminal header -->
              <div class="flex items-center gap-2 px-4 py-3" style="background: #1a2234; border-bottom: 1px solid var(--color-border);">
                <div class="w-3 h-3 rounded-full" style="background: #ef4444;"></div>
                <div class="w-3 h-3 rounded-full" style="background: #f59e0b;"></div>
                <div class="w-3 h-3 rounded-full" style="background: #10b981;"></div>
                <span class="ml-3 text-xs font-mono" style="color: var(--color-text-tertiary);">rajesh.ts</span>
              </div>
              <!-- Terminal content — spaces are inside spans to prevent Angular whitespace stripping -->
              <div class="p-5 font-mono text-sm leading-relaxed">
                <p style="color: #6b7280;">// AI Engineer profile</p>
                <p class="mt-2">
                  <span style="color: #c084fc;">const </span><span style="color: #f9fafb;">rajesh </span><span style="color: #9ca3af;">= </span><span style="color: #f59e0b;">&#123;</span>
                </p>
                <div class="ml-4">
                  <p><span style="color: #60a5fa;">role</span><span style="color: #9ca3af;">: </span><span style="color: #34d399;">"Forward Deployed Engineer"</span><span style="color: #9ca3af;">,</span></p>
                  <p class="mt-1"><span style="color: #60a5fa;">skills</span><span style="color: #9ca3af;">: </span><span style="color: #f59e0b;">[</span></p>
                  <div class="ml-4">
                    <p><span style="color: #34d399;">"LLM Applications"</span><span style="color: #9ca3af;">,</span></p>
                    <p><span style="color: #34d399;">"Prompt Engineering"</span><span style="color: #9ca3af;">,</span></p>
                    <p><span style="color: #34d399;">"Angular + TypeScript"</span><span style="color: #9ca3af;">,</span></p>
                    <p><span style="color: #34d399;">"Microsoft Azure"</span></p>
                  </div>
                  <p><span style="color: #f59e0b;">]</span><span style="color: #9ca3af;">,</span></p>
                  <p class="mt-1"><span style="color: #60a5fa;">currentFocus</span><span style="color: #9ca3af;">: </span><span style="color: #34d399;">"Building AI-powered products"</span><span style="color: #9ca3af;">,</span></p>
                  <p class="mt-1"><span style="color: #60a5fa;">available</span><span style="color: #9ca3af;">: </span><span style="color: #c084fc;">true</span></p>
                </div>
                <p><span style="color: #f59e0b;">&#125;</span><span style="color: #9ca3af;">;</span></p>
                <p class="mt-3" style="color: #9ca3af;">
                  <span>&gt; </span><span style="color: #34d399;">rajesh</span><span>.</span><span style="color: #60a5fa;">connect</span><span style="color: #f59e0b;">()</span><span class="cursor-blink inline-block w-0.5 h-4 align-middle ml-1" style="background: #3b82f6;"></span>
                </p>
              </div>
            </div>

            <!-- Stats row below terminal -->
            <div class="grid grid-cols-3 gap-3 mt-4">
              <div class="rounded-lg p-3 text-center" style="background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15);">
                <div class="text-2xl font-bold text-white">8+</div>
                <div class="text-xs mt-0.5" style="color: var(--color-text-tertiary);">Years Exp</div>
              </div>
              <div class="rounded-lg p-3 text-center" style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.15);">
                <div class="text-2xl font-bold text-white">3+</div>
                <div class="text-xs mt-0.5" style="color: var(--color-text-tertiary);">AI Projects</div>
              </div>
              <div class="rounded-lg p-3 text-center" style="background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.15);">
                <div class="text-2xl font-bold text-white">3</div>
                <div class="text-xs mt-0.5" style="color: var(--color-text-tertiary);">Certs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div class="text-xs" style="color: var(--color-text-tertiary);">Scroll to explore</div>
        <div class="w-5 h-8 rounded-full border flex items-start justify-center p-1" style="border-color: var(--color-border);">
          <div class="w-1 h-2 rounded-full" style="background: var(--color-accent); animation: bounce 2s infinite;"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }
  `],
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly titles = [
    'Forward Deployed Engineer',
    'AI Product Manager',
    'LLM Solutions Architect',
    'Prompt Engineer',
  ];

  readonly currentTitle = signal(this.titles[0]);
  readonly titleChanging = signal(false);

  private titleIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.titleChanging.set(true);
      setTimeout(() => {
        this.titleIndex = (this.titleIndex + 1) % this.titles.length;
        this.currentTitle.set(this.titles[this.titleIndex]);
        this.titleChanging.set(false);
      }, 400);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
