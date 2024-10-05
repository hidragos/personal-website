import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../local-storage';
import { ProfileModel, UserModel } from './profile.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabaseService = inject(SupabaseService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  private supabase = this.supabaseService.supabaseClient;
  isSignedIn = false;
  user = signal<UserModel>(<UserModel>{});

  constructor() {
    this.supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        this.isSignedIn = true;
        this.user.set(session.user);
        this.populateProfileField();

        this.redirectToUrlBeforeSignIn();
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

  get isSuper() {
    return !!this.user()?.profile?.issuper;
  }

  redirectToUrlBeforeSignIn() {
    setTimeout(() => {
      const url = this.localStorageService.get('UrlBeforeSignIn');
      if (!url) return;

      const path = url.split('#')[1];
      this.router.navigateByUrl(path);

      this.localStorageService.remove('UrlBeforeSignIn');
    });
  }

  async populateProfileField() {
    const res = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', this.user()?.id);
    this.user().profile = res.data?.[0] as ProfileModel;
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
