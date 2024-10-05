import { Routes } from '@angular/router';

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
    path: '**',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];
