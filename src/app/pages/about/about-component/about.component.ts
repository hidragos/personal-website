import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { FooterComponent } from 'src/app/shared/footer';

import { AboutContentComponent } from '../about-content/about-content.component';
import { AboutHeaderComponent } from '../about-header/about-header.component';
import { AboutSocialsComponent } from '../about-socials/about-socials.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatCardModule,
    AboutHeaderComponent,
    AboutContentComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AboutSocialsComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
