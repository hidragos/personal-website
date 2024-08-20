import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  ResumeEducationComponent,
  ResumeExperienceComponent,
  ResumeHeaderComponent,
  ResumeVolunteeringComponent,
} from '..';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [
    CommonModule,
    ResumeHeaderComponent,
    ResumeEducationComponent,
    ResumeExperienceComponent,
    ResumeVolunteeringComponent,
  ],
})
export class ResumeComponent {}
