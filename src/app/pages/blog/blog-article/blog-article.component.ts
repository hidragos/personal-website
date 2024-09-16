import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { BlogService } from '../blog.service';

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
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  matDialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  articleForm!: FormGroup;
  edit =
    this.route.snapshot.url.toString().includes('edit') ||
    this.route.snapshot.url.toString().includes('new');
  id = +this.route.snapshot.params['id'];
  loaded = false;
  submitTry = false;

  get contentFormValue() {
    return this.articleForm.get('content')?.value ?? '';
  }

  get titleFormValue() {
    return this.articleForm.get('title')?.value ?? '';
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

    this.blogService.storedForPreview.set({} as ArticleModel);
    this.router.navigate(['/blog']);
  }

  createForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    if (!this.edit) this.articleForm.disable();
  }

  async loadData(id?: number) {
    const storedArticle = this.blogService.storedForPreview();

    if (storedArticle && Object.keys(storedArticle).length) {
      this.articleForm.reset(storedArticle);
      this.articleForm.markAsDirty();
      return;
    }

    if (!id) return;

    const article = await this.blogService.getById(id);
    if (!article) return;

    this.articleForm.reset(article);
  }

  async ngOnInit() {
    this.createForm();
    if (this.id) await this.loadData(this.id);

    this.loaded = true;
  }

  async onDelete() {
    const isSure = await this.matDialog
      .open(AreYouSureDialogComponent)
      .afterClosed()
      .toPromise();

    if (!isSure) return;

    this.blogService.storedForPreview.set({} as ArticleModel);
    await this.blogService.delete(this.id);

    this.snackBar.open('Article deleted', '', {
      duration: 2000,
    });

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

    this.blogService.storedForPreview.set({} as ArticleModel);
    if (!isSure) return;
    this.loadData(this.id);

    this.snackBar.open('Article restored', '', {
      duration: 2000,
    });
  }

  async onSubmit() {
    this.submitTry = true;
    this.articleForm.get('title')?.setValue(this.titleFormValue.trim());
    this.articleForm.get('content')?.setValue(this.contentFormValue.trim());

    if (this.articleForm.invalid) return;
    this.submitTry = false;
    const article: ArticleModel = this.articleForm.value;

    if (this.id) await this.blogService.update(this.id, article);
    else {
      const result = await this.blogService.create(article);
      if (result) this.id = result.id;

      this.router.navigate(['/blog/' + this.id + '/edit']);
    }

    this.snackBar.open('Article saved', '', {
      duration: 2000,
    });

    this.blogService.storedForPreview.set({} as ArticleModel);
    this.toggleEdit();
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  toggleEdit() {
    this.blogService.storedForPreview.set(this.articleForm.value);
    this.edit = !this.edit;
    this.loadData();
  }
}
