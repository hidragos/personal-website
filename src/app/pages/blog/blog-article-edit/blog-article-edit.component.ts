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
import { EditorComponent } from '@tinymce/tinymce-angular';
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
    EditorComponent,
  ],
  templateUrl: './blog-article-edit.component.html',
  styleUrl: './blog-article-edit.component.scss',
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

  supabaseAuthService = inject(SupabaseAuthService);

  get article() {
    return this._article;
  }

  set article(value) {
    this.sanitizeHtml(value);
    this._article = value;
  }

  private _article: ArticleModel = {} as ArticleModel;
  enableEditing = false;
  editorInitialized = false;

  articleForm!: FormGroup;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code wordcount',
    navbar: false,
    statusbar: false,
    setup: (editor) => {
      editor.on('init', () => {
        // blak flashing fix
        setTimeout(() => {
          this.editorInitialized = true;
          this.cdRef.detectChanges();
        }, 250);
      });
    },
  };

  editorApiKey = environment.tinyMicApiKeys;
  errorMessages: string[] = [];

  id = +this.route.snapshot.params['id'];

  get content() {
    return this.articleForm.get('content');
  }

  get title() {
    return this.articleForm.get('title');
  }

  ngOnInit() {
    this.enableEditing =
      this.route.snapshot.url.toString().includes('edit') ||
      this.route.snapshot.url.toString().includes('new');
    this.id = +this.route.snapshot.params['id'];

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
    if (!this.id) {
      this.createForm();
      return;
    }
    const article = (await this.articleService.get(this.id)).data?.[0];
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
  }

  toggleEdit() {
    if (this.articleForm.dirty)
      this.article = { ...this.articleForm.value, ...this.article };
    console;

    this.enableEditing = !this.enableEditing;
    // this.getArticle();
  }
}