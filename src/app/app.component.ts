import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

import { ResumeComponent } from './pages/resume/resume-component/resume.component';
import { NavBarComponent } from './shared/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    provideTranslocoScope({
      scope: '',
    }),
  ],
  imports: [RouterOutlet, ResumeComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
