import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeartLoveComponent } from './pages/heart-love/heart-love.component';
import { ResumeComponent } from './pages/resume/resume-component/resume.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavBarComponent } from './shared/navbar';
import { QtAliensComponent } from './shared/qt-aliens/qt-aliens.component';
import { SidenavContainerComponent } from './shared/sidenav-container/sidenav-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    RouterOutlet,
    ResumeComponent,
    NavBarComponent,
    FooterComponent,
    SidenavContainerComponent,
    QtAliensComponent,
    HeartLoveComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
