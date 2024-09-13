import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
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
import { SectionsNavigatorComponent } from '../sections-navigator/sections-navigator.component';
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
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    RouterModule,
    SectionsNavigatorComponent,
  ],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss',
})
export class SidenavContainerComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);

  destroy$ = new Subject<boolean>();
  displayListenButton = false;
  emptySpaceClickedNumber = 0;
  isHandheld$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 900px)'])
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
  @ViewChild('drawer') sidenav!: MatSidenav;
  sidenavContainerService = inject(SidenavContainerService);
  toggleDrawer$ = this.sidenavContainerService.toggleDrawer$.pipe(
    takeUntil(this.destroy$),
    tap(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    })
  );
  version = version;

  emptySpaceClicked(): void {
    this.emptySpaceClickedNumber++;
    if (this.emptySpaceClickedNumber >= 7) {
      this.displayListenButton = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    forkJoin([this.isHandheld$, this.toggleDrawer$]).subscribe();
  }

  redirectToPage() {
    window.location.href = '/heart-love';
  }

  startListening() {
    const recognition =
      new (window as any).webkitSpeechRecognition() ||
      new (window as any).SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      if (transcript === 'i love you') {
        this.redirectToPage();
      } else {
        alert('Please try again.');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      alert('Error with speech recognition. Please try again.');
    };
  }
}
