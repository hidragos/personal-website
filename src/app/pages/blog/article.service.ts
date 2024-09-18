import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseAuthService, SupabaseService } from '@shared';
import { Observable } from 'rxjs';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
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

  getAll() {
    return this.supabase.from('articles').select('*,profiles(*)');
  }
}

@Injectable({ providedIn: 'root' })
export class ArticleListResolver implements Resolve<ArticleModel[]> {
  constructor(private service: ArticleService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleModel[]> | Promise<ArticleModel[]> | ArticleModel[] {
    return this.getData();
  }

  async getData(): Promise<ArticleModel[]> {
    return (await this.service.getAll()).data || [];
  }
}

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<ArticleModel> {
  constructor(private service: ArticleService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleModel> | Promise<ArticleModel> | ArticleModel {
    return this.getData(route.params['id']);
  }

  async getData(id: number): Promise<ArticleModel> {
    return (await this.service.get(id)).data?.[0];
  }
}
