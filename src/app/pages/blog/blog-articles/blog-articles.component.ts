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

  ngOnInit() {
    this.getAllArticles();
  }

  async getAllArticles() {
    const articles = await this.blogService.getAllArticles();
    this.articles = (articles.data as ArticleModel[]) ?? [];
    // sort by date in descending order, oneliner , inserted_at is string
    this.articles.sort((a, b) => (a.inserted_at < b.inserted_at ? 1 : -1));
  }
}
