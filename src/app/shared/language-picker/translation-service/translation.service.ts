import { inject, Injectable, signal } from '@angular/core';
import { Translation, TranslocoService } from '@jsverse/transloco';
import { switchMap } from 'rxjs';

export type LangType = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private translate = inject(TranslocoService);
  allTranslations = signal<Translation>({});

  activeLang = signal<LangType>('en');

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

    this.allTranslationsSubscribe();
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

  instant(key: string): string {
    return this.allTranslations()[key];
  }

  allTranslationsSubscribe(): void {
    const langChangs$ = this.translate.langChanges$;
    const translations = langChangs$.pipe(
      switchMap(() =>
        this.translate.selectTranslation(this.translate.getActiveLang())
      )
    );

    translations.subscribe((translations) => {
      this.allTranslations.set(translations);
    });
  }
}

export const LANGUAGES: LangType[] = ['en', 'es'];
export const DEFAULT_LANG = 'es';
const LOCALSTORAGE_KEY = 'activeLang';
