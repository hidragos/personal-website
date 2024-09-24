// blog-article-edit.component.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, CanDeactivate, Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  AreYouSureData,
  AreYouSureDialogComponent,
  SupabaseAuthService,
  TextEditorComponent,
  TogglablePlaceholderDirective,
} from '@shared';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments';

import { ArticleModel } from '../article.model';
import { ArticleService } from '../article.service';
import { BlogArticleViewComponent } from '../blog-article/blog-article-view/blog-article-view.component';

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
    BlogArticleViewComponent,
  ],
  template: `
    <ng-container *transloco="let t">
      <mat-card [appearance]="'outlined'" class="h-full">
        <mat-card-content>
          <form
            [formGroup]="articleForm"
            *ngIf="articleForm && article && !previewMode"
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

              <mat-form-field appearance="outline" class="w-full">
                <textarea
                  cdkTextareaAutosize
                  rows="2"
                  matInput
                  [placeholder]="t('blog.edit.descriptionPlaceholder')"
                  formControlName="description"
                  [maxLength]="200"
                ></textarea>
              </mat-form-field>

              <div class="mt-8 flex flex-col">
                <div>
                  <mat-form-field appearance="outline">
                    <input
                      matInput
                      [appTogglablePlaceholder]="t('blog.edit.tagsPlaceholder')"
                      [(ngModel)]="newTag"
                      [ngModelOptions]="{ standalone: true }"
                      (keydown)="onAddTag($event)"
                      [matAutocomplete]="auto"
                    />

                    <mat-autocomplete #auto="matAutocomplete">
                      @for (option of filteredExistingTags(); track option) {
                      <mat-option [value]="option">{{ option }}</mat-option>
                      }
                    </mat-autocomplete>

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
                  <button mat-button type="button" (click)="togglePreview()">
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

          <div *ngIf="previewMode">
            <app-blog-article-view
              [article]="articleForm.value"
            ></app-blog-article-view>
            <div class="flex justify-end mt-16">
              <button mat-button (click)="togglePreview()">
                {{ t('blog.edit.backToEdit') }}
              </button>
            </div>
          </div>
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
  previewMode = false;

  supabaseAuthService = inject(SupabaseAuthService);

  existingTags: string[] = [];
  filteredExistingTags = () =>
    this.existingTags.filter(
      (tag) =>
        !this.tags?.value.includes(tag.toLocaleLowerCase()) &&
        tag.toLowerCase().includes(this.newTag.toLocaleLowerCase())
    );

  article: ArticleModel = {} as ArticleModel;
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

  get description() {
    return this.articleForm.get('description');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.getArticle();
    this.getExistingTags();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.articleForm && this.articleForm.dirty && !this.previewMode) {
      $event.returnValue = true;
    }
  }

  async getExistingTags() {
    const tags = (await this.articleService.getExisingTags()).data;
    this.existingTags = tags?.map((tag) => tag.tag) || [];
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

  createForm(article = <ArticleModel>{}) {
    this.articleForm = this.formBuilder.group({
      title: [article?.title, Validators.required],
      content: [article?.content, Validators.required],
      tags: [article?.tags || []],
      description: [
        article?.description,
        [Validators.required, Validators.maxLength(200)],
      ],
    });
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }

  onAddTag(event?: KeyboardEvent) {
    if (event?.key && !['Enter', ',', ' '].includes(event.key)) return;
    event?.preventDefault();

    const tags =
      this.tags?.value.map((tag: string) => tag.toLocaleLowerCase()) || [];

    if (!this.newTag || tags.includes(this.newTag.toLocaleLowerCase())) return;
    const newTags = this.newTag.split(',');

    newTags.forEach((tag) => {
      tag = tag.trim();
      const uniqueTags = tags.includes(tag) ? [] : [tag];
      tags.push(...uniqueTags);
    });
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
    this.articleForm.markAsDirty();
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
    this.article.description = this.articleForm.get('description')?.value;

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

  back(force = false) {
    if (this.articleForm.dirty && !force) {
      this.confirmExit()
        .toPromise()
        .then((isSure) => {
          if (isSure) {
            this.router.navigate(['/blog']);
          }
        });
      return;
    }

    this.router.navigate(['/blog']);
  }

  confirmExit(): Observable<boolean> {
    return this.matDialog
      .open(AreYouSureDialogComponent, {
        data: <AreYouSureData>{
          title: 'Unsaved changes',
          text: 'Are you sure you want to leave this page?',
          confirmText: 'Leave',
        },
      })
      .afterClosed()
      .pipe(tap((isSure) => console.log('isSure', isSure)));
  }
}

// can-deactivate.guard.ts
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<BlogArticleEditComponent>
{
  canDeactivate(
    component: BlogArticleEditComponent
  ): Observable<boolean> | boolean {
    if (component.articleForm.dirty && !component.previewMode) {
      return component.confirmExit();
    }
    return true;
  }
}
