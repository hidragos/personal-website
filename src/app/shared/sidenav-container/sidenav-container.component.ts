import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { version } from 'package.json';
import {
  forkJoin,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

import { LanguagePickerComponent } from '../language-picker';
import { ThemePickerComponent } from '../theme-picker';
import { SidenavContainerService } from './sidenav-container.service';

@Component({
  selector: 'app-sidenav-container',
  standalone: true,
  imports: [
    CommonModule,
    LanguagePickerComponent,
    ThemePickerComponent,
    MatSidenavModule,
  ],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss',
})
export class SidenavContainerComponent implements OnInit, OnDestroy {
  version = version;
  @ViewChild('drawer') sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  sidenavContainerService = inject(SidenavContainerService);

  destroy$ = new Subject<boolean>();

  isHandheld$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 600px)'])
    .pipe(
      takeUntil(this.destroy$),
      map((result) => result.matches),
      startWith(true),
      tap((isHandheld) => {
        this.sidenavContainerService.isHandheld = isHandheld;

        if (!isHandheld && this.sidenav?.opened) {
          this.sidenav.close();
        }
      })
    );

  toggleDrawer$ = this.sidenavContainerService.toggleDrawer$.pipe(
    takeUntil(this.destroy$),
    tap(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    })
  );

  ngOnInit(): void {
    forkJoin([this.isHandheld$, this.toggleDrawer$]).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
