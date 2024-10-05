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
    MatDividerModule,
  ],
  template: `
    @if(title){
    <div class="my-4">
      <mat-divider></mat-divider>
      <h3>{{ title }}</h3>
    </div>
    }
    <div class="flex flex-col">
      @for(item of resumeCardData; track item; let first = $first) {
      <div
        class="mb-2 flex flex-row justify-between"
        [ngClass]="{ 'mt-4': !first }"
      >
        <div
          class="flex sm:flex-wrap flex-col items-start flex-1 mr-4"
          *ngIf="item.title"
        >
          <span class="font-semibold">{{ item.title }}</span>
          <span> {{ item.location }}</span>
        </div>
        <span class="text-normal date shrink-0 justify-end text-right">{{
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
