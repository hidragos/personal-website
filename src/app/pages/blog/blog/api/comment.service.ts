import { inject, Injectable } from '@angular/core';
import { SupabaseAuthService, SupabaseService } from '@shared';

import { CommentModel } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  relation = 'comments';
  private _supabaseService = inject(SupabaseService);
  private _supabaseAuthService = inject(SupabaseAuthService);
  supabase = this._supabaseService.supabaseClient;

  constructor() {}

  post(comment: CommentModel) {
    return this.supabase
      .from(this.relation)
      .upsert(comment)
      .select('*,profiles(*)');
  }
}
