import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './about-content.component.html',
  styleUrl: './about-content.component.scss',
})
export class AboutContentComponent {
  tldrMode = true;

  toggleTldrMode() {
    this.tldrMode = !this.tldrMode;
  }
}
