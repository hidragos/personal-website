import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SidenavContainerService } from '../../sidenav-container/sidenav-container.service';
import {
  LANGUAGES,
  TranslationService,
} from '../translation-service/translation.service';

@Component({
  selector: 'translation-navbar-widget',
  templateUrl: './translation-navbar-widget.component.html',
  styleUrls: ['./translation-navbar-widget.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
})
export class TranslationNavbarWidgetComponent {
  fullLanguagesMap: { [key: string]: string } = {
    en: 'English',
    es: 'Español',
  };
  languages = LANGUAGES;
  sidenavContainerService = inject(SidenavContainerService);
  translationService = inject(TranslationService);
}
