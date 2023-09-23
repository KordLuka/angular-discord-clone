import { Route } from '@angular/router';
import { authGuard } from '@discord/libs/auth';
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'init',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@discord/libs/auth').then(m => m.AuthComponent),
  },
  {
    path: 'init',
    canActivate: [authGuard],
    loadComponent: () => import('@discord/init').then(m => m.InitComponent),
  },
];
