import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  ProfileModel,
  ScrollToEndDirective,
  SupabaseAuthService,
} from '@shared';

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
    MatProgressSpinnerModule,
    ScrollToEndDirective,
    TranslocoDirective,
  ],
  template: `
    <ng-container *transloco="let t">
      <mat-card appearance="outlined">
        <!-- Tags Section -->
        <div class="pl">
          <span class="text-xs pl-1">tags:</span>
          <mat-card-content>
            <mat-chip-set class="pt-2" aria-label="Tag selection">
              <mat-chip *ngFor="let tag of tags">
                <span class="text-xs">{{ tag }}</span>
              </mat-chip>
            </mat-chip-set>
          </mat-card-content>
        </div>

        <!-- Authors Section -->
        <div class="mt-1">
          <span class="text-xs pl-1">authors:</span>
          <mat-card-content>
            <mat-chip-set class="pt-2" aria-label="Author selection">
              <mat-chip *ngFor="let author of authors">
                <span class="text-xs">{{ author.full_name }}</span>
              </mat-chip>
            </mat-chip-set>
          </mat-card-content>
        </div>

        <!-- Articles Section with Infinite Scroll -->
        <div class="mt-8">
          <span class="text-xs pl-1">blog:</span>
          <ng-container *ngFor="let article of articles; let last = last">
            <mat-card-content class="mb-4">
              <mat-card-header>
                <mat-card-title
                  mat-button
                  [routerLink]="['/blog', article.id]"
                  class="cursor-pointer hover:underline"
                >
                  <span>{{ article.title }}</span>
                </mat-card-title>
              </mat-card-header>
              <div
                class="flex gap-1 justify-start items-center text-xs font-light"
              >
                <span>{{
                  article.profiles?.full_name ?? article.profiles?.email
                }}</span>
                ~
                <span>{{ article.inserted_at | date : 'longDate' }}</span>
              </div>
              <div
                class="content-text mt-8 mb-4"
                [innerHTML]="article.contentSafeHtmlPreview"
              ></div>
              <a
                *ngIf="article.content?.length! > 500"
                routerLinkActive="item-selected"
                class="hover:underline color-secondary pt-8"
                [routerLink]="['/blog', article.id]"
              >
                Read more...
              </a>
              <div
                class="flex justify-end"
                *ngIf="
                  this.supabaseAuthService.user() &&
                  article.profiles?.email ===
                    this.supabaseAuthService.user()?.email
                "
              >
                <a
                  routerLinkActive="item-selected"
                  [routerLink]="['/blog', article.id, 'edit']"
                  mat-button
                >
                  Edit
                </a>
              </div>
            </mat-card-content>
            <div class="post-separator z-10"></div>
          </ng-container>

          <!-- Loading Spinner -->
          <div *ngIf="loading" class="loading-spinner">
            {{ t('loading') }}...
          </div>

          <!-- Error Message -->
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>

          <!-- End of Articles Message -->
          <div *ngIf="allLoaded" class="end-message">
            No more articles to load.
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

      .content-text {
        line-height: 1.6em; /* Set the line height */
        height: calc(1.6em * 5);
        overflow: hidden;
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
  articles: ArticleModel[] = [];
  authors: ProfileModel[] = [];
  tags: string[] = [];

  // Pagination variables
  page = 0;
  pageSize = 2;
  loading = false;
  allLoaded = false;
  error: string | null = null;

  ngOnInit() {
    this.getAuthors();
    this.getExistingTags();
    this.scrollToEndService.scrolledToEnd.subscribe(() => this.loadMore());
    this.scrollToEndService.scrolledToEnd.emit();

    // this.loadMore(); // Load the first set of articles
  }

  /**
   * Loads more articles when the user scrolls.
   */
  loadMore() {
    if (this.loading || this.allLoaded) return;

    this.loading = true;
    const offset = this.page * this.pageSize;

    this.articleService.getAll(this.pageSize, offset).then((result) => {
      const newArticles = result.data || [];

      // Sanitize and prepare the new articles
      newArticles.forEach((article) => {
        article.contentSafeHtmlPreview = this.sanitizer.bypassSecurityTrustHtml(
          article.content || ''
        );
      });

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
      const tagsResponse = await this.articleService.getTags();
      const tags = tagsResponse.data?.map((tag) => tag.tag);
      this.tags = tags || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      this.error = 'Failed to load tags.';
    }
  }
}
