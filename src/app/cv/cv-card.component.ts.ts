import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

export class CvCardData {
  title?: string;
  location?: string;
  date?: string;
  lines?: string[];
}

@Component({
  selector: 'app-cv-card',
  standalone: true,
  imports: [TranslocoPipe, CommonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>
          {{ title | titlecase }}
        </mat-card-title>
        <!-- <mat-card-subtitle>Herding group</mat-card-subtitle> -->
      </mat-card-header>
      <mat-card-content>
        <div class="border border-b-0 border-color"></div>

        <div *ngFor="let item of cvCardData" class="mt-1">
          <div
            slot="heading"
            class="flex flex-row justify-between items-center"
          >
            <div>
              <span class="font-bold">{{ item.title }}</span
              >, {{ item.location }}
              <!-- <span class="font-bold">{{ item.title }}</span>
          <span>{{ item.location }}</span> -->
            </div>
            <span class="text-xs">{{ item.date }}</span>
          </div>
          <ul class="list-disc ml-6">
            <li *ngFor="let line of item.lines">{{ line }}</li>
          </ul>
        </div>

        <!-- display passed content -->
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
})
export class CvCardComponent {
  @Input() title!: string;
  @Input() cvCardData!: CvCardData[];
}
