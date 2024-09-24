import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ArticleModel } from '../article.model';
import { ArticleService } from '../article.service';
import { BlogArticleViewComponent } from './blog-article-view/blog-article-view.component';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogArticleViewComponent],
  template: `
    <app-blog-article-view
      *ngIf="article"
      [article]="article"
    ></app-blog-article-view>
  `,
})
export class BlogArticleComponent implements OnInit {
  articleService = inject(ArticleService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  article: ArticleModel | null = null;
  url = this.route.snapshot.params['url'];

  ngOnInit() {
    this.url = this.route.snapshot.params['url'];
    this.getArticle();
  }

  async getArticle() {
    if (!this.url) {
      this.article = {} as ArticleModel;
      return;
    }
    const article = (await this.articleService.getByUrl(this.url)).data?.[0];
    if (!article) return;

    this.article = article ?? <ArticleModel>{};
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '');
  }
}
