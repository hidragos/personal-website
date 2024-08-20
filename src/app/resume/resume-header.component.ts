import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-resume-header',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, CommonModule],
  template: `
    <div class="header header-headline">
      <h1>Dragos-Andrei Iliescu</h1>
      <h2 class="mt-2">Full Stack Sotware Engineer</h2>
    </div>
  `,
  styles: [
    `
      .header {
        @apply flex flex-col items-center pb-4;
        height: 120px;
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
export class ResumeHeaderComponent {
  updateVisibility(event: any) {
    console.log(event);
  }
}
