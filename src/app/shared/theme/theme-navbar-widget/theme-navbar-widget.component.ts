import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';

import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'theme-navbar-widget',
  standalone: true,
  template: `<button
    mat-icon-button
    color="primary"
    (click)="this.themeService.toggleThemeType()"
  >
    <mat-icon class="xs-icon">
      {{ this.themeService.themeType === 'light' ? 'dark_mode' : 'light_mode' }}
    </mat-icon>
  </button> `,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatRippleModule,
    TranslocoDirective,
  ],
})
export class ThemeNavbarWidgetComponent {
  themeService = inject(ThemeService);
}
