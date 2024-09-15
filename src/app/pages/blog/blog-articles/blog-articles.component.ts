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
    // a.updated_at is a string
    this.articles = articles.sort((a, b) => {
      return a.updated_at > b.updated_at ? -1 : 1;
    });
    this.loaded = true;
  }
}
