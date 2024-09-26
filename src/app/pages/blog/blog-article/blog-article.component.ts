import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ArticleModel } from '../blog/api/article.model';
import { ArticleService } from '../blog/api/article.service';
import { CommentModel } from '../blog/api/comment.model';
import { CommentService } from '../blog/api/comment.service';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';
import { BlogArticleViewComponent } from './blog-article-view/blog-article-view.component';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogArticleViewComponent,
    ArticleCommentsComponent,
  ],
  template: `
    @if(article){
    <div class="flex flex-col gap-8">
      <app-blog-article-view
        class="flex-grow"
        [article]="article"
      ></app-blog-article-view>
      <app-article-comments
        [articleId]="article.id"
        [comments]="article.comments ?? []"
      ></app-article-comments>
    </div>
    }
  `,
})
export class BlogArticleComponent implements OnInit {
  articleService = inject(ArticleService);
  commentService = inject(CommentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  article: ArticleModel | null = null;
  url = this.route.snapshot.params['url'];
  comments: CommentModel[] = [];

  async ngOnInit() {
    this.url = this.route.snapshot.params['url'];
    await this.getArticle();
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
