import { inject, Injectable } from '@angular/core';
import { SupabaseAuthService, SupabaseService } from '@shared';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  isUniqueUrl(url: string) {
    return this.supabase.from('is_unique_url').select('*');
  }
  private _supabaseService = inject(SupabaseService);
  private _supabaseAuthService = inject(SupabaseAuthService);
  supabase = this._supabaseService.supabaseClient;

  constructor() {}

  post(article: ArticleModel) {
    article.user_id = this._supabaseAuthService.user()?.id;
    return this.supabase
      .from('articles')
      .upsert(article)
      .select('*,profiles(*)');
  }

  put(id: number, article: ArticleModel) {
    return this.supabase
      .from('articles')
      .update(article)
      .eq('id', id)
      .select('*,profiles(*)');
  }

  delete(id: number) {
    return this.supabase.from('articles').delete().eq('id', id);
  }

  getByUrl(url: number) {
    return this.supabase
      .from('articles')
      .select('*,profiles(*)')
      .eq('url', url);
  }

  getById(id: number) {
    return this.supabase.from('articles').select('*,profiles(*)').eq('id', id);
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
      .from('articles')
      .select('*,profiles(*)')
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

  getTags() {
    return this.supabase.from('unique_tags').select('tag');
  }
}
