import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import {
  LANGUAGES,
  TranslationService,
} from './translation-service/translation.service';

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
})
export class LanguagePickerComponent {
  @Input() isHandheld = false;
  fullLanguagesMap: { [key: string]: string } = {
    en: 'English',
    es: 'Español',
  };

  languages = LANGUAGES;

  translationService = inject(TranslationService);

  getLanguageName(code: string) {
    return this.isHandheld ? this.fullLanguagesMap[code] || code : code;
  }
}
