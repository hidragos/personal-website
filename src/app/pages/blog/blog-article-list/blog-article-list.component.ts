import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  FallbackImageDirective,
  ProfileModel,
  ScrollToEndDirective,
  SupabaseAuthService,
} from '@shared';

import { ArticleModel } from '../blog/api/article.model';
import { ArticleService } from '../blog/api/article.service';

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
    MatProgressSpinnerModule,
    ScrollToEndDirective,
    TranslocoDirective,
    FallbackImageDirective,
  ],
  template: `
    <ng-container *transloco="let t">
      <mat-card appearance="outlined">
        <!-- Tags Section -->
        <div class="pl">
          <span class="text-xs pl-1 lowercase">{{ t('blog.list.tags') }}:</span>
          <mat-card-content>
            <mat-chip-set class="pt-2" aria-label="Tag selection">
              <mat-chip
                *ngFor="let tag of tags"
                (click)="selectTag(tag)"
                [highlighted]="filters.tag === tag"
              >
                <span class="text-xs">{{ tag }}</span>
              </mat-chip>
            </mat-chip-set>
          </mat-card-content>
        </div>

        <!-- Authors Section -->
        <div class="mt-1">
          <span class="text-xs pl-1 lowercase"
            >{{ t('blog.list.authors') }}:</span
          >
          <mat-card-content>
            <mat-chip-set class="pt-2" aria-label="Author selection">
              <mat-chip
                *ngFor="let author of authors"
                (click)="selectAuthor(author.id!)"
                [highlighted]="filters.userId === author.id"
              >
                <span class="text-xs">{{ author.full_name }}</span>
              </mat-chip>
            </mat-chip-set>
          </mat-card-content>
        </div>

        <!-- Reset Filters Button -->
        <div class="flex justify-start">
          <button
            mat-button
            class="color-secondary"
            (click)="resetFilters()"
            *ngIf="filters.tag || filters.userId"
          >
            {{ t('blog.list.resetFilters') }}
            <mat-icon>clear</mat-icon>
          </button>
        </div>

        <!-- Articles Section with Infinite Scroll -->
        <div class="mt-8">
          <span class="text-xs pl-1 lowercase "
            >{{ t('blog.list.articles') }}:</span
          >
          <ng-container *ngFor="let article of articles; let last = last">
            <mat-card-content class="mb-4">
              <mat-card-header>
                <mat-card-title>
                  <a
                    [routerLink]="['/blog', article.url]"
                    class="cursor-pointer block link"
                  >
                    <h3>{{ article.title }}</h3>
                  </a>
                </mat-card-title>
              </mat-card-header>
              <div
                class="flex gap-2 items-center justify-start color-secondary"
              >
                <img
                  [appFallbackImage]="'account_circle'"
                  class="rounded-full w-[24px] h-[24px]"
                  *ngIf="article.profiles?.avatar_url"
                  [src]="article.profiles?.avatar_url"
                />
                <span>{{
                  article.profiles?.full_name ?? article.profiles?.email
                }}</span>
              </div>
              <div class="content-text mb-16 mt-8">
                {{ article.description }}
              </div>
              <div class="flex justify-between">
                <a
                  routerLinkActive="item-selected"
                  class="color-secondary pt-8 link"
                  [routerLink]="['/blog', article.url]"
                >
                  {{ article.inserted_at | date : 'longDate' }}
                </a>
                <a
                  class="color-secondary pt-8 link"
                  routerLinkActive="item-selected"
                  [routerLink]="['/blog', article.url]"
                >
                  {{ article.comments!.length }}
                  {{ t('blog.list.comments') }}
                </a>
              </div>
            </mat-card-content>
            <div class="post-separator z-10"></div>
          </ng-container>

          <!-- Loading Spinner -->
          <div *ngIf="loading" class="loading-spinner">
            {{ t('blog.list.loading') }}...
          </div>

          <!-- Error Message -->
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>

          <!-- End of Articles Message -->
          <div *ngIf="allLoaded" class="end-message">
            {{ t('blog.list.end') }}
          </div>
        </div>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      mat-card-header {
        border: 0px !important;
      }

      .no-underline {
        text-decoration-line: none !important;
      }

      .loading-spinner,
      .end-message,
      .error-message {
        text-align: center;
        padding: 16px;
        font-size: 14px;
      }

      .error-message {
        color: red;
      }

      /* Style the scroll container */
      .scroll-container {
        max-height: 400px; /* Adjust as needed */
        overflow-y: auto;
      }

      /* Optional: Improve the appearance of the post separator */
      .post-separator {
        height: 1px;
        margin: 16px 0;
      }
    `,
  ],
})
export class BlogArticleListComponent implements OnInit {
  articleService = inject(ArticleService);
  sanitizer = inject(DomSanitizer);
  supabaseAuthService = inject(SupabaseAuthService);
  scrollToEndService = inject(ScrollToEndDirective);
  router = inject(Router);
  route = inject(ActivatedRoute);

  articles: ArticleModel[] = [];
  authors: ProfileModel[] = [];
  tags: string[] = [];

  filters: {
    userId?: string;
    tag?: string;
  } = {
    userId: '',
    tag: '',
  };

  // Pagination variables
  page = 0;
  pageSize = 5;
  loading = false;
  allLoaded = false;
  error: string | null = null;

  ngOnInit() {
    this.getAuthors();
    this.getExistingTags();
    this.restoreFiltersFromUrl();
    this.scrollToEndService.scrolledToEnd.subscribe(() => this.loadMore());
    this.scrollToEndService.scrolledToEnd.emit();
  }

  /**
   * Loads more articles when the user scrolls.
   */
  loadMore() {
    if (this.loading || this.allLoaded) return;

    this.loading = true;
    const offset = this.page * this.pageSize;

    this.articleService
      .getAll(this.pageSize, offset, this.filters)
      .then((result) => {
        const newArticles = result.data || [];

        // Append new articles to the existing list
        this.articles = [...this.articles, ...newArticles];

        // Update pagination state
        if (newArticles.length < this.pageSize) {
          this.allLoaded = true; // No more articles to load
        } else {
          this.page++; // Increment the page number for the next load
        }

        this.loading = false;
      });
  }

  async getAuthors() {
    try {
      const authorsResponse = await this.articleService.getAuthors();
      const authors = authorsResponse.data?.map((author) => author.profiles);
      this.authors = authors || [];
    } catch (error) {
      console.error('Error fetching authors:', error);
      this.error = 'Failed to load authors.';
    }
  }

  async getExistingTags() {
    try {
      const tagsResponse = await this.articleService.getExisingTags();
      const tags = tagsResponse.data?.map((tag) => tag.tag);
      this.tags = tags || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      this.error = 'Failed to load tags.';
    }
  }

  selectTag(tag: string) {
    this.filters.tag = this.filters.tag === tag ? '' : tag;
    this.page = 0;
    this.articles = [];
    this.allLoaded = false;
    this.updateUrl();
    this.loadMore();
  }

  selectAuthor(userId: string, loadMore = true) {
    this.filters.userId = this.filters.userId === userId ? '' : userId;
    this.page = 0;
    this.articles = [];
    this.allLoaded = false;
    this.updateUrl();
    if (loadMore) this.loadMore();
  }

  resetFilters() {
    this.selectAuthor('', false);
    this.selectTag('');
  }

  restoreFiltersFromUrl() {
    this.route.queryParams.subscribe((params) => {
      if (!params['tag'] && !params['userId']) return;

      if (params['tag']) this.filters.tag = JSON.parse(params['tag']);

      if (params['userId']) this.filters.userId = JSON.parse(params['userId']);

      this.page = 0;
      this.articles = [];
      this.allLoaded = false;
      this.loadMore();
    });
  }

  updateUrl() {
    const queryParams: any = {
      tag: JSON.stringify(this.filters.tag),
      userId: JSON.stringify(this.filters.userId),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
