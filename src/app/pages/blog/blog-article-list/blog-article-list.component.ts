import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProfileModel, SupabaseAuthService } from '@shared';

import { ArticleModel } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-blog-article-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './blog-article-list.component.html',
  styleUrl: './blog-article-list.component.scss',
})
export class BlogArticleListComponent implements OnInit {
  articleService = inject(ArticleService);
  sanitizer = inject(DomSanitizer);
  supabaseAuthService = inject(SupabaseAuthService);
  articles: ArticleModel[] = [];
  loaded = false;
  authors: ProfileModel[] = [];
  tags: string[] = [];

  ngOnInit() {
    this.getAllArticles();
    this.getAuthors();
    this.getExistingTags();
  }

  async getAuthors() {
    const authors = (await this.articleService.getAuthors()).data?.map(
      (author) => author.profiles
    );

    this.authors = authors || [];
  }

  async getExistingTags() {
    const tags = (await this.articleService.getTags()).data?.map(
      (tag) => tag.tag
    );
    this.tags = tags || [];
  }

  async getAllArticles() {
    const articles = (await this.articleService.getAll()).data;

    articles?.forEach((article) => {
      article.contentSafeHtmlPreview = this.sanitizer.bypassSecurityTrustHtml(
        article.content || ''
      );
    });

    this.articles =
      articles?.sort((a, b) => {
        return a.updated_at > b.updated_at ? -1 : 1;
      }) || [];

    this.loaded = true;
  }
}
