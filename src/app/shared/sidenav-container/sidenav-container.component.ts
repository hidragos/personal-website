import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';

import { SidenavContainerService } from '.';
import { LanguagePickerComponent } from '../language-picker';
import { ThemePickerComponent } from '../theme-picker';

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
  @ViewChild('drawer') sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  sidenavContainerService = inject(SidenavContainerService);

  takeUntil$ = new Subject<boolean>();

  isHandheld$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 600px)'])
    .pipe(
      map((result) => result.matches),
      startWith(true),
      tap((isHandheld) => {
        this.sidenavContainerService.isHandheld = isHandheld;

        if (!isHandheld && this.sidenav?.opened) {
          this.sidenav.close();
        }
      })
    );

  ngOnInit(): void {
    this.sidenavContainerService.toggleDrawer$
      .pipe(takeUntil(this.takeUntil$))
      .subscribe(() => {
        this.sidenav.toggle();
      });
  }

  ngOnDestroy(): void {
    this.takeUntil$.next(true);
    this.takeUntil$.complete();
  }
}
