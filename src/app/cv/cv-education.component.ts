import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { CvCardComponent, CvCardData } from './cv-card.component.ts';

@Component({
  selector: 'app-cv-education',
  standalone: true,
  imports: [TranslocoDirective, CommonModule, CvCardComponent],
  template: `
    <ng-container *transloco="let t">
      <app-cv-card
        [title]="t('education')"
        [cvCardData]="[
          {
            title: t('education.university')
          }
        ]"
      ></app-cv-card>
    </ng-container>
  `,
})
export class CvEducationComponent {
  cvCardData: CvCardData[] = [
    {
      title: 'University of Valencia',
      location: 'Valencia, VLC, ES',
      date: '2019 - 2021',
      lines: [
        'Master of Science in Artificial Intelligence',
        'Thesis: "A Deep Learning Approach to Predicting the Stock Market"',
      ],
    },
  ];
}
