import { inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabaseService = inject(SupabaseService);

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

  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      // options: {
      //   redirectTo: 'http://192.168.0.146:4200',
      // },
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
