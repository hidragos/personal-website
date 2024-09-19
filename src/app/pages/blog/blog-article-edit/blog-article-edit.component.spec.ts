import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleEditComponent } from './blog-article-edit.component';

describe('BlogArticleEditComponent', () => {
  let component: BlogArticleEditComponent;
  let fixture: ComponentFixture<BlogArticleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
