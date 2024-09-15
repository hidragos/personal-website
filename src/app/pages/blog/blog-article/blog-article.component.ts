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
  ],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss',
})
export class BlogArticleComponent implements OnInit {
  articleForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  blogService = inject(BlogService);

  createForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.createForm();
    this.route.params.subscribe((params) => {
      if (params['id']) this.getArticle(params['id']);
    });
  }

  async getArticle(id: string) {
    const article = await this.blogService.getArticle(id);
    this.articleForm.setValue(article);
  }

  async onSubmit() {
    if (this.articleForm.invalid) return;

    const article: ArticleModel = this.articleForm.value;
    if (article.id) await this.blogService.updateArticle(article);
    else {
      const { data, error } = await this.blogService.createArticle(article);
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
