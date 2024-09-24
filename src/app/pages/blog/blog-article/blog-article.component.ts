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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AreYouSureData,
  AreYouSureDialogComponent,
  SupabaseAuthService,
  TogglablePlaceholderDirective,
} from '@shared';
import { environment } from 'src/environments';

import { ArticleModel } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    TogglablePlaceholderDirective,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss',
})
export class BlogArticleComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  articleService = inject(ArticleService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  matDialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  sanitizer = inject(DomSanitizer);
  cdRef = inject(ChangeDetectorRef);

  supabaseAuthService = inject(SupabaseAuthService);

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

  url = this.route.snapshot.params['url'];

  get content() {
    return this.articleForm.get('content');
  }

  get title() {
    return this.articleForm.get('title');
  }

  ngOnInit() {
    this.url = this.route.snapshot.params['url'];
    this.getArticle(true);
  }

  async initializeData() {}

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
    });
  }

  async getArticle(createForm = false) {
    if (!this.url) {
      this.createForm();
      return;
    }
    const article = (await this.articleService.getByUrl(this.url)).data?.[0];
    if (!article) return;

    this.article = article ?? <ArticleModel>{};
    if (createForm) this.createForm(article);
  }

  sanitizeHtml(article: ArticleModel) {
    article.contentSafeHtml = this.sanitizer.bypassSecurityTrustHtml(
      article.content || ''
    );
  }

  async onDelete() {
    const isSure = await this.matDialog
      .open(AreYouSureDialogComponent)
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    await this.articleService.delete(this.article.id);

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

    await this.getArticle(true);

    this.openSnackBar('Article restored');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '');
  }

  async onSubmit() {
    this.errorMessages = [];

    this.articleForm.get('title')?.patchValue(this.title?.value?.trim());
    this.articleForm.get('content')?.patchValue(this.content?.value?.trim());

    const errors = this.articleForm.errors;
    if (errors) {
      this.errorMessages = Object.keys(errors).map((key) => errors[key]);
    }

    if (this.articleForm.invalid) return;

    this.article.title = this.title?.value;
    this.article.content = this.content?.value;

    if (this.article.id) {
      await this.articleService.put(this.article.id, this.articleForm.value);
      this.openSnackBar('Article saved');
    } else {
      const result = await this.articleService.post(this.articleForm.value);
      this.router.navigate(['/blog/' + result.data?.[0].id + '/edit']);
      this.openSnackBar('Article created');
    }

    this.articleForm.reset(this.articleForm.value);
  }

  toggleEdit() {
    if (this.articleForm.dirty)
      this.article = { ...this.articleForm.value, ...this.article };
  }
}
