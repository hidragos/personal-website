import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@shared';

import { ArticleModel } from './article.model';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private supabaseService = inject(SupabaseService);

  private supabase = this.supabaseService.supabaseClient;

  createArticle(article: ArticleModel) {
    return this.supabase.from('articles').insert(article);
  }

  getAllArticles() {
    return this.supabase.from('articles').select('*');
  }

  getArticle(id: string) {
    return this.supabase.from('articles').select('*').eq('id', id);
  }

  updateArticle(article: ArticleModel) {
    return this.supabase.from('articles').update(article).eq('id', article.id);
  }
}
