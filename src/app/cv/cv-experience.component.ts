import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { CvCardComponent } from './cv-card.component.ts';
import { CvDictionaryComponent } from './cv-dictionary.component.js';

@Component({
  selector: 'app-cv-experience',
  standalone: true,
  imports: [
    TranslocoDirective,
    CommonModule,
    CvCardComponent,
    CvDictionaryComponent,
  ],
  template: `
    <ng-container *transloco="let t">
      <app-cv-card
        [title]="t('experience')"
        [cvCardData]="[
          {
            title: t('experience.allround'),
            location: t('experience.allround.location'),
            date: t('experience.allround.date'),
            lines: [
              t('experience.allround.line1'),
              t('experience.allround.line2'),
              t('experience.allround.line3'),
              t('experience.allround.line4'),
              t('experience.allround.line5')
            ]
          },
          {
            title: t('experience.codecrowd'),
            location: t('experience.codecrowd.location'),
            date: t('experience.codecrowd.date'),
            lines: [
              t('experience.codecrowd.line1'),
              t('experience.codecrowd.line2'),
              t('experience.codecrowd.line3'),
              t('experience.codecrowd.line4'),
              t('experience.codecrowd.line5'),
              t('experience.codecrowd.line6'),
              t('experience.codecrowd.line7')
            ]
          }
        ]"
      ></app-cv-card>
      <app-cv-dictionary
        [cvDictionaryData]="[
          {
            key: t('experience.buzzwords.key'),
            value: t('experience.buzzwords.value')
          },
          {
            key: t('experience.languages.key'),
            value: t('experience.languages.value')
          }
        ]"
      ></app-cv-dictionary>
    </ng-container>
  `,
})
export class CvExperienceComponent {}
