import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';
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
  ],
})
export class NavBarComponent {
  sidenavContainerService = inject(SidenavContainerService);
  router = inject(Router);

  toggleDrawer() {
    this.sidenavContainerService.toggleDrawer();
  }
}
