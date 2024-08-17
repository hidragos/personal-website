import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { CvComponent } from './cv/cv.component';
import { NavBar } from './shared/navbar';
import { ThemePicker } from './theme-picker';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CvComponent, ToolbarComponent, ThemePicker, NavBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'personal-website';
  translate = inject(TranslocoService);

  ngOnInit(): void {}
}
