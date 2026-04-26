import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ToasterService } from '../../services/toaster.service';
import { JobResponse } from '../../models';
import { DropdownComponent, DropdownOption } from '../../components/ui/dropdown/dropdown.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
  template: `
    <div class="space-y-xl">
      <!-- Input Section -->
      <div class="card-elevated bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div class="flex items-center gap-md mb-lg">
          <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center shadow-neon-red">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Submit Job Message</h2>
        </div>
        
        <div class="space-y-md">
          <!-- Text Input -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Text Input (Optional)</label>
            <textarea 
              [(ngModel)]="sourceMessage" 
              placeholder="Paste WhatsApp job message here..."
              rows="4"
              class="input-base resize-none focus:ring-accent-500 focus:border-accent-500">
            </textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-sm">Image Upload (Optional)</label>
            <div class="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-lg hover:border-accent-500 transition-colors duration-base cursor-pointer">
              <input 
                type="file" 
                #imageInput
                (change)="onImageSelected($event)"
                accept=".jpg,.jpeg,.png,.pdf"
                class="w-full cursor-pointer">
            </div>
            <div *ngIf="selectedImage" class="mt-md p-md bg-white dark:bg-neutral-800 rounded-md border border-accent-200 dark:border-accent-700 flex items-center justify-between">
              <div class="flex items-center gap-sm">
                <svg class="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span class="text-sm text-neutral-700 dark:text-neutral-300">{{ selectedImage.name }}</span>
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
            <span *ngIf="!isLoading" class="flex items-center justify-center gap-sm">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.34915502,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
              </svg>
              Process Job
            </span>
            <span *ngIf="isLoading" class="flex items-center justify-center gap-sm">
              <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          </button>

          <!-- Error Message -->
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
        </div>
      </div>

      <!-- Filter Section -->
      <div class="card">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-md flex items-center gap-sm">
          <svg class="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
          </svg>
          Filter Jobs
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <app-dropdown
            [options]="categoryOptions"
            [selectedValue]="selectedCategory"
            placeholder="All Categories"
            (selectionChange)="onCategoryChange($event)">
          </app-dropdown>
          <app-dropdown
            [options]="channelOptions"
            [selectedValue]="selectedChannel"
            placeholder="All Channels"
            (selectionChange)="onChannelChange($event)">
          </app-dropdown>
        </div>
      </div>

      <!-- Jobs Section -->
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-lg flex items-center gap-sm">
          <svg class="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          </svg>
          Job Feed
        </h2>
        
        <div *ngIf="jobs.length === 0" class="card text-center py-2xl">
          <p class="text-neutral-500 text-lg">No jobs found. Submit one to get started!</p>
        </div>

        <div *ngFor="let job of jobs" class="card-elevated hover:shadow-neon-red transition-all duration-base animate-slide-in">
          <!-- Job Header -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md mb-lg pb-lg border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-neutral-900 dark:text-white">{{ job.title }}</h3>
              <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-xs">{{ job.category }} • {{ job.createdAt | date:'short' }}</p>
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
          <div class="space-y-sm mb-lg pb-lg border-b border-neutral-200 dark:border-neutral-700">
            <p *ngIf="job.phoneNumber" class="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-xs">
              <svg class="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              <span class="font-semibold">Phone:</span> {{ job.phoneNumber }}
            </p>
            <p *ngIf="job.email" class="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-xs">
              <svg class="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span class="font-semibold">Email:</span> {{ job.email }}
            </p>
          </div>

          <!-- Generated Message -->
          <div *ngIf="job.generatedMessage" class="bg-gradient-to-r from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-900/10 p-lg rounded-lg mb-lg">
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-md flex items-center gap-sm">
              <svg class="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              Generated Message
            </h4>
            <p class="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap text-sm bg-white dark:bg-neutral-800 p-md rounded border border-accent-200 dark:border-accent-700 mb-md">{{ job.generatedMessage }}</p>
            <div class="flex flex-wrap gap-sm">
              <button 
                (click)="copyToClipboard(job.generatedMessage!)" 
                class="btn-sm bg-neutral-600 text-white hover:bg-neutral-700 rounded-md px-md py-xs flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy
              </button>
              <a *ngIf="job.whatsAppLink && job.applicationChannel === 'WhatsApp'" 
                 [href]="job.whatsAppLink" 
                 target="_blank" 
                 class="btn-sm bg-green-500 text-white hover:bg-green-600 rounded-md px-md py-xs inline-block flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.025 0-2.031.313-2.896.893L6.51 3.13.98 4.632c.383 1.991 1.243 3.81 2.462 5.307L4.334 6.52c.77-.505 1.658-.777 2.717-.777 1.025 0 2.031.313 2.896.893l1.414-1.414c-.865-.58-1.87-.893-2.896-.893"/>
                </svg>
                Send via WhatsApp
              </a>
            </div>
          </div>

          <!-- Email Section -->
          <div *ngIf="job.applicationChannel === 'Email'" class="bg-blue-50 dark:bg-blue-900/20 p-lg rounded-lg">
            <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-md flex items-center gap-sm">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email Details
            </h4>
            <div class="space-y-sm mb-md">
              <p class="text-sm text-blue-800 dark:text-blue-300"><span class="font-semibold">Subject:</span> {{ job.emailSubject }}</p>
              <p class="text-sm text-blue-800 dark:text-blue-300 line-clamp-3">{{ job.emailBody }}</p>
            </div>
            <div class="flex flex-wrap gap-sm">
              <button 
                (click)="previewEmail(job)" 
                class="btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md px-md py-xs flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                Preview
              </button>
              <button 
                (click)="sendEmail(job)" 
                class="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-md px-md py-xs shadow-neon-red flex items-center gap-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.34915502,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                </svg>
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Preview Modal -->
      <div *ngIf="showEmailPreview" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-lg animate-fade-in">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-lg border-b border-neutral-200 dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-900">
            <h3 class="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-sm">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email Preview
            </h3>
            <button 
              (click)="closeEmailPreview()" 
              class="text-2xl text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">
              ✕
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-lg space-y-md">
            <div class="bg-neutral-50 dark:bg-neutral-800 p-md rounded-lg">
              <p class="text-sm text-neutral-600 dark:text-neutral-400"><span class="font-semibold">To:</span> {{ previewJob?.email }}</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-sm"><span class="font-semibold">Subject:</span> {{ previewJob?.emailSubject }}</p>
            </div>
            <div class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-lg rounded-lg">
              <p class="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{{ previewJob?.emailBody }}</p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex gap-md p-lg border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 sticky bottom-0">
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
export class DashboardPageComponent implements OnInit {
  sourceMessage = '';
  selectedImage: File | null = null;
  jobs: JobResponse[] = [];
  selectedCategory = '';
  selectedChannel = '';
  isLoading = false;
  error = '';
  showEmailPreview = false;
  previewJob: JobResponse | null = null;

  categoryOptions: DropdownOption[] = [
    { label: 'All Categories', value: '' },
    { label: 'Backend', value: 'Backend' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Fullstack', value: 'Fullstack' }
  ];

  channelOptions: DropdownOption[] = [
    { label: 'All Channels', value: '' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
    { label: 'Manual Review', value: 'Manual' }
  ];

  constructor(private jobService: JobService, private toasterService: ToasterService) { }

  onCategoryChange(value: any): void {
    this.selectedCategory = value;
    this.filterJobs();
  }

  onChannelChange(value: any): void {
    this.selectedChannel = value;
    this.filterJobs();
  }

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
      this.toasterService.warning('Please enter text or select an image');
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
        this.toasterService.success('Job created successfully!');
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
      this.toasterService.success('Message copied to clipboard!');
    }).catch(() => {
      this.toasterService.error('Failed to copy to clipboard');
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
        this.toasterService.success('Email sent successfully!');
        this.closeEmailPreview();
        this.loadJobs();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error sending email';
        this.toasterService.error(this.error);
      }
    });
  }
}
