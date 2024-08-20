import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resume',
    pathMatch: 'full',
  },
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume-component/resume.component').then((m) => m.ResumeComponent),
    providers: [provideTranslocoScope('global')],
    pathMatch: 'full',
  },
  // {
  //   path: 'particles',
  //   loadComponent: () =>
  //     import('./particles/particles/particles.component').then(
  //       (m) => m.ParticlesComponent
  //     ),
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'resume',
    pathMatch: 'full',
  },
];
