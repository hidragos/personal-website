import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CvEducationComponent } from './cv-education.component';
import { CvExperienceComponent } from './cv-experience.component';
import { CvHeaderComponent } from './cv-header.component';
import { CvVolunteeringComponent } from './cv-volunteering.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  providers: [
    provideTranslocoScope({
      scope: '',
    }),
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
  imports: [
    TranslocoPipe,
    CommonModule,
    CvHeaderComponent,
    CvEducationComponent,
    CvExperienceComponent,
    CvVolunteeringComponent,
    ToolbarComponent,
    ToolbarComponent
],
})
export class CvComponent implements OnInit {
  translate = inject(TranslocoService);

  ngOnInit(): void {}
}
