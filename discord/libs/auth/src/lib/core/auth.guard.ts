import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../data-access/services/auth.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthService).user$.pipe(
    map(isLoggedIn => {
      return isLoggedIn
        ? true
        : createUrlTreeFromSnapshot(next, ['/', 'login']);
    })
  );
};
