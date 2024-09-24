import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { version } from 'package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatButton,
    CommonModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `<ng-container *transloco="let t">
    <div
      class="flex flex-col gap-6 px-1 py-1 pt-8 mt-4 text-xs font-mono footer background-primary-container w-full"
    >
      <mat-icon class="xl-icon self-center" [svgIcon]="'cow'"></mat-icon>
      <div class="text-center flex flex-row justify-between items-end">
        <span class="flex justify-start">v{{ version }}</span>
        <a
          href="https://github.com/hidragos/personal-website"
          class="z-50 flex flex-row items-center gap-2 shrin-"
          target="_blank"
        >
          brewed with
          <mat-icon class="xs-icon" [svgIcon]="'heart'"></mat-icon>
          at github
        </a>
      </div>
    </div>
  </ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  version = version;

  constructor(@Inject(DOCUMENT) private document: Document) {
    setTimeout(() => {
      // add class emoji-color-primary to cow
      const cow = this.document.querySelector('.cow');
      cow?.classList.add('emoji-color-primary');
    }, 2000);
  }
}
