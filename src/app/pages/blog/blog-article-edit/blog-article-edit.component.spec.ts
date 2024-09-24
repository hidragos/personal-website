import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SupabaseAuthService } from '@shared';
import { of } from 'rxjs';

import { ArticleService } from '../blog/api/article.service';
import { BlogArticleEditComponent } from './blog-article-edit.component';

describe('BlogArticleEditComponent', () => {
  let component: BlogArticleEditComponent;
  let fixture: ComponentFixture<BlogArticleEditComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  let supabaseAuthService: jasmine.SpyObj<SupabaseAuthService>;

  beforeEach(async () => {
    articleService = jasmine.createSpyObj('ArticleService', [
      'get',
      'post',
      'put',
      'delete',
      'getTags',
    ]);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    supabaseAuthService = jasmine.createSpyObj('SupabaseAuthService', ['user']);

    await TestBed.configureTestingModule({
      declarations: [BlogArticleEditComponent],
      imports: [ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Router, useValue: router },
        { provide: SupabaseAuthService, useValue: supabaseAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogArticleEditComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    // Mock user data
    supabaseAuthService.user.and.returnValue(<any>{
      email: 'test@example.com',
      user_metadata: {
        avatar_url: 'test-avatar-url',
        full_name: 'Test User',
      },
    });

    // Set up form control values
    component.articleForm = component.formBuilder.group({
      title: ['Test Title', []],
      content: ['Test Content', []],
      tags: [['tag1', 'tag2'], []],
    });

    component.ngOnInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load article data on init', async () => {
    articleService.getById.and.returnValue(
      <any>of({ data: [{ title: 'Test Title', content: 'Test Content' }] })
    );

    await component.getArticle();

    expect(component.article.title).toBe('Test Title');
    expect(component.article.content).toBe('Test Content');
  });

  it('should create a form on init', () => {
    expect(component.articleForm).toBeDefined();
    expect(component.articleForm.get('title')?.value).toBe('Test Title');
    expect(component.articleForm.get('content')?.value).toBe('Test Content');
  });

  it('should add a new tag', () => {
    component.newTag = 'tag3';
    component.onAddTag();

    expect(component.tags?.value).toContain('tag3');
    expect(component.newTag).toBe('');
  });

  it('should not add an existing tag', () => {
    component.newTag = 'tag1';
    component.onAddTag();

    expect(component.tags?.value).toEqual(['tag1', 'tag2']);
  });

  it('should remove a tag', () => {
    component.onRemoveTag('tag1');

    expect(component.tags?.value).not.toContain('tag1');
    expect(component.tags?.value).toEqual(['tag2']);
  });

  it('should show confirmation dialog on delete', async () => {
    matDialog.open.and.returnValue(<any>{ afterClosed: () => of(true) });
    articleService.delete.and.returnValue(<any>Promise.resolve());

    await component.onDelete();

    expect(matDialog.open).toHaveBeenCalled();
    expect(articleService.delete).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Article deleted', '');
  });

  it('should navigate back on cancel', () => {
    component.back();
    expect(router.navigate).toHaveBeenCalledWith(['/blog']);
  });

  it('should open snack bar on successful save', async () => {
    component.articleForm.get('title')?.setValue('Updated Title');
    articleService.put.and.returnValue(<any>Promise.resolve());
    await component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith('Article saved', '');
  });

  it('should not save invalid form', async () => {
    component.articleForm.get('title')?.setValue('');
    await component.onSubmit();

    expect(snackBar.open).not.toHaveBeenCalled();
  });
});
