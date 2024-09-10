import { inject, Injectable, signal } from '@angular/core';

import { StyleManagerService, ThemeStorageService, ThemeType } from '..';
import { TranslationService } from '../../language-picker';

export interface SiteTheme {
  background: string;
  color: string;
  displayName: () => string;
  isDefault?: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  translationService = inject(TranslationService);
  private THEMES = signal<SiteTheme[]>([
    {
      color: '#ffd9e1',
      // displayname as dynamic arrow function
      displayName: () => this.translationService.instant('flamingo.gleam'),
      name: 'rose-red',
      background: '#fffbff',
      isDefault: true,
    },
    {
      color: '#d7e3ff',
      displayName: () => this.translationService.instant('dolphin.dream'),
      name: 'azure-blue',
      background: '#fdfbff',
    },
  ]);

  get themes() {
    console.log(this.translationService.allTranslations()['dolphin.dream']);
    return this.THEMES();
  }

  currentTheme = signal<SiteTheme>(
    this.themes.find((theme) => theme.isDefault === true) as SiteTheme
  );
  themeType = signal<ThemeType>('light');

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorageService
  ) {
    console.log(this.translationService.allTranslations());
  }

  async initializeTheme() {
    const defaultTheme = this.themes.find(
      (theme) => theme.isDefault === true
    ) as SiteTheme;

    const themeName =
      this._themeStorage.getStoredThemeName() || defaultTheme.name;
    const themeType = this._themeStorage.getStoredThemeType() || 'light';
    this.themeType.set(themeType);

    this.selectTheme(themeName);
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    ) as SiteTheme;
    if (!theme) return;

    this.currentTheme.set(theme);
    const themeType = this.themeType();
    const themeCssClass = `${theme.name}-${themeType}.css`;

    this.styleManager.setStyle(themeCssClass);

    this._themeStorage.storeTheme(themeName);
  }

  selectThemeType(themeType: ThemeType) {
    this.themeType.set(themeType);
    this._themeStorage.storeThemeType(themeType);
    this.selectTheme(this.currentTheme().name);
  }

  toggleThemeType() {
    const newValue = this.themeType() === 'light' ? 'dark' : 'light';
    this.selectThemeType(newValue);
  }
}
