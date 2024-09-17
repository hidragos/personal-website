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
      @for(item of resumeCardData; track item; let first = $first) {
      <div
        class="flex md:flex-row md:flex-wrap flex-col md:justify-between md:items-center justify-normal"
        [ngClass]="{ 'mt-4': !first }"
      >
        <div
          class="flex sm:flex-row sm:flex-wrap flex-col sm:items-center items-start mr-8 "
          *ngIf="item.title"
        >
          <span class="font-medium md:text-lg text-xl">{{ item.title }}</span>
          <span class="sm:block hidden">&comma; &nbsp;</span>
          <span> {{ item.location }}</span>
        </div>
        <span class="md:text-xs text-normal md:not-italic italic">{{
          item.date
        }}</span>
      </div>
      <ul class="list-disc list-inside flex flex-col gap-1 mt-2">
        @for (line of item.lines; track line) {
        <li>{{ line }}</li>
        }
      </ul>

      @if (item.plainText) {
      <span class="mb-4">{{ item.plainText }}</span>
      } @if (item.dictionaries) {
      <app-resume-dictionary
        [resumeDictionaryData]="item.dictionaries"
      ></app-resume-dictionary>
      } }
    </div>
  `,
  styles: [],
})
export class ResumeCardComponent {
  @Input() resumeCardData!: ResumeEntry[];
  @Input() title!: string;
}
