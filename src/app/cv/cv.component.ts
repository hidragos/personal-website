import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { CvEducationComponent } from './cv-education.component';
import { CvExperienceComponent } from './cv-experience.component';
import { CvTitleComponent } from './cv-title.component';

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
    CvTitleComponent,
    CvExperienceComponent,
    CvEducationComponent,
  ],
})
export class CvComponent implements OnInit {
  translate = inject(TranslocoService);

  ngOnInit(): void {}
}
