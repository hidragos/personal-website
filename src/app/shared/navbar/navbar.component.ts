import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { ThemePicker } from '../theme-picker/theme-picker';

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
    LanguagePickerComponent,
    ThemePicker,
    NgTemplateOutlet,
    MatTooltipModule,
  ],
})
export class NavBarComponent {
  showTitle = true;
}
