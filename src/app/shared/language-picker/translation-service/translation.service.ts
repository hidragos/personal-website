import { inject, Injectable, signal } from '@angular/core';
import { Translation, TranslocoService } from '@jsverse/transloco';

export type LangType = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private translocoService = inject(TranslocoService);
  allTranslations = signal<Translation>({});
  firstInit = true;

  activeLang = signal<LangType>('en');

  changeLanguage(lang: LangType): void {
    this.activeLang.set(lang);
    this.setLocalStorageLang(lang);
    this.translocoService.setActiveLang(lang);
    this.translocoService.setDefaultLang(lang);
  }

  initializeTranslation(): void {
    const localStorageLang = this.getLocalStorageLang();
    this.activeLang.set(localStorageLang);
    this.translocoService.setActiveLang(localStorageLang);
  }

  private getLocalStorageLang(): LangType {
    const lang = this.isLocalStorageAvailable
      ? localStorage?.getItem(LOCALSTORAGE_KEY) ?? DEFAULT_LANG
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
