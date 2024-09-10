import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';

import {
  ResumeCardComponent,
  ResumeDictionaryComponent,
  ResumeHeaderComponent,
} from '..';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [
    CommonModule,
    ResumeCardComponent,
    ResumeDictionaryComponent,
    ResumeHeaderComponent,
    MatCardModule,
    TranslocoDirective,
  ],
  host: {
    class: 'overflow-container',
  },
})
export class ResumeComponent {}
