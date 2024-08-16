import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  imports: [TranslocoPipe, CommonModule],
  template: `
    <div>
      <h1 class="text-xl font-bold">
        {{ title | titlecase }}
      </h1>
      <div class="border border-gray-200">
        <!-- Iterate cvCardDate, and for each item, display the title, location, date, and lines -->
        <div *ngFor="let item of cvCardData">
          <h2 class="text-lg font-bold">{{ item.title }}</h2>
          <span>{{ item.location }}</span>
          <span>{{ item.date }}</span>
          <div *ngFor="let line of item.lines">
            <span>{{ line }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CvCardComponent {
  @Input() title!: string;
  @Input() cvCardData!: CvCardData[];
}
