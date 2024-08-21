import { Injectable } from '@angular/core';

import { ThemeType } from '../theme-picker.component';

const NAME_STORAGE = 'theme-name';
const TYPE_STORAGE = 'theme-type';

@Injectable({ providedIn: 'root' })
export class ThemeStorageService {
  clearStorage() {
    try {
      window.localStorage.removeItem(NAME_STORAGE);
      window.localStorage.removeItem(TYPE_STORAGE);
    } catch {}
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[NAME_STORAGE] || null;
    } catch {
      return null;
    }
  }

  getStoredThemeType(): ThemeType | null {
    try {
      return window.localStorage[TYPE_STORAGE] || null;
    } catch {
      return null;
    }
  }

  storeTheme(themeName: string) {
    try {
      window.localStorage[NAME_STORAGE] = themeName;
    } catch {}
  }

  storeThemeType(themeType: ThemeType) {
    try {
      window.localStorage[TYPE_STORAGE] = themeType;
    } catch {}
  }
}
