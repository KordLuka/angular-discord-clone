// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../data-access/services/auth.service';
// import { inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { AuthService } from '../data-access/services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// export function authGuard(): CanActivateFn {
//   return () => {
//     const router = inject(Router);
//     const authService = inject(AuthService);
//     console.log('hii');
//     console.log('user: ', authService.currentUser());

//     if (!authService.currentUser()) {
//       router.navigate(['/auth']);
//       return false;
//     }

//     return true;
//   };
// }

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cos = this.authService.currentUser();
    console.log('cos: ', cos);
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
