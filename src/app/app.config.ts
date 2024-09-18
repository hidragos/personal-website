import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { SupabaseService, ThemeService, TranslationService } from '@shared';

import { routes } from './app.routes';
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
          translocoService: TranslocoService,
          supabaseService: SupabaseService
        ) =>
        async () => {
          supabaseService.initializeSupabase();
          availableLanguages.forEach((lang) =>
            translocoService.load(lang).subscribe()
          );

          translationService.initializeTranslation();
          themeService.initializeTheme();
        },
      deps: [
        TranslationService,
        ThemeService,
        TranslocoService,
        SupabaseService,
      ],
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
      },
    },
  ],
};

async function sleep(time: number): Promise<null> {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
