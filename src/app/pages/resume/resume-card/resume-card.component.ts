import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [TranslocoPipe, MatCardModule],
  template: `
    <mat-card-header>
      <mat-card-title>
        {{ title }}
      </mat-card-title>
    </mat-card-header>
    <div class="flex flex-col">
      @for (item of resumeCardData; track item.title) { @if (item.title &&
      item.location) {
      <div slot="heading" class="heading-container ml-4 mt-4">
        <div class="title-container">
          <span class="font-bold">{{ item.title }}</span>
          <span class="separator">&comma; &nbsp;</span>
          <span> {{ item.location }}</span>
        </div>
        <span class="text-xs">{{ item.date }}</span>
      </div>
      }
      <ul class="list-disc ml-6 mt-2">
        @for (line of item.lines; track line) {
        <li>{{ line }}</li>
        }
      </ul>
      }
    </div>
  `,
  styles: [
    `
      @media (min-width: 800px) {
        .title-container {
          @apply flex flex-row justify-between items-center;
        }
      }
      @media (max-width: 800px) {
        .title-container {
          @apply flex flex-col items-start;
        }
        .separator {
          display: none;
        }
      }

      @media (min-width: 650px) {
        .heading-container {
          @apply flex flex-row justify-between items-center;
        }
      }
      @media (max-width: 650px) {
        .heading-container {
          @apply flex flex-col items-start;
        }
      }
    `,
  ],
})
export class ResumeCardComponent {
  @Input() resumeCardData!: ResumeCardData[];
  @Input() title!: string;
}

export interface ResumeCardData {
  date?: string;
  lines?: string[];
  location?: string;
  title?: string;
}
