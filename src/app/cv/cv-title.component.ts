import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-cv-title',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule],
  template: `
    <div class="header-background">
      <h4 class="text-2xl font-bold text-center">Dragos-Andrei Iliescu</h4>
      <span>
        <div
          class="flex flex-row flex-wrap gap-1 justify-center items-center self-center"
        >
          <mat-chip-set>
            <mat-chip>
              <span matChipAvatar> 📍 </span>
              <span>Valencia, VLC, ES</span>
            </mat-chip>
            <mat-chip>
              <a href="mailto: dragos.andrei.iliescu@gmail.com" target="_blank">
                dragos.andrei.iliescu&#64;gmail.com
              </a>
            </mat-chip>
            <mat-chip>
              <a href="tel: 633 646 782" target="_blank"> +34 633 646 782 </a>
            </mat-chip>
          </mat-chip-set>
        </div>
      </span>
    </div>
  `,
})
export class CvTitleComponent {}
