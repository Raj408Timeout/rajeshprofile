import { Component, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Scroll progress bar -->
    <div class="scroll-progress" [style.width.%]="scrollProgress()"></div>

    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         [class.py-4]="!isScrolled()"
         [class.py-2]="isScrolled()"
         [style]="isScrolled() ? 'background: rgba(10,15,30,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);' : 'background: transparent;'">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="#" class="flex items-center gap-2 group">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white transition-all duration-200 group-hover:scale-105"
                 style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
              RK
            </div>
            <span class="hidden sm:block font-semibold text-sm" style="color: var(--color-text-secondary);">
              Rajeshkumar K.
            </span>
          </a>

          <!-- Desktop nav links -->
          <div class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.id) {
              <a [href]="'#' + link.id"
                 class="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                 [class.text-white]="activeSection() === link.id"
                 [style]="activeSection() === link.id
                   ? 'color: white; background: rgba(59,130,246,0.15);'
                   : 'color: var(--color-text-secondary);'"
                 (click)="scrollToSection($event, link.id)">
                {{ link.label }}
              </a>
            }
          </div>

          <!-- Right: Hire Me + Hamburger -->
          <div class="flex items-center gap-3">
            <a href="#contact"
               class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
               style="background: var(--color-accent);"
               (click)="scrollToSection($event, 'contact')">
              Hire Me
            </a>

            <!-- Hamburger -->
            <button class="md:hidden p-2 rounded-md transition-colors duration-200"
                    style="color: var(--color-text-secondary);"
                    (click)="toggleMobileMenu()"
                    aria-label="Toggle mobile menu">
              @if (!mobileMenuOpen()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              }
            </button>
          </div>
        </div>

        <!-- Mobile nav menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden mt-3 pb-3 border-t" style="border-color: var(--color-border);">
            <div class="flex flex-col gap-1 pt-3">
              @for (link of navLinks; track link.id) {
                <a [href]="'#' + link.id"
                   class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                   [style]="activeSection() === link.id
                     ? 'color: var(--color-accent); background: rgba(59,130,246,0.1);'
                     : 'color: var(--color-text-secondary);'"
                   (click)="mobileNavClick($event, link.id)">
                  {{ link.label }}
                </a>
              }
              <a href="#contact"
                 class="mt-2 px-3 py-2 rounded-lg text-sm font-semibold text-white text-center"
                 style="background: var(--color-accent);"
                 (click)="mobileNavClick($event, 'contact')">
                Hire Me
              </a>
            </div>
          </div>
        }
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly isScrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly activeSection = signal('');
  readonly scrollProgress = signal(0);

  readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.setupIntersectionObserver();
    this.updateScrollProgress();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
    this.updateScrollProgress();
  }

  private updateScrollProgress(): void {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    this.scrollProgress.set(Math.min(100, Math.max(0, progress)));
  }

  private setupIntersectionObserver(): void {
    const options = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    this.navLinks.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) this.observer!.observe(el);
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  mobileNavClick(event: Event, sectionId: string): void {
    this.mobileMenuOpen.set(false);
    this.scrollToSection(event, sectionId);
  }
}
