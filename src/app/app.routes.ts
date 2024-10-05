import { Routes } from '@angular/router';

import {
  BlogArticleEditComponent,
  CanDeactivateGuard,
} from './pages/blog/blog-article-edit/blog-article-edit.component';
import { BlogArticleListComponent } from './pages/blog/blog-article-list/blog-article-list.component';
import { BlogArticleComponent } from './pages/blog/blog-article/blog-article.component';
import { BlogAdminComponent } from './pages/blog/blog/blog-admin/blog-admin.component';

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
      import('./pages/about/about.component').then((m) => m.AboutComponent),
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
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: ':id/edit',
        component: BlogArticleEditComponent,
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'admin',
        component: BlogAdminComponent,
      },
      {
        path: ':url',
        component: BlogArticleComponent,
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
    path: 'manage-profile',
    loadComponent: () =>
      import('./pages/account-manager/account-manager.component').then(
        (m) => m.AccountManagerComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];
