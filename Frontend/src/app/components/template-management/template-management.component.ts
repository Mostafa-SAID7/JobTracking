import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateService } from '../../services/template.service';
import { TemplateDto, CreateTemplateDto } from '../../models';

@Component({
  selector: 'app-template-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-xl">
      <!-- Form Section -->
      <div class="card-elevated bg-gradient-to-br from-neutral-50 to-neutral-100 border-l-4 border-accent-500">
        <div class="flex items-center gap-md mb-lg">
          <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center shadow-neon-red">
            <span class="text-white font-bold">⚙️</span>
          </div>
          <h2 class="text-2xl font-bold text-neutral-900">
            {{ editingId ? '✏️ Edit Template' : '➕ Create New Template' }}
          </h2>
        </div>

        <form (ngSubmit)="saveTemplate()" class="space-y-md">
          <!-- Category -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Category *</label>
            <select 
              [(ngModel)]="form.category" 
              name="category" 
              required
              class="input-base">
              <option value="">Select Category</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <!-- Message Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Message Template *</label>
            <textarea 
              [(ngModel)]="form.messageTemplate" 
              name="messageTemplate"
              placeholder="Use placeholders: JobTitle, Category, Github, Portfolio, Email"
              rows="6"
              required
              class="input-base resize-none focus:ring-accent-500 focus:border-accent-500">
            </textarea>
            <p class="text-xs text-neutral-500 mt-xs">Available placeholders: JobTitle, Category, Github, Portfolio, Email</p>
          </div>

          <!-- Email Subject Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Email Subject Template</label>
            <input 
              type="text" 
              [(ngModel)]="form.emailSubjectTemplate" 
              name="emailSubjectTemplate"
              placeholder="e.g., Application for JobTitle"
              class="input-base">
          </div>

          <!-- Email Body Template -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Email Body Template</label>
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
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">CV Path *</label>
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
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">GitHub URL *</label>
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
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Portfolio URL *</label>
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
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Email *</label>
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
              <span *ngIf="!isLoading">{{ editingId ? '💾 Update Template' : '✨ Create Template' }}</span>
              <span *ngIf="isLoading" class="flex items-center justify-center gap-sm">
                <span class="animate-spin">⏳</span> Saving...
              </span>
            </button>
            <button 
              type="button" 
              (click)="resetForm()" 
              *ngIf="editingId"
              class="btn-secondary flex-1">
              ✕ Cancel
            </button>
          </div>

          <!-- Messages -->
          <div *ngIf="error" class="alert-error animate-fade-in">
            <div class="flex items-start gap-md">
              <span class="text-lg">⚠️</span>
              <div>
                <p class="font-semibold">Error</p>
                <p class="text-sm">{{ error }}</p>
              </div>
            </div>
          </div>
          <div *ngIf="success" class="alert bg-green-50 border-green-500 text-green-900 animate-fade-in">
            <div class="flex items-start gap-md">
              <span class="text-lg">✅</span>
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
        <h2 class="text-2xl font-bold text-neutral-900 mb-lg flex items-center gap-sm">
          <span>📚</span> Existing Templates
        </h2>

        <div *ngIf="templates.length === 0" class="card text-center py-2xl">
          <p class="text-neutral-500 text-lg">No templates found. Create one to get started!</p>
        </div>

        <div *ngFor="let template of templates" class="card-elevated border-l-4 border-accent-500 hover:shadow-neon-red transition-all duration-base animate-slide-in">
          <!-- Template Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md mb-lg pb-lg border-b border-neutral-200">
            <div>
              <h3 class="text-xl font-bold text-neutral-900">{{ template.category }}</h3>
              <p class="text-sm text-neutral-500 mt-xs">📧 {{ template.email }}</p>
            </div>
            <div class="flex gap-sm">
              <button 
                (click)="editTemplate(template)" 
                class="btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md px-md py-xs">
                ✏️ Edit
              </button>
              <button 
                (click)="deleteTemplate(template.id)" 
                class="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-md px-md py-xs shadow-neon-red">
                🗑️ Delete
              </button>
            </div>
          </div>

          <!-- Template Details -->
          <div class="space-y-md">
            <!-- Links -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div class="bg-neutral-50 p-md rounded-lg">
                <p class="text-xs font-semibold text-neutral-600 mb-xs">GitHub</p>
                <a [href]="template.githubUrl" target="_blank" class="text-accent-500 hover:text-accent-600 text-sm break-all">
                  {{ template.githubUrl }}
                </a>
              </div>
              <div class="bg-neutral-50 p-md rounded-lg">
                <p class="text-xs font-semibold text-neutral-600 mb-xs">Portfolio</p>
                <a [href]="template.portfolioUrl" target="_blank" class="text-accent-500 hover:text-accent-600 text-sm break-all">
                  {{ template.portfolioUrl }}
                </a>
              </div>
            </div>

            <!-- Message Template -->
            <div class="bg-blue-50 p-lg rounded-lg border-l-4 border-blue-500">
              <p class="text-sm font-semibold text-blue-900 mb-md">💬 Message Template</p>
              <p class="text-sm text-blue-800 whitespace-pre-wrap bg-white p-md rounded border border-blue-200">
                {{ template.messageTemplate }}
              </p>
            </div>

            <!-- Email Subject -->
            <div *ngIf="template.emailSubjectTemplate" class="bg-purple-50 p-lg rounded-lg border-l-4 border-purple-500">
              <p class="text-sm font-semibold text-purple-900 mb-md">📧 Email Subject</p>
              <p class="text-sm text-purple-800 bg-white p-md rounded border border-purple-200">
                {{ template.emailSubjectTemplate }}
              </p>
            </div>

            <!-- Email Body -->
            <div *ngIf="template.emailBodyTemplate" class="bg-green-50 p-lg rounded-lg border-l-4 border-green-500">
              <p class="text-sm font-semibold text-green-900 mb-md">📝 Email Body</p>
              <p class="text-sm text-green-800 whitespace-pre-wrap bg-white p-md rounded border border-green-200 max-h-48 overflow-y-auto">
                {{ template.emailBodyTemplate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TemplateManagementComponent implements OnInit {
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
