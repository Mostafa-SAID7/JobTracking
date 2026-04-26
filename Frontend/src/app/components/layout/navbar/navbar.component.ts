import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white dark:bg-neutral-900 shadow-md border-b border-neutral-200 dark:border-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Logo -->
          <div class="flex items-center gap-3 flex-1 md:flex-none">
            <div class="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">JT</span>
            </div>
            <h1 class="text-xl font-bold text-neutral-900 dark:text-white hidden sm:block">
              Job Tracking
            </h1>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center gap-8">
            <a routerLink="/dashboard" routerLinkActive="text-accent-500 border-b-2 border-accent-500" 
               [routerLinkActiveOptions]="{ exact: true }"
               class="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 pb-1 transition-colors">
              Dashboard
            </a>
            <a routerLink="/templates" routerLinkActive="text-accent-500 border-b-2 border-accent-500"
               [routerLinkActiveOptions]="{ exact: true }"
               class="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 pb-1 transition-colors">
              Templates
            </a>
          </div>

          <!-- Theme Toggle -->
          <button (click)="toggleTheme()" 
                  class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white">
            <svg *ngIf="!(darkMode$ | async)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg *ngIf="darkMode$ | async" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414l-.707-.707zM5 8a1 1 0 100-2H4a1 1 0 100 2h1z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent implements OnInit {
  darkMode$ = this.themeService.darkMode$;
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
