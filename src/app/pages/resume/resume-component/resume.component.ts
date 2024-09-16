import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

import { ResumeCardComponent } from '../resume-card/resume-card.component';
import { ResumeDictionaryComponent } from '../resume-dictionary/resume-dictionary.component';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [
    ResumeCardComponent,
    ResumeDictionaryComponent,
    MatCardModule,
    MatIconModule,
    TranslocoDirective,
    MatButtonModule,
    TranslocoPipe,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
  ],
})
export class ResumeComponent {
  resumeService = inject(ResumeService);
}
