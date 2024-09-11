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
