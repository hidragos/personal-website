import { Injectable } from '@angular/core';
import { SupabaseApiService } from '@shared';

import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends SupabaseApiService<ArticleModel> {
  override tableName = 'articles';
}
