import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  NavBarComponent,
  ScrollToTopDirective,
} from '@shared';

import { ResumeComponent } from './pages/resume/resume-component/resume.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    RouterOutlet,
    ResumeComponent,
    NavBarComponent,
    FooterComponent,
    ScrollToTopDirective,
  ],
  template: `
    <div
      appScrollToTop
      class="app-container overflow-y-scroll overflow-x-hidden h-screen-dvh flex flex-col"
    >
      <app-navbar></app-navbar>
      <div class="page-container">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {
  customIcons = ['github', 'linkedin', 'stackoverflow', 'cow', 'heart'];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.customIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/${icon}.svg`
        )
      );
    });

    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
