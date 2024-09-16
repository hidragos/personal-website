import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { AuthSidenavWidgetComponent } from '../auth/auth-sidenav-widget/auth-sidenav-widget.component';
import { QtAliensComponent } from '../qt-aliens/qt-aliens.component';
import { SectionsNavigatorComponent } from '../sections-navigator/sections-navigator.component';
import { SidenavContainerService } from '../sidenav-container';
import { ThemeNavbarWidgetComponent } from '../theme/theme-navbar-widget/theme-navbar-widget.component';
import { TranslationNavbarWidgetComponent } from '../translation/translation-navbar-widget/translation-navbar-widget.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    TranslationNavbarWidgetComponent,
    ThemeNavbarWidgetComponent,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    RouterModule,
    QtAliensComponent,
    SectionsNavigatorComponent,
    AuthSidenavWidgetComponent,
  ],
})
export class NavBarComponent {
  router = inject(Router);
  sidenavContainerService = inject(SidenavContainerService);
  showAuthButton = false;

  toggleDrawer() {
    this.sidenavContainerService.toggleDrawer();
  }
}
