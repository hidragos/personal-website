import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { ResumeCardComponent } from '../..';

@Component({
  selector: 'app-resume-volunteering',
  standalone: true,
  imports: [TranslocoDirective, CommonModule, ResumeCardComponent],
  template: `
    <ng-container *transloco="let t">
      <app-resume-card
        [title]="t('volunteering')"
        [resumeCardData]="[
          {
            title: t('volunteering.itsupport'),
            location: t('volunteering.itsupport.location'),
            date: t('volunteering.itsupport.date'),
            lines: [
              t('volunteering.itsupport.line1'),
              t('volunteering.itsupport.line2'),
              t('volunteering.itsupport.line3')
            ]
          }
        ]"
      ></app-resume-card>
    </ng-container>
  `,
})
export class ResumeVolunteeringComponent {}
