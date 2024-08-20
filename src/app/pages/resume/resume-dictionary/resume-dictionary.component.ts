import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export class ResumeDictionaryData {
  key?: string;
  value?: string;
}

@Component({
  selector: 'app-resume-dictionary',
  standalone: true,
  imports: [TranslocoPipe, CommonModule],
  template: `
    @for (item of resumeDictionaryData; track item.key) {
    <div>
      <span class="font-bold">{{ item.key }}</span
      >:
      <span>{{ item.value }}</span>
    </div>
    }
  `,
})
export class ResumeDictionaryComponent {
  @Input() resumeDictionaryData!: ResumeDictionaryData[];
}
