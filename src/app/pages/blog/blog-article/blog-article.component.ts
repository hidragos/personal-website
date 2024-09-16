import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AreYouSureData,
  AreYouSureDialogComponent,
  TogglablePlaceholderDirective,
} from '@shared';

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
export class BlogArticleComponent implements OnInit, OnDestroy {
  articleService = inject(ArticleService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  matDialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  enableEditing =
    this.route.snapshot.url.toString().includes('edit') ||
    this.route.snapshot.url.toString().includes('new');

  articleForm!: FormGroup;

  errorMessages: string[] = [];

  id = +this.route.snapshot.params['id'];

  get content() {
    return this.articleForm.get('content');
  }

  get title() {
    return this.articleForm.get('title');
  }

  constructor() {}

  async ngOnInit() {
    await this.loadData();
    this.createForm(this.articleService.one);

    this.router.events.subscribe(() => {
      this.loadData;
    });
  }

  ngOnDestroy() {
    this.articleService.clearOne();
  }

  initializeData() {
    this.enableEditing =
      this.route.snapshot.url.toString().includes('edit') ||
      this.route.snapshot.url.toString().includes('new');
    this.id = +this.route.snapshot.params['id'];

    this.loadData();
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

  createForm(article: ArticleModel | null) {
    this.articleForm = this.formBuilder.group({
      title: [article?.title, Validators.required],
      content: [article?.content, Validators.required],
    });
  }

  async loadData(force = false) {
    const article = await this.articleService.getById(this.id, force);
    this.articleService.one = article ?? <ArticleModel>{};

    if (force) this.createForm(article);
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

    await this.loadData(true);

    this.articleService.clearOne();

    this.openSnackBar('Article restored');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '');
  }

  async onSubmit() {
    this.errorMessages = [];
    this.articleForm.get('title')?.patchValue(this.title?.value.trim());
    this.articleForm.get('content')?.patchValue(this.content?.value.trim());
    const errors = this.articleForm.errors;
    if (errors) {
      this.errorMessages = Object.keys(errors).map((key) => errors[key]);
    }

    if (this.articleForm.invalid) return;

    const article: ArticleModel = this.articleForm.value;

    if (this.id) {
      await this.articleService.update(this.id, article);
      this.openSnackBar('Article saved');
    } else {
      const result = await this.articleService.create(article);
      if (result) this.id = result.id;
      this.router.navigate(['/blog/' + this.id + '/edit']);
      this.openSnackBar('Article created');
    }

    this.articleForm.reset(this.articleForm.value);
  }

  toggleEdit() {
    if (this.articleForm.dirty)
      this.articleService.one = this.articleForm.value;

    this.enableEditing = !this.enableEditing;
    this.loadData();
  }
}
