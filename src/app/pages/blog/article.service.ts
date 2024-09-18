import { Injectable } from '@angular/core';
import { SupabaseStore, SupabaseStoreModel } from '@shared';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends SupabaseStore<ArticleModel> {
  //  constructor(private store: Store<TModel>, private tableName: string) {}

  constructor() {
    super(new SupabaseStoreModel<ArticleModel>(), 'articles');
  }

  override getById(
    id: number,
    refresh?: boolean
  ): Promise<ArticleModel | null> {
    return super.getById(
      id,
      refresh,
      `
      *
     	users("*")
    )`
    );
  }
}
