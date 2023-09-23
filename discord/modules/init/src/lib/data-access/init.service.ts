import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesRestService, ServerRestService } from '@discord/api';
import { AuthService } from '@discord/libs/auth';
import { Profile } from '@prisma/client';
import { Observable, catchError, from, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InitService {
  private readonly profilesRestService = inject(ProfilesRestService);
  private readonly serverRestService = inject(ServerRestService);
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  get isLoading() {
    return this.isLoading$.asReadonly();
  }

  get error() {
    return this.error$.asReadonly();
  }

  private readonly isLoading$ = signal<boolean>(false);
  private readonly error$ = signal<string | null>(null);

  public init() {
    this.isLoading$.set(true);

    return from(this.authService.currentUser).pipe(
      switchMap(user => {
        if (user && user.uid) {
          return this.handleAuthenticatedUser(user.uid);
        } else {
          this.isLoading$.set(false);
          this.error$.set(null);
          this.router.navigate(['/auth']);
          return of(null);
        }
      }),
      catchError(() => this.handleError())
    );
  }

  public getServer(profileId: string) {
    return this.serverRestService.getServer(profileId);
  }

  private handleAuthenticatedUser(uid: string) {
    return this.profilesRestService.getProfile(uid).pipe(
      switchMap((profiles: Profile[]) => {
        const profile = profiles?.[0];
        if (profile) {
          return of(profile);
        } else {
          return this.createProfile(uid);
        }
      }),
      tap(() => this.isLoading$.set(false)),
      catchError(() => this.handleError())
    );
  }

  private createProfile(uid: string) {
    return this.profilesRestService.createProfile(uid).pipe(
      tap(() => this.isLoading$.set(false)),
      catchError(() => this.handleError())
    );
  }

  private handleError(): Observable<null> {
    const errorMsg = 'Something went wrong';
    this.error$.set(errorMsg);
    this.isLoading$.set(false);
    throw new Error(errorMsg);
  }
}
