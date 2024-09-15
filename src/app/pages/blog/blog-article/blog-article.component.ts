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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

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
  ],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss',
})
export class BlogArticleComponent implements OnInit {
  articleForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  blogService = inject(BlogService);
  id = this.route.snapshot.params['id'];
  loaded = false;

  createForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
    if (this.id) this.loadArticle(this.id);
  }

  async loadArticle(id: any) {
    const article = await this.blogService.getById(id);
    if (!article) return;

    this.articleForm.patchValue(article);

    this.loaded = true;
  }

  async onSubmit() {
    if (this.articleForm.invalid) return;

    const article: ArticleModel = this.articleForm.value;
    if (article.id) await this.blogService.update(article);
    else {
      const { data, error } = await this.blogService.create(article);
      if (error) {
        console.error('Error inserting article:', error);
      } else {
        console.log('Article inserted successfully:', data);
      }
    }

    // go back
    window.history.back();
  }
}
