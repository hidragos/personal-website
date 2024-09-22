import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { appSections } from '../navbar/navbar.service';
import { SidenavContainerService } from '../sidenav-container/sidenav-container.service';

@Component({
  selector: 'app-sections-navigator',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    TranslocoDirective,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './sections-navigator.component.html',
  styleUrl: './sections-navigator.component.scss',
})
export class SectionsNavigatorComponent {
  sidenavContainerService = inject(SidenavContainerService);
  sections = appSections.filter((section) => !section.hidden);

  onClick() {
    if (this.isHandheld) {
      this.sidenavContainerService.toggleDrawer();
    }
  }

  get isHandheld() {
    return this.sidenavContainerService.isHandheld;
  }
}
