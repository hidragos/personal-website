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
        <mat-card-title style="wtf">
          {{ title | titlecase }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @for (item of resumeCardData; track item) {

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

        <div class="mt-6">
          <ng-content></ng-content>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .top-18 {
        top: calc(4rem);
      }
    `,
  ],
})
export class ResumeCardComponent {
  @Input() title!: string;
  @Input() resumeCardData!: ResumeCardData[];
}
