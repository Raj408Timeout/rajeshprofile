import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Contact</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left: Contact info -->
          <div>
            <p class="text-base mb-8 leading-relaxed" style="color: var(--color-text-secondary);">
              I'm open to new opportunities, collaborations, and conversations about AI, product engineering,
              or enterprise software. Whether you have a project in mind or just want to connect — feel free to reach out.
            </p>

            <div class="space-y-5">
              @for (item of contactItems; track item.label) {
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2);">
                    <span [innerHTML]="item.iconSvg" style="color: var(--color-accent); width: 18px; height: 18px; display: flex;"></span>
                  </div>
                  <div>
                    <div class="text-xs uppercase tracking-wider mb-0.5" style="color: var(--color-text-tertiary);">{{ item.label }}</div>
                    @if (item.href) {
                      <a [href]="item.href" target="_blank" rel="noopener noreferrer"
                         class="text-sm font-medium transition-colors duration-200 hover:text-white"
                         style="color: var(--color-text-secondary);">
                        {{ item.value }}
                      </a>
                    } @else {
                      <span class="text-sm font-medium" style="color: var(--color-text-secondary);">{{ item.value }}</span>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Availability badge -->
            <div class="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                 style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);">
              <span class="w-2 h-2 rounded-full dot-pulse" style="background: #10b981;"></span>
              <span class="text-sm font-medium" style="color: #10b981;">Available for new opportunities</span>
            </div>
          </div>

          <!-- Right: Contact form -->
          <div class="rounded-xl p-6" style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
            @if (submitSuccess()) {
              <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                     style="background: rgba(16,185,129,0.15);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                       stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                <p class="text-sm" style="color: var(--color-text-secondary);">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button class="mt-6 text-sm font-medium" style="color: var(--color-accent);"
                        (click)="resetForm()">
                  Send another message
                </button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4" novalidate>
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium mb-1.5" style="color: var(--color-text-secondary);">
                    Name <span style="color: #ef4444;">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="Your full name"
                    class="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    style="background: rgba(10,15,30,0.8); border: 1px solid var(--color-border);"
                    [style.border-color]="getFieldError('name') ? '#ef4444' : undefined"
                  />
                  @if (getFieldError('name')) {
                    <p class="mt-1.5 text-xs" style="color: #f87171;">{{ getFieldError('name') }}</p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium mb-1.5" style="color: var(--color-text-secondary);">
                    Email <span style="color: #ef4444;">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="your@email.com"
                    class="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    style="background: rgba(10,15,30,0.8); border: 1px solid var(--color-border);"
                    [style.border-color]="getFieldError('email') ? '#ef4444' : undefined"
                  />
                  @if (getFieldError('email')) {
                    <p class="mt-1.5 text-xs" style="color: #f87171;">{{ getFieldError('email') }}</p>
                  }
                </div>

                <!-- Subject -->
                <div>
                  <label for="subject" class="block text-sm font-medium mb-1.5" style="color: var(--color-text-secondary);">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    formControlName="subject"
                    placeholder="What's this about?"
                    class="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    style="background: rgba(10,15,30,0.8); border: 1px solid var(--color-border);"
                  />
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-medium mb-1.5" style="color: var(--color-text-secondary);">
                    Message <span style="color: #ef4444;">*</span>
                  </label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="4"
                    placeholder="Tell me about your project or idea... (min 20 characters)"
                    class="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 resize-none"
                    style="background: rgba(10,15,30,0.8); border: 1px solid var(--color-border);"
                    [style.border-color]="getFieldError('message') ? '#ef4444' : undefined"
                  ></textarea>
                  @if (getFieldError('message')) {
                    <p class="mt-1.5 text-xs" style="color: #f87171;">{{ getFieldError('message') }}</p>
                  }
                  <p class="mt-1 text-xs text-right" style="color: var(--color-text-tertiary);">
                    {{ contactForm.get('message')?.value?.length ?? 0 }} characters
                  </p>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style="background: var(--color-accent);"
                  [disabled]="contactForm.invalid || isSubmitting()">
                  @if (isSubmitting()) {
                    <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Sending...
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  }
                </button>

                <p class="text-xs text-center" style="color: var(--color-text-tertiary);">
                  Phase 1 uses client-side logging only. Email integration arrives in Phase 2.
                </p>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    input:focus, textarea:focus {
      border-color: var(--color-accent) !important;
      box-shadow: 0 0 0 2px rgba(59,130,246,0.15);
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `],
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly contactItems = [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/rajeshkumarkalaimani',
      href: 'https://linkedin.com/in/rajeshkumarkalaimani',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    {
      label: 'GitHub',
      value: 'github.com/rajeshkumarkalaimani',
      href: 'https://github.com/rajeshkumarkalaimani',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
    },
    {
      label: 'Location',
      value: 'India',
      href: null,
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    },
  ];

  getFieldError(fieldName: string): string | null {
    const control = this.contactForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return null;

    if (control.errors['required']) return `${this.capitalize(fieldName)} is required.`;
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Must be at least ${min} characters.`;
    }
    if (control.errors['email']) return 'Please enter a valid email address.';
    return null;
  }

  private capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Phase 1: log to console, simulate network delay
    setTimeout(() => {
      console.log('[Phase 1 Contact Form] Submission:', this.contactForm.value);
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
    }, 1000);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitSuccess.set(false);
  }
}
