import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { CvComponent } from './cv/cv.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CvComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppComponent implements OnInit {
  title = 'personal-website';
  translate = inject(TranslocoService);

  ngOnInit(): void {
  }
}
