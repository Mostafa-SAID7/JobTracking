import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateService } from '../../services/template.service';
import { TemplateDto, CreateTemplateDto } from '../../models';
import { DropdownComponent, DropdownOption } from '../../components/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-templates-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
  template: `
    <div class="space-y-xl">
      <!-- Form Section -->
      <div class="card-elevated bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div class="flex items-center gap-md mb-lg">
          <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center shadow-neon-red">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ editingId ? 'Edit Template' : 'Create New Template' }}
          </h2>
        </div>

        <form (ngSubmit)="saveTemplate()" class="space-y-md">
          <!-- Category -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Category *</label>
            <app-dropdown
              [options]="categoryOptions"
              [selectedValue]="form.category"
              placeholder="Select Category"
              (selectionChange)="onCategoryChange($event)">
            </app-dropdown>
          </div>

          <!-- Message Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Message Template *</label>
            <textarea 
              [(ngModel)]="form.messageTemplate" 
              name="messageTemplate"
              placeholder="Use placeholders: JobTitle, Category, Github, Portfolio, Email"
              rows="6"
              required
              class="input-base resize-none focus:ring-accent-500 focus:border-accent-500">
            </textarea>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-xs">Available placeholders: JobTitle, Category, Github, Portfolio, Email</p>
          </div>

          <!-- Email Subject Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Email Subject Template</label>
            <input 
              type="text" 
              [(ngModel)]="form.emailSubjectTemplate" 
              name="emailSubjectTemplate"
              placeholder="e.g., Application for JobTitle"
              class="input-base">
          </div>

          <!-- Email Body Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Email Body Template</label>
            <textarea 
              [(ngModel)]="form.emailBodyTemplate" 
              name="emailBodyTemplate"
              placeholder="Use placeholders: JobTitle, Category, Github, Portfolio, Email"
              rows="6"
              class="input-base resize-none focus:ring-accent-500 focus:border-accent-500">
            </textarea>
          </div>

          <!-- CV Path -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">CV Path *</label>
            <input 
              type="text" 
              [(ngModel)]="form.cvPath" 
              name="cvPath"
              placeholder="Path to CV file"
              required
              class="input-base">
          </div>

          <!-- GitHub URL -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">GitHub URL *</label>
            <input 
              type="url" 
              [(ngModel)]="form.githubUrl" 
              name="githubUrl"
              placeholder="https://github.com/username"
              required
              class="input-base">
          </div>

          <!-- Portfolio URL -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Portfolio URL *</label>
            <input 
              type="url" 
              [(ngModel)]="form.portfolioUrl" 
              name="portfolioUrl"
              placeholder="https://portfolio.com"
              required
              class="input-base">
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Email *</label>
            <input 
              type="email" 
              [(ngModel)]="form.email" 
              name="email"
              placeholder="your@email.com"
              required
              class="input-base">
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-md pt-md">
            <button 
              type="submit" 
              [disabled]="isLoading"
              class="btn-primary-neon flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="!isLoading">{{ editingId ? 'Update Template' : 'Create Template' }}</span>
              <span *ngIf="isLoading" class="flex items-center justify-center gap-sm">
                <svg class="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            </button>
            <button 
              type="button" 
              (click)="resetForm()" 
              *ngIf="editingId"
              class="btn-secondary flex-1">
              Cancel
            </button>
          </div>

          <!-- Messages -->
          <div *ngIf="error" class="alert-error animate-fade-in">
            <div class="flex items-start gap-md">
              <svg class="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <div>
                <p class="font-semibold">Error</p>
                <p class="text-sm">{{ error }}</p>
              </div>
            </div>
          </div>
          <div *ngIf="success" class="alert bg-green-50 border-green-500 text-green-900 animate-fade-in">
            <div class="flex items-start gap-md">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <div>
                <p class="font-semibold">Success</p>
                <p class="text-sm">{{ success }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Templates List -->
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-lg flex items-center gap-sm">
          <svg class="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v4h12V8c0-1.1-.9-2-2-2zm10 15h-8v-4h8v4zm6-10H4V6h16v5z"/>
          </svg>
          Existing Templates
        </h2>

        <div *ngIf="templates.length === 0" class="card text-center py-2xl">
          <p class="text-neutral-500 text-lg">No templates found. Create one to get started!</p>
        </div>

        <div *ngFor="let template of templates" class="card-elevated hover:shadow-neon-red transition-all duration-base animate-slide-in">
          <!-- Template Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md mb-lg pb-lg border-b border-neutral-200 dark:border-neutral-700">
            <div>
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white">{{ template.category }}</h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-xs flex items-center gap-xs">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                {{ template.email }}
              </p>
            </div>
            <div class="flex gap-sm">
              <button 
                (click)="editTemplate(template)" 
                class="btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md px-md py-xs flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                  <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Edit
              </button>
              <button 
                (click)="deleteTemplate(template.id)" 
                class="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-md px-md py-xs shadow-neon-red flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

          <!-- Template Details -->
          <div class="space-y-md">
            <!-- Links -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div class="bg-neutral-50 dark:bg-neutral-800 p-md rounded-lg">
                <p class="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-xs flex items-center gap-xs">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </p>
                <a [href]="template.githubUrl" target="_blank" class="text-accent-500 hover:text-accent-600 text-sm break-all">
                  {{ template.githubUrl }}
                </a>
              </div>
              <div class="bg-neutral-50 dark:bg-neutral-800 p-md rounded-lg">
                <p class="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-xs flex items-center gap-xs">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  Portfolio
                </p>
                <a [href]="template.portfolioUrl" target="_blank" class="text-accent-500 hover:text-accent-600 text-sm break-all">
                  {{ template.portfolioUrl }}
                </a>
              </div>
            </div>

            <!-- Message Template -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-lg rounded-lg">
              <p class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-md flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                Message Template
              </p>
              <p class="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-wrap bg-white dark:bg-neutral-800 p-md rounded border border-blue-200 dark:border-blue-700">
                {{ template.messageTemplate }}
              </p>
            </div>

            <!-- Email Subject -->
            <div *ngIf="template.emailSubjectTemplate" class="bg-purple-50 dark:bg-purple-900/20 p-lg rounded-lg">
              <p class="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-md flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email Subject
              </p>
              <p class="text-sm text-purple-800 dark:text-purple-300 bg-white dark:bg-neutral-800 p-md rounded border border-purple-200 dark:border-purple-700">
                {{ template.emailSubjectTemplate }}
              </p>
            </div>

            <!-- Email Body -->
            <div *ngIf="template.emailBodyTemplate" class="bg-green-50 dark:bg-green-900/20 p-lg rounded-lg">
              <p class="text-sm font-semibold text-green-900 dark:text-green-300 mb-md flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                </svg>
                Email Body
              </p>
              <p class="text-sm text-green-800 dark:text-green-300 whitespace-pre-wrap bg-white dark:bg-neutral-800 p-md rounded border border-green-200 dark:border-green-700 max-h-48 overflow-y-auto">
                {{ template.emailBodyTemplate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TemplatesPageComponent implements OnInit {
  templates: TemplateDto[] = [];
  form: CreateTemplateDto = {
    category: '',
    messageTemplate: '',
    emailSubjectTemplate: 'Application for JobTitle',
    emailBodyTemplate: 'Hi, I am interested in the JobTitle position. I have experience with Category development. You can find my work at Github and my portfolio at Portfolio. Feel free to reach out at Email.',
    cvPath: '',
    githubUrl: '',
    portfolioUrl: '',
    email: ''
  };
  editingId: number | null = null;
  isLoading = false;
  error = '';
  success = '';

  categoryOptions: DropdownOption[] = [
    { label: 'Select Category', value: '' },
    { label: 'Backend', value: 'Backend' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Fullstack', value: 'Fullstack' }
  ];

  onCategoryChange(value: any): void {
    this.form.category = value;
  }

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templateService.getAllTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: () => {
        this.error = 'Error loading templates';
      }
    });
  }

  saveTemplate(): void {
    this.error = '';
    this.success = '';
    this.isLoading = true;

    if (this.editingId) {
      this.templateService.updateTemplate(this.editingId, this.form).subscribe({
        next: () => {
          this.success = 'Template updated successfully';
          this.resetForm();
          this.loadTemplates();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Error updating template';
          this.isLoading = false;
        }
      });
    } else {
      this.templateService.createTemplate(this.form).subscribe({
        next: () => {
          this.success = 'Template created successfully';
          this.resetForm();
          this.loadTemplates();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Error creating template';
          this.isLoading = false;
        }
      });
    }
  }

  editTemplate(template: TemplateDto): void {
    this.editingId = template.id;
    this.form = {
      category: template.category,
      messageTemplate: template.messageTemplate,
      emailSubjectTemplate: template.emailSubjectTemplate,
      emailBodyTemplate: template.emailBodyTemplate,
      cvPath: template.cvPath,
      githubUrl: template.githubUrl,
      portfolioUrl: template.portfolioUrl,
      email: template.email
    };
    window.scrollTo(0, 0);
  }

  deleteTemplate(id: number): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.templateService.deleteTemplate(id).subscribe({
        next: () => {
          this.success = 'Template deleted successfully';
          this.loadTemplates();
        },
        error: () => {
          this.error = 'Error deleting template';
        }
      });
    }
  }

  resetForm(): void {
    this.form = {
      category: '',
      messageTemplate: '',
      emailSubjectTemplate: 'Application for JobTitle',
      emailBodyTemplate: 'Hi, I am interested in the JobTitle position. I have experience with Category development. You can find my work at Github and my portfolio at Portfolio. Feel free to reach out at Email.',
      cvPath: '',
      githubUrl: '',
      portfolioUrl: '',
      email: ''
    };
    this.editingId = null;
    this.error = '';
    this.success = '';
  }
}
