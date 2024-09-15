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

import { SidenavContainerService } from '../../sidenav-container/sidenav-container.service';
import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'theme-navbar-widget',
  templateUrl: 'theme-navbar-widget.component.html',
  styleUrls: ['theme-navbar-widget.component.scss'],
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
export class ThemeNavbarWidgetComponent {
  sidenavContainerService = inject(SidenavContainerService);
  themeService = inject(ThemeService);

  toggleDrawer() {
    this.sidenavContainerService.toggleDrawer();
  }
}
