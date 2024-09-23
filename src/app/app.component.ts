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
import { DomSanitizer } from '@angular/platform-browser';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  NavBarComponent,
  QtAliensComponent,
  ScrollPersistenceService,
  ScrollToEndDirective,
  SidenavContainerComponent,
  SidenavContainerService,
} from '@shared';
import { Subscription } from 'rxjs';

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
    ScrollToEndDirective,
  ],
  styles: [
    `
      .app-container {
        // font-size: large;
        height: 100dvh; /* Height will adapt to the address bar's appearance */
      }

      #container {
        scroll-behavior: smooth;
      }
    `,
  ],
  template: `
    <app-sidenav-container>
      <div
        #container
        appScrollToEnd
        class="app-container overflow-y-scroll overflow-x-hidden h-screen-dvh flex flex-col"
      >
        <app-navbar></app-navbar>
        <div class="grow">
          <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
      </div>
    </app-sidenav-container>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  sidenavContainerService = inject(SidenavContainerService);
  router = inject(Router);
  navbarService = inject(NavbarService);
  scrollPersistenceService = inject(ScrollPersistenceService);

  routerSubscription!: Subscription;

  customIcons = [
    'github',
    'linkedin',
    'stackoverflow',
    'cow',
    'heart',
    'heart_fill',
  ];

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
  }
  // Unique key based on current route
  private get scrollKey(): string {
    return this.router.url;
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationEnd && this.container) {
      //   this.container.nativeElement.scrollTop = 0;
      // }

      if (event instanceof NavigationEnd && this.container) {
        // Restore scroll position for the new route
        const savedScrollTop = this.scrollPersistenceService.getScrollPosition(
          this.scrollKey
        );
        if (savedScrollTop !== null) {
          this.container.nativeElement.scrollTop = savedScrollTop;
        } else {
          // If no saved position, scroll to top
          this.container.nativeElement.scrollTop = 0;
        }
      }
    });

    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  ngAfterViewInit(): void {
    this.container.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.container.nativeElement.scrollTop;
      this.navbarService.setScrollTop(scrollTop);
      // this.scrollPersistenceService.saveScrollPosition(
      //   this.scrollKey,
      //   scrollTop
      // );
    });
  }
}
