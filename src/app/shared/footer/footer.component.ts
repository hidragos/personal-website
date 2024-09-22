import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { version } from 'package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoDirective, MatButton, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  version = version;
}
