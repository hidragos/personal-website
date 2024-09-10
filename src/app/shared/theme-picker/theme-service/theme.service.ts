import { Injectable, signal } from '@angular/core';

import { StyleManagerService, ThemeStorageService, ThemeType } from '..';

export interface SiteTheme {
  background: string;
  color: string;
  displayName: string;
  isDefault?: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly THEMES: SiteTheme[] = [
    {
      color: '#ffd9e1',
      displayName: 'Flamingo Gleam',
      name: 'rose-red',
      background: '#fffbff',
      isDefault: true,
    },
    {
      color: '#d7e3ff',
      displayName: 'Dolphin Dream',
      name: 'azure-blue',
      background: '#fdfbff',
    },
  ];

  currentTheme = signal<SiteTheme>(
    this.THEMES.find((theme) => theme.isDefault === true) as SiteTheme
  );
  themeType = signal<ThemeType>('light');

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorageService
  ) {}

  initializeTheme() {
    const defaultTheme = this.THEMES.find(
      (theme) => theme.isDefault === true
    ) as SiteTheme;

    const themeName =
      this._themeStorage.getStoredThemeName() || defaultTheme.name;
    const themeType = this._themeStorage.getStoredThemeType() || 'light';
    this.themeType.set(themeType);

    this.selectTheme(themeName);
  }

  selectTheme(themeName: string) {
    const theme = this.THEMES.find(
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
