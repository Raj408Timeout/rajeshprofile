import { Component, signal, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { JdService } from '../../services/jd.service'

type PanelState = 'idle' | 'loading' | 'success' | 'error'

@Component({
  selector: 'app-jd-optimizer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Floating toggle button -->
    <button
      (click)="togglePanel()"
      title="Optimize profile for a job description"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347A3.75 3.75 0 0114.25 21h-4.5a3.75 3.75 0 01-2.646-6.397l-.347-.347z" />
      </svg>
      JD Optimizer
    </button>

    <!-- Slide-in panel -->
    @if (isOpen()) {
      <div class="fixed bottom-20 right-6 z-50 w-[420px] max-h-[80vh] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col">

        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 class="text-base font-semibold text-gray-900">Optimize Profile for JD</h2>
            <p class="text-xs text-gray-500 mt-0.5">Claude will reorder your skills and projects to match the role</p>
          </div>
          <button (click)="togglePanel()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <div class="px-5 py-4 flex flex-col gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Job Title <span class="text-red-500">*</span></label>
            <input
              type="text"
              [(ngModel)]="jobTitle"
              placeholder="e.g. Senior AI Engineer"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              [disabled]="state() === 'loading'"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Company <span class="text-gray-400">(optional)</span></label>
            <input
              type="text"
              [(ngModel)]="company"
              placeholder="e.g. Anthropic"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              [disabled]="state() === 'loading'"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Job Description <span class="text-red-500">*</span></label>
            <textarea
              [(ngModel)]="jobDescription"
              placeholder="Paste the full job description here..."
              rows="8"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              [disabled]="state() === 'loading'"
            ></textarea>
          </div>

          <!-- Status message -->
          @if (statusMessage()) {
            <div
              class="text-sm px-3 py-2 rounded-lg"
              [class]="state() === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'"
            >
              {{ statusMessage() }}
            </div>
          }

          <!-- Optimize button -->
          <button
            (click)="optimize()"
            [disabled]="state() === 'loading' || !jobTitle.trim() || !jobDescription.trim()"
            class="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            @if (state() === 'loading') {
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Claude is optimizing...
            } @else {
              Optimize with Claude
            }
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 my-1">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-xs text-gray-400">or</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Reset button -->
          <button
            (click)="reset()"
            [disabled]="state() === 'loading'"
            class="w-full border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset to Original Profile
          </button>
          <p class="text-xs text-gray-400 text-center -mt-1">Restores original skills order, featured projects, and summary</p>
        </div>

      </div>
    }
  `,
})
export class JdOptimizerComponent {
  private jdService = inject(JdService)

  isOpen = signal(false)
  state = signal<PanelState>('idle')
  statusMessage = signal('')

  jobTitle = ''
  company = ''
  jobDescription = ''

  togglePanel() {
    this.isOpen.update(v => !v)
    // Clear status when reopening
    if (this.isOpen()) {
      this.state.set('idle')
      this.statusMessage.set('')
    }
  }

  optimize() {
    if (!this.jobTitle.trim() || !this.jobDescription.trim()) return

    this.state.set('loading')
    this.statusMessage.set('')

    this.jdService.analyzeJd({
      title: this.jobTitle.trim(),
      company: this.company.trim() || undefined,
      description: this.jobDescription.trim(),
    }).subscribe({
      next: (result) => {
        this.state.set('success')
        this.statusMessage.set(`Profile optimized for "${result.title}". Refreshing...`)
        setTimeout(() => window.location.reload(), 1500)
      },
      error: (err) => {
        this.state.set('error')
        const detail = err?.error?.detail ?? 'Something went wrong. Check the API key and try again.'
        this.statusMessage.set(detail)
      },
    })
  }

  reset() {
    if (!confirm('Reset profile to original data? This will undo all JD optimizations.')) return

    this.state.set('loading')
    this.statusMessage.set('')

    this.jdService.resetProfile().subscribe({
      next: () => {
        this.state.set('success')
        this.statusMessage.set('Profile reset. Refreshing...')
        setTimeout(() => window.location.reload(), 1500)
      },
      error: (err) => {
        this.state.set('error')
        const detail = err?.error?.detail ?? 'Reset failed. Try again.'
        this.statusMessage.set(detail)
      },
    })
  }
}
