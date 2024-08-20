import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ThemePicker } from '../theme-picker/theme-picker';
import { VersionPicker } from '../version-picker/version-picker';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    VersionPicker,
    ThemePicker,
    NgTemplateOutlet,
    MatTooltipModule,
  ],
})
export class NavBarComponent {
  showTitle = true;
}
