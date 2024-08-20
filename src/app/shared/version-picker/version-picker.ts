import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoService } from '@jsverse/transloco';

const versionUrl = 'https://material.angular.io/assets/versions.json';

export type LangType = 'en' | 'es';

export interface Language {
  code: LangType;
  emoji: string;
}

@Component({
  selector: 'version-picker',
  templateUrl: './version-picker.html',
  styleUrls: ['./version-picker.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    AsyncPipe,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VersionPicker implements OnInit {
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

  socialPlatforms = [
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/dragos-andrei-iliescu-b3005117b/',
    },
    {
      name: 'github',
      link: 'https://github.com/hidragos',
    },
    {
      name: 'stackoverflow',
      link: 'https://stackoverflow.com/users/11674485/dragos-andrei',
    },
  ];

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
    return this.isLocalStorageAvailable
      ? localStorage?.getItem('activeLang')
      : null;
  }

  setLocalStorageActiveLang(lang: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage?.setItem('activeLang', lang);
    }
  }
}
