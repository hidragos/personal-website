import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { ResumeCardComponent } from './resume-card.component.ts.js';
import { ResumeDictionaryComponent } from './resume-dictionary.component.js';

@Component({
  selector: 'app-resume-experience',
  standalone: true,
  imports: [
    TranslocoDirective,
    CommonModule,
    ResumeCardComponent,
    ResumeDictionaryComponent,
  ],
  template: `
    <ng-container *transloco="let t">
      <app-resume-card
        [title]="t('experience')"
        [resumeCardData]="[
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
      >
        <app-resume-dictionary
          [resumeDictionaryData]="[
            {
              key: t('experience.buzzwords.key'),
              value: t('experience.buzzwords.value')
            },
            {
              key: t('experience.languages.key'),
              value: t('experience.languages.value')
            }
          ]"
        ></app-resume-dictionary
      ></app-resume-card>
    </ng-container>
  `,
})
export class ResumeExperienceComponent {}
