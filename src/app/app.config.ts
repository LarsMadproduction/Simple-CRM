import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-e555a',
        appId: '1:792732140427:web:630f797a1b3abfcbe0e58e',
        storageBucket: 'simple-crm-e555a.firebasestorage.app',
        apiKey: 'AIzaSyBzYqjfvFlz2aAvZksU5ZAjIDcC9fQgchE',
        authDomain: 'simple-crm-e555a.firebaseapp.com',
        messagingSenderId: '792732140427',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
  ],
};
