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
  themeType = signal<ThemeType>('light');
  themes: SiteTheme[] = this.getThemesList();
  currentTheme = signal<SiteTheme>(
    this.themes.find((theme) => theme.isDefault === true) as SiteTheme
  );

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
        isDefault: true,
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

    this.themes = this.getThemesList();
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
