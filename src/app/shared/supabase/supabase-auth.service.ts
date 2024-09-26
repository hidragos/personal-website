import { inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

import { LocalStorageService } from '../local-storage';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabaseService = inject(SupabaseService);
  private localStorageService = inject(LocalStorageService);

  private supabase = this.supabaseService.supabaseClient;
  isSignedIn = false;
  user = signal<User | null>(null);

  constructor() {
    this.supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        this.isSignedIn = true;
        this.user.set(session.user);
      }
    });
  }

  async signInWithGoogle() {
    const { error, data } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { skipBrowserRedirect: true },
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
      return;
    }

    if (!data) {
      console.error('Error signing in with Google: no user');
      return;
    }

    const currentFullUrl = `${window.location.href}`;

    this.localStorageService.set('UrlBeforeSignIn', currentFullUrl);
    window.location.href = data.url!;

    return { error, data };
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
