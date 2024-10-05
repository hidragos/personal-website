import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { filter, map, pairwise, share, throttleTime } from 'rxjs';

import { SectionsNavigatorComponent } from '../sections-navigator/sections-navigator.component';
import { ThemeNavbarWidgetComponent } from '../theme/theme-navbar-widget/theme-navbar-widget.component';
import { TranslationNavbarWidgetComponent } from '../translation/translation-navbar-widget/translation-navbar-widget.component';
import { Direction, NavbarService, VisibilityState } from './navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TranslationNavbarWidgetComponent,
    ThemeNavbarWidgetComponent,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    RouterModule,
    SectionsNavigatorComponent,
    MatToolbarModule,
  ],

  template: `<mat-toolbar
    class="flex flex-row flex-wrap items-center justify-between"
  >
    <app-sections-navigator> </app-sections-navigator>

    <div class="flex flex-row items-center">
      <theme-navbar-widget></theme-navbar-widget>
      <translation-navbar-widget></translation-navbar-widget>
    </div>
  </mat-toolbar>`,
  styles: [
    `
      @use '@angular/material' as mat;

      :host {
        @apply sticky top-0 z-50;
      }

      mat-toolbar {
        height: auto;
        padding: 4px;
      }
    `,
  ],

  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({
          transform: 'translateY(-100%)',
        })
      ),
      state(VisibilityState.Visible, style({ transform: 'translateY(0)' })),
      transition('* => *', animate('250ms ease-in-out')),
    ]),
  ],
})
export class NavBarComponent implements AfterViewInit {
  router = inject(Router);
  navbarService = inject(NavbarService);
  showAuthButton = true;
  isVisible = true;

  ngAfterViewInit() {
    this.triggerNavbarVisibilityBasedOnScroll();
  }

  triggerNavbarVisibilityBasedOnScroll() {
    const scroll$ = this.navbarService.scrollTop$.pipe(
      throttleTime(10),
      pairwise(),
      map(([y1, y2]) => {
        if (this.navbarService.scrollTop <= 10) return Direction.Up;

        const scrollDifference = Math.abs(y2 - y1);
        const direction = y2 < y1 ? Direction.Up : Direction.Down;
        if (direction == Direction.Down) return direction;
        else if (scrollDifference > 3) return direction;
        return null;
      }),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter((direction) => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter((direction) => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }
}
