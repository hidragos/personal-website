import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { ResumeCardComponent } from '../..';

@Component({
  selector: 'app-resume-education',
  standalone: true,
  imports: [TranslocoDirective, CommonModule, ResumeCardComponent],
  template: `
    <ng-container *transloco="let t">
      <app-resume-card
        [title]="t('education')"
        [resumeCardData]="[
          {
            title: t('education.university'),
            location: t('education.university.location'),
            date: t('education.university.date'),
            lines: [
              t('education.university.line1'),
              t('education.university.line2')
            ]
          },
          {
            title: t('education.highschool'),
            location: t('education.highschool.location'),
            date: t('education.highschool.date'),
            lines: [
              t('education.highschool.line1'),
              t('education.highschool.line2'),
              t('education.highschool.line3')
            ]
          }
        ]"
      ></app-resume-card>
    </ng-container>
  `,
})
export class ResumeEducationComponent {}
