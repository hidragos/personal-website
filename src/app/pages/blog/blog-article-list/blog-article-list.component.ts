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

import { ArticleModel, ArticleStatus } from '../blog/api/article.model';
import { ArticleFilters, ArticleService } from '../blog/api/article.service';
import { BlogArticlesComponent } from '../blog/blog-articles/blog-article-list-view.component';

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
    MatIconModule,
    BlogArticlesComponent,
  ],
  template: `
    <ng-container *transloco="let t">
      <mat-card appearance="outlined">
        <div class="flex justify-end my-4">
          <button mat-button (click)="toggleFiltersVisibility()">
            <mat-icon *ngIf="!filtersVisible">expand_more</mat-icon>
            <span *ngIf="!filtersVisible">{{
              t('blog.list.viewFilters')
            }}</span>

            <span *ngIf="!filtersVisible && getNumberOfFiltersApplied()">
              ({{ getNumberOfFiltersApplied() }})
            </span>

            <mat-icon *ngIf="filtersVisible">expand_less</mat-icon>
            <span *ngIf="filtersVisible">{{ t('blog.list.hideFilters') }}</span>
          </button>
        </div>

        @if (filtersVisible) {
        <div class="flex flex-col gap-2 pb-8">
          <!-- Tags Section -->
          <div class="flex flex-row flex-wrap gap-4">
            <span class="text-xs lowercase">{{ t('blog.list.tags') }}:</span>
            @for(tag of tags; track tag){
            <span
              class="text-xs link"
              (click)="selectTag(tag)"
              [ngClass]="{ 'underline font-semibold': filters.tag === tag }"
              >{{ tag }}</span
            >
            }
          </div>
          <!-- Authors section -->
          <div class="flex flex-row flex-wrap gap-4 mt-4">
            <span class="text-xs lowercase">{{ t('blog.list.authors') }}:</span>
            @for(author of authors; track author.id){
            <span
              class="text-xs link"
              (click)="selectAuthor(author.id!)"
              [ngClass]="{
                'underline font-semibold': filters.userId === author.id
              }"
              >{{ author.full_name ?? author.email }}</span
            >
            }
          </div>

          <!-- View my drafts/ all posts button toggle -->
          <div class="flex flex-row gap-4 mt-4">
            <button
              mat-flat-button
              (click)="viewDrafts()"
              *ngIf="!filters.status"
              [ngClass]="{
                'underline font-semibold':
                  filters.userId === supabaseAuthService.user().id
              }"
            >
              {{ t('blog.list.myDrafts') }}
            </button>
            <button
              mat-flat-button
              (click)="viewPublicPosts()"
              *ngIf="filters.status === ArticleStatus.Draft"
              [ngClass]="{ 'underline font-semibold': !filters.userId }"
            >
              {{ t('blog.list.allPosts') }}
            </button>
          </div>
          <!-- Reset Filters Button -->
          <div class="flex justify-start mt-4">
            <button
              mat-flat-button
              (click)="resetFilters()"
              *ngIf="filters.tag || filters.userId"
            >
              <mat-icon>clear</mat-icon>
              {{ t('blog.list.resetFilters') }}
            </button>
          </div>
        </div>
        }

        <mat-card-content>
          <app-blog-article-list-view
            [options]="{ displayComments: false }"
            [articles]="articles"
            (authorClickedEvent)="selectAuthor($event)"
          ></app-blog-article-list-view>

          @if(!articles.length && !loading && (filters.tag || filters.userId)){
          <span class="text-center mt-16">{{ t('blog.list.noResults') }}</span>
          }
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      .post-separator {
        @apply my-6;
        height: 1px;
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
  ArticleStatus = ArticleStatus;
  route = inject(ActivatedRoute);

  articles: ArticleModel[] = [];
  authors: ProfileModel[] = [];
  _authors: ProfileModel[] = [];

  tags: string[] = [];
  _tags: string[] = [];

  filters: ArticleFilters = {
    userId: '',
    tag: '',
  };

  // Pagination variables
  page = 0;
  pageSize = 5;
  loading = false;
  allLoaded = false;
  error: string | null = null;
  filtersVisible = false;

  ngOnInit() {
    this.getAuthors();
    this.getExistingTags();
    this.restoreFiltersFromUrl();
    this.scrollToEndService.scrolledToEnd.subscribe(() => this.getArticles());
    this.scrollToEndService.scrolledToEnd.emit();
  }

  /**
   * Loads more articles when the user scrolls.
   */
  getArticles() {
    if (this.loading || this.allLoaded) return;

    this.loading = true;
    const offset = this.page * this.pageSize;

    this.articleService
      .getAll({ limit: this.pageSize, offset }, this.filters)
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

  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }

  async getAuthors() {
    try {
      const authorsResponse = await this.articleService.getAuthors();
      const authors = authorsResponse.data?.map((author) => author.profiles);
      this.authors = this._authors = authors || [];
    } catch (error) {
      console.error('Error fetching authors:', error);
      this.error = 'Failed to load authors.';
    }
  }

  async getExistingTags() {
    try {
      const tagsResponse = await this.articleService.getExisingTags();
      const tags = tagsResponse.data?.map((tag) => tag.tag);
      this.tags = this._tags = tags || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      this.error = 'Failed to load tags.';
    }
  }

  selectTag(tag: string) {
    this.filters.tag = this.filters.tag === tag ? '' : tag;
    this.tags = this._tags.filter((t) => t !== tag);
    if (tag) this.tags.unshift(tag);
    this.page = 0;
    this.articles = [];
    this.allLoaded = false;
    this.updateUrl();
    this.getArticles();
  }

  viewDrafts() {
    this.setStatusFilter(ArticleStatus.Draft);
    this.filters.userId = '';
    this.selectAuthor(this.supabaseAuthService.user().id);
  }

  viewPublicPosts() {
    this.setStatusFilter(undefined);
  }

  selectAuthor(userId: string, loadMore = true) {
    this.filtersVisible = true;
    this.filters.userId = this.filters.userId === userId ? '' : userId;
    // put first in the list
    this.authors = this._authors.filter((author) => author.id !== userId);
    const selectedAuthor = this._authors.find((author) => author.id === userId);
    if (selectedAuthor) this.authors.unshift(selectedAuthor);
    this.page = 0;
    this.articles = [];
    this.allLoaded = false;
    this.updateUrl();
    if (loadMore) this.getArticles();
  }

  resetFilters() {
    this.selectAuthor('', false);
    this.selectTag('');
    this.viewPublicPosts();
  }

  setStatusFilter(status?: ArticleStatus) {
    this.filters.status = status;
    this.updateUrl();
  }

  restoreFiltersFromUrl() {
    this.route.queryParams.subscribe((params) => {
      if (!params['tag'] && !params['userId'] && !params['status']) return;

      this.filtersVisible = true;

      if (params['tag']) this.filters.tag = params['tag'];

      if (params['userId']) this.filters.userId = params['userId'];

      if (params['status']) this.filters.status = params['status'];

      this.page = 0;
      this.articles = [];
      this.allLoaded = false;
      this.getArticles();
    });
  }

  updateUrl() {
    const queryParams: any = {
      tag: this.filters.tag,
      userId: this.filters.userId,
      status: this.filters.status,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  getNumberOfFiltersApplied() {
    const filters = this.filters;
    return Object.values(filters).filter((value) => !!value).length;
  }
}
