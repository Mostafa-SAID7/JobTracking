import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div class="mb-8">
        <svg class="w-24 h-24 text-accent-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h1 class="text-5xl font-bold text-neutral-900 dark:text-white mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Page Not Found</h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <a routerLink="/dashboard" class="btn-primary-neon px-8 py-3 rounded-lg">
        Back to Dashboard
      </a>
    </div>
  `
})
export class NotFoundPageComponent {}
