import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './about-content.component.html',
  styleUrl: './about-content.component.scss',
})
export class AboutContentComponent {}
