import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export class CvDictionaryData {
  key?: string;
  value?: string;
}

@Component({
  selector: 'app-cv-dictionary',
  standalone: true,
  imports: [TranslocoPipe, CommonModule],
  template: `
    <div *ngFor="let item of cvDictionaryData">
      <span class="font-bold">{{ item.key }}</span
      >:
      <span>{{ item.value }}</span>
    </div>
  `,
})
export class CvDictionaryComponent {
  @Input() cvDictionaryData!: CvDictionaryData[];
}
