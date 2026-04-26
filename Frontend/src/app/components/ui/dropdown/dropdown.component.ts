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
        class="w-full px-4 py-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-950 dark:to-blue-950 border border-blue-200 dark:border-indigo-700 rounded-lg text-left text-neutral-900 dark:text-white hover:border-blue-400 dark:hover:border-indigo-400 hover:shadow-lg dark:hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-between font-medium">
        <span class="text-neutral-700 dark:text-neutral-100">{{ selectedLabel }}</span>
        <svg class="w-4 h-4 transition-transform text-blue-600 dark:text-indigo-400" [class.rotate-180]="isOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>

      <div *ngIf="isOpen" class="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-indigo-900 dark:to-blue-900 border border-blue-200 dark:border-indigo-700 rounded-lg shadow-2xl dark:shadow-indigo-500/30 z-50 animate-fade-in overflow-hidden">
        <div *ngFor="let option of options; let last = last" 
             (click)="selectOption(option)"
             class="px-4 py-3 hover:bg-blue-100 dark:hover:bg-indigo-800 cursor-pointer text-neutral-900 dark:text-white transition-colors duration-150 font-medium"
             [class.bg-blue-200]="option.value === selectedValue"
             [class.dark:bg-indigo-700]="option.value === selectedValue"
             [class.border-b]="!last"
             [class.border-blue-200]="!last"
             [class.dark:border-indigo-700]="!last">
          <span [class.text-blue-700]="option.value === selectedValue" [class.dark:text-indigo-200]="option.value === selectedValue">
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
