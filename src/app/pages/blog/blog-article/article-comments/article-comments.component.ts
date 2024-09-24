import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SupabaseAuthService } from '@shared';

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
  ],
  template: `
    <div class="flex flex-col gap-8 mt-32">
      <!-- <div class="post-separator z-10"></div> -->
      <span class="text-2xl">Comments</span>
      @if(supabaseAuthService.user()){
      <div class="flex flex-row gap-2 w-full">
        <!-- avatar -->
        <img
          class="rounded-full w-12 h-12 mat-elevation-z2"
          src="{{ avatarUrl }}"
        />
        <div class="flex flex-col gap-2 flex-auto">
          <mat-form-field appearance="outline">
            <textarea
              (keydown.enter)="postComment()"
              matInput
              class="resize-none"
              [formControl]="newCommentFormControl"
            ></textarea>
          </mat-form-field>
          <button mat-button color="primary" (click)="postComment()">
            Post Comment
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
          class="flex flex-row gap-4 items-center"
        >
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2 text-xs">
              <img
                class="rounded-full w-8 h-8 mat-elevation-z4 "
                src="{{ comment.profiles?.avatar_url }}"
              />
              <div class="flex flex-col ">
                <span>{{ comment.profiles?.full_name }}</span>
                <span class="font-light">{{
                  comment.created_at | date : 'long'
                }}</span>
              </div>
            </div>

            <div>{{ comment.content }}</div>
          </div>
        </div>
      </div>
      } @else {
      <div class="flex justify-center">No comments yet</div>
      }
    </div>
  `,
})
export class ArticleCommentsComponent {
  @Input() comments: CommentModel[] = [];
  @Input() articleId!: number;
  newCommentFormControl = new FormControl();
  commentService = inject(CommentService);
  supabaseAuthService = inject(SupabaseAuthService);

  get avatarUrl() {
    return this.supabaseAuthService.user()?.user_metadata['avatar_url'];
  }

  async postComment() {
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

  get orderedByDateComments() {
    return this.comments.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}
