import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { StyleManagerService } from '../style-manager/style-manager.service';
import { ThemeType } from '../theme-picker.component';
import { ThemeStorageService } from '../theme-storage-service/theme-storage.service';

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
  translocoService = inject(TranslocoService);
  themes: SiteTheme[] = [
    {
      color: '#ffd9e1',
      displayName: 'labels.themepicker.flamingo_gleam',
      name: 'rose-red',
      background: '#fffbff',
      isDefault: true,
    },
    {
      color: '#d7e3ff',
      displayName: 'labels.themepicker.dolphin_dream',
      name: 'azure-blue',
      background: '#fdfbff',
    },
  ];
  currentTheme = signal<SiteTheme>(
    this.themes.find((theme) => theme.isDefault === true) as SiteTheme
  );
  themeType = signal<ThemeType>('light');

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorageService
  ) {}

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
