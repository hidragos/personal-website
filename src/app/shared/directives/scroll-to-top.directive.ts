import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appScrollToTop]',
  standalone: true,
})
export class ScrollToTopDirective implements OnDestroy {
  private routerSubscription: Subscription;

  constructor(private el: ElementRef, private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.el.nativeElement.scrollTop = 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
