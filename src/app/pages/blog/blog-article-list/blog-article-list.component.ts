import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SupabaseAuthService } from '@shared';

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
  ],
  templateUrl: './blog-article-list.component.html',
  styleUrl: './blog-article-list.component.scss',
})
export class BlogArticleListComponent implements OnInit {
  blogService = inject(ArticleService);
  sanitizer = inject(DomSanitizer);
  supabaseAuthService = inject(SupabaseAuthService);
  articles: ArticleModel[] = [];
  loaded = false;

  ngOnInit() {
    this.getAllArticles();
  }

  async getAllArticles() {
    const articles = (await this.blogService.getAll()).data;

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

function truncateAtEndOfPhrase(text: string): string {
  const maxLength = 500;

  if (text.length <= maxLength) {
    return text;
  }

  const substring = text.substring(0, maxLength);

  // only cut after a </p> tag
  const lastParagraphIndex = substring.lastIndexOf('</p>') - 1;

  if (lastParagraphIndex !== -1) {
    return text.substring(0, lastParagraphIndex + 1);
  }

  const lastSpaceIndex = substring.lastIndexOf(' ');

  if (lastSpaceIndex !== -1) {
    return text.substring(0, lastSpaceIndex);
  }

  return substring;
}
