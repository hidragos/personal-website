import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslocoDirective, CommonModule],
  templateUrl: './about-content.component.html',
  styleUrl: './about-content.component.scss',
})
export class AboutContentComponent {
  tldrMode = false;

  toggleTldrMode() {
    this.tldrMode = !this.tldrMode;
  }
}