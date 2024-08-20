import { EventEmitter, Injectable } from '@angular/core';

export interface SiteTheme {
  name: string;
  displayName?: string;
  color: string;
  background: string;
  isDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
  static storageKey = 'theme-storage-current-name';

  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

  storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch {}

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch {}
  }
}
