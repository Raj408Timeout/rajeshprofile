import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import type { Certification } from '../../models/profile.model';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certifications" class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="mb-16">
          <p class="text-sm font-medium tracking-widest uppercase mb-2" style="color: var(--color-accent);">Credentials</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
          <div class="w-16 h-1 rounded-full" style="background: var(--color-accent);"></div>
        </div>

        <!-- Certifications grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (cert of certifications(); track cert.id; let i = $index) {
            <div class="rounded-xl p-6 flex flex-col card-hover relative overflow-hidden"
                 style="background: var(--color-bg-card); border: 1px solid var(--color-border);">
              <!-- Accent ribbon -->
              <div class="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                   [style]="'background: ' + getCertColor(i) + ';'"></div>

              <div class="pl-3">
                <!-- Icon -->
                <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                     [style]="'background: ' + getCertBg(i) + '; border: 1px solid ' + getCertBorder(i) + ';'">
                  {{ getCertIcon(cert.issuer) }}
                </div>

                <!-- Name -->
                <h3 class="text-base font-semibold text-white mb-2 leading-snug">{{ cert.name }}</h3>

                <!-- Issuer -->
                <p class="text-sm font-medium mb-3" [style]="'color: ' + getCertColor(i) + ';'">{{ cert.issuer }}</p>

                <!-- Dates -->
                <div class="space-y-1 mb-5">
                  <div class="flex items-center gap-2 text-xs" style="color: var(--color-text-secondary);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Issued: {{ cert.issueDate }}
                  </div>
                  <div class="flex items-center gap-2 text-xs" style="color: var(--color-text-secondary);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    {{ cert.expiryDate ? 'Expires: ' + cert.expiryDate : 'Does not expire' }}
                  </div>
                </div>

                <!-- Verify button -->
                <a [href]="cert.credentialUrl" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                   [style]="'color: ' + getCertColor(i) + ';'">
                  Verify Credential
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class CertificationsComponent implements OnInit {
  private profileService = inject(ProfileService);
  readonly certifications = signal<Certification[]>([]);

  private readonly certColors = ['#3b82f6', '#10b981', '#f59e0b'];
  private readonly certBgs = ['rgba(59,130,246,0.1)', 'rgba(16,185,129,0.1)', 'rgba(245,158,11,0.1)'];
  private readonly certBorders = ['rgba(59,130,246,0.2)', 'rgba(16,185,129,0.2)', 'rgba(245,158,11,0.2)'];

  ngOnInit(): void {
    this.profileService.getCertifications().subscribe(certs => {
      this.certifications.set(certs);
    });
  }

  getCertColor(index: number): string {
    return this.certColors[index % this.certColors.length];
  }

  getCertBg(index: number): string {
    return this.certBgs[index % this.certBgs.length];
  }

  getCertBorder(index: number): string {
    return this.certBorders[index % this.certBorders.length];
  }

  getCertIcon(issuer: string): string {
    const icons: Record<string, string> = {
      Microsoft: '🪟',
      Anthropic: '🤖',
      ISTQB: '✅',
    };
    return icons[issuer] ?? '🏆';
  }
}
