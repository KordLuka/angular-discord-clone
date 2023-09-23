import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const config = {
  apiKey: process.env['NX_API_KEY'],
  authDomain: process.env['NX_AUTH_DOMAIN'],
  projectId: process.env['NX_PROJECT_ID'],
  storageBucket: process.env['NX_STORAGE_BUCKET'],
  messagingSenderId: process.env['NX_MESSAGING_SENDER_ID'],
  appId: process.env['NX_APP_ID'],
};

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(config)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
]);

const firebaseOptionsProvider = { provide: FIREBASE_OPTIONS, useValue: config };

export { firebaseProviders, firebaseOptionsProvider };
