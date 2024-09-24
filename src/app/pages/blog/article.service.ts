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

  get(id: number) {
    return this.supabase.from('articles').select('*,profiles(*)').eq('id', id);
  }

  /**
   * Fetches articles with pagination support.
   * @param limit Number of articles to fetch.
   * @param offset Starting index.
   * @returns Supabase response containing articles.
   */
  getAll(limit: number, offset: number) {
    return this.supabase
      .from('articles')
      .select('*,profiles(*)')
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);
  }

  getAuthors() {
    return this.supabase.from('unique_authors').select('*,profiles(*)');
  }

  getTags() {
    return this.supabase.from('unique_tags').select('tag');
  }
}
