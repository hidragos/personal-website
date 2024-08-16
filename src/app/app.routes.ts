import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cv',
    pathMatch: 'full',
  },
  {
    path: 'cv',
    loadComponent: () => import('./cv/cv.component').then((m) => m.CvComponent),
    providers: [provideTranslocoScope('global')],
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'cv',
    pathMatch: 'full',
  },
];
