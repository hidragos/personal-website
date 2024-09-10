import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { map, Observable, startWith, tap } from 'rxjs';

import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    LanguagePickerComponent,
    ThemePickerComponent,
    NgTemplateOutlet,
    MatTooltipModule,
    TranslocoDirective,
    MatIconModule,
    AsyncPipe,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
})
export class NavBarComponent {
  @ViewChild('drawer') sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 600px)'])
    .pipe(
      map((result) => result.matches),
      startWith(true),
      tap((isSmall) => {
        console.log('isSmall', isSmall);
        if (!isSmall && this.sidenav?.opened) {
          this.sidenav.close();
        }
      })
    );
}
