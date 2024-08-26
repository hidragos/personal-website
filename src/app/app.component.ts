import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ResumeComponent } from './pages/resume/resume-component/resume.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavBarComponent } from './shared/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, ResumeComponent, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  router = inject(Router);
  destroy$ = new Subject<boolean>();
  @ViewChild('container') container!: ElementRef;

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.container.nativeElement.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
