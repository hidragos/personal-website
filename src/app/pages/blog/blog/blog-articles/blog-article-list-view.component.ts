import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoDirective, TranslocoModule } from '@jsverse/transloco';
import { FallbackImageDirective } from '@shared';

import { ArticleModel } from '../api/article.model';

@Component({
  selector: 'app-blog-article-list-view',
  standalone: true,
  imports: [
    RouterModule,
    FallbackImageDirective,
    CommonModule,
    TranslocoDirective,
    TranslocoModule,
  ],
  template: `
    <ng-container *transloco="let t">
      @for(article of articles; track article.id; let last = $last){
      <div class="mb-4 flex flex-col gap-6">
        <a
          [routerLink]="['/blog', article.url]"
          class="cursor-pointer block link"
        >
          <h3>{{ article.title }}</h3>
        </a>
        <div class="flex gap-2 items-center justify-start color-secondary">
          <img
            [appFallbackImage]="'account_circle'"
            class="rounded-full w-[24px] h-[24px]"
            *ngIf="article.profiles?.avatar_url"
            [src]="article.profiles?.avatar_url"
          />
          <span
            (click)="authorClicked(article.profiles?.id!)"
            class="cursor-pointer link"
            >{{ article.profiles?.full_name ?? article.profiles?.email }}</span
          >
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
            *ngIf="options?.displayComments"
          >
            {{ article.comments!.length }}
            {{ t('blog.list.comments') }}
          </a>
        </div>
      </div>
      <div class="post-separator z-10"></div>
      }
    </ng-container>
  `,
})
export class BlogArticlesComponent {
  @Input() articles: ArticleModel[] = [];
  @Output() authorClickedEvent = new EventEmitter<string>();
  @Input() options?: {
    displayComments: boolean;
  } = { displayComments: true };

  authorClicked(id: string) {
    this.authorClickedEvent.emit(id);
  }
}
