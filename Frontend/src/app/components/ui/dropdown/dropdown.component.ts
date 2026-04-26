import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block w-full">
      <button
        (click)="toggleDropdown()"
        class="w-full px-4 py-2.5 bg-gradient-to-br from-light-100 to-light-200 dark:from-dark-800 dark:to-dark-900 border border-light-300 dark:border-dark-700 rounded-lg text-left text-dark-900 dark:text-light-50 hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-lg dark:hover:shadow-accent-500/20 transition-all duration-200 flex items-center justify-between font-medium">
        <span class="text-dark-700 dark:text-light-100">{{ selectedLabel }}</span>
        <svg class="w-4 h-4 transition-transform text-accent-600 dark:text-accent-400" [class.rotate-180]="isOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>

      <div *ngIf="isOpen" class="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-light-50 to-light-100 dark:from-dark-800 dark:to-dark-900 border border-light-300 dark:border-dark-700 rounded-lg shadow-2xl dark:shadow-accent-500/30 z-50 animate-fade-in overflow-hidden">
        <div *ngFor="let option of options; let last = last" 
             (click)="selectOption(option)"
             class="px-4 py-3 hover:bg-accent-100 dark:hover:bg-accent-900/30 cursor-pointer text-dark-900 dark:text-light-50 transition-colors duration-150 font-medium"
             [class.bg-accent-200]="option.value === selectedValue"
             [class.dark:bg-accent-800]="option.value === selectedValue"
             [class.border-b]="!last"
             [class.border-light-300]="!last"
             [class.dark:border-dark-700]="!last">
          <span [class.text-accent-700]="option.value === selectedValue" [class.dark:text-accent-200]="option.value === selectedValue">
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DropdownComponent {
  @Input() options: DropdownOption[] = [];
  @Input() selectedValue: any = null;
  @Input() placeholder = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;

  get selectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : this.placeholder;
  }

  constructor(private elementRef: ElementRef) {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: DropdownOption): void {
    this.selectedValue = option.value;
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
