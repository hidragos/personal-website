import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';

import { AboutHeaderComponent } from './about-header/about-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatCardModule,
    AboutHeaderComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
