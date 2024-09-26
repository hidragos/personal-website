import { inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments';

import { LocalStorageService } from '../local-storage';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase!: SupabaseClient;
  private readonly ngZone = inject(NgZone);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);

  _session: AuthSession | null = null;

  async initializeSupabase() {
    this.supabase = await this.ngZone.runOutsideAngular(() =>
      createClient(environment.supabaseUrl, environment.supabaseKey)
    );

    this.authChanges((event, session) => {
      if (event === 'SIGNED_IN') {
        this.redirectToUrlBeforeSignIn();
      }
    });
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

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  get supabaseClient() {
    return this.supabase;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
