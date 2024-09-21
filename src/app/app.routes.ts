import { Routes } from '@angular/router';

import { BlogArticleEditComponent } from './pages/blog/blog-article-edit/blog-article-edit.component';
import { BlogArticleListComponent } from './pages/blog/blog-article-list/blog-article-list.component';
import { BlogArticleComponent } from './pages/blog/blog-article/blog-article.component';

export const routes: Routes = [
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
        component: BlogArticleListComponent,
        pathMatch: 'full',
      },
      {
        path: 'new',
        component: BlogArticleEditComponent,
        pathMatch: 'full',
      },
      {
        path: ':id/edit',
        component: BlogArticleEditComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: BlogArticleComponent,
        pathMatch: 'full',
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
