import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StyleManagerService } from '../style-manager/style-manager.service';
import { SiteTheme, ThemeStorage } from './theme-storage/theme-storage';

export type ThemeType = 'dark' | 'light';
@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.component.html',
  styleUrls: ['theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    MatButtonToggleModule,
  ],
})
export class ThemePickerComponent {
  currentTheme!: SiteTheme;
  themeType: ThemeType = 'light';

  themes: SiteTheme[] = [
    {
      color: '#ffd9e1',
      displayName: 'Rose & Red',
      name: 'rose-red',
      background: '#fffbff',
      isDefault: true,
    },
    {
      color: '#d7e3ff',
      displayName: 'Azure & Blue',
      name: 'azure-blue',
      background: '#fdfbff',
    },
  ];

  constructor(
    public styleManager: StyleManagerService,
    private _themeStorage: ThemeStorage
  ) {
    this.initTheme();
  }

  initTheme() {
    const defaultTheme = this.themes.find(
      (theme) => theme.isDefault === true
    ) as SiteTheme;

    const themeName =
      this._themeStorage.getStoredThemeName() || defaultTheme.name;
    this.themeType = this._themeStorage.getStoredThemeType() || 'light';

    this.selectTheme(themeName);
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    ) as SiteTheme;
    if (!theme) return;

    this.currentTheme = theme;

    const themeCssClass = `${theme.name}-${this.themeType}.css`;
    console.log(themeCssClass);
    this.styleManager.setStyle('theme', themeCssClass);

    this._themeStorage.storeTheme(this.currentTheme);
  }

  selectThemeType(themeType: ThemeType) {
    this.themeType = themeType;
    this._themeStorage.storeThemeType(this.themeType);
    this.selectTheme(this.currentTheme.name);
  }

  toggleThemeType() {
    this.themeType = this.themeType === 'light' ? 'dark' : 'light';
    this.selectThemeType(this.themeType);
  }
}
