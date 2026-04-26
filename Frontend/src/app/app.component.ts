import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ToasterComponent } from './components/ui/toaster/toaster.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, SidebarComponent, ToasterComponent],
  template: `
    <div class="flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      <!-- Navbar -->
      <app-navbar (menuToggle)="sidebarOpen = !sidebarOpen"></app-navbar>

      <!-- Main Content with Sidebar -->
      <div class="flex flex-1">
        <!-- Sidebar -->
        <app-sidebar [isOpen]="sidebarOpen" (closeEvent)="sidebarOpen = false"></app-sidebar>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>

      <!-- Footer -->
      <app-footer></app-footer>

      <!-- Toaster -->
      <app-toaster></app-toaster>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent implements OnInit {
  sidebarOpen = false;

  constructor(private themeService: ThemeService) {
    // Initialize theme on app startup
    this.themeService.initializeTheme();
  }

  ngOnInit(): void {
    // Theme is initialized in constructor
  }
}
