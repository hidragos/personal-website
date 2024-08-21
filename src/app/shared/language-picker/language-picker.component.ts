import { Component, inject } from '@angular/core';
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
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class LanguagePickerComponent {
  languages = LANGUAGES;
  translationService = inject(TranslationService);
}
