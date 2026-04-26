import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-neutral-900 dark:bg-neutral-950 text-neutral-400 dark:text-neutral-500 border-t border-neutral-800 dark:border-neutral-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <p class="text-sm text-neutral-400 dark:text-neutral-500">&copy; 2026 Job Tracking System. All rights reserved.</p>
          <div class="flex gap-6 mt-4 sm:mt-0 text-sm">
            <a href="#" class="text-neutral-400 dark:text-neutral-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">Privacy</a>
            <a href="#" class="text-neutral-400 dark:text-neutral-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">Terms</a>
            <a href="#" class="text-neutral-400 dark:text-neutral-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
