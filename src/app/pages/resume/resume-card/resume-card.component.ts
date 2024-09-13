import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoPipe } from '@jsverse/transloco';

import { ResumeDictionaryComponent } from '../resume-dictionary/resume-dictionary.component';
import { ResumeEntry } from '../resume.service';

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [
    TranslocoPipe,
    MatCardModule,
    ResumeDictionaryComponent,
    MatDividerModule,
    CommonModule,
  ],
  template: `
    <mat-card-header *ngIf="title" class="border-primary-container">
      <mat-card-title class="pb-3">
        {{ title }}
      </mat-card-title>
    </mat-card-header>
    <div class="flex flex-col content-text">
      @for (item of resumeCardData; track item.title) { @if (item.title &&
      item.location) {
      <div slot="heading" class="heading-container mt-4">
        <div class="title-container">
          <span class="font-bold">{{ item.title }}</span>
          <span class="comma">&comma; &nbsp;</span>
          <span> {{ item.location }}</span>
        </div>
        <span class="date">{{ item.date }}</span>
      </div>
      }
      <ul class="list-disc list-inside mt-2">
        @for (line of item.lines; track line) {
        <li>{{ line }}</li>
        }
      </ul>

      @if (item.plainText) {
      <span>{{ item.plainText }}</span>
      } @if (item.dictionaries) {
      <app-resume-dictionary
        [resumeDictionaryData]="item.dictionaries"
      ></app-resume-dictionary>
      } }
    </div>
  `,
  styles: [
    `
      // hpow cna i access all elements with ::marker in css?
      //a: https://stackoverflow.com/questions/6541127/css-select-all-elements-that-have-a-marker-pseudo-element
      @media (min-width: 900px) {
        .title-container {
          @apply flex flex-row flex-wrap justify-between items-center;
        }
        .heading-container {
          @apply flex flex-row flex-wrap justify-between items-center;
        }
        .date {
          font-size: small;
        }
      }
      @media (max-width: 900px) {
        .title-container {
          @apply flex flex-col items-start;
        }
        .comma {
          display: none;
        }
        .heading-container {
          @apply flex flex-col items-start;
        }
      }

      mat-card-header {
        @apply border-b;
      }
    `,
  ],
})
export class ResumeCardComponent {
  @Input() resumeCardData!: ResumeEntry[];
  @Input() title!: string;
}
