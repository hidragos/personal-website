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
    <mat-card-header *ngIf="title">
      <mat-card-title>
        {{ title }}
      </mat-card-title>
    </mat-card-header>
    <div class="flex flex-col content-text">
      <div
        *ngFor="let item of resumeCardData; let first = first"
        slot="heading"
        class="heading-container"
        [ngClass]="{ 'mt-4': !first }"
      >
        <div class="title-container" *ngIf="item.title">
          <span class="font-bold">{{ item.title }}</span>
          <span class="comma">&comma; &nbsp;</span>
          <span> {{ item.location }}</span>
        </div>
        <span class="text-xs">{{ item.date }}</span>
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
        }
      </div>
    </div>
  `,
  styles: [
    `
      @media (min-width: 900px) {
        .title-container {
          @apply flex flex-row flex-wrap justify-between items-center;
        }
        .heading-container {
          @apply flex flex-row flex-wrap justify-between items-center;
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
    `,
  ],
})
export class ResumeCardComponent {
  @Input() resumeCardData!: ResumeEntry[];
  @Input() title!: string;
}
