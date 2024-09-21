import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  NavBarComponent,
  QtAliensComponent,
  SidenavContainerComponent,
  SidenavContainerService,
} from '@shared';

import { HeartLoveComponent } from './pages/heart-love/heart-love.component';
import { ResumeComponent } from './pages/resume/resume-component/resume.component';
import { NavbarService } from './shared/navbar/navbar.service';

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
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  sidenavContainerService = inject(SidenavContainerService);
  router = inject(Router);
  navbarService = inject(NavbarService);
  matIconRegistry = inject(MatIconRegistry);

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && this.container) {
        this.container.nativeElement.scrollTop = 0;
      }
    });

    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  ngAfterViewInit(): void {
    this.container.nativeElement.addEventListener('scroll', () => {
      this.navbarService.setScrollTop(this.container.nativeElement.scrollTop);
    });
  }
}
