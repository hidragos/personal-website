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
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslationService } from './shared/language-picker';
import { ThemeService } from './shared/theme-picker';
import { TranslateHttpLoader } from './translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
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
        (translationService: TranslationService, themeService: ThemeService) =>
        () => {
          /*
           * This is a workaround to initialize the translation and theme services
           * after the application has been bootstrapped. The holy setTimeout awaits the GET of the translation files. Otherwise, the translation service will not be able to translate the theme names.
           */

          setTimeout(() => {
            translationService.initializeTranslation();
            themeService.initializeTheme();
          });
        },
      deps: [TranslationService, ThemeService],
      multi: true,
    },
  ],
};
