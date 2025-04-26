import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config'; 
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import { routes } from './app.routes';
import CustomPreset from './customPreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
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
