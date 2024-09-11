import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { version } from 'package.json';
import { forkJoin, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';

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
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss',
})
export class SidenavContainerComponent implements OnInit, OnDestroy {
  version = version;
  @ViewChild('drawer') sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  sidenavContainerService = inject(SidenavContainerService);
  emptySpaceClickedNumber = 0;

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
  displayListenButton = false;

  ngOnInit(): void {
    forkJoin([this.isHandheld$, this.toggleDrawer$]).subscribe();
  }

  emptySpaceClicked(): void {
    this.emptySpaceClickedNumber++;
    if (this.emptySpaceClickedNumber >= 7) {
      this.displayListenButton = true;
    }
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
        alert('Please say "I love you" to proceed.');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      alert('Error with speech recognition. Please try again.');
    };
  }

  redirectToPage() {
    // Redirect to the desired page
    window.location.href = '/heart-love';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
