import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  AreYouSureData,
  AreYouSureDialogComponent,
  SupabaseAuthService,
  TextEditorComponent,
  TogglablePlaceholderDirective,
} from '@shared';
import { environment } from 'src/environments';

import { ArticleModel } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule,
    TextEditorComponent,
    TogglablePlaceholderDirective,
    RouterModule,
    MatRipple,
    TranslocoDirective,
  ],
  template: `
    <ng-container *transloco="let t">
      <mat-card [appearance]="'outlined'" class="h-full">
        <mat-card-content>
          <form
            [formGroup]="articleForm"
            *ngIf="articleForm && article"
            (ngSubmit)="onSubmit()"
            class="flex flex-col h-full"
          >
            <mat-card-header>
              <mat-card-title>
                <div
                  class="flex sm:flex-row items-start gap-1 flex-col justify-between flex-wrap"
                >
                  <span
                    class="text-end w-full text-2xl"
                    [ngClass]="{ 'opacity-0': articleForm.pristine }"
                  >
                    *
                  </span>

                  <mat-form-field appearance="outline" class="w-full">
                    <textarea
                      cdkTextareaAutosize
                      matInput
                      #input
                      [placeholder]="t('blog.edit.titlePlaceholder')"
                      formControlName="title"
                      [maxLength]="100"
                    ></textarea>
                  </mat-form-field>
                </div>
              </mat-card-title>
            </mat-card-header>
            <div class="grow">
              <app-wysiwyg-editor
                [placeholder]="t('blog.edit.contentPlaceholder')"
                formControlName="content"
              ></app-wysiwyg-editor>
              <div class="mt-8 flex flex-col">
                <div>
                  <mat-form-field appearance="outline">
                    <input
                      matInput
                      [appTogglablePlaceholder]="t('blog.edit.tagsPlaceholder')"
                      [(ngModel)]="newTag"
                      [ngModelOptions]="{ standalone: true }"
                      (keydown)="onAddTag($event)"
                      (keydown.enter)="$event.preventDefault()"
                    />

                    <button
                      matSuffix
                      mat-icon-button
                      class="mr-2"
                      (click)="onAddTag()"
                      type="button"
                    >
                      <mat-icon>add</mat-icon>
                    </button>
                  </mat-form-field>
                </div>
                <mat-chip-set class="pt-2">
                  <mat-chip
                    *ngFor="let tag of tags?.value"
                    (click)="onRemoveTag(tag)"
                  >
                    <div class="flex flex-row justify-start items-center">
                      <span class="text-xs">{{ tag }}</span>
                      <button
                        matChipRemove
                        (click)="onRemoveTag(tag)"
                        type="button"
                      >
                        <mat-icon>cancel</mat-icon>
                      </button>
                    </div>
                  </mat-chip>
                </mat-chip-set>
              </div>
              <div
                class="flex sm:flex-row flex-col-reverse justify-between gap-4 pt-4"
              >
                <div
                  class="flex sm:flex-row flex-col-reverse justify-start gap-4"
                >
                  <button
                    (click)="onDelete()"
                    *ngIf="id"
                    color="warn"
                    mat-button
                    type="button"
                  >
                    {{ t('blog.edit.delete') }}
                  </button>
                  <button
                    *ngIf="id"
                    mat-button
                    type="button"
                    (click)="onRestore()"
                    [disabled]="articleForm.pristine"
                  >
                    {{ t('blog.edit.restore') }}
                  </button>
                </div>
                <div
                  class="flex sm:flex-row flex-col-reverse justify-end gap-4"
                >
                  <button mat-button type="button" (click)="toggleEdit()">
                    {{ t('blog.edit.preview') }}
                  </button>
                  <button mat-flat-button [disabled]="articleForm.pristine">
                    {{ t('blog.edit.save') }}
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-end justify-end pt-4"
              *ngIf="articleForm.get('title')?.invalid"
            >
              <p class="color-error" *ngFor="let message of errorMessages">
                * {{ message }}
              </p>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      mat-card-header {
        padding-right: 0;
        padding-top: 0;
      }
    `,
  ],
})
export class BlogArticleEditComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  articleService = inject(ArticleService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  matDialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  sanitizer = inject(DomSanitizer);
  cdRef = inject(ChangeDetectorRef);
  newTag = '';

  supabaseAuthService = inject(SupabaseAuthService);
  existingTags: string[] = [];

  get article() {
    return this._article;
  }

  set article(value) {
    this.sanitizeHtml(value);
    this._article = value;
  }

  private _article: ArticleModel = {} as ArticleModel;
  editorInitialized = false;
  articleForm!: FormGroup;
  editorApiKey = environment.tinyMicApiKeys;
  errorMessages: string[] = [];
  id = +this.route.snapshot.params['id'];

  get content() {
    return this.articleForm.get('content');
  }

  get title() {
    return this.articleForm.get('title');
  }

  get tags() {
    return this.articleForm.get('tags');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.getArticle();
    this.getTags();
  }

  async getTags() {
    const tags = (await this.articleService.getTags()).data;
  }

  async back(force = false) {
    if (this.articleForm.dirty && !force) {
      const isSure = await this.matDialog
        .open(AreYouSureDialogComponent, {
          data: <AreYouSureData>{
            title: 'Unsaved changes',
            text: 'Are you sure you want to leave this page?',
            confirmText: 'Leave',
          },
        })
        .afterClosed()
        .toPromise();

      if (!isSure) return;
    }

    this.router.navigate(['/blog']);
  }

  createForm(article = <ArticleModel>{}) {
    this.articleForm = this.formBuilder.group({
      title: [article?.title, Validators.required],
      content: [article?.content, Validators.required],
      tags: [article?.tags || []],
    });
  }

  async getArticle() {
    if (!this.id) {
      this.createForm();
      return;
    }
    const article = (await this.articleService.getById(this.id)).data?.[0];
    if (!article) return;

    this.article = article ?? <ArticleModel>{};
    this.createForm(article);
  }

  sanitizeHtml(article: ArticleModel) {
    article.contentSafeHtml = this.sanitizer.bypassSecurityTrustHtml(
      article.content || ''
    );
  }

  onAddTag(event?: KeyboardEvent) {
    if (event && event.key !== 'Enter') return;

    const tags = this.tags?.value || [];
    if (!this.newTag || tags.includes(this.newTag)) return;

    tags.push(this.newTag);
    this.tags?.patchValue(tags);
    this.articleForm.markAsDirty();
    this.newTag = '';
  }

  onRemoveTag(tag: string) {
    const tags = this.tags?.value || [];
    const index = tags.indexOf(tag);
    if (index === -1) return;

    tags.splice(index, 1);
    this.tags?.patchValue(tags);
  }

  async onDelete() {
    const isSure = await this.matDialog
      .open(AreYouSureDialogComponent)
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    await this.articleService.delete(this.id);
    this.openSnackBar('Article deleted');
    this.back(true);
  }

  async onRestore() {
    const isSure = await this.matDialog
      .open(AreYouSureDialogComponent, {
        data: <AreYouSureData>{
          title: 'Restore article',
          text: 'Are you sure you want to restore this article?',
          confirmText: 'Restore',
        },
      })
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    await this.getArticle();
    this.openSnackBar('Article restored');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '');
  }

  async onSubmit() {
    this.errorMessages = [];
    this.articleForm.get('title')?.patchValue(this.title?.value?.trim());
    const errors = this.articleForm.errors;
    if (errors) {
      this.errorMessages = Object.keys(errors).map((key) => errors[key]);
    }

    if (this.articleForm.invalid) return;

    this.article.title = this.title?.value;
    this.article.content = this.content?.value;
    this.article.tags = this.tags?.value;

    if (this.id) {
      await this.articleService.put(this.id, this.articleForm.value);
      this.openSnackBar('Article saved');
    } else {
      const result = await this.articleService.post(this.articleForm.value);
      if (result) this.id = result.data?.[0].id;
      this.router.navigate(['/blog/' + this.id + '/edit']);
      this.openSnackBar('Article created');
    }

    this.articleForm.reset(this.articleForm.value);
    this.articleForm.markAsPristine();
  }

  toggleEdit() {
    if (this.articleForm.dirty)
      this.article = { ...this.articleForm.value, ...this.article };
  }

  buildUrlFromTitle(title: string, date: string) {
    // input: '🤓./one two three four five six"
    // output: 'one-two-three-four"
    const url = title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, 4)
      .join('-')
      .toLowerCase();

    return url + '-' + date;
  }
}
