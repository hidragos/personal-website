import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { StyleManagerService } from '../style-manager/style-manager.service';
import { ThemeStorageService } from '../theme-storage-service/theme-storage.service';

export type ThemeType = 'dark' | 'light';
export interface SiteTheme {
  background: string;
  color: string;
  displayName: string;
  name: string;
}

const DEFAULT_THEME = 'rose-red';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentThemeName = signal<string>(DEFAULT_THEME);
  themeType = signal<ThemeType>('light');
  themes: SiteTheme[] = this.getThemesList();
  translocoService = inject(TranslocoService);

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorageService
  ) {}

  getThemesList() {
    return [
      {
        color: '#ffd9e1',
        displayName: 'labels.themepicker.flamingo_gleam',
        name: 'rose-red',
        background: this.themeType() === 'dark' ? '#191a1e' : '#fffbff',
      },
      {
        color: '#d7e3ff',
        displayName: 'labels.themepicker.dolphin_dream',
        name: 'azure-blue',
        background: this.themeType() === 'dark' ? '#191a1e' : '#fffbff',
      },
    ];
  }

  async initializeTheme() {
    const themeName = this._themeStorage.getStoredThemeName() || DEFAULT_THEME;
    const themeType = this._themeStorage.getStoredThemeType() || 'light';
    this.themeType.set(themeType);

    this.selectTheme(themeName);
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    ) as SiteTheme;
    if (!theme) return;

    this.currentThemeName.set(theme.name);
    const themeType = this.themeType();
    const themeCssClass = `${theme.name}-${themeType}.css`;

    this.styleManager.setStyle(themeCssClass);

    this._themeStorage.storeTheme(themeName);

    this.themes = this.getThemesList();
  }

  selectThemeType(themeType: ThemeType) {
    this.themeType.set(themeType);
    this._themeStorage.storeThemeType(themeType);
    this.selectTheme(this.currentThemeName());
  }

  toggleThemeType() {
    const newValue = this.themeType() === 'light' ? 'dark' : 'light';
    this.selectThemeType(newValue);
  }
}
