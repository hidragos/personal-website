import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

export class ResumeCardData {
  title?: string;
  location?: string;
  date?: string;
  lines?: string[];
}

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [TranslocoPipe, CommonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>
          {{ title | titlecase }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="resume-card-separator"></div>

        @for (item of resumeCardData; track item.title) {

        <div class="mt-1">
          <div
            slot="heading"
            class="flex flex-row justify-between items-center"
          >
            <div>
              <span class="font-bold">{{ item.title }}</span
              >, {{ item.location }}
            </div>
            <span class="text-xs">{{ item.date }}</span>
          </div>
          <ul class="list-disc ml-6">
            @for (line of item.lines; track line) {
            <li>{{ line }}</li>
            }
          </ul>
        </div>
        }

        <ng-content #ngContent></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .resume-card-separator {
        @apply border border-b-0 mt-2 my-1;
      }
    `,
  ],
})
export class ResumeCardComponent {
  @Input() title!: string;
  @Input() resumeCardData!: ResumeCardData[];
}
