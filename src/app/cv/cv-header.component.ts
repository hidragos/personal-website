import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-cv-header',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule],
  template: `
    <div class="header header-background header-headline flex flex-col">
      <h1>Dragos Iliescu</h1>
      <h2 class="mt-4">Full Stack Sotware Engineer</h2>
      <!-- <div class="flex-spacer"></div> -->
      <!-- <div
        class="flex flex-row flex-wrap gap-1 justify-center items-center self-center mt-4"
      >
        <span> 📍 Valencia, VLC, ES </span>

        <mat-chip-set>
          <mat-chip>
            <a href="mailto: dragos.andrei.iliescu@gmail.com" target="_blank">
              dragos.andrei.iliescu&#64;gmail.com
            </a>
          </mat-chip>
          <mat-chip>
            <a href="tel: 633 646 782" target="_blank"> +34 633 646 782 </a>
          </mat-chip>
        </mat-chip-set>
      </div> -->
    </div>
  `,
  styles: [
    `
      .header {
        @apply flex flex-col items-center pb-4;
        height: 120px;
        h1 {
          font-size: 56px;
          font-weight: 500;
          line-height: 56px;
        }

        h2 {
          font-size: 20px;
          font-weight: 300;
          line-height: 28px;
        }
      }
    `,
  ],
})
export class CvHeaderComponent {}
