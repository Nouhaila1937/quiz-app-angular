import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config'; 
import { provideHttpClient } from '@angular/common/http'; // Ajout de l'import pour HTTP
import { routes } from './app.routes';
import CustomPreset from './customPreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), // Ajout du provider HTTP
    providePrimeNG({
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: false // Désactive le mode sombre automatique
        }
      }
    })
  ]
};