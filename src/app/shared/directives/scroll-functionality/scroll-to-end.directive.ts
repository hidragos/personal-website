// scroll-to-end.directive.ts
import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

import { ScrollToEndService } from './scroll-to-end.service';

@Directive({
  selector: '[appScrollToEnd]',
  standalone: true,
})
export class ScrollToEndDirective implements OnDestroy {
  @Input() threshold: number = 0;

  // Throttle time in milliseconds to limit event emissions

  // Event emitted when scroll reaches the threshold
  @Output() scrolledToEnd = new EventEmitter<void>();

  private scrollSubscription!: Subscription;

  scrollToEndService = inject(ScrollToEndService);

  constructor(private el: ElementRef) {
    this.initializeScrollListener();
  }

  private initializeScrollListener() {
    this.scrollSubscription = fromEvent(this.el.nativeElement, 'scroll')
      .pipe(
        map(() => this.el.nativeElement.scrollTop),
        pairwise(),
        filter(([prev, current]) => {
          const scrollHeight = this.el.nativeElement.scrollHeight;
          const clientHeight = this.el.nativeElement.clientHeight;
          const scrollTop = this.el.nativeElement.scrollTop;

          // Check if the user has scrolled within the threshold from the bottom
          return scrollHeight - (scrollTop + clientHeight) <= this.threshold;
        })
      )
      .subscribe(() => {
        this.scrolledToEnd.emit();
        this.scrollToEndService.emit();
      });
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
