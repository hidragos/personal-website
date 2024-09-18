import { Routes } from '@angular/router';

import { BlogArticleListComponent } from './pages/blog/blog-article-list/blog-article-list.component';
import { BlogArticleComponent } from './pages/blog/blog-article/blog-article.component';

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
        component: BlogArticleListComponent,
      },
      {
        path: 'new',
        component: BlogArticleComponent,
      },
      {
        path: ':id/edit',
        component: BlogArticleComponent,
      },
      {
        path: ':id',
        component: BlogArticleComponent,
      },
      {
        path: '**',
        redirectTo: '',
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
