import { inject, Injectable } from '@angular/core';

import { ThemeType } from '..';
import { LocalStorageService } from '../../local-storage/local-storage.service';

const NAME_STORAGE = 'theme-name';
const TYPE_STORAGE = 'theme-type';

@Injectable({ providedIn: 'root' })
export class ThemeStorageService {
  browserStorage = inject(LocalStorageService);

  getStoredThemeName(): string | null {
    return this.browserStorage.get(NAME_STORAGE);
  }

  getStoredThemeType(): ThemeType | null {
    return this.browserStorage.get(TYPE_STORAGE) as ThemeType;
  }

  storeTheme(themeName: string) {
    this.browserStorage.set(NAME_STORAGE, themeName);
  }

  storeThemeType(themeType: ThemeType) {
    this.browserStorage.set(TYPE_STORAGE, themeType);
  }
}
