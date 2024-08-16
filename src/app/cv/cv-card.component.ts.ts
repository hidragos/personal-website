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
    <div class="sticky top-0 bg-white z-0">
      <h1 class="text-xl font-bold">
        {{ title | titlecase }}
      </h1>
      <div class="border border-b-0 border-gray-200"></div>
    </div>

    <div *ngFor="let item of cvCardData" class="mt-1">
      <div slot="heading" class="flex flex-row justify-between items-center">
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
  `,
  styles: [
    `
      .top-18 {
        top: calc(4rem);
      }
    `,
  ],
})
export class CvCardComponent {
  @Input() title!: string;
  @Input() cvCardData!: CvCardData[];
}
