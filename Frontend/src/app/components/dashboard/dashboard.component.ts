import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { JobResponse } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-xl">
      <!-- Input Section -->
      <div class="card-elevated bg-gradient-to-br from-neutral-50 to-neutral-100 border-l-4 border-accent-500">
        <div class="flex items-center gap-md mb-lg">
          <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center shadow-neon-red">
            <span class="text-white font-bold">📝</span>
          </div>
          <h2 class="text-2xl font-bold text-neutral-900">Submit Job Message</h2>
        </div>
        
        <div class="space-y-md">
          <!-- Text Input -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Text Input (Optional)</label>
            <textarea 
              [(ngModel)]="sourceMessage" 
              placeholder="Paste WhatsApp job message here..."
              rows="4"
              class="input-base resize-none focus:ring-accent-500 focus:border-accent-500">
            </textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-sm">Image Upload (Optional)</label>
            <div class="border-2 border-dashed border-neutral-300 rounded-lg p-lg hover:border-accent-500 transition-colors duration-base cursor-pointer">
              <input 
                type="file" 
                #imageInput
                (change)="onImageSelected($event)"
                accept=".jpg,.jpeg,.png,.pdf"
                class="w-full cursor-pointer">
            </div>
            <div *ngIf="selectedImage" class="mt-md p-md bg-white rounded-md border border-accent-200 flex items-center justify-between">
              <div class="flex items-center gap-sm">
                <span class="text-accent-500">✓</span>
                <span class="text-sm text-neutral-700">{{ selectedImage.name }}</span>
              </div>
              <button type="button" (click)="clearImage()" class="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-md px-md py-xs">
                Clear
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            (click)="submitJob()" 
            [disabled]="(!sourceMessage && !selectedImage) || isLoading" 
            class="btn-primary-neon w-full py-md text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
            <span *ngIf="!isLoading">🚀 Process Job</span>
            <span *ngIf="isLoading" class="flex items-center justify-center gap-sm">
              <span class="animate-spin">⏳</span> Processing...
            </span>
          </button>

          <!-- Error Message -->
          <div *ngIf="error" class="alert-error animate-fade-in">
            <div class="flex items-start gap-md">
              <span class="text-lg">⚠️</span>
              <div>
                <p class="font-semibold">Error</p>
                <p class="text-sm">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="card">
        <h3 class="text-lg font-bold text-neutral-900 mb-md flex items-center gap-sm">
          <span>🔍</span> Filter Jobs
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <select 
            [(ngModel)]="selectedCategory" 
            (change)="filterJobs()" 
            class="input-base">
            <option value="">All Categories</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
          <select 
            [(ngModel)]="selectedChannel" 
            (change)="filterJobs()" 
            class="input-base">
            <option value="">All Channels</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Manual">Manual Review</option>
          </select>
        </div>
      </div>

      <!-- Jobs Section -->
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 mb-lg flex items-center gap-sm">
          <span>📋</span> Job Feed
        </h2>
        
        <div *ngIf="jobs.length === 0" class="card text-center py-2xl">
          <p class="text-neutral-500 text-lg">No jobs found. Submit one to get started!</p>
        </div>

        <div *ngFor="let job of jobs" class="card-elevated border-l-4 border-accent-500 hover:shadow-neon-red transition-all duration-base animate-slide-in">
          <!-- Job Header -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md mb-lg pb-lg border-b border-neutral-200">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-neutral-900">{{ job.title }}</h3>
              <p class="text-sm text-neutral-500 mt-xs">{{ job.category }} • {{ job.createdAt | date:'short' }}</p>
            </div>
            <div class="flex flex-wrap gap-sm">
              <span class="badge-primary">{{ job.category }}</span>
              <span class="badge" [ngClass]="{
                'bg-green-100 text-green-700': job.applicationChannel === 'WhatsApp',
                'bg-blue-100 text-blue-700': job.applicationChannel === 'Email',
                'bg-yellow-100 text-yellow-700': job.applicationChannel === 'Manual'
              }">
                {{ job.applicationChannel }}
              </span>
            </div>
          </div>

          <!-- Job Details -->
          <div class="space-y-sm mb-lg pb-lg border-b border-neutral-200">
            <p *ngIf="job.phoneNumber" class="text-sm text-neutral-700">
              <span class="font-semibold">📱 Phone:</span> {{ job.phoneNumber }}
            </p>
            <p *ngIf="job.email" class="text-sm text-neutral-700">
              <span class="font-semibold">📧 Email:</span> {{ job.email }}
            </p>
          </div>

          <!-- Generated Message -->
          <div *ngIf="job.generatedMessage" class="bg-gradient-to-r from-accent-50 to-accent-100 p-lg rounded-lg mb-lg border-l-4 border-accent-500">
            <h4 class="font-semibold text-neutral-900 mb-md flex items-center gap-sm">
              <span>💬</span> Generated Message
            </h4>
            <p class="text-neutral-700 whitespace-pre-wrap text-sm bg-white p-md rounded border border-accent-200 mb-md">{{ job.generatedMessage }}</p>
            <div class="flex flex-wrap gap-sm">
              <button 
                (click)="copyToClipboard(job.generatedMessage!)" 
                class="btn-sm bg-neutral-600 text-white hover:bg-neutral-700 rounded-md px-md py-xs">
                📋 Copy
              </button>
              <a *ngIf="job.whatsAppLink && job.applicationChannel === 'WhatsApp'" 
                 [href]="job.whatsAppLink" 
                 target="_blank" 
                 class="btn-sm bg-green-500 text-white hover:bg-green-600 rounded-md px-md py-xs inline-block">
                💚 Send via WhatsApp
              </a>
            </div>
          </div>

          <!-- Email Section -->
          <div *ngIf="job.applicationChannel === 'Email'" class="bg-blue-50 p-lg rounded-lg border-l-4 border-blue-500">
            <h4 class="font-semibold text-blue-900 mb-md flex items-center gap-sm">
              <span>📧</span> Email Details
            </h4>
            <div class="space-y-sm mb-md">
              <p class="text-sm text-blue-800"><span class="font-semibold">Subject:</span> {{ job.emailSubject }}</p>
              <p class="text-sm text-blue-800 line-clamp-3">{{ job.emailBody }}</p>
            </div>
            <div class="flex flex-wrap gap-sm">
              <button 
                (click)="previewEmail(job)" 
                class="btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md px-md py-xs">
                👁️ Preview
              </button>
              <button 
                (click)="sendEmail(job)" 
                class="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-md px-md py-xs shadow-neon-red">
                ✉️ Send Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Preview Modal -->
      <div *ngIf="showEmailPreview" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-lg animate-fade-in">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-lg border-b border-neutral-200 sticky top-0 bg-white">
            <h3 class="text-xl font-bold text-neutral-900">📧 Email Preview</h3>
            <button 
              (click)="closeEmailPreview()" 
              class="text-2xl text-neutral-400 hover:text-neutral-600 transition-colors">
              ✕
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-lg space-y-md">
            <div class="bg-neutral-50 p-md rounded-lg">
              <p class="text-sm text-neutral-600"><span class="font-semibold">To:</span> {{ previewJob?.email }}</p>
              <p class="text-sm text-neutral-600 mt-sm"><span class="font-semibold">Subject:</span> {{ previewJob?.emailSubject }}</p>
            </div>
            <div class="bg-white border border-neutral-200 p-lg rounded-lg">
              <p class="text-sm text-neutral-700 whitespace-pre-wrap">{{ previewJob?.emailBody }}</p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex gap-md p-lg border-t border-neutral-200 bg-neutral-50 sticky bottom-0">
            <button 
              (click)="closeEmailPreview()" 
              class="btn-secondary flex-1">
              Cancel
            </button>
            <button 
              (click)="confirmSendEmail()" 
              class="btn-primary-neon flex-1">
              ✉️ Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  sourceMessage = '';
  selectedImage: File | null = null;
  jobs: JobResponse[] = [];
  selectedCategory = '';
  selectedChannel = '';
  isLoading = false;
  error = '';
  showEmailPreview = false;
  previewJob: JobResponse | null = null;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  clearImage(): void {
    this.selectedImage = null;
  }

  submitJob(): void {
    if (!this.sourceMessage.trim() && !this.selectedImage) {
      this.error = 'Please enter text or select an image';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.jobService.createJob(
      this.sourceMessage || undefined,
      this.selectedImage || undefined
    ).subscribe({
      next: (response) => {
        this.jobs.unshift(response);
        this.sourceMessage = '';
        this.selectedImage = null;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error processing job';
        this.isLoading = false;
      }
    });
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs.map(j => ({
          id: j.id,
          title: j.title,
          category: j.category,
          phoneNumber: j.phoneNumber,
          email: j.email,
          applicationChannel: j.applicationChannel,
          generatedMessage: j.generatedMessage || '',
          emailSubject: '',
          emailBody: '',
          whatsAppLink: '',
          cvPath: '',
          createdAt: new Date()
        }));
        // Load full details for each job
        this.jobs.forEach(job => {
          this.jobService.getJob(job.id).subscribe({
            next: (fullJob) => {
              const index = this.jobs.findIndex(j => j.id === fullJob.id);
              if (index >= 0) {
                this.jobs[index] = fullJob;
              }
            }
          });
        });
      },
      error: () => {
        this.error = 'Error loading jobs';
      }
    });
  }

  filterJobs(): void {
    if (!this.selectedCategory && !this.selectedChannel) {
      this.loadJobs();
      return;
    }

    if (this.selectedChannel) {
      this.jobService.getJobsByChannel(this.selectedChannel).subscribe({
        next: (jobs) => {
          this.jobs = jobs.map(j => ({
            id: j.id,
            title: j.title,
            category: j.category,
            phoneNumber: j.phoneNumber,
            email: j.email,
            applicationChannel: j.applicationChannel,
            generatedMessage: j.generatedMessage || '',
            emailSubject: '',
            emailBody: '',
            whatsAppLink: '',
            cvPath: '',
            createdAt: new Date()
          }));
        },
        error: () => {
          this.error = 'Error filtering jobs';
        }
      });
    } else if (this.selectedCategory) {
      this.jobService.getJobsByCategory(this.selectedCategory).subscribe({
        next: (jobs) => {
          this.jobs = jobs.map(j => ({
            id: j.id,
            title: j.title,
            category: j.category,
            phoneNumber: j.phoneNumber,
            email: j.email,
            applicationChannel: j.applicationChannel,
            generatedMessage: j.generatedMessage || '',
            emailSubject: '',
            emailBody: '',
            whatsAppLink: '',
            cvPath: '',
            createdAt: new Date()
          }));
        },
        error: () => {
          this.error = 'Error filtering jobs';
        }
      });
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied to clipboard!');
    });
  }

  previewEmail(job: JobResponse): void {
    this.previewJob = job;
    this.showEmailPreview = true;
  }

  closeEmailPreview(): void {
    this.showEmailPreview = false;
    this.previewJob = null;
  }

  confirmSendEmail(): void {
    if (this.previewJob) {
      this.sendEmail(this.previewJob);
    }
  }

  sendEmail(job: JobResponse): void {
    this.jobService.sendEmail(job.id, {
      recipientEmail: job.email,
      preview: false
    }).subscribe({
      next: () => {
        alert('Email sent successfully!');
        this.closeEmailPreview();
        this.loadJobs();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error sending email';
      }
    });
  }
}
