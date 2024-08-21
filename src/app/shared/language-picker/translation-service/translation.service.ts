import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type LangType = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private translate = inject(TranslocoService);

  activeLang = signal<LangType>('en');
  isLoaded = signal(false);

  changeLanguage(lang: LangType): void {
    this.activeLang.set(lang);
    this.setLocalStorageLang(lang);
    this.translate.setActiveLang(lang);
    this.translate.setDefaultLang(lang);
  }

  initializeTranslation(): void {
    const localStorageLang = this.getLocalStorageLang();
    this.activeLang.set(localStorageLang);
    this.translate.setActiveLang(localStorageLang);

    this.isLoaded.set(true);
  }

  private getLocalStorageLang(): LangType {
    const lang = this.isLocalStorageAvailable
      ? localStorage?.getItem(LOCALSTORAGE_KEY)
      : DEFAULT_LANG;

    return lang as LangType;
  }

  private setLocalStorageLang(lang: string): void {
    if (this.isLocalStorageAvailable)
      localStorage?.setItem(LOCALSTORAGE_KEY, lang);
  }
}

export const LANGUAGES: LangType[] = ['en', 'es'];
export const DEFAULT_LANG = 'es';
const LOCALSTORAGE_KEY = 'activeLang';
