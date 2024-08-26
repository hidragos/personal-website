import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-resume-card',
  standalone: true,
  imports: [TranslocoPipe, CommonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>
          {{ title }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="flex flex-col gap-2">
          @for (item of resumeCardData; track item.title) {
          <div>
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
        </div>

        <ng-content #ngContent></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [``],
})
export class ResumeCardComponent {
  @Input() resumeCardData!: ResumeCardData[];
  @Input() title!: string;
}

export interface ResumeCardData {
  date: string;
  lines: string[];
  location: string;
  title: string;
}
