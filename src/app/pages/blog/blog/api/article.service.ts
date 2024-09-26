import { inject, Injectable } from '@angular/core';
import { SupabaseAuthService, SupabaseService } from '@shared';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  relation = 'articles';
  private _supabaseService = inject(SupabaseService);
  private _supabaseAuthService = inject(SupabaseAuthService);
  supabase = this._supabaseService.supabaseClient;

  constructor() {}

  post(article: ArticleModel) {
    article.user_id = this._supabaseAuthService.user()?.id;
    return this.supabase
      .from(this.relation)
      .upsert(article)
      .select('*,profiles(*)');
  }

  put(id: number, article: ArticleModel) {
    return this.supabase
      .from(this.relation)
      .update(article)
      .eq('id', id)
      .select('*,profiles(*)');
  }

  delete(id: number) {
    return this.supabase.from(this.relation).delete().eq('id', id);
  }

  getByUrl(url: number) {
    return this.supabase
      .from(this.relation)
      .select('*,comments(*,profiles(*)),profiles(*)')
      .eq('url', url);
  }

  getById(id: number) {
    return this.supabase
      .from('articles')
      .select('*,comments(*,profiles(*)),profiles(*)')
      .eq('id', id);
  }

  getAll(
    limit: number,
    offset: number,
    filters?: {
      userId?: string;
      tag?: string;
    }
  ) {
    const query = this.supabase
      .from(this.relation)
      .select('*,comments(*,profiles(*)),profiles(*)')
      .order('updated_at', { ascending: false });
    if (filters?.userId?.length || filters?.tag?.length) {
      if (filters?.userId?.length) {
        query.eq('user_id', filters.userId);
      }

      if (filters?.tag?.length) {
        query.contains('tags', [filters.tag]);
      }
    }
    query.range(offset, offset + limit - 1);

    return query;
  }

  getAuthors() {
    return this.supabase.from('unique_authors').select('*,profiles(*)');
  }

  getExisingTags() {
    return this.supabase.from('unique_tags').select('tag');
  }
}
