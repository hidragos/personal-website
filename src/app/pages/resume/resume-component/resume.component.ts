import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

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
    MatIconModule,
    TranslocoDirective,
    MatButtonModule,
    TranslocoPipe,
  ],
  host: {
    class: 'overflow-container',
  },
})
export class ResumeComponent {}
