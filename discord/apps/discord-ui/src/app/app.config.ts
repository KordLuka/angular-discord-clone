import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import {
  TranslateLoader,
  TranslateModule,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firebaseProviders, firebaseOptionsProvider } from '@discord/libs/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    importProvidersFrom(TranslateStore),
    firebaseOptionsProvider,
    firebaseProviders,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom([MatDialogModule]),
  ],
};
