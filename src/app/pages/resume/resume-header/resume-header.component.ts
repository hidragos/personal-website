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
      <div class="flex flex-col items-center pb-4 gap-4">
        <h1 class="text-center">{{ t('name') }}</h1>
        <h2 class="text-center">{{ t('job') }}</h2>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class ResumeHeaderComponent {}
