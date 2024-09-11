import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';

import { AboutContentComponent } from '../about-content/about-content.component';
import { AboutHeaderComponent } from '../about-header/about-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatCardModule,
    AboutHeaderComponent,
    AboutContentComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  host: {
    class: 'overflow-container',
  },
})
export class AboutComponent {}
