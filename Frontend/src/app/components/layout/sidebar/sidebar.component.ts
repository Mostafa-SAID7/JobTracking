import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside [class.hidden]="!isOpen" 
           class="fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 md:translate-x-0"
           [class.translate-x-0]="isOpen"
           [class.translate-x-full]="!isOpen">
      
      <!-- Close button for mobile -->
      <button (click)="close()" class="md:hidden absolute top-4 right-4 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Sidebar Content -->
      <div class="p-6 mt-12 md:mt-0">
        <h2 class="text-lg font-bold text-neutral-900 dark:text-white mb-6">Menu</h2>
        
        <nav class="space-y-2">
          <a routerLink="/dashboard" (click)="close()"
             routerLinkActive="bg-accent-500 text-white dark:bg-accent-600"
             [routerLinkActiveOptions]="{ exact: true }"
             class="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Dashboard</span>
          </a>
          <a routerLink="/templates" (click)="close()"
             routerLinkActive="bg-accent-500 text-white dark:bg-accent-600"
             [routerLinkActiveOptions]="{ exact: true }"
             class="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Templates</span>
          </a>
        </nav>

        <!-- Divider -->
        <div class="my-6 border-t border-neutral-200 dark:border-neutral-800"></div>

        <!-- Help Section -->
        <div class="bg-primary-50 dark:bg-neutral-800 p-4 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="font-semibold text-neutral-900 dark:text-white">Need Help?</h3>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Check our documentation for guides and tutorials.</p>
          <a href="#" class="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 text-sm font-medium transition-colors">Learn more →</a>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div *ngIf="isOpen" (click)="close()" class="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 md:hidden transition-colors"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
