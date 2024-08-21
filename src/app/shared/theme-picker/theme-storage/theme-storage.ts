import { Injectable } from '@angular/core';

import { ThemeType } from '../theme-picker.component';

export interface SiteTheme {
  name: string;
  displayName?: string;
  color: string;
  background: string;
  isDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
  static NAME_STORAGE = 'theme-name';
  static TYPE_STORAGE = 'theme-type';

  storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeStorage.NAME_STORAGE] = theme.name;
    } catch {}
  }

  storeThemeType(themeType: ThemeType) {
    try {
      window.localStorage[ThemeStorage.TYPE_STORAGE] = themeType;
    } catch {}
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.NAME_STORAGE] || null;
    } catch {
      return null;
    }
  }

  getStoredThemeType(): ThemeType | null {
    try {
      return window.localStorage[ThemeStorage.TYPE_STORAGE] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.NAME_STORAGE);
      window.localStorage.removeItem(ThemeStorage.TYPE_STORAGE);
    } catch {}
  }
}
