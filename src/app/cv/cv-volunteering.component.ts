import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { CvCardComponent } from './cv-card.component.ts';

@Component({
  selector: 'app-cv-volunteering',
  standalone: true,
  imports: [TranslocoDirective, CommonModule, CvCardComponent],
  template: `
    <ng-container *transloco="let t">
      <app-cv-card
        [title]="t('volunteering')"
        [cvCardData]="[
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
      ></app-cv-card>
    </ng-container>
  `,
})
export class CvVolunteeringComponent {}
