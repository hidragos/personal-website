import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ArticleModel } from '../../blog/api/article.model';

@Component({
  selector: 'app-blog-article-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card [appearance]="'outlined'" class="h-full">
      <mat-card-content>
        <div class="flex flex-col justify-start gap-6 mb-12 w-full">
          <h1 class="flex justify-start">
            {{ article!.title }}
          </h1>

          <div class="flex flex-row items gap-2 items-center text-ellipsis">
            <img
              class="rounded-full w-16 mat-elevation-z2"
              [src]="article.profiles?.avatar_url"
            />
            <div class="flex flex-col">
              <span>{{
                article.profiles?.full_name ?? article.profiles?.email
              }}</span>
              <span class="font-light text-sm">
                {{ article.inserted_at | date : 'longDate' }}
              </span>
            </div>
          </div>
        </div>

        <div class="content-text" [innerHTML]="article.contentSafeHtml"></div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card-content {
        padding-bottom: 0px !important;
      }

      mat-card-header {
        border: 0px !important;
      }
    `,
  ],
})
export class BlogArticleViewComponent {
  sanitizer = inject(DomSanitizer);

  @Input() article: ArticleModel = {} as ArticleModel;

  sanitizeHtml() {
    this.article.contentSafeHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.article.content || ''
    );
  }

  ngOnChanges() {
    this.sanitizeHtml();
  }
}
