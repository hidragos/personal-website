import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoDirective } from '@jsverse/transloco';
import { SupabaseAuthService, TimeAgoPipe } from '@shared';

import { CommentModel } from '../../blog/api/comment.model';
import { CommentService } from '../../blog/api/comment.service';

@Component({
  selector: 'app-article-comments',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TranslocoDirective,
    MatMenuModule,
    TimeAgoPipe,
  ],
  template: `
    <ng-container *transloco="let t">
      <div class="flex flex-col gap-8">
        <!-- <div class="post-separator z-10"></div> -->
        <span class="text-2xl">Comments</span>
        @if(supabaseAuthService.user()){
        <div class="flex flex-col gap-2 flex-auto">
          <div class="flex flex-row gap-2">
            <img class="rounded-full w-8 h-8" src="{{ avatarUrl }}" />
            <mat-form-field appearance="outline" class="w-full">
              <textarea
                (keydown)="keyDown($event)"
                matInput
                class="resize-none"
                [formControl]="newCommentFormControl"
              ></textarea>
            </mat-form-field>
          </div>
          <div class="flex justify-end">
            <button
              mat-button
              color="primary"
              (click)="postComment()"
              [disabled]="newCommentFormControl.invalid"
              class="xs:w-full w-auto"
            >
              {{ t('blog.article.comments.post') }}
            </button>
          </div>
        </div>
        } @else {
        <div class="flex justify-center">
          <span class="text-xs">Login to post a comment</span>
        </div>
        } @if(comments.length){
        <div class="flex flex-col gap-16">
          <div
            *ngFor="let comment of orderedByDateComments"
            class="flex flex-row gap-4 items-center flex-auto"
          >
            <div class="flex flex-col gap-4 flex-auto">
              <div
                class="flex flex-row items-center gap-2 menu-container flex-auto"
              >
                <img
                  class="rounded-full w-8 h-8 "
                  src="{{ comment.profiles?.avatar_url }}"
                />
                <div class="flex flex-col flex-auto">
                  <span>{{ comment.profiles?.full_name }}</span>
                  <span class="font-light text-xs">{{
                    comment.created_at | timeAgo
                  }}</span>
                </div>

                <button
                  mat-icon-button
                  [matMenuTriggerFor]="menu"
                  *ngIf="isCommentedByCurrentUser(comment.profiles?.id!)"
                >
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item>
                    <mat-icon>edit</mat-icon>
                    <span>Edit</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>delete</mat-icon>
                    <span>Delete</span>
                  </button>
                </mat-menu>
              </div>

              <div>{{ comment.content }}</div>
            </div>
          </div>
        </div>
        } @else {
        <div class="flex justify-center">
          {{ t('blog.article.comments.empty') }}
        </div>
        }
      </div>
    </ng-container>
  `,
  styles: [
    `
      .menu-container {
        line-height: 2;
      }
    `,
  ],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() comments: CommentModel[] = [];
  @Input() articleId!: number;
  newCommentFormControl = new FormControl();
  commentService = inject(CommentService);
  supabaseAuthService = inject(SupabaseAuthService);

  get avatarUrl() {
    return this.supabaseAuthService.user()?.user_metadata['avatar_url'];
  }

  async postComment() {
    if (this.newCommentFormControl.invalid) return;

    const comment = new CommentModel();
    comment.content = this.newCommentFormControl.value;
    comment.article_id = this.articleId;
    comment.user_id = this.supabaseAuthService.user()?.id;

    if (!comment) return;
    this.newCommentFormControl.setValue('');
    const result = await this.commentService.post(comment);
    this.comments.push(result.data![0]);
    this.newCommentFormControl.reset();
  }

  ngOnInit(): void {
    this.newCommentFormControl.addValidators(Validators.required);
  }

  keyDown(event: KeyboardEvent) {
    // on meta+enter post comment
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      this.postComment();
    }
  }

  get orderedByDateComments() {
    return this.comments.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  isCommentedByCurrentUser(commentId: string) {
    return this.supabaseAuthService.user()?.id === commentId;
  }
}
