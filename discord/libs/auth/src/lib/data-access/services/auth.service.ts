import { Injectable, Signal, inject, signal } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import * as firebase from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authFireService = inject(AngularFireAuth);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  private user: BehaviorSubject<Observable<firebase.User> | null> =
    new BehaviorSubject<Observable<firebase.User> | null>(null);

  public user$ = this.user.asObservable().pipe(switchMap((user: any) => user));
  private isCreating$ = signal<boolean>(false);

  public get currentUser(): Promise<firebase.User | null> {
    return this.authFireService.currentUser as Promise<firebase.User | null>;
  }

  public get isCreating(): Signal<boolean> {
    return this.isCreating$.asReadonly();
  }

  constructor() {
    this.user.next(this.authFireService.authState as any);
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    if (!email || !password) return;

    this.isCreating$.set(true);

    this.authFireService
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toastrService.success('Udało się!');
        this.signInWithEmailAndPassword(email, password);
      })
      .catch(() => {
        this.toastrService.error('Something went wrong!');
      })
      .finally(() => this.isCreating$.set(false));
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    if (!email || !password) return;

    this.isCreating$.set(true);

    this.authFireService
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastrService.success('Udało się!');
      })
      .catch(() => {
        this.toastrService.error('Something went wrong!');
      })
      .finally(() => this.isCreating$.set(false));
  }

  public signInWithGoogle() {
    this.isCreating$.set(true);

    this.authFireService
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => {
        this.toastrService.success('Udało się!');
      })
      .catch(() => {
        this.toastrService.error('Something went wrong!');
      })
      .finally(() => this.isCreating$.set(false));
  }
}
