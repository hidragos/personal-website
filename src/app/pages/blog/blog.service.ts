import { Injectable, signal } from '@angular/core';
import { SupabaseServiceBase } from '@shared';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends SupabaseServiceBase<ArticleModel> {
  override tableName = 'articles';

  storedForPreview = signal<ArticleModel>({} as ArticleModel);
}
