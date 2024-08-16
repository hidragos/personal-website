import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type LangType = 'en' | 'es';

export interface Language {
  code: LangType;
  emoji: string;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  translate = inject(TranslocoService);

  LANGUAGES: { [key: string]: Language } = {
    en: {
      code: 'en',
      emoji: '🇬🇧',
    },
    es: {
      code: 'es',
      emoji: '🇪🇸',
    },
  };

  languageArray: Language[] = Object.values(this.LANGUAGES);

  activeLang: LangType = 'en';
  isHoveringOver?: LangType | null;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  @ViewChild('button') button!: HTMLButtonElement;

  changeLanguage(lang: LangType): void {
    this.activeLang = lang;
    this.setLocalStorageActiveLang(lang);
    this.translate.setActiveLang(lang);
  }

  ngOnInit(): void {
    const activeLang = this.getLocalStorageActiveLang() as LangType;
    this.activeLang = activeLang || 'en';
    this.setLocalStorageActiveLang(this.activeLang);
    this.translate.setActiveLang(this.activeLang);
  }

  getLocalStorageActiveLang(): string | null {
    return this.isLocalStorageAvailable ? localStorage?.getItem('activeLang') : null;
  }

  setLocalStorageActiveLang(lang: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage?.setItem('activeLang', lang);
    }
  }
}
