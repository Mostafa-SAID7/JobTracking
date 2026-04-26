import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col h-screen bg-neutral-50">
      <!-- Header Navigation -->
      <nav class="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-lg border-b-4 border-accent-500">
        <div class="max-w-7xl mx-auto px-lg py-md flex items-center justify-between">
          <div class="flex items-center gap-md">
            <div class="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center shadow-neon-red">
              <span class="text-white font-bold text-lg">JT</span>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
              Job Tracking System
            </h1>
          </div>
          
          <ul class="flex items-center gap-xl list-none m-0 p-0">
            <li>
              <a 
                routerLink="/dashboard" 
                routerLinkActive="text-accent-400 border-b-2 border-accent-500"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-neutral-300 hover:text-white transition-colors duration-base pb-sm border-b-2 border-transparent hover:border-accent-500">
                Dashboard
              </a>
            </li>
            <li>
              <a 
                routerLink="/templates" 
                routerLinkActive="text-accent-400 border-b-2 border-accent-500"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-neutral-300 hover:text-white transition-colors duration-base pb-sm border-b-2 border-transparent hover:border-accent-500">
                Templates
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto px-lg py-xl">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-neutral-900 text-neutral-400 text-center py-md border-t border-neutral-800">
        <p class="m-0 text-sm">© 2026 Job Tracking System. All rights reserved.</p>
      </footer>
    </div>
  `
})
export class AppComponent {
  title = 'Job Tracking System';
}
