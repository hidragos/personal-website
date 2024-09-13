import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { QtAliensComponent } from '../qt-aliens/qt-aliens.component';
import { SectionsNavigatorComponent } from '../sections-navigator/sections-navigator.component';
import { SidenavContainerService } from '../sidenav-container';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LanguagePickerComponent,
    ThemePickerComponent,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    RouterModule,
    QtAliensComponent,
    SectionsNavigatorComponent,
  ],
})
export class NavBarComponent {
  router = inject(Router);
  sidenavContainerService = inject(SidenavContainerService);

  toggleDrawer() {
    this.sidenavContainerService.toggleDrawer();
  }
}
