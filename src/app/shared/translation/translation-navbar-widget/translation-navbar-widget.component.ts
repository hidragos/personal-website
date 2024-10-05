import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
    ro: 'Română',
  };
  languages = LANGUAGES;
  translationService = inject(TranslationService);

  getFullLanguageName(lang: string): string {
    return this.fullLanguagesMap[lang];
  }
}
