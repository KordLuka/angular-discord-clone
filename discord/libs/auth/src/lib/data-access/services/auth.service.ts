import { Injectable, Signal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = signal<boolean | User | null | undefined>(null);
  private supabase!: SupabaseClient;
  private readonly router = inject(Router);

  public get currentUser(): Signal<boolean | User | null | undefined> {
    return this.currentUser$;
  }

  private get url(): string | undefined {
    return process.env['NX_SUPABASE_URL'];
  }

  private get key(): string | undefined {
    return process.env['NX_SUPABASE_KEY'];
  }

  constructor() {
    this.initSupabaseClient();
  }

  public signInWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({
      email,
    });
  }

  public logout(): void {
    this.supabase.auth.signOut();
  }

  private async initSupabaseClient(): Promise<void> {
    if (!this.url || !this.key) {
      throw new Error(
        'NX_SUPABASE_URL or NX_SUPABASE_KEY has not been provided'
      );
    }

    this.supabase = createClient(this.url, this.key);

    console.log('key: ', this.url, this.key);

    const user = await this.supabase.auth.getUser();

    if (user?.data?.user) {
      this.currentUser$.set(user.data.user);
    } else {
      this.currentUser$.set(false);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);

      if (event === 'SIGNED_IN') {
        this.currentUser$.set(session?.user);
      } else {
        this.currentUser$.set(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      }
    });
  }
}
