import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ArticleModel } from '../article.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-articles',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './blog-articles.component.html',
  styleUrl: './blog-articles.component.scss',
})
export class BlogArticlesComponent implements OnInit {
  blogService = inject(BlogService);
  articles: ArticleModel[] = [];
  loaded = false;

  ngOnInit() {
    this.getAllArticles();
  }

  async getAllArticles() {
    const articles = await this.blogService.getAll();
    articles.forEach((article) => {
      if (article.content && article.content?.length > 500)
        // cut at the end of phrase but after 500, so it doesn't cut in the middle of a word
        // look for ., !, ? and from there cut the string
        article.contentPreview = truncateAtEndOfPhrase(article.content);
    });
    this.articles = articles.sort((a, b) => {
      return a.updated_at > b.updated_at ? -1 : 1;
    });

    this.loaded = true;
  }
}

function truncateAtEndOfPhrase(text: string): string {
  const maxLength = 500;

  if (text.length <= maxLength) {
    return text;
  }

  const substring = text.substring(0, maxLength);

  const lastPunctuationIndex = Math.max(
    substring.lastIndexOf('.'),
    substring.lastIndexOf('!'),
    substring.lastIndexOf('?')
  );

  if (lastPunctuationIndex !== -1) {
    return text.substring(0, lastPunctuationIndex + 1);
  }

  const lastSpaceIndex = substring.lastIndexOf(' ');

  if (lastSpaceIndex !== -1) {
    return text.substring(0, lastSpaceIndex);
  }

  return substring;
}
