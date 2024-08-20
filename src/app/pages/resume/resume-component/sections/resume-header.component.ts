import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-resume-header',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, CommonModule, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <div class="header header-headline">
        <h1>{{ t('name') }}</h1>
        <h2>{{ t('job') }}</h2>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .header {
        @apply flex flex-col items-center pb-4 gap-4;

        h1 {
          font-size: 50px;
          font-weight: 500;
          line-height: 56px;
        }

        h2 {
          font-size: 30px;
          font-weight: 300;
          line-height: 28px;
        }
      }
    `,
  ],
})
export class ResumeHeaderComponent {}
