import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslationService } from './shared/language-picker';
import { ThemeService } from './shared/theme-picker';
import { TranslateHttpLoader } from './translate-loader';

const availableLanguages = ['en', 'es'];

export const appConfig: ApplicationConfig = {
  providers: [
    provideTransloco({
      config: {
        availableLangs: availableLanguages,
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslateHttpLoader,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory:
        (
          translationService: TranslationService,
          themeService: ThemeService,
          translocoService: TranslocoService
        ) =>
        () => {
          // Download all translations
          availableLanguages.forEach((lang) =>
            translocoService.load(lang).subscribe()
          );

          translationService.initializeTranslation();
          themeService.initializeTheme();
        },
      deps: [TranslationService, ThemeService, TranslocoService],
      multi: true,
    },
  ],
};
