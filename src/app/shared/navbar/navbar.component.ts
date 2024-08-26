import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

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
    ThemePickerComponent,
    NgTemplateOutlet,
    MatTooltipModule,
    TranslocoDirective,
    MatIconModule,
  ],
})
export class NavBarComponent {
  showTitle = true;
}
