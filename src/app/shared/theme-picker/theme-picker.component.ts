import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';

import { SidenavContainerService } from '../sidenav-container';
import { ThemeService } from './theme-service/theme.service';

export type ThemeType = 'dark' | 'light';

@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.component.html',
  styleUrls: ['theme-picker.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatRippleModule,
    TranslocoDirective,
  ],
})
export class ThemePickerComponent {
  get isHandheld(): boolean {
    return this.sidenavContainerService.isHandheld;
  }

  themeService = inject(ThemeService);
  sidenavContainerService = inject(SidenavContainerService);

  toggleDrawer() {
    this.sidenavContainerService.toggleDrawer();
  }
}
