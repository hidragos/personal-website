import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoPipe } from '@jsverse/transloco';

import { ArticleModel, ArticleStatus } from '../api/article.model';
import { ArticleService } from '../api/article.service';
import { BlogArticlesComponent } from '../blog-articles/blog-article-list-view.component';

@Component({
  selector: 'app-blog-admin',
  standalone: true,
  imports: [MatCardModule, TranslocoPipe, BlogArticlesComponent],
  templateUrl: './blog-admin.component.html',
  styleUrl: './blog-admin.component.scss',
})
export class BlogAdminComponent implements OnInit {
  articleService = inject(ArticleService);
  articles: ArticleModel[] = [];

  getArticles() {
    this.articleService
      .getAll(undefined, { status: ArticleStatus.PendingApproval })
      .then((res) => {
        this.articles = res.data ?? [];
      });
  }

  ngOnInit() {
    this.getArticles();
  }
}
