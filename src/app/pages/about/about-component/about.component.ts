import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';

import { AboutContentComponent, AboutHeaderComponent } from '..';

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
})
export class AboutComponent {}
