import { Injectable } from '@angular/core';

import { StyleManagerService } from '../style-manager/style-manager.service';
import {
  ThemeStorageService,
  ThemeType,
} from '../theme-storage-service/theme-storage.service';

export interface SiteTheme {
  background: string;
  color: string;
  displayName: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeType = 'light';
  theme = 'black-theme';

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorageService
  ) {}

  async initializeTheme() {
    const themeType = this._themeStorage.getStoredThemeType() || 'light';
    this.themeType = themeType;
    this.updateTheme();
  }

  updateTheme() {
    const themeType = this.themeType;
    const themeCssClass = `${this.theme}-${themeType}.css`;

    this.styleManager.setStyle(themeCssClass);
  }

  selectThemeType(themeType: ThemeType) {
    this.themeType = themeType;
    this._themeStorage.storeThemeType(themeType);
    this.updateTheme();
  }

  toggleThemeType() {
    const newValue = this.themeType === 'light' ? 'dark' : 'light';
    this.selectThemeType(newValue);
  }
}
