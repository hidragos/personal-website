import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./pages/resume/resume-component/resume.component').then(
        (m) => m.ResumeComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-component/about.component').then(
        (m) => m.AboutComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog/blog.component').then((m) => m.BlogComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/blog/blog-article-list/blog-article-list.component'
          ).then((m) => m.BlogArticleListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './pages/blog/blog-article-edit/blog-article-edit.component'
          ).then((m) => m.BlogArticleEditComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import(
            './pages/blog/blog-article-edit/blog-article-edit.component'
          ).then((m) => m.BlogArticleEditComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/blog/blog-article/blog-article.component').then(
            (m) => m.BlogArticleComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'heart-love',
    loadComponent: () =>
      import('./pages/heart-love/heart-love.component').then(
        (m) => m.HeartLoveComponent
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];
