import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

import { ResumeDictionaryComponent } from '../resume-dictionary/resume-dictionary.component';
import { ResumeEntry } from '../resume.service';

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [TranslocoPipe, MatCardModule, ResumeDictionaryComponent],
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

      @if (item.plainText) {
      <span class="ml-6">{{ item.plainText }}</span>
      } @if (item.dictionaries) {
      <app-resume-dictionary
        [resumeDictionaryData]="item.dictionaries"
      ></app-resume-dictionary>
      } }
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
  @Input() resumeCardData!: ResumeEntry[];
  @Input() title!: string;
}
