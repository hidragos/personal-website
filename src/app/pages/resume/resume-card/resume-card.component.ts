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
    <div class="flex flex-col gap-2">
      @for (item of resumeCardData; track item.title) {
      <div>
        @if (item.title && item.location) {
        <div
          slot="heading"
          class="flex flex-row justify-between items-center ml-4 mt-2"
        >
          <div>
            <span class="font-bold">{{ item.title }}</span
            >, {{ item.location }}
          </div>
          <span class="text-xs">{{ item.date }}</span>
        </div>
        }
        <ul class="list-disc ml-6 mt-2">
          @for (line of item.lines; track line) {
          <li>{{ line }}</li>
          }
        </ul>
      </div>
      }
    </div>
  `,
  styles: [``],
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
