import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { ResumeEducationComponent as ResumeEducationComponent } from './resume-education.component';
import { ResumeExperienceComponent as ResumeExperienceComponent } from './resume-experience.component';
import { ResumeHeaderComponent as ResumeHeaderComponent } from './resume-header.component';
import { ResumeVolunteeringComponent as ResumeVolunteeringComponent } from './resume-volunteering.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  providers: [
    provideTranslocoScope({
      scope: '',
    }),
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [
    TranslocoPipe,
    CommonModule,
    ResumeHeaderComponent,
    ResumeEducationComponent,
    ResumeExperienceComponent,
    ResumeVolunteeringComponent,
  ],
})
export class ResumeComponent implements OnInit {
  translate = inject(TranslocoService);

  ngOnInit(): void {}
}
