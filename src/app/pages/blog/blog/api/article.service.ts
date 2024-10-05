import { inject, Injectable } from '@angular/core';
import { SupabaseAuthService, SupabaseService } from '@shared';

import { ArticleModel, ArticleStatus } from './article.model';

export interface ArticleFilters {
  userId?: string;
  tag?: string;
  status?: ArticleStatus;
}

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
    pagination?: {
      limit: number;
      offset: number;
    },
    filters?: ArticleFilters
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

    query.eq('status', filters?.status || ArticleStatus.Public);
    if (pagination)
      query.range(pagination.offset, pagination.offset + pagination.limit - 1);

    return query;
  }

  getAuthors() {
    return this.supabase.from('unique_authors').select('*,profiles(*)');
  }

  getExisingTags(authorId?: string) {
    const query = this.supabase.from('unique_tags').select('tag');
    if (authorId) {
      query.eq('author_id', authorId);
    }
    return query;
  }
}
