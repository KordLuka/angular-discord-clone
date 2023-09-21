import { Route } from '@angular/router';
import { AuthGuard } from '@discord/libs/auth';
import { AppComponent } from './app.component';
export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@discord/libs/auth').then(m => m.AuthComponent),
  },
];
